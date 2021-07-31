import Link from 'next/link'
import React from 'react'
import { BoundingBox, Building, EyeFill, EyeSlashFill, GeoAlt, GeoAltFill, ImageAlt, NodeMinus, TelephoneFill } from 'react-bootstrap-icons'
import { useRouter } from "next/router"
import axios from 'axios'
import "../../global"
import Select from 'react-select'
import styles from '../../styles/AddSchool.module.css'
import { Radio, Field, File, Password, TextArea } from '../FormTools'
import useModal from '../CustomHooks/useModal'
import  {Tools, ToolsBefore} from '../CustomHooks/Tools'
import FineModal from '../fineModal'


const insertSchool = async(data) => {
    // await axios.post('/add-school', data).then(res => {
    //     console.log(res)
    //     // sessionStorage.setItem("schoolToken", res.data.etoken)
    //     // sessionStorage.setItem("school", res.data.username)
    //     // sessionStorage.setItem("schoolId", res.data.id)


    // }).catch(e => console.error("Cet utilisateur existe déjà"))

   
      
  

}

const ALLOWED_EXTENSIONS = ['webp', 'svg', 'png', 'jpg', 'jpeg']

const allowOnlyPicture = (filename) => {
    
    let ext = (filename.name).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
       return true
    }
    return false
    
}



export default function Add({ onSelectChange, onImageChange, onChange, state, onSelectStatusChange, onStatusCheckedChange }) {
    
    


    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const optionType = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]
    const [errors, setErrors] = React.useState({})
    const [visbility, v] = useModal(false)
    const [visbility2, v2] = useModal(false)


    const handleChangeSelect = (e) => {
        onSelectChange(e)

    }
    const handleSelectStatusChange = (e) => {
        onSelectStatusChange(e)
    }

    const handleImage = (e) => {
        onImageChange(e)

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
       console.log(err)
        
        if (err >= 17) {
            
            if (allowOnlyPicture(state.logoData) && allowOnlyPicture(state.profilData) ) {
            const formData1 = new FormData();
            const formData2 = new FormData();
            formData1.append("file", state.logoData);
                formData2.append("file", state.profilData);
               console.log(state)
                axios.all([
                    axios.post("/add-school", state),
                    axios.post("/upload", formData1),
                    axios.post("/upload", formData2)
                    

                            
                ]).then(res => console.log(res[0],res[1],res[2]))
                    .catch(err => v(true));
            
               
                
            } else {
                alert("Les formats accepter son uniquement les formats d'images")
            }
            
        }else{
            
           
                v2(true)
            

            
        }

         

       
   }
 
    return (
<form onSubmit={handleSubmit}>

            <div className={styles.left}>

            <Field auto="exp: Institut universitaire...." name="name" onChange={handle} value={state.name} image={<Building size={20} color="#4a00b4" />} >Nom Complet De L'établissement</Field>
                <span className="error" >
                    {!state.name && errors && errors.name}
                </span>
            <Field name="sigle" auto="exp: INSAM" onChange={handle} value={state.cible}>Sigle De L'établissement </Field>
                <span className="error" >
                    {!state.sigle && errors && errors.sigle}
                </span>
                <Field name="tel" auto="exp: 678 55 02 04" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} onChange={handle} value={state.tel}>Ajouter Le Numéro de Téléphone</Field>
                <span className="error">
                    {!state.tel && errors && errors.tel}
                </span>

                <Password name="password" onChange={handle} value={state.password} image={<Building size={20} color="#4a00b4" />}>Entrez un mot de passse</Password>
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

            
                
                <Radio name="status" data={["Privé", "Public"]} onChange={handleCheckChange}  >Status de l' établissement public ou privé? </Radio>
                
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
                <span className="error">{!state.profil &&errors && errors.profil}</span>
            <TextArea name="description" onChange={handle} value={state.description}>Description De L'établissement </TextArea>
                <span className="error" >{!state.description && errors && errors.description}</span>
               
                <div className={styles.dg}> <center> <button type="submit" className="btnPri"> Enregistrer </button> </center>  </div>

                {visbility && <FineModal position={{top: 30, left: "35%" }} onModalChange={v} component={<Tools />} />}
                {visbility2 && <FineModal position={{ top: 30, left: "35%" }}  onModalChange={v2} component={<ToolsBefore />}/> }

        </div>
        </form>
    
    )
}


