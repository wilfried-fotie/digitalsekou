import Link from 'next/link'
import React from 'react'
import { BoundingBox, Building, EyeFill, EyeSlashFill, GeoAlt, GeoAltFill, ImageAlt, LockFill, NodeMinus, TelephoneFill } from 'react-bootstrap-icons'
import { useRouter } from "next/router"
import axios from 'axios'
import "../../global"
import Select from 'react-select'
import styles from '../../styles/AddSchool.module.css'
import { Radio, Field, File, Password, TextArea, Editor } from '../FormTools'
import useModal from '../CustomHooks/useModal'
import  {SendData, Tools, ToolsBefore} from '../CustomHooks/Tools'
import FineModal from '../fineModal'
import CustomModal from '../customModal'
import Loader from 'react-loader-spinner'
import draftToHtml from 'draftjs-to-html'


const ALLOWED_EXTENSIONS = ['svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG"]

const allowOnlyPicture = (filename) => {

    let ext = (filename.name).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}



export default function Add({ onSelectChange, onImageChange, onChange, state, onSelectStatusChange, onStatusCheckedChange, onEditorTextChange }) {
    
    


    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const optionType = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]
    const [errors, setErrors] = React.useState({})
    const [visbility, v] = useModal(false)
    const [visbility2, v2] = useModal(false)
    const [visbility3, v3] = useModal(false)
    const [loader, setLoader] = React.useState(false)
    const router = useRouter()


    const handleChangeSelect = (e) => {
        onSelectChange(e)

    }
    const handleSelectStatusChange = (e) => {
        onSelectStatusChange(e)
    }

    const handleImage = (e) => {
        onImageChange(e)

    }
    const handleEditChange = (e) => {
        onEditorTextChange(e)
    }

    const handleCheckChange = (e) => {
        onStatusCheckedChange(e)
    }
    const handle = (e) => {
        onChange(e)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
     
   
        setErrors({})
        
        
       
        for (const key in state) {
            if (state[key] == ""  ) {
         

                setErrors(s => {
                    return { ...s, [key]: "Le champ " + key + " est requis" }
                })
                          
            } else {
               

            }
        }
let err = 0 
           for (const key in state) {
               if (state[key] !== "") {
err++
                  
               }
           }
        
         
        if (state.password.length < 8) {
            err-=1
            setErrors(s => {
                return { ...s, password: "Le mot de passe doit être au moins 8 caractères" }
            })
        } else {
err++

        }

        
           if (err == 1) { setErrors({})}
        
        if (err >= 17) {
            

            state.sigle = state.sigle.trim()
            state.tel = state.tel.trim()
            state.name = state.name.trim()
            state.description = state.description.trim()
            if (allowOnlyPicture(state.logoData) && allowOnlyPicture(state.profilData) ) {
                const formData1 = new FormData();
                const formData2 = new FormData();
                setLoader(true)
                formData1.append("file", state.logoData, state.sigle + "-" + state.logoName);
                formData2.append("file", state.profilData, state.sigle + "-" + state.profilName);

                axios.all([
                    axios.post("/add-school", state),
                    axios.post("/upload", formData1),
                    axios.post("/upload", formData2)
                ]
            
            
          ).then(res => {
                     localStorage.setItem("schoolToken", res[0].data.token)
                 localStorage.setItem("school", res[0].data.sigle)
              localStorage.setItem("schoolId", res[0].data.id)
              router.push(`/addSchoolPro/${res[0].data.id}?token=${res[0].data.token}`)
              setLoader(false)
             } )
                    .catch(err => {
                         null
             v(true)
                         setLoader(false)

                     })
                
                
    
            } else {
                v3(true)
            }
            
        }else{
            
           
                v2(true)
            

            
        }

         

       
   }
 
    return (
        <form onSubmit={handleSubmit}>

            <div className={styles.left}>

                <Field name="name" auto="exp: Institut universitaire...." onChange={handle} value={state.name} image={<Building size={20} color="#4a00b4" />}>Nom Complet De L'établissement</Field>
                <span className="error" >
                    {!state.name && errors && errors.name}
                </span>
                <Field name="sigle" auto="exp: INSAM" onChange={handle} value={state.cible}>Sigle De L'établissement </Field>
                <span className="error" >
                    {!state.sigle && errors && errors.sigle}
                </span>
                <Field name="tel" auto="exp: 678550204" type="number" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} onChange={handle} value={state.tel}>Ajouter Le Numéro de Téléphone (sans espaces)</Field>
                <span className="error">
                    {!state.tel && errors && errors.tel}
                </span>

                <Password name="password" onChange={handle} value={state.password} image={<LockFill size={20} color="#4a00b4" />}>Entrez un mot de passse</Password>
                <span className="error" >
                    {!state.password && errors && errors.password || state.password.length < 8 && errors.password}
                    
                </span>

                <File name="logo" onChange={handleImage}>Importer Le Logo</File>
                <span className="error" >
                    {!state.logo && errors && errors.logo}
                </span>

            <div className={styles.dg}>
                    <span className="dfs"> <GeoAltFill size={20} color="#4a00b4" /> Selectionner les villes dans lesquelles vous êtes situer</span>
                    <Select isMulti options={options} value={state.position} name="position" 
                    classNamePrefix="select" onChange={handleChangeSelect} />
                </div>
                <span className="error" >
                    {!!state.position  && errors && errors.position}
                </span>

            
                
                <Radio name="status"  data={["Privé", "Public"]} onChange={handleCheckChange}  >Status de l' établissement public ou privé? </Radio>
                
                <span className="error" >{!state.status &&errors && errors.status}</span>
                <Radio name="multiple" image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]} onChange={handleCheckChange} >Votre nom d' établissement est-il
                    utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </Radio>
                <span className="error">{!state.multiple &&errors && errors.multiple}</span>
                <div className={styles.dg}>
                    <span className={styles.ds}>{state.multiple === "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"} </span>
                    <Select isMulti={state.multiple === "Oui" ? true : false } options={optionType} value={state.type} name="type"
                        onChange={handleSelectStatusChange} />
                </div>
                <span className="error" >{!!state.type && errors && errors.type}</span>

            <File name="profil" onChange={handleImage}>Importer Une Image de Profil</File>
                <span className="error">{!state.profil && errors && errors.profil}</span>
                


                {/* <TextArea name="description" onChange={handle} value={state.description}>Description De L'établissement </TextArea> */}
                
                <Editor name="description" r={false} state={draftToHtml(state.description)} handleEdit={handleEditChange} >

                    Ajouter description de votre activité qui va apparaître sur votre page
                </Editor>
                <span className="error" >{!state.description && errors && errors.description}</span>
               
                <div className={styles.dg}>
                    <button disabled={loader} className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}

                        Enregistrer</button>
                </div>  

                {visbility && <FineModal position={{top: 30, left: "35%" }} onModalChange={v} component={<Tools />} />}
                {visbility2 && <FineModal position={{ top: 30, left: "25%" }} onModalChange={v2} component={<ToolsBefore >  Veuillez vérifier les informations soumis!</ToolsBefore>} />}
                {visbility3 && <FineModal position={{ top: 30, left: "25%" }} onModalChange={v3} component={<ToolsBefore >  Verifier le format d'image soumis</ToolsBefore>} />}

        </div>
        </form>
    
    )
}


