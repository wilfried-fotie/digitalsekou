import React from 'react'
import styles from "./offre.module.css"
import styl from "../../styles/sudo.module.css"

import { AlignMiddle, ArrowLeft, ArrowRight, Building, Calendar2DateFill, CalendarX, DisplayFill, EyeFill, FileImageFill, ImageFill, Link as Lk, Outlet, PaintBucket, PencilFill, PencilSquare, PenFill, Person, PhoneFill, PhoneVibrateFill, PinFill, TelephoneFill, TrashFill, TrophyFill } from 'react-bootstrap-icons'
import { Editor, Field, FieldValidate, File, FileValidate } from '../FormTools'
import Link from 'next/link'
import FineModal from '../fineModal'
import { useModal } from '../../pages/addSchoolPro/[id]'
import ArticleEditor from '../../pages/editor'
import { Markup } from 'interweave'
import draftToHtml from 'draftjs-to-html'
import { EntrepriseContext } from '../../pages/StartPub'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ModalEditor from '../modalEditor'
import CustomModal from '../customModal'
import { verifSupDate } from '../CustomHooks/supDate'
import { useRouter } from 'next/router'


const ALLOWED_EXTENSIONS = ['svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG"]

const allowOnlyPicture = (filename) => {

    let ext = (filename).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}

function Offre() {

    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site


    const [state, setState] = React.useState({ logo: entreprise.site ? "/" + site.logo : "", url: site.name ? "https://digitalsekou.com/entreprises/" + site.name.replaceAll(" ", "-").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "") : "https://", outro: "", objet: "", expiration: "",tel: site.tel || "" })
    const [choise, handleChoiseState] = React.useState(0)
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleEditorContentOutro = (content) => {
        setState(s => ({
            ...s,
            outro: content,
            articleUpdated: true
        }));
    }


    const handleImageChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        if (e.target.files && e.target.files[0]) {


            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (ev) => {
                setState(s => {
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


            <center className="h1 pad">Création d'une Offre</center>


            <center className={styles.nav}>
                <a className={choise == 0 ? styles.active : styles.inactive} onClick={() => handleChoiseState(0)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={choise == 1 ? styles.active : styles.inactive} onClick={() => handleChoiseState(1)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
                <a className={choise == 2 ? styles.active : styles.inactive} onClick={() => handleChoiseState(2)}><AlignMiddle size={25} className="mr" color="#4a00b4" /> Gestionnaire d' Offres </a>

            </center>

            <div className={choise !== 2 ? "container" : null}>

                {choise == 0 && <Creation

                    onHandleImageStateChange={handleImageChange}
                    onHandleTextStateChange={handleChange}
                    onHandleEditor={handleEditorContentOutro}
                    data={state}
                    reset={setState}
                />}
                {choise == 1 && <Visualisation

                    data={state}

                />}
                {choise == 2 && 
                    <AddPost reset={ setState}/>
                
                }

            </div>









        </div>
    )
}

export default Offre


export function AddPost({reset}) {
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)
    const [getIdForDel, setGetIdForDel] = React.useState()
    const [getIdForMod, setGetIdForMod] = React.useState()
    const [getkForDel, setGetkForDel] = React.useState()
    const [getkForMod, setGetkForMod] = React.useState()

    const [state, setState] = React.useState()

    const handleDel = (id, k) => {
        v2(true)
        setGetIdForDel(id)
        setGetkForDel(k)


    }
    
    const handleMod = (id, k) => {
        v(true)
        setGetIdForMod(id)
        setGetkForMod(k)
        setState({ ...getOffer[k], outro: getOffer[k].content, objet: getOffer[k].title, expiration: getOffer[k].expire.split("T",-1)[0]})
        reset({ media: entreprise.site ? "/" + site.logo : "", url: site.name ? "https://digitalsekou.com/entreprises/" + site.name.replaceAll(" ", "-").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "") : "https://", outro: "", description: "", objet: "", expiration: "", expire: "", title: "", tel: site.tel || "" })

    }


    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleEditorContentOutro = (content) => {
        setState(s => ({
            ...s,
            outro: content,
            articleUpdated: true
        }));
    }


    const handleImageChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        if (e.target.files && e.target.files[0]) {


            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (ev) => {
                setState(s => {
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
        <>


            <div className={styles.table}>
                <table >
                
                    <tbody>

                        {getOffer == "" ? <center className="h2"></center> :
                            getOffer.map((e, k) => <tr key={k}>
                                <td>#{k + 1}</td>
                                <td>{e.objet || e.title}</td>

                                <td> <div className="dfss"> <a className={styl.disagree} onClick={() => handleMod(e.id, k)}> <PenFill className={styles.right} size="20px" color="#FFF" /> Modifier</a><a className={styl.agree} onClick={() => handleDel(e.id, k)}> <TrashFill className={styles.right} size={20} color="#FFF" /> Supprimer</a></div></td>
                            </tr>)}
                    </tbody>
                </table>

                {visible && <ModalEditor onModalChange={v} component={
                    <center>
                        
                        {state && <Edit

                            onHandleImageStateChange={handleImageChange}
                            onHandleTextStateChange={handleChange}
                            onHandleEditor={handleEditorContentOutro}
                            id={getIdForMod}
                            k={getkForMod}
                            data={state}
                        // data = {{}}

                        />}
                    </center>
                } />
                }
                {visible2 && <CustomModal onModalChange={v2} component={<Delete close={v2} k={getkForDel} id={getIdForDel} />} />}
            </div>

        </>
    )
}




export function Visualisation({ data,mode }) {

    const router = useRouter()
    const handleClick = async (e) => {

        await axios.put("addStatOffer/" + data.id)
       
    }

    return (
        <>

            <div className={styles.anim}>



                <div className={data.content ? styles.aff : styles.offer}>

                    <div className="dfb">

                        {data.logo ? <img src={data.logo} className={styles.logo} alt="Logo" /> : <span> <FileImageFill size={20} color="#4a00b4" /> Logo</span>}
                        {data.tel ? <span className="dfss"> <TelephoneFill className="mr" size={20} color="#4a00b4" /> {data.tel}</span> : "Téléphone"}


                    </div>

                    <div>

                        <p className="pad">
                            <b>Objet:</b>   {data.objet ? data.objet : "Exp Recrutement de 2 devs"}
                        </p>

                        <center className="fine">Expire Le:  {" " + new Date(data.expiration).toDateString() || " date d'expiration"}</center>
                        <div className="pad">
                            {!data.outro && <div className={styles.view}><Link href={data.url}><a className="btnSecondary dfss" onClick={mode ? handleClick : null}><EyeFill size={20} color="#4a00b4" /> voir l'offre </a></Link></div>}
 </div>
                        <div className="pad">
                            {data.outro && <Markup content={draftToHtml(data.outro) ||  data.outro} />}
                           
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export function Creation({ onHandleImageStateChange, onHandleTextStateChange, data, onHandleEditor }) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [errors, setErrors] = React.useState(false)
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers
    const id = getOffer.length - 1
    const post = id < 0 ? 1 : getOffer[id].id + 1
    const [loader, setLoader] = React.useState(false)
    const [visible, v] = useModal(false)

    const handleChangeText = (e) => {

        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {

        onHandleImageStateChange(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(true)
        

        if (data.tel && data.logo && data.objet && data.url && data.expiration && verifSupDate(new Date(), new Date(data.expiration)) && data.outro) {
            
setLoader(true)
                if (data.logo == "/" +  site.logo) {
                    axios.post("/add-offer-entreprise/" + entreprise.id,{
                        ...data, logo:  site.logo,outro: draftToHtml(data.outro)
                    }).then(res => {
                        
                        dispacth({ type: "ADD", name: "getOffer", pre: "offers", data: res.data })

                        setLoader(false)
                    })
                        .catch(err => {
                         
                            v(true)
                            setLoader(false)
                        })
                } else {
                    if (allowOnlyPicture(data.logoName)) {
                        const formData1 = new FormData();
                        const img = entreprise.id + "-entreprise-offre-" + post + "." + data.logoName.split(".", -1)[1]

                        formData1.append("file", data.logoData, img);



                axios.all([
                    axios.post("/add-offer-entreprise/" + entreprise.id, {
                        ...data, logo: img, outro: draftToHtml(data.outro)
                    }),
                    axios.post("/upload", formData1),

                ] ).then(res => {
                   
                    dispacth({ type: "ADD", name: "getOffer", pre: "offers", data: res[0].data })

                    setLoader(false)

                })
                    .catch(err => {
                        console.log(err)
                        v(true)
                        setLoader(false)

                    })
                }
               

else {
                alert("format d'image non autoriser")
              
            }
               
            } 
        
        } else {
            alert("rempli sbien les infos")
        }
    }
    const handleEdit = (e) => {
        onHandleEditor(e)
    }


    return (
        <>

            <div className={styles.anim}>



                <form onSubmit={handleSubmit}>

                    <File name="logo" def={data.logo} onChange={handleImage} state={data.logo}>Importer Le Logo</File>

                    <Field name="tel" tel="true" type="number" r={false} image={<PhoneVibrateFill color="#4a00b4" size="20px" />} auto="Entrez le numéro de téléphone" value={data.tel} onChange={handleChangeText}  >  Entrez le numéro de téléphone à contacter  </Field>
                    <span className="error">
                        {errors && data.tel == "" && "Entrez le numéro de téléphone"}
                    </span>
                    <Field name="url" r={false} image={<Lk color="#4a00b4" size="20px" />} auto="Entrez l'url de votre offre" value={data.url} onChange={handleChangeText}  >  Entrez l'url de votre offre  </Field>
                    <span className="error">
                        {errors && data.url == "" && "Entrez l' url de l'offre"}
                    </span>
                    <Field name="objet" r={false} image={<TrophyFill color="#4a00b4" size="20px" />} auto="Entrez l'objet de votre offre" value={data.objet} onChange={handleChangeText}  >  Entrez l'objet de votre offre  </Field>
                    <span className="error">
                        {errors && data.objet == "" && "Entrez l' objet de l'offre"}
                    </span>
                    <Field name="expiration" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} auto="Entrez la date d'expiration" value={data.expiration} onChange={handleChangeText}  >  Entrez la date d'expiration </Field>
                    <span className="error">
                        {errors && data.expiration == "" && "Entrez la date d'expiration"}
                        {errors && !verifSupDate(new Date(), new Date(data.expiration)) && "date invalide"}
                    </span>
                    <Editor name="editor" r={false} state={draftToHtml(data.outro)} handleEdit={handleEdit} edit={true}>

                        Description de votre offre
                    </Editor>
                    <span className="error">
                        {errors && data.outro == "" && "Entrez la description de l'offre"}
                    </span>






                    <center className="pad">   <div className={styles.df}>
                        <button disabled={loader} className="dfss btnPri" >
                            {loader && <Loader
                                type="TailSpin"
                                color="white"
                                height={20}
                                width={50}
                            />}

                            Enregistrer</button>
                    </div></center>
                </form>

            </div>
            {visible && <FineModal position={{ top: 30, left: "35%", width: "40%" }} onModalChange={v} component={<Validator />} />}
        </>
    )
}




export function Edit({ onHandleImageStateChange, onHandleTextStateChange, data, id, k, onHandleEditor }) {

    const [err, setErr] = React.useState()
    const [visible, v] = useModal(false)
    const [errors, setErrors] = React.useState(false)
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers[k]

    const [loader, setLoader] = React.useState(false)


    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
        setErrors(true)

    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
        setErrors(true)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(true)

        if (data.logo && data.outro && data.url && data.objet && data.expiration && verifSupDate(new Date(), new Date(data.expiration)) ) {

            if (allowOnlyPicture(data.logo) || (data.logoName && allowOnlyPicture(data.logoName))) {
                const formData1 = new FormData();
                const random = Math.floor(Math.random() * 10)

                const img = data.logoName && entreprise.id + "-entreprise-offre-" + random + "-" + id + "." + data.logoName.split(".", -1)[1]

                setLoader(true)
                data.logoName && formData1.append("file", data.logoData, img);



               await  axios.all([
                    axios.put("/offers/" + id, { objet: data.objet, expiration: data.expiration, logo: (data.logoName && img) || data.logo, outro: draftToHtml(data.outro) || data.outro, tel: data.tel, url: data.url,  proprio: "entreprise" }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("etoken")
                        }

                    }),
                   data.logoName && axios.post("/upload", formData1),
                //    data.logoName && axios.delete("/upload/", data.logo),
                  
                ]


               ).then(res => {
                    
                   const img = data.logoName && entreprise.id + "-entreprise-offre-" + random + "-" + id + "." + data.logoName.split(".", -1)[1]


                    dispacth({ type: "UPDATE", name: "getOffer", pre: "offers", id: k, data: { ...data, objet: data.objet, outro: draftToHtml(data.outro) || data.outro, expiration: data.expiration, logo: data.logoName && img || data.logo,media: img, tel: data.tel, url: data.url, logoName: "", proprio: "entreprise" } })

                    setLoader(false)
                })
                    .catch(err => {
                        v(true)
                        setLoader(false)

                    })
            }
        }
    }
    const handleEdit = (e) => {
        onHandleEditor(e)
    }


    return (
        <>

            <div className={styles.anim}>

                <form onSubmit={handleSubmit}>

                    <File name="logo" def={data.logo} onChange={handleImage} state={data.logo}>Importer Le Logo</File>

                    <Field name="tel" tel="true" type="number" r={false} image={<PhoneVibrateFill color="#4a00b4" size="20px" />} auto="Entrez le numéro de téléphone" value={data.tel} onChange={handleChangeText}  >  Entrez le numéro de téléphone à contacter  </Field>
                    <span className="error">
                        {errors && data.tel == "" && "Entrez le numéro de téléphone"}
                    </span>
                    <Field name="url" r={false} image={<Lk color="#4a00b4" size="20px" />} auto="Entrez l'url de votre offre" value={data.url} onChange={handleChangeText}  >  Entrez l'url de votre offre  </Field>
                    <span className="error">
                        {errors && data.url == "" && "Entrez l' url de l'offre"}
                    </span>
                    <Field name="objet" r={false} image={<TrophyFill color="#4a00b4" size="20px" />} auto="Entrez l'objet de votre offre" value={data.objet} onChange={handleChangeText}  >  Entrez l'objet de votre offre  </Field>
                    <span className="error">
                        {errors && data.objet == "" && "Entrez l' objet de l'offre"}
                    </span>
                    <Field name="expiration" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} auto="Entrez la date d'expiration" value={data.expiration} onChange={handleChangeText}  >  Entrez la date d'expiration </Field>
                    <span className="error">
                        {errors && data.expiration == "" && "Entrez la date d'expiration"}
                        {errors && !verifSupDate(new Date(), new Date(data.expiration)) && "date invalide"}



                    </span>
                    <Editor name="editor" r={false} state={draftToHtml(data.outro) || data.outro} handleEdit={handleEdit} edit={true}>

                        Description de votre offre
                    </Editor>
                    <span className="error">
                        {errors && data.outro == "" && "Entrez la description de l'offre"}
                    </span>






                    <center className="pad">   <div className={styles.df}>
                        <button disabled={loader} className="dfss btnPri" >
                            {loader && <Loader
                                type="TailSpin"
                                color="white"
                                height={20}
                                width={50}
                            />}

                            Enregistrer</button>
                    </div></center>
                </form>

            </div>
            {visible && <FineModal position={{ top: 30, left: "35%", width: "40%" }} onModalChange={v} component={<Validator />} />}
        </>
    )
}


export function Validator() {
    return (
        <div className={styles.testAnim}>
            <p>
                Vous allez faire le dépot à un numéro whatsapp et vous indiquierez la publicité en question et votre va apparaitre sur notre page d'acceuil
            </p>
            <center>

                <button className="btnPri" type="submit">Envoyer la publicité</button>
            </center>
        </div>
    )
}

export function Delete({ close, id, k }) {
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers[k]
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site

    const handleClick = () => {
        close(true)
    }

    const handleDelete = async () => {
        await axios.all([
            axios.delete(`/offers/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("etoken")
                    }

                }
            ),
            site.logo == getOffer.logo.replaceAll("/", "") ? null : axios.delete("/upload/" + getOffer.logo.replaceAll("/", "")) 

            
        ])
            .then(() => {
                // setError()
                // setFine("Suppression réussi")
                dispacth({ type: "DELETE", name: "getOffer", pre: "offers", id: k })

                handleClick()
                // v(false)
            }
            )
            .catch((e) => {

                // setFine()
                // setError("Erreur lors de la suppression...")

            }
            );
    }

    return (
        <div >
            <p >
                Voulez-vous réellement supprimer ??
            </p>
            <div className={styles.dfss}> <a className="btnPri dfss" onClick={handleClick}> <Outlet className={styles.right} size="20px" color="#FFF" /> Annuler</a><a className="btnPriRed dfss" onClick={handleDelete}> <TrashFill className={styles.right} size={20} color="#FFF" /> Supprimer</a></div>
        </div>
    )
}
