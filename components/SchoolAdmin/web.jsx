import React from 'react'
import { SchoolContext} from "../../pages/addSchoolPro/[id]"
import Preview from '../School/Preview'
import styles from '../../styles/startpub.module.css'
import { Bookmark, BoundingBox, Building, Dice5Fill, DisplayFill, GeoAltFill, ImageFill, LockFill, TelephoneFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { FieldValidate, FileValidate, PasswordValidate, Radio, RadioValidate, Selector, TextAreaValidate } from '../FormTools'
import ArticleEditor from '../../pages/editor'


export function SiteWeb({ filieres, specialities }) {




    const app = {
        logo: "",
        logoName: "",
        logoData: "",
        sigle: "",
        tel: "",
        name: "",
        description: "",
        password: "",
        status: "Privé",
        type: [],
        multiple: "Non",
        outro: "...",
        profil: "",
        profilName: "",
        profilData: "",
        position: [],

    }


    const school = React.useContext(SchoolContext)
    const schoolDispach = school.dispacth
    const dataSchool = school.data.schoolData.school
    const [data, setData] = React.useState(dataSchool)
    const [state, setState] = React.useState(1)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        name == "sigle" ? value.toUpperCase() : value
        setData(s => {
            return {
                ...s,
                [name]: value
            }
        }
        )
    }
    const handleCheckChange = (e) => {
        const name = e.target.name
        const value = e.target.id
        setData(s => {
            return {
                ...s,
                [name]: value
            }
        }
        )
    }

    const handleImageChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        if (e.target.files && e.target.files[0]) {


            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (ev) => {
                setData(s => {
                    return {
                        ...s,
                        [name]: ev.target.result,
                        [id]: e.target.files[0],
                        [name + "Name"]: e.target.files[0].name


                    }
                });
            };

        }


    }
    const handleSelectChange = (e) => {

        setData(s => {
            return {
                ...s,
                position: [...e]
            }
        }
        )
    }
    const handleSelectStatusChange = (e) => {

        setData(s => {
            return {
                ...s,
                type: s.multiple == "Oui" ? [...e] : [e]
            }
        }
        )
    }




    const handleClickTest = React.useCallback((e) => {
        
        schoolDispach({ type: "update",payload: {name: e.target.value}})
    },[schoolDispach])

    return (
        <>
            <div style={{ marginTop: "30px" }}>
                {JSON.stringify(filieres,specialities)}
            <div className="df" style={{ borderBottom: "2px solid #4a00b4" }}>
                    <span className={ state == 1 ? styles.active2 : styles.span} onClick={() => { setState(1) }}> <DisplayFill className="mr"  size={20} color={state == 1 ? "#fff" : "#4a00b4"} /> <span className={state == 1 ? styles.acticon : styles.icon}  > Visualiation </span> </span>

                <hr />

                    <span className={state == 2 ? styles.active2 : styles.span} onClick={() => { setState(2) }}> <Dice5Fill className="mr" size={20} color={state == 2 ? "#fff" : "#4a00b4"} /><span className={state == 2 ? styles.acticon : styles.icon} >Modifier </span></span>

            </div>
            <div className={styles.left}>

                    
                    <center>{state == 1 && <Preview data={data} />} </center>


            </div>
            <div className={styles.right}>

                    {/* <center>{state == 2 && <Add
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                    state={data}
                    onSelectChange={handleSelectChange}
                    onSelectStatusChange={handleSelectStatusChange}
                    onStatusCheckedChange={handleCheckChange}
                />} </center> */}
                    <center>{state == 2 && <ModSchool
                  
                    
                />} </center>

            </div>
            </div>

            


        </>
    )
}


export function ModSchool() {
    const schoolData = React.useContext(SchoolContext)
    

    const data = schoolData.data.schoolData.school

    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched", defaultValues: {data} })
    const [err, setErr] = React.useState("")
    const [state, setState] = React.useState("")
    const [fine, setFine] = React.useState("")
    const [loader, setLoader] = React.useState(false)
    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const options2 = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]

    const onSubmit = (d)=>{
    
}

    
   const handleEditorContent = (content) => {
       setState(s => ({
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
                {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                    {fine}
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
            
                <FieldValidate name="tel" r={false} control={control} def={data.tel} image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} >Ajouter Le Numéro de Téléphone</FieldValidate>
            {errors.tel && errors.tel.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.tel && errors.tel.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}

            
                <PasswordValidate name="oldPassword" r={false} old={true} control={control} image={<LockFill size={20} color="#4a00b4" />}>Entrez l'ancien mot de passse</PasswordValidate>
                {errors.oldPassword && errors.oldPassword.type === "required" && (
                    <span className="error">ce champ est obligatoire</span>
                )}
                {errors.oldPassword && errors.oldPassword.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moins huit caracteres</span>
                )}


            <PasswordValidate name="password" r={false} newp={true}  control={control} image={<LockFill size={20} color="#4a00b4" />}>Entrez le nouveau mot de passse</PasswordValidate>
            {errors.password && errors.password.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins huit caracteres</span>
            )}


            <FileValidate name="logo" r={false} def={"/" + data.sigle + "-" + data.logo} control={control}  >Importer Le Logo</FileValidate>
            {errors.logo && errors.logo.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.logo && errors.logo.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}

            <Selector mult={true} name="position"  r={false} control={control} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>Selectionner les positions de votre établissement</Selector>

            {errors.position && errors.position.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
            {errors.position && errors.position.type === "minLength" && (
                <span className="error"> il doit faire au moins trois caracteres</span>
            )}

            <RadioValidate name="status" control={control} def={data.status} data={["Privé", "Public"]} >Status de l' établissement public ou privé? </RadioValidate>
            {errors.status && errors.status.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          

            <RadioValidate name="multiple" control={control} def={data.multiple} image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]}>Votre nom d' établissement est-il
                utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </RadioValidate>
            {errors.multiple && errors.multiple.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
          

            <Selector mult={data.multiple === "Oui" ? true : false} name="type" r={false}  control={control} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options2}>{data.multiple === "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"}</Selector>

            {errors.type && errors.type.type === "required" && (
                <span className="error">Ce champ est obligatoire</span>
            )}
            {errors.type && errors.type.type === "minLength" && (
                <span className="error"> il doit faire au moins trois caracteres</span>
            )}

                <FileValidate name="profil" r={false} def={"/" + data.sigle + "-" +data.profil} control={control}  >Importer Le profil</FileValidate>
            {errors.profil && errors.profil.type === "required" && (
                <span className="error">ce champ est obligatoire</span>
            )}
            {errors.profil && errors.profil.type === "minLength" && (
                <span className="error"> ce champ doit faire au moins trois caracteres</span>
            )}

               

                <div className="editor">
                    <ArticleEditor
                        handleContent={handleEditorContent}
                        edit={true}
                        
                        state={data.description}
                    />
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


{/*             
            <span className="error" >
                {!state.sigle && errors && errors.sigle}
            </span>
            <span className="error">
                {!state.tel && errors && errors.tel}
            </span>

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
                {!!state.position && errors && errors.position}
            </span>



            <Radio name="status" data={["Privé", "Public"]} onChange={handleCheckChange}  >Status de l' établissement public ou privé? </Radio>

            <span className="error" >{!state.status && errors && errors.status}</span>
            <Radio name="multiple" image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]} onChange={handleCheckChange} >Votre nom d' établissement est-il
                utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </Radio>
            <span className="error">{!state.multiple && errors && errors.multiple}</span>
            <div className={styles.dg}>
                <span className={styles.ds}>{state.multiple === "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"} </span>
                <Select isMulti={state.multiple === "Oui" ? true : false} options={optionType} value={state.type} name="type"
                    onChange={handleSelectStatusChange} />
            </div>
            <span className="error" >{!!state.type && errors && errors.type}</span>

            <File name="profil" onChange={handleImage}>Importer Une Image de Profil</File>
            <span className="error">{!state.profil && errors && errors.profil}</span>
            <TextArea name="description" onChange={handle} value={state.description}>Description De L'établissement </TextArea>
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
            </div> */}





            
        </div>
        </>)
}