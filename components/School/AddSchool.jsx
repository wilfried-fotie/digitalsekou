import React from 'react'
import { ArrowLeft, ArrowRight, BoundingBox, Building, DisplayFill, FileEarmarkPostFill, GeoAlt, GeoAltFill, GridFill, Image, ImageFill, Link, List, LockFill, PencilSquare, PhoneVibrateFill, TelephoneFill, TelephoneXFill, TrophyFill } from 'react-bootstrap-icons'
import styles from "../Entreprise/site.module.css"
import style from "../Entreprise/offre.module.css"
import { CheckBox, Editor, Field, File, Password, Radio, SelectoR, Selector, TextArea } from '../FormTools'
import draftToHtml from 'draftjs-to-html'
import useModal from '../CustomHooks/useModal'
import { Markup } from 'interweave'
import FineModal from '../fineModal'
import { Tools, ToolsBefore } from '../CustomHooks/Tools'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import draftjsToHtml from 'draftjs-to-html'
import { useRouter } from "next/router"



function Site({lastId}) {

    const [state, setState] = React.useState(1)
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
        outro: "<h1>Une Note</h1><center>Ajouter des notes exp: comment faire pour s'inscrire numéro de compte et consort...</center>",
        profil: "",
        profilName: "",
        disposition: 3,
        profilData: "",
        position: [],


    }
    const [errors, setErrors] = React.useState(false)
    const [data, setData] = React.useState(app)
    const handleClick = () => {
        if ((state < (data.status.off == false ? 3 : 4))) {
            setState(s => s + 1)
        } else {
            setState(state)
        }
    }

    const handleClickInverse = () => {
        if (state < 2) {
            setState(state)
        } else {
            setState(s => s - 1)
        }
    }


    const [choise, handleChoiseState] = React.useState(true)
    const handleChange = (e) => {
        setData(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleEditorContentOutro = (content) => {
        setData(s => ({
            ...s,
            description: content,
            articleUpdated: true
        }));
    }

    const handleSelectChange = (e) => {
        setData(s => ({ ...s, position: e }))
    }

    const handleSelectChange2 = (e) => {
        setData(s => {

        
            return { ...s, type: s.multiple == "Oui" ? [...e] : [e] }
        })
    }
       
    
    const onSetErrors = () => {
        setErrors(true)
    }
  
    const checkChange = (e) => {
        e.target.name == "multiple" ? setData(s => ({ ...s, [e.target.name]: e.target.value,type: [] }))  : setData(s => ({ ...s, [e.target.name]:   e.target.value } ))

    }

    const handleClick2 = (e)=>{setData(s=> ({...s,disposition: parseInt(e,10)}))}

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
                        [name + "Name"]: e.target.files[0].name.replaceAll(" ", "").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "")


                    }
                });
            };

        }

    }
    return (
        <div>



            <center className={style.nav}>
                <a className={choise ? style.active : style.inactive} onClick={() => handleChoiseState(true)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={!choise ? style.active : style.inactive} onClick={() => handleChoiseState(false)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
            </center>

            {choise ? <div className={styles.container}>


                {state == 1 && <Page1
                    data={data}
                    onHandleImageChange={handleImageChange}
                    onHandleTextChange={handleChange}
                    errors={errors}
                />}
                {state == 2 && <Page2
                    data={data}
                    onHandleImageChange={handleImageChange}
                    onHandleTextChange={handleChange}
                    onCheckChange={checkChange}
                    onHandleSelectChange={handleSelectChange}
                    errors={errors}

                />}
                {state == 3 &&  <Page3
                    data={data}
                    onHandleEditor={handleEditorContentOutro}
                    onHandleTextChange={handleChange}
                    onHandleSelectChange={handleSelectChange2}
                    onCheckChange={checkChange}
                    handleClick={handleClick2}
                    errors={errors}

                />}
           
                {state == 4 && <Page4
                    data={data}
                    onHandleEditor={handleEditorContentOutro}
                    onHandleTextChange={handleChange}
                    onHandleSelectChange={handleSelectChange}
                    onSetErrors={onSetErrors}
                    lastId={lastId}
                    errors={errors}

                />}

                <div className={styles.stepper}>

                    <a className="btnPri dfss" onClick={handleClickInverse}> <ArrowLeft size={20} color="#FFF" /> Retour</a>
                    <a className="btnPri dfss" onClick={handleClick}>  Suivant  <ArrowRight size={20} color="#FFF" /></a>
                </div>

                <center className="dfss">
                    { [1, 2, 3, 4].map((e, f) => <Boul key={f} state={e} active={state} />)}
                   
                </center>

            </div> :

                <Preview data={data} />
            }







        </div>
    )
}

export default Site

export function Boul({ active, state }) {
    return (
        <>
            {active == state ? <div className={styles.boul}>


            </div>

                :
                <div className={styles.notboul}>


                </div>

            }
        </>
    )
}








export function Page1({ onHandleTextChange, onHandleImageChange, data, errors }) {


    const handleImage = (e) => {
        onHandleImageChange(e)
    }
    const handleChangeText = (e) => {
        onHandleTextChange(e)
    }



    return (
        <>
            <div className={styles.page}>

           

                <Field name="name" auto="exp: Institut universitaire...." onChange={handleChangeText} value={data.name} image={<Building size={20} color="#4a00b4" />}>Nom Complet De L'établissement</Field>
                <span className="error" >
                    {errors && (data.name == "") && "Ce Champ est réquis"}
                </span>
                <Field name="sigle" auto="exp: INSAM" onChange={handleChangeText} value={data.sigle}>Sigle De L'établissement </Field>
                <span className="error" >
                    {errors && (data.sigle == "") && "Ce Champ est réquis"}

                </span>
                <Field name="tel" auto="exp: 678550204" type="number" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} onChange={handleChangeText} value={data.tel}>Ajouter Le Numéro de Téléphone (sans espaces)</Field>
                <span className="error">
                    {errors && (data.tel == "") && "Ce Champ est réquis"}

                </span>

                <Password name="password" onChange={handleChangeText} value={data.password} image={<LockFill size={20} color="#4a00b4" />}>Entrez un mot de passse</Password>
                <span className="error" >
                    {(errors && (data.password == "")) && "Ce Champ est réquis"}
                    {errors &&   (data.password.length < 8) ?  "Le mot de passe doit faire au moins 8 caractères" : null}

                </span>


            </div>


        </>
    )
}

export function Page2({ onHandleImageChange, data, onHandleTextChange, onCheckChange, onHandleSelectChange, errors }) {
    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
    const optionType = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]

    const handleImage = (e) => {
        onHandleImageChange(e)
    }
 


    const handleSelectChange = (e) => {
        onHandleSelectChange(e)
    }
    const handleCheckChange = (e) => {
        onCheckChange(e)

    }

    return (
        <>
            <div className={styles.page}>
         
                <File name="logo" def={data.logo} onChange={handleImage}>Importer Le Logo</File>
                <span className="error" >
                    {errors && (data.logo == "") && "Ce Champ est réquis"}

                </span>

            
                <SelectoR mult={true} state={data.position} onChange={handleSelectChange} name="position" r={false} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>Selectionner vos positions</SelectoR>

                <span className="error" >
                    {errors && (data.position == "") && "Ce Champ est réquis"}

                </span>

                <File name="profil" def={data.profil} onChange={handleImage}>Importer Une Image de Profil</File>
                <span className="error"> {(errors && data.profil == "") ? "Ce Champ est réquis" : null}</span>

                <Radio name="status" value={data.status} r={false} data={["Privé", "Public", "Para-Publique"]} onChange={handleCheckChange}  >Status de l' établissement public ou privé? </Radio>

                <span className="error" > {errors && (data.status == "") && "Ce Champ est réquis"}</span>
              


            </div>


        </>
    )
}

export function Page3({ data, onHandleSelectChange, onCheckChange, handleClick, errors }) {

    const options = [{ value: "Supérieur", label: "Supérieur (Universités, Institut)" }, { value: "Secondaire", label: "Secondaire (Collèges, Lycées)" }, { value: "Primaire", label: "Primaire" }, { value: "maternelle", label: "maternelle" }, , { value: "crêche", label: "crêche" }]
    const [state, setState] = React.useState(data.position)

    const handleSelectChange = (e) => {
        onHandleSelectChange(e)
    }
   
    const handleCheckChange = (e) => {
        onCheckChange(e)

    }

    return (
        <>
            <div className={styles.page}>
                
                <Radio name="multiple" value={data.multiple}  r={false} image={<BoundingBox size={20} color="#4a00b4" />} data={["Non", "Oui"]} onChange={handleCheckChange} >Votre nom d' établissement est-il
                    utiliser pour plusieurs types d'etablissements ( exp: Lycées,Universités etc...) à la fois ? </Radio>
                <span className="error">                    {errors && (data.multiple == "") && "Ce Champ est réquis"}
                </span>
               

                <SelectoR mult={data.multiple == "Oui" ? true : false} state={data.type} onChange={handleSelectChange} name="type" r={false} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>{data.multiple == "Non" ? "De quel niveau est votre établissement" : "De quels niveaux sont vos établissements"}</SelectoR>

                <span className="error">

                    {(errors && data.type == "") ? "Ce Champ est réquis" : null}
                </span>

             
                <div className="a">
                    <p className="dfs"> <FileEarmarkPostFill size={20} color="#4a00b4" /> Disposition</p>
                    <div className="dfss">
                        <div className={(state === 1) || (data.disposition == 1) ? style.activeborder0 : style.border0} onClick={() => { setState(1); handleClick(1) }}>
                            <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                        </div>
                        <div className={(state === 2) || (data.disposition == 2) ? style.activeborder : style.border} onClick={() => { setState(2); handleClick(2) }}>
                            <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                        </div>

                        <div className={(state === 3) || (data.disposition == 3) ? style.activeborder2 : style.border2} onClick={() => { setState(3); handleClick(3) }}>
                            <span>Texte</span>    <ImageFill size={20} color="#4a00b4" />

                        </div>

                    </div>
                </div>




            </div>


        </>
    )
}

const ALLOWED_EXTENSIONS = ['svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG"]

const allowOnlyPicture = (filename) => {

    let ext = (filename.name).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}


export function Page4({ data, onHandleEditor, errors, onSetErrors,lastId }) {


    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)
    const [visible3, v3] = useModal(false)
    const [loader, setLoader] = React.useState(false)
    const [error, setError] = React.useState({})
    const router = useRouter()


    const handleEdit = (e) => {
        onHandleEditor(e)
    }
    const handleSubmit = async () => {
        onSetErrors()
        setError({})
        let state = data


        for (const key in state) {
            if (state[key] == "") {


                setError(s => {
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

     

        if (err == 1) { setErrors({}) }

        if (err >= 18 && (data.description.length > 50 || draftToHtml(data.description).length > 50)) {


            state.tel = state.tel.trim()
            state.name = state.name.trim()
            if (allowOnlyPicture(state.logoData) && allowOnlyPicture(state.profilData)) {
                const formData1 = new FormData();
                const formData2 = new FormData();
                setLoader(true)
                formData1.append("file", state.logoData,"school-logo-"+ lastId + "." + state.logoName.split(".", -1)[1]);
                formData2.append("file", state.profilData, "school-profil-" + lastId + "." +  state.profilName.split(".", -1)[1]);


                axios.all([
                    axios.post("/add-school", { ...state, logoName: "school-logo-" + lastId + "." + state.logoName.split(".", -1)[1], profilName: "school-profil-" + lastId + "." + state.profilName.split(".", -1)[1], description: draftjsToHtml(state.description) }),
                    axios.post("/upload", formData1),
                    axios.post("/upload", formData2)
                ]


                ).then(res => {
                    localStorage.setItem("schoolToken", res[0].data.token)
                    localStorage.setItem("school", res[0].data.sigle)
                    localStorage.setItem("schoolId", res[0].data.id)
                    router.push(`/addSchoolPro/${res[0].data.id}?token=${res[0].data.token}`)
                    setLoader(false)
                    
                    setLoader(false)
                })
                    .catch(err => {
                        console.log(err)
                        v(true)
                        setLoader(false)

                    })



            } else {
                v3(true)
            }

        } else {


            v2(true)



        }




    }
    return (
        <div className={styles.page}>

            <div className="particular">

                <Editor name="description" r={false} state={draftToHtml(data.description)} handleEdit={handleEdit} edit={true}>

                    Ajouter une description de votre activité qui va apparaître sur votre page
                </Editor>
                <span className="error">
                    {errors && (data.description == "" || draftToHtml(data.description) == "") && "Ce Champ est réquis"}
                    {errors && (data.description.length < 50 || draftToHtml(data.description).length < 50) && "Ce Champ doit faire au moins 50 caractères"}
                </span>
            </div>


            <center className="padding">
                <button disabled={loader} onClick={handleSubmit} className="dfss btnPri" >
                    {loader && <Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={50}
                    />}

                    Enregistrer</button>
            </center>

            {visible && <FineModal position={{ top: 30, left: "25%" }} onModalChange={v} component={<Tools />} />}
            {visible2 && <FineModal position={{ top: 30, left: "25%" }} onModalChange={v2} component={<ToolsBefore >  Veuillez vérifier les informations soumis!</ToolsBefore>} />}
            {visible3 && <FineModal position={{ top: 30, left: "25%" }} onModalChange={v3} component={<ToolsBefore >  Verifier le format d'image soumis</ToolsBefore>} />}

        </div>
    )
}




export function Preview({ data }) {
    return (
        <div className={styles.prev}>

            <nav className={styles.nav}>


                {data.logo && <img src={data.logo} className='logo' alt={data.name} /> || <div className="dfss"> <ImageFill size={20} color="#4a00b4" />  <span>Logo</span> </div>}


                <div className={styles.df}>
                    <a className="active"> Acceuil</a>
                    <a>Nos Spécialités</a>
                    <a>Nous Contacter</a>
                    <center className="mobileScreen">
                    {data.sigle || "sigle"}
                </center>
                </div>

               

                <div className="mobileScreen">
                    <GridFill size={30} color="#4a00b4"/>
                </div>

            </nav>
            <div className={ data.disposition == 1 ? style.tabl : data.disposition == 3 ? "dfss" : style.dfr }>
                <div className="containText">
                    {data.description ? <Markup content={draftToHtml(data.description).substr(0, 1000) + "..."} /> : "Description de votre entreprise sera afficher ici"}

                </div>

                {/* {data.profil ? <img  src={data.profil} /> : } */}

                {data.profil ? <img src={data.profil} className="imgFill" alt="image ou vidéo chargé" /> : <Image size={250} color="#4a00b4" />}
            </div>

            <div className="padding">

                <a className="btnPrimary">Nous contacter</a>

            </div>
            <div>
                <span className={styles.dfs}>   <TelephoneFill size={20} color="#4a00b4" /> {data.tel || "Téléphone"}</span>

                <span className={styles.dfs}>   <GeoAlt size={20} color="#4a00b4" /> {data.position == "" ? "Villes dans lesquelles vous êtes" : data.position && data.position.map(e => e.label + ", ")}</span>
            





            </div>

            <div>
               
            </div>

        </div>
    )
}



