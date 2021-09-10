import React from 'react'
import { SchoolContext} from "../../pages/addSchoolPro/[id]"
import Preview from '../School/Preview'
import styles from '../../styles/startpub.module.css'
import { Bookmark, BoundingBox, BrightnessAltLowFill, BrightnessHighFill, BrightnessLowFill, Building, CheckCircle, Dice5Fill, DisplayFill, Eraser, GeoAltFill, ImageFill, LockFill, TelephoneFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { FieldValidate, FileValidate, PasswordValidate, Radio, RadioValidate, Selector, TextAreaValidate,File, TextArea } from '../FormTools'
import ArticleEditor from '../../pages/editor'
import WebsitePreview from '../School/WebsitePreview'
import axios from 'axios'
import draftToHtml from 'draftjs-to-html';
import useModal from '../CustomHooks/useModal'
import Loader from 'react-loader-spinner'
import CustomModal from '../customModal'
import FineModal from '../fineModal'


export function SiteWeb() {




    const [state, setState] = React.useState(1)

    return (
        <>
            <div style={{ marginTop: "30px" }}>
               
            <div className="df" style={{ borderBottom: "2px solid #4a00b4" }}>
                    <span className={ state == 1 ? styles.active2 : styles.span} onClick={() => { setState(1) }}> <DisplayFill className="mr"  size={20} color={state == 1 ? "#fff" : "#4a00b4"} /> <span className={state == 1 ? styles.acticon : styles.icon}  > Visualiation </span> </span>

                <hr />

                    <span className={state == 2 ? styles.active2 : styles.span} onClick={() => { setState(2) }}> <Dice5Fill className="mr" size={20} color={state == 2 ? "#fff" : "#4a00b4"} /><span className={state == 2 ? styles.acticon : styles.icon} >Modifier </span></span>

            </div>
                <div  className={styles.left}>

                    
                    <center>{state == 1 && <WebsitePreview/>} </center>


            </div>
                
                <div  className={styles.right}>

                 
                    <center>{state == 2 && <ModSchool
                  
                    
                />} </center>

            </div>
            </div>

            


        </>
    )
}

const ALLOWED_EXTENSIONS = ['webp', 'svg', 'png', 'jpg', 'jpeg',"mp4","MP4"]

const allowOnlyPicture = (filename) => {

    let ext = (filename).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}



export function ModSchool() {
    const schoolData = React.useContext(SchoolContext)
    

    const data = schoolData.data.schoolData.school
    const position = schoolData.data.positions.positions
    const types = schoolData.data.types.types
    const dispacth = schoolData.dispacth
    const [loader, setLoader] = React.useState(false)


    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onChange", defaultValues: { data} })
    const [err, setErr] = React.useState("")
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
    const [checked, setChecked] = React.useState({ multiple: data.multiple, status: data.status, description: data.pro ? null : data.description })
    const [error, setError] = useModal(false)
    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const options2 = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]

    const onSubmit = (d) => {
        setLoader(true)
        const dataToUpload = {
            ...d, description: data.pro && state.body? draftToHtml(state.body) : data.description || data.description  ,pro: data.pro, logo: data2.logoName || data.logo, profil: data2.profilName || data.profil , multiple: checked.multiple || data.multiple, status: checked.status || data.status
            , data2, outro: draftToHtml(stateOutro.body) || data.outro,

        }
        const formData2 = new FormData();
        const formData1 = new FormData();

        if (allowOnlyPicture(dataToUpload.data2.logoName) ) {
            formData1.append("file", dataToUpload.data2.logoData, data.sigle + "-" + data2.logoName.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("'", ""));

        }

        if (allowOnlyPicture(dataToUpload.data2.profilName)) {
            formData2.append("file", dataToUpload.data2.profilData, data.sigle + "-" + data2.profilName.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("(", ""));
        }
        axios.all([
            axios.put("/schools/" + sessionStorage.getItem('schoolId'), dataToUpload),
            data2.logoData && axios.post("/upload", formData1),
            data2.profilData && axios.post("/upload", formData2),
 
        ])
            .then(r => {
                dispacth({ type: "UPDATESCHOOL", name: "schoolData", id: data.id, value: dataToUpload })
            setSucces(true)
            
            })
            .catch(r => setError(true))
        .finally(() =>setLoader(false))
            
         


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
        setChecked(s=> ({...s, [name]: e.target.value }))
        

    
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
        <div className={"container", styles.dg}>

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

            
                        
            <File name="logo" def={data2.logo || "/" + data.sigle + "-" + data.logo} onChange={handleImageChange}>Importer Le Logo</File>
             

            <Selector mult={true} name="positions" def={position}  r={false} control={control} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>Selectionner les positions de votre établissement</Selector>

            {errors.position && errors.position.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
            {errors.position && errors.position.type === "minLength" && (
                <span className="error"> il doit faire au moins trois caracteres</span>
            )}

            <Radio onChange={handleChange} value={data.status} name="status"  data={["Privé", "Public"]} >Status de l' établissement public ou privé? </Radio>
            {errors.status && errors.status.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          

            <Radio onChange={handleChange} name="multiple" data={["Oui ", "Non"]} value={data.multiple}  image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]}>Votre nom d' établissement est-il
                utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </Radio>
           
                {errors.multiple && errors.multiple.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          
                

            <Selector mult={checked.multiple === "Oui" ? true : false} name="type" r={false} def={types}  control={control} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options2}>{data.multiple === "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"}</Selector>

            {errors.type && errors.type.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
            {errors.type && errors.type.type === "minLength" && (
                <span className="error"> il doit faire au moins trois caracteres</span>
            )}

                
            <File profil ={ data.pro ? true : false} name="profil" def={data2.profil || "/" + data.sigle + "-" + data.profil} onChange={handleImageChange}>Importer Le Logo</File>


            <div className="editor">
         
                {data.pro && <ArticleEditor
                    handleContent={handleEditorContent}
                    edit={true}
                    className="editor"
                    state={data.description}
                />}
                {!data.pro && 
                        <TextArea value={checked.description} onChange={handleChange} name="description" def={data.description}>Description De L'établissement </TextArea>
                }
            </div>
                
                <div style={{marginTop: "20px"}}>
                    <div className="dfs" style={{ marginBottom: "50px" }}>
                      <BrightnessLowFill size={20} color="#4a00b4"/>  Ajouter autres choses (Exp: RCCM,numérode compte,pour les insriptions etc..)

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

            <center style={{ padding: "5px 20px 10px" }}>
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


            {succes && <FineModal position={{ top: 30, left: "35%" }} component={<div color="green"> <center> <CheckCircle size={40} color="green" /> </center><br />  Les données ont étés mis à jour avec succes!!</div>} onModalChange={setSucces} />}
            {error && <FineModal position={{ top: 30, left: "35%" }} component={<div color="red"> <center> <Eraser size={40} color="red" /> </center><br />  Les données n'ont pas étés mis à jour avec succes!!</div>} onModalChange={setError} />}
        </div>
        </>)
}