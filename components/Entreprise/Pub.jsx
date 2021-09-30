import React from 'react'
import styles from "./pub.module.css"
import { AlignMiddle, ArrowLeft, ArrowRight, Building, Calendar2DateFill, DisplayFill, ImageFill, Link as Lk, Mastodon, Outlet, PaintBucket, PencilFill, PencilSquare, PenFill, Person, PinFill, TrashFill } from 'react-bootstrap-icons'
import { Field, FieldValidate, File, FileValidate } from '../FormTools'
import Link from 'next/link'
import FineModal from '../fineModal'
import {useRouter} from "next/router"
import { useModal } from '../../pages/addSchoolPro/[id]'
import Loader from 'react-loader-spinner'
import { EntrepriseContext } from '../../pages/StartPub'
import axios from 'axios'
import ModalEditor from '../modalEditor'
import CustomModal from '../customModal'
import { verifSupDate } from '../CustomHooks/supDate'
import { Error } from '../CustomHooks/AddPost'
import { verifTwoDate } from '../CustomHooks/verifTwoDate'



function Pub() {

    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site

    const [state, setState] = React.useState({ name: site.name ? "https://digitalsekou.com/entreprises/" + site.name.replaceAll(" ", "-").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "") : "https://", logo: "" ,days:"",date:""})
    const [choise, handleChoiseState] = React.useState(0)

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
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
           
            <center className="h1 pad">Créer une publicité</center>


            <center className={styles.nav}>
                <a className={choise == 0 ? styles.active : styles.inactive} onClick={() => handleChoiseState(0)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={choise == 1? styles.active : styles.inactive} onClick={() => handleChoiseState(1)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
                <a className={choise == 2 ? styles.active : styles.inactive} onClick={() => handleChoiseState(2)}><AlignMiddle size={25} className="mr" color="#4a00b4" /> Gestionnaire de Publicité </a>

            </center>
            
            <div className={choise !== 2 ? "container" : null}>



                {choise == 0 && <Creation
                
                    onHandleImageStateChange={handleImageChange}
                    onHandleTextStateChange={handleChange}
                    data={state}
                
                />}
                {choise == 1 && <Visualisation
                    data={state}

                />}
                {choise == 2 && <AddPost
                    reset={ setState}
                   

                />}

            </div>


 
            

            


          

        </div>
    )
}

export default Pub




export function AddPost({reset}) {
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs
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
        setState({ ...getPub[k], logo: getPub[k].media, date: getPub[k].available && getPub[k].available.split("T", -1)[0] })
        reset({ name: site.name ? "https://digitalsekou.com/entreprises/" + site.name.replaceAll(" ", "-").replaceAll("(", "").replaceAll("'", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "") : "https://", logo: "", days: "", date: "" })
    }


    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
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
                        {getPub == "" ? <center className="h2"></center> : 
                        getPub.map((e, k) => <tr key={k}>
                            <td>#{k + 1}</td>
                            <td>{e.date && new Date(e.date).toLocaleDateString() || new Date(e.available).toLocaleDateString() }</td>
                            <td><img src={e.logo || e.media } className="logo" alt={e.days} /></td>
                            <td> <div className={styles.dfss}> <a className="btnPri dfss" onClick={() => handleMod(e.id, k)}> <PenFill className={styles.right} size="20px" color="#FFF" /> Modifier</a><a className="btnPriRed dfss" onClick={() => handleDel(e.id, k)}> <TrashFill className={styles.right} size={20} color="#FFF" /> Supprimer</a></div></td>
                        </tr>)}
                    </tbody>
                </table>

                {visible && <ModalEditor onModalChange={v} component={
                    <center>
                        {state && <Edit

                            onHandleImageStateChange={handleImageChange}
                            onHandleTextStateChange={handleChange}
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


const ALLOWED_EXTENSIONS = ['svg', "SVG", 'png', 'jpg', 'jpeg', "JPG", "PNG", "JPEG"]

const allowOnlyPicture = (filename) => {

    let ext = (filename).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}

export function Visualisation({ data, mode = false }) {
    const  router = useRouter()
    const handleClick = async (e) => {

        e.preventDefault()
        await axios.put("addStatPub/" + data.id)
        router.push(data.name)
    }
    return (
        <>
            
            <div className={styles.anim}>

                {data.media ? null :<> <span className="h1">Publicité</span> <br /></>}

                <div className="dfss pad">


                    {data.media ? null : <ArrowLeft size={20} color="#4a00b4" />} {data.logo || data.media ? <Link href={data.name}><a onClick={mode ? handleClick : null}><img src={data.logo || data.media} className={styles.img} alt="Publicité" /></a></Link> : <ImageFill size={200} color="#4a00b4" />}  {data.media ? null : <ArrowRight size={20} color="#4a00b4" />}
                    


                </div>  
            </div>
           
            </>
    )
}

export function Creation({ onHandleImageStateChange, onHandleTextStateChange, data}) {
    const [err, setErr] = React.useState()
    const [errors, setErrors] = React.useState(false)
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const [visible,v] = useModal(false)
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs
    const id = getPub.length - 1
    const post = id < 0 ? 1 : getPub[id].id + 1
    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
}

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(true)
        if (data.name && data.logo && data.days && data.date && verifTwoDate(new Date(data.date), new Date(data.days)) && verifSupDate(new Date(), new Date(data.date)) && verifSupDate(new Date(), new Date(data.days))) {
            if (allowOnlyPicture(data.logoName)) {
                const formData1 = new FormData();
                const img = entreprise.id + "-entreprise-pub-" + post + "." + data.logoName.split(".", -1)[1]

                setLoader(true)
                formData1.append("file", data.logoData, img);



                axios.all([
                    axios.post("/add-pub-entreprise/" + entreprise.id, { logo: img, days: data.days, date: data.date, available: data.date, name:data.name}),
                    axios.post("/upload", formData1),

                ]


                ).then(res => {
                
                    dispacth({ type: "ADD", name: "getPub", pre: "pubs", data: res[0].data })

                    setLoader(false)
                })
                    .catch(err => {
                        console.log(err)
                        v(true)
                        setLoader(false)
                        

                    })
            } else {
                alert("format d'image non autoriser")
            }
        }
    }
  
    
    
    return (
        <>
            
            <div className={styles.anim}>
             
                

                <form onSubmit={handleSubmit}>
                
 <File name="logo" def={data.logo} onChange={handleImage} >Importer L'image de la publicité</File>
                    <span className="error">
                        { errors && data.logo == "" && "Le logo est obligatoire"}
                    </span>
                    <Field name="name" r={false} image={<Lk color="#4a00b4" size="20px" />} auto="Entrez l'url de redirection au clic sur l'image" value={data.name} onChange={handleChangeText}  >  Url de redirection au clic  </Field>
                    <span className="error">
                        {errors && (data.name == "https://" || data.name=="") && "Entrez une url valide"}
                  </span>
                    <Field name="date" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} value={data.date} onChange={handleChangeText}  >  Entrez à partir de laquelle la pub sera activer </Field>
                    <span className="error">
                        {errors && data.date == "" && "Entrez une date valide"}
                        {errors && !verifSupDate(new Date(), new Date(data.date)) && "La date est invalide"}
                    </span>
                    
                 
                    <Field name="days" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} value={data.days} onChange={handleChangeText}  >  Entrez la date de fin de la publicité </Field>
                    <span className="error">
                        {errors && data.days == "" && "Entrez une date valide"}
                        {errors && !verifTwoDate(new Date(data.date), new Date(data.days)) && "La date est invalide"}
                        {errors && !verifSupDate(new Date(), new Date(data.days)) && "La date est invalide"}

                    </span>




                 <center>   <div className={styles.df}>
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
       {visible && <FineModal position={{ top: 30, left: "35%", width: "40%" }} onModalChange={v} component={<Validator/>}/>}
        </>
    )
}


export function Edit({onHandleImageStateChange, onHandleTextStateChange, data, id, k, onHandleEditor }) {
    const [err, setErr] = React.useState()
    const [errors, setErrors] = React.useState(false)
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const [visible, v] = useModal(false)
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs[k]
    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
        setErrors(true)

    }


    const handleImage = (e) => {
        setErrors(true)

        onHandleImageStateChange(e)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors(true)

        if (data.name && data.logo && data.days && data.date && verifTwoDate(new Date(data.date), new Date(data.days)) && verifSupDate(new Date(), new Date(data.date)) && verifSupDate(new Date(),new Date(data.date))) {
            if (allowOnlyPicture(data.logo) || (data.logoData && allowOnlyPicture(data.logoName))) {
                const formData1 = new FormData();
                const random = Math.floor(Math.random() * 10)

                const img = data.logoName && entreprise.id + "-entreprise-pub-" + random  + "-" + id + "." + data.logoName.split(".", -1)[1]

                setLoader(true)
                data.logoName && formData1.append("file", data.logoData, img);



                axios.all([
                   await axios.put("/pubs/" + id, {logo: data.logoName && img || data.logo, days: data.days, date: data.date,name: data.name }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("etoken")
                        }
                    }),
                    await data.logoName && axios.post("/upload", formData1),
                    await data.logoName &&  axios.delete("/upload/" + getPub.media),

                ]


                ).then(res => {
                    dispacth({ type: "UPDATE", name: "getPub", id: k, pre: "pubs", data: { ...data, logo: data.logoName && img  || data.logo, media: data.logoName && img|| data.logo, days: data.days, date: data.date, logoName: "",available: data.date,  name: data.name} })

                    setLoader(false)
                })
                    .catch(err => {
                        console.log(err)
                        v(true)
                        setLoader(false)


                    })
            } else {
                alert("format d'image non autoriser")
            }
        }
    }



    return (
        <>

            <div className={styles.anim}>


                <form onSubmit={handleSubmit}>
 <File name="logo" def={data.logo} onChange={handleImage} >Importer L'image de la publicité</File>
                    <span className="error">
                        {errors && data.logo == "" && "Le logo est obligatoire"}
                    </span>
                    <Field name="name" r={false} image={<Lk color="#4a00b4" size="20px" />} auto="Entrez l'url de redirection au clic sur l'image" value={data.name} onChange={handleChangeText}  >  Url de redirection au clic  </Field>
                    <span className="error">
                        {errors && (data.name == "https://" || data.name == "") && "Entrez une url valide"}
                    </span>
                    <Field name="date" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} value={data.date} onChange={handleChangeText}  >  Entrez à partir de laquelle la pub sera activer </Field>
                    <span className="error">
                        {errors && data.date == "" && "Entrez une date valide"}
                        {errors && !verifSupDate(new Date(), new Date(data.date)) && "La date est invalide"}

                    </span>
                    <Field name="days" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} value={data.days.split("T")[0]} onChange={handleChangeText}  >  Entrez la date de fin de la publicité  </Field>
                    <span className="error">
                        {errors && data.days == "" && "Entrez une date valide"}
                        {errors && !verifTwoDate(new Date(data.date), new Date(data.days)) && "La date est invalide"}
                        {errors && !verifSupDate(new Date(), new Date(data.days)) && "La date est invalide"}

                    </span>

                    <center>   <div className={styles.df}>
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
            {visible && <FineModal position={{ top: 30, left: "35%", width: "40%" }} onModalChange={v} component={<Error />} />}
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

                <button className="btnPri" type="submit" >Envoyer la publicité</button>
            </center>
        </div>
    )
}


export function Delete({ close, id, k }) {
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs[k]
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise

    const handleClick = () => {
        close(true)
    }

    const handleDelete = async () => {
        await axios.all([
            axios.delete(`/pubs/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("etoken")
                    }

                }
            ),
            axios.delete("/upload/" + getPub.media)
        ])
            .then(() => {
                // setError()
                // setFine("Suppression réussi")
                dispacth({ type: "DELETE", name: "getPub", pre: "pubs", id: k })

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
