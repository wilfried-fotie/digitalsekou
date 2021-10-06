import React from 'react'
import { SchoolContext} from "../../pages/addSchoolPro/[id]"
import Preview from '../School/Preview'
import styles from '../../styles/startpub.module.css'
import style from "../Entreprise/offre.module.css"
import { Bookmark, BoundingBox, BrightnessAltLowFill, BrightnessHighFill, BrightnessLowFill, Building, CheckCircle, Dice5Fill, DisplayFill, Eraser, FileEarmarkPostFill, GeoAltFill, ImageFill, LockFill, TelephoneFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { FieldValidate, FileValidate, PasswordValidate, Radio, RadioValidate, Selector, TextAreaValidate,File, TextArea, Editor, SelectoR } from '../FormTools'
import ArticleEditor from '../../pages/editor'
import WebsitePreview from '../School/WebsitePreview'
import axios from 'axios'
import draftToHtml from 'draftjs-to-html';
import useModal from '../CustomHooks/useModal'
import Loader from 'react-loader-spinner'
import CustomModal from '../customModal'
import FineModal from '../fineModal'



const ALLOWED_EXTENSIONS_PRO = ['webp', 'svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG" ,"mp4", "MP4"]
const ALLOWED_EXTENSIONS = ['svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG"]

const allowOnlyPicture = (filename,pro=false) => {

    let ext = (filename).split(".", -1)[1]
    if (pro ? ALLOWED_EXTENSIONS_PRO.includes(ext) : ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}



export function ModSchool() {
    const schoolData = React.useContext(SchoolContext)
    

    const data = schoolData.data.schoolData.school
    
    const position = schoolData.data.positions.positions
    const dispacth = schoolData.dispacth
    const [loader, setLoader] = React.useState(false)
    const [dispo, setDispo] = React.useState(data.disposition)


    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onChange", defaultValues: { data} })
    const [err, setErr] = React.useState("")
    const [errStart, setErrStart] = React.useState(false)
    const [state, setState] = React.useState("")
    const [succes, setSucces] = useModal(false)

    const [stateOutro, setStateOutro] = React.useState("")
    const [data2, setData2] = React.useState({
        logo: "",
        logoName: "",
        logoData: "",
        profil: "",
        profilName: "",
        profilData: "",})
    const types = schoolData.data.types.types

    const [checked, setChecked] = React.useState({ multiple: data.multiple, status: data.status, description: data.description, type: types.map(e => ({ label: e.types, value: e.types })) })

    const [error, setError] = useModal(false)
    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const options2 = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]

    const onSubmit = (d) => {
        setErrStart(true)

        if (isValid && checked.type ) {
            setLoader(true)
        const random = Math.floor(Math.random() * 10)
        const type = d.type
        const dataToUpload = {
            ...d, id: data.id, description: draftToHtml(state.body) || data.description, pro: data.pro, logo: data2.logoName && ("school-logo-" + data.id + "-" + random + "." + data2.logoName.split(".", -1)[1]) || data.logo, profil: data2.profilName && ("school-profil-" + data.id + "-" + random + "." + data2.profilName.split(".", -1)[1]) || data.profil, multiple: checked.multiple || data.multiple, type: checked.type, disposition: dispo, status: checked.status || data.status
            , data2, outro: draftToHtml(stateOutro.body) || data.outro

        }
        const formData2 = new FormData();
        const formData1 = new FormData();
        

        if (allowOnlyPicture(dataToUpload.data2.logoName) ) {
            formData1.append("file", dataToUpload.data2.logoData, "school-logo-" + data.id + "-" + random + "." + data2.logoName.split(".", -1)[1]);

        }

        if (allowOnlyPicture(dataToUpload.data2.profilName,data.pro)) {
            formData2.append("file", dataToUpload.data2.profilData, "school-profil-" + data.id + "-" + random + "." + data2.profilName.split(".", -1)[1]);
        }
        axios.all([
            axios.put("/schools/" + localStorage.getItem('schoolId'), dataToUpload),
            data2.logoData && axios.post("/upload", formData1),
            data2.profilData && axios.post("/upload", formData2),
            data2.logoName && axios.delete("/upload/" + data.logo),
            data2.profilName && axios.delete("/upload/" + data.profil),
 
        ])
            .then(r => {
                dispacth({ type: "UPDATEOBJ", name: "schoolData", pre: "school", data: dataToUpload })
                const posiUpdate = dataToUpload.positions.map(e => ({ position: e.value, school_id: data.id }))

                const typeUpdate = [...dataToUpload.type].map(e => ({ types: e.value, school_id: data.id }))
                dispacth({ type: "UPDATEALL", name: "positions", data: posiUpdate })
                dispacth({ type: "UPDATEALL", name: "types", data: typeUpdate })
            setSucces(true)
            
            })
            .catch(r => { setError(true) })
        .finally(() =>setLoader(false))
            
         

        } else {
            setError(true)
        }
}

    
    const handleImageChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        if (e.target.files && e.target.files[0]) {


            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (ev) => {
                setData2(s => {
                    return {
                        ...s,
                        [name]: ev.target.result,
                        [id]: e.target.files[0],
                        [name + "Name"]: e.target.files[0].name.replaceAll(" ", "").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "")


                    }
                });
            };

        }

    }
    

   
    const handleChange = (e => {
        let name = e.target.name
        
        name == "multiple" ? setChecked(s => ({ ...s, type: false, [name]: e.target.value }))  :  setChecked(s=> ({...s, [name]: e.target.value }))
        

    
    }
        )
    
    const handleChangeSelect = (e => {
        setChecked(s => ({ ...s, type: s.multiple == "Oui" ? [...e] : [e] }))



    }
    )
    
   const handleEditorContent = (content) => {
       setState(s => ({
            ...s,
            body: content,
            articleUpdated: true
        }));
   }
    
    const handleEditorContentOutro = (content) => {
        setStateOutro(s => ({
            ...s,
            body: content,
            articleUpdated: true
        }));
    }

    return (<>
        <div className="h1 pad">Modifier votre site web</div>
        <div className="tableModSite">

            
            <form onSubmit={handleSubmit(onSubmit)}>


                


                {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                    {err}
                </div>}
               

      
            <FieldValidate name="name" r={false} def={data.name} image={<Building color="#4a00b4" size="20px" />} auto="Entrez le nom de la spécilaité" control={control} >Nom Complet De L'établissement</FieldValidate>
        {errors.name && errors.name.type === "required" && (
            <span className="error">ce champ est obligatoire</span>
        )}
        {errors.name && errors.name.type === "minLength" && (
            <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}

          

        
                <FieldValidate control={control} name="sigle" def={data.sigle} r={false} >Sigle De L'établissement </FieldValidate>
            {errors.sigle && errors.sigle.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.sigle && errors.sigle.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}
            
                <FieldValidate name="tel" r={false} control={control} type="number" def={data.tel} image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} >Ajouter Le Numéro de Téléphone</FieldValidate>
            {errors.tel && errors.tel.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.tel && errors.tel.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}

            
                        
            <File name="logo" def={data2.logo || "/" + data.logo} onChange={handleImageChange}>Importer Le Logo</File>
             


                
            <Selector mult={true} name="positions" def={position}  r={false} control={control} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>Selectionner les positions de votre établissement</Selector>

            {errors.position && errors.position.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
            {errors.position && errors.position.type === "minLength" && (
                <span className="error"> il doit faire au moins trois caracteres</span>
            )}

            <Radio onChange={handleChange} value={data.status} name="status"  data={["Privé", "Public","Para-Publique"]} >Status de l' établissement public ou privé? </Radio>
            {errors.status && errors.status.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          

            <Radio onChange={handleChange}  name="multiple" data={["Oui ", "Non"]} value={data.multiple}  image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]}>Votre nom d' établissement est-il
                utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </Radio>
           
                {errors.multiple && errors.multiple.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          
          
                <SelectoR mult={checked.multiple === "Oui" ? true : false} state={checked.type} onChange={handleChangeSelect} name="type" r={false} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options2}>{data.multiple === "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"}</SelectoR>

                <span className="error">

                    {(errStart && checked.type == "")  ? "Ce Champ est réquis" : null}
                </span>
                

                
            <File profil ={ data.pro ? true : false} name="profil" def={data2.profil || "/"  + data.profil} onChange={handleImageChange}>Importer Le Logo</File>

                

                <div className="a">
                    <p className="dfs"> <FileEarmarkPostFill size={20} color="#4a00b4" /> Disposition</p>
                    <div className="dfss">
                        <div className={(state === 1) || (dispo == 1) ? style.activeborder0 : style.border0} onClick={() => { setState(1); setDispo(1) }}>
                            <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                        </div>
                        <div className={(state === 2) || (dispo == 2) ? style.activeborder : style.border} onClick={() => { setState(2); setDispo(2) }}>
                            <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                        </div>

                        <div className={(state === 3) || (dispo == 3) ? style.activeborder2 : style.border2} onClick={() => { setState(3); setDispo(3) }}>
                            <span>Texte</span>    <ImageFill size={20} color="#4a00b4" />

                        </div>

                    </div>
                </div>

            <div className="pad">
         

                    <Editor name="description" r={false} state={draftToHtml(data.description) || data.description} handleEdit={handleEditorContent} edit={true}>

                        modifier la description de votre établissement
                    </Editor>

          
             
            </div>
                

                <div style={{marginTop: "20px"}}>
                    <div className="dfs" style={{ marginBottom: "50px" }}>
                      <BrightnessLowFill size={20} color="#4a00b4"/>  Ajouter autres choses (exp: comment s'inscrire etc..)
                    </div>
             {data.pro  &&     <ArticleEditor
                        handleContent={handleEditorContentOutro}
                        edit={true}
                        state={data.outro}
                        className="editor"
                    />
                    }

                    {!data.pro && <p> <span className="error"> Réserver pour les pros</span> </p>}
                </div>

            <center style={{ padding: "5% 20px 10px" }}>
                <button disabled={loader} className="dfss btnPri" >
                    {loader && <Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={50}
                    />}

                    Enregistrer</button>
            </center>
            </form>


            {succes && <FineModal position={{ top: 30, left: "25%" }} component={<div color="green"> <center> <CheckCircle size={40} color="green" /> </center><br />  Les données ont étés mis à jour avec succes!!</div>} onModalChange={setSucces} />}
            {error && <FineModal position={{ top: 30, left: "25%" }} component={<div color="red"> <center> <Eraser size={40} color="red" /> </center><br />  Les données n'ont pas étés mis à jour avec succes!!</div>} onModalChange={setError} />}
        </div>
        </>)
}