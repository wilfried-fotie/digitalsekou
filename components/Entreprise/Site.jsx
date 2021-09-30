import React from 'react'
import { ArrowLeft, ArrowRight, DisplayFill, FileEarmarkPostFill, GeoAlt, GeoAltFill, Image, ImageFill, Link, PencilSquare, PhoneVibrateFill, TelephoneFill, TelephoneXFill, TrophyFill } from 'react-bootstrap-icons'
import styles from "./site.module.css"
import style from "./offre.module.css"
import { CheckBox, Editor, Field, File, Radio, SelectoR, Selector, TextArea } from '../FormTools'
import draftToHtml from 'draftjs-to-html'
import useModal from '../CustomHooks/useModal'
import { Markup } from 'interweave'
import FineModal from '../fineModal'
import { Tools, ToolsBefore } from '../CustomHooks/Tools'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import draftjsToHtml from 'draftjs-to-html'
import { EntrepriseContext } from '../../pages/StartPub'
import styl from "../Entreprise/offre.module.css"



function Site({onTermine}) {

    const [state, setState] = React.useState(1)
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
   
    const [errors, setErrors] = React.useState(false)
    const [data, setData] = React.useState({ logo: "", outro: "",disposition: 3, position: [], activity: "", profil: "", description: "", prop: { pres: false, pro: false }, status: { off: false, on: false }, tel: entreprise.tel, name: entreprise.username })
    const handleClick = () => {
        if ((state < (data.status.off == false ? 3 : 4))) {
            setState(s => s + 1)
        } else {
            setState(state)
        }
    }
    const handleDispo = (e) => {
        setData(s => ({ ...s, disposition: e }))
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
            outro: content,
            articleUpdated: true
        }));
    }

    const handleSelectChange = (e) => {
        setData(s => ({...s,position: e}))
    }
    const onSetErrors = () => {
        setErrors(true)
    }
   

    const checkChange = (e) => {
        setData(s => ({ ...s, [e.target.getAttribute("data-id")]: { ...s[e.target.getAttribute("data-id")], [e.target.name]: e.target.checked } }))

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
                        [name + "Name"]: e.target.files[0].name.replaceAll(" ", "").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "")


                    }
                });
            };

        }

    }
    return (
        <div>
            
<center className={styles.top}><span className="h1">Création de page pro</span></center>

        
            <center className={style.nav}>
                <a className={choise ? style.active : style.inactive} onClick={() => handleChoiseState(true)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={!choise ? style.active : style.inactive} onClick={() => handleChoiseState(false)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
            </center>

        {choise ?     <div className={styles.container}>

                
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
                    errors={errors}

                />}
                {state == 3 && data.status.off && <Page3
                    data={data}
                    onHandleEditor={handleEditorContentOutro}
                    onHandleTextChange={handleChange}
                    onHandleSelectChange={handleSelectChange}
                    errors={errors}

                />}
       
                {state == (data.status.off ? 4 : 3) && <Page4
                    data={data}
                    onHandleEditor={handleEditorContentOutro}
                    onHandleTextChange={handleChange}
                    onHandleSelectChange={handleSelectChange}
                    onSetErrors={onSetErrors}
                    errors={errors}
                    handleDispo={handleDispo}
                    onTermine={onTermine}

                />}
             
                <div className={styles.stepper}>

                    <a className="btnPri dfss" onClick={handleClickInverse}> <ArrowLeft size={20} color="#FFF" /> Retour</a>
                    <a className="btnPri dfss" onClick={handleClick}>  Suivant  <ArrowRight size={20} color="#FFF" /></a>
                </div>

                <center className="dfss">
                    {data.status.off && [1, 2, 3, 4].map((e, f) => <Boul key={f} state={e} active={state} />)}
                    {!data.status.off && [1, 2, 3].map((e, f) => <Boul key={f} state={e} active={state} />)}
                </center>

              </div>  :
                
                <Preview data={data}/>
}
            


            
            


        </div>
    )
}

export default Site

export function Boul({active,state}) {
    return (
        <>
       {active == state ? <div  className={styles.boul}>


            </div>
        
                :
                <div className={styles.notboul}>


                </div>
                
    }
       </> 
    )
}








export function Page1({ onHandleTextChange, onHandleImageChange, data, errors}) {
    

    const handleImage = (e) => {
        onHandleImageChange(e)
    }
    const handleChangeText = (e) => {
        onHandleTextChange(e)
    }

  

    return (
        <>
            <div className={styles.page}>

                <Field name="name" r={false}  auto="Entrez le nom de votre entreprise exp: Camlait" value={data.name} onChange={handleChangeText}  >  Nom de l'Entreprise  </Field>
                <span className="error">
                    {errors && (data.name == "") && "Ce Champ est réquis"}
                </span>
                <File name="logo" def={data.logo} onChange={handleImage} >Importer Le Logo</File>
                <span className="error">
                    {errors && (data.logo == "") && "Ce Champ est réquis"}
                </span>
                <Field name="tel" tel="true" type="number" r={false} image={<PhoneVibrateFill color="#4a00b4" size="20px" />} auto="exp: 67855020" value={data.tel} onChange={handleChangeText}  >  Entrez le numéro de téléphone Whatsapp de l' Entreprise  </Field>
                <span className="error">
                    {errors && (data.tel == "") && "Ce Champ est réquis"}
                </span>
                <Field name="web" r={false} auto="Url de votre site web exp: https://misofe.com" image={<Link color="#4a00b4" size="20px" />} value={data.web} onChange={handleChangeText}  >  Entrer l'url de votre site web ( Optionnel )  </Field>

               

            

            </div>
          

        </>
    )
}

export function Page2({ onHandleImageChange, data, onHandleTextChange, onCheckChange, errors}) {
    const handleImage = (e) => {
        onHandleImageChange(e)
    }
    const handleChangeText = (e) => {
        onHandleTextChange(e)
    }

  

    const handleCheckChange = (e) => {
        onCheckChange(e)

    }

    return (
        <>
            <div className={styles.page}>
                <File name="profil" def={ data.profil} onChange={handleImage}  >Importer La photo de profil</File>
                <span className="error">
                    {errors && (data.profil == "") && "Ce Champ est réquis"}
                </span>
                <Field name="activity" r={false} auto="Entrez les secteurs d'activités de votre Entreprise" value={data.activity} onChange={handleChangeText}  > Secteur d'activité de votre Entreprise  </Field>
                <span className="error">
                    {errors && (data.activity == "") && "Ce Champ est réquis"}
                </span>
                <CheckBox name={["on", "off"]} dataId="status" onChange={handleCheckChange} state={[{ label: "En ligne ", value: data.status.on }, { label: "Hors ligne", value: data.status.off }]} r={false} >
                    Vos services ou produits sont disponible?
                </CheckBox>
                
                <span className="error">
                    {errors && (data.status.on == false && data.status.off == false) && "Vous devez au moins faire un choix"}
                </span>
                <CheckBox name={["pres", "pro"]} dataId="prop" onChange={handleCheckChange} state={[{ label: "Des Presatation de services", value: data.prop.pres }, { label: " La Vente de produits", value: data.prop.pro }]} r={false} >
                   Que Proposer vous?
                </CheckBox>
                <span className="error">
                    {errors && (data.prop.pres == false && data.prop.pro == false) && "Vous devez au moins faire un choix"}
                </span>

                 
            </div>


        </>
    )
}

export function Page3({ data, onHandleSelectChange, onHandleTextChange, errors}) {
    
    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]

    const handleSelectChange = (e) => {
        onHandleSelectChange(e)
    }
    const handleChangeText = (e) => {
        onHandleTextChange(e)
    }


    return (
        <>
            <div className={styles.page}>
                <SelectoR mult={true} state={data.position} onChange={handleSelectChange} name="position" r={false} image={<GeoAltFill color="#4a00b4" size="20px" />} options={options}>Selectionner les positions de votre entreprise</SelectoR>
              
                <span className="error">
                    
                    {(errors && data.position == "") ? "Ce Champ est réquis" : null}
                </span>
                <TextArea name="description" auto="exp: bafoussam en face du feu rouge" onChange={handleChangeText} value={data.description}>Description De votre position </TextArea>
                 <span className="error">
                    {errors && (data.description == "") && "Ce Champ est réquis"}
                </span>
             




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


export function Page4({ data, onHandleEditor, errors, onSetErrors, onTermine, handleDispo}) {


    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)
    const [visible3, v3] = useModal(false)
    const [loader, setLoader] = React.useState(false)
    const [error, setError] = React.useState({})
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const [dispo, setDispo] = React.useState(data.disposition)

    const handleClickDispo = (e) => {
        handleDispo(e)
    }
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

        if (err >= 15) {


            state.tel = state.tel.trim()
            state.name = state.name.trim()
            state.description = state.description.trim()
            state.web = !state.web ? "" : state.web.trim()
            if (allowOnlyPicture(state.logoData) && allowOnlyPicture(state.profilData)) {
                const formData1 = new FormData();
                const formData2 = new FormData();
                setLoader(true)
                formData1.append("file", state.logoData, entreprise.id + "-entreprise-logo." + state.logoName.split(".", -1)[1]);
                formData2.append("file", state.profilData, entreprise.id + "-entreprise-profil." + state.profilName.split(".", -1)[1]);


                axios.all([
                    axios.post("/add-site-entreprise", { ...state, logoName: entreprise.id + "-entreprise-logo." + state.logoName.split(".", -1)[1], profilName: entreprise.id + "-entreprise-profil." + state.profilName.split(".", -1)[1], disposition: dispo,entrepriseId: entreprise.id, outro: draftjsToHtml(state.outro)}),
                    axios.post("/upload", formData1),
                    axios.post("/upload", formData2)
                ]


                ).then(res => {
                   
                    const pos = state.position.map(e => ({ position: e.value }))
                    dispacth({ type: "UPDATESITE", name: "entrepriseSite", position: pos, pre: "site", data: res[0].data })
                    dispacth({ type: "UPDATEENTREPRISE", name: "entreprise", pre: "entreprise", data: { ...entreprise,site: true} })

                    setLoader(false)
                    onTermine(9)
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
          

            <div className="a">
                <p className="dfs"> <FileEarmarkPostFill size={20} color="#4a00b4" /> Disposition</p>
                <div className="dfss">
                    <div className={dispo === 1 ? styl.activeborder0 : styl.border0} onClick={() => { setDispo(1); handleClickDispo(1)}}>
                        <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                    </div>
                    <div className={dispo === 2 ? styl.activeborder : styl.border} onClick={() => { setDispo(2); handleClickDispo(2) }}>
                        <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                    </div>

                    <div className={dispo === 3 ? styl.activeborder2 : styl.border2} onClick={() => { setDispo(3); handleClickDispo(3)}}>
                        <span>Texte</span>    <ImageFill size={20} color="#4a00b4" />

                    </div>

                </div>
            </div>




            <div className="particular pad">

           
                
            <Editor name="outro" r={false} state={draftToHtml(data.outro)} handleEdit={handleEdit} edit={true}>

                Ajouter description de votre activité qui va apparaître sur votre page
                </Editor>
                <span className="error">
                    {errors && (data.outro == "") && "Ce Champ est réquis"}
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

            {visible && <FineModal position={{ top: 30, left: "35%" }} onModalChange={v} component={<Tools />} />}
            {visible2 && <FineModal position={{ top: 30, left: "35%" }} onModalChange={v2} component={<ToolsBefore >  Veuillez vérifier les informations soumis!</ToolsBefore>} />}
            {visible3 && <FineModal position={{ top: 30, left: "35%" }} onModalChange={v3} component={<ToolsBefore >  Verifier le format d'image soumis</ToolsBefore>} />}

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
                    {data.prop.prod && <a>Catalogue</a>}
                    {data.prop.pres && <a>Nos Services</a>}
                    <a>Nous Contacter</a>
                </div>




            </nav>


            <div className={data.disposition == 1 ? styles.flexTab : data.disposition == 3 ? styles.dfb : styl.dfr }>
                <div className={styles.contain}>
                    {data.outro ? <Markup content={draftToHtml(data.outro).substr(0, 1000) + "..."} /> : "Description de votre entreprise sera afficher ici"}
                    
                </div>

                

                {data.profil ?  <img src={data.profil} className="imgFill" alt="image ou vidéo chargé" /> : <Image size={250} color="#4a00b4" />}
            </div>
          
            <div className="padding">

                <a className="btnPrimary">Nous contacter</a>

            </div>
            <div>
                <span className={styles.dfs}>   <TelephoneFill size={20} color="#4a00b4" /> {data.tel || "Téléphone"}</span>

                <span className={styles.dfs}> {data.status.off && <GeoAlt size={20} color="#4a00b4" />}{data.position == [] ? "Villes dans lesquelles vous êtes" : data.position && data.position.map(e => e.label + ", ")}</span>
                <span className={styles.dfs}>
                    {data.description ? data.description : data.status.off && " Description de votre emplacement"}
                </span>
            
             
                  
               

</div>

            <div>
                <center className="padding">
                    Nb: Créer votre page et ajouter vos prestation ou vos produits à vendre par la suite
                </center>
            </div>

        </div>
    )
}

