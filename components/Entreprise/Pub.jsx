import React from 'react'
import styles from "./pub.module.css"
import { AlignMiddle, ArrowLeft, ArrowRight, Building, Calendar2DateFill, DisplayFill, ImageFill, Link as Lk, Mastodon, PaintBucket, PencilFill, PencilSquare, PenFill, Person, PinFill, TrashFill } from 'react-bootstrap-icons'
import { Field, FieldValidate, File, FileValidate } from '../FormTools'
import Link from 'next/link'
import FineModal from '../fineModal'
import { useModal } from '../../pages/addSchoolPro/[id]'
import Loader from 'react-loader-spinner'
import { EntrepriseContext } from '../../pages/StartPub'
import axios from 'axios'
import ModalEditor from '../modalEditor'
import CustomModal from '../customModal'



function Pub() {

    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site

    const [state, setState] = React.useState({ name: site.name ? "https://digitalsekou.com/entreprises/" + site.name : "https://", logo: "" ,days:"",date:""})
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
                   

                />}

            </div>


 
            

            


          

        </div>
    )
}

export default Pub




export function AddPost() {
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs

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
        setState({ ...getPost[k], position: parseInt(getPost[k].disposition, 10), outro: getPost[k].description, media: getPost[k].image })

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

    const handleClick = (e) => {
        setState(s => ({ ...s, position: e }))
    }




    return (
        <>


            <div className={styles.table}>

                <table >
                    {/* <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom de la prestation</th>
                            <th>Actions</th>
                        </tr>
                    </thead> */}
                    <tbody>

                        {getPub == "" ? <center className="h2"></center> : 
                        getPub.map((e, k) => <tr key={k}>
                            <td>#{k + 1}</td>
                            <td>{e.name || e.title}</td>
                            <td> <div className={styles.dfss}> <a className="btnPri dfss" onClick={() => handleMod(e.id, k)}> <PenFill className={styles.right} size="20px" color="#FFF" /> Modifier</a><a className="btnPriRed dfss" onClick={() => handleDel(e.id, k)}> <TrashFill className={styles.right} size={20} color="#FFF" /> Supprimer</a></div></td>
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
                            handleClick={handleClick}
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


const ALLOWED_EXTENSIONS = ['webp', 'svg', 'png', 'jpg', 'jpeg']

const allowOnlyPicture = (filename) => {

    let ext = (filename.name).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}

export function Visualisation({data}) {   
    return (
        <>
            
            <div className={styles.anim}>

                <span className="h1">Publicité</span> <br />

                <div className="dfss pad">


                    <ArrowLeft size={20} color="#4a00b4" /> {data.logo ? <Link href={data.name}><a><img src={data.logo} className={styles.img} alt="Publicité" /></a></Link> : <ImageFill size={200} color="#4a00b4" />}<ArrowRight size={20} color="#4a00b4" />
                    


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

    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
}

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(true)
        if (data.name && data.logo && data.days && data.date) {
            if (allowOnlyPicture(data.logoData)) {
                const formData1 = new FormData();

                setLoader(true)
                formData1.append("file", data.logoData, entreprise.username + "-entreprise-pub-" + data.logoName);



                axios.all([
                    axios.post("/add-pub-entreprise/" + entreprise.id, {logo: data.logoName,days:data.days,date:data.date,name:data.name}),
                    axios.post("/upload", formData1),

                ]


                ).then(res => {
                    // sessionStorage.setItem("schoolToken", res[0].data.token)
                    // sessionStorage.setItem("school", res[0].data.sigle)
                    // sessionStorage.setItem("schoolId", res[0].data.id)
                    // router.push(`/addSchoolPro/${res[0].data.id}?token=${res[0].data.token}`)
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
                

                    <Field name="name" r={false} image={<Lk color="#4a00b4" size="20px" />} auto="Entrez l'url de redirection au clic sur l'image" value={data.name} onChange={handleChangeText}  >  Url de redirection au clic  </Field>
                    <span className="error">
                        {errors && (data.name == "https://" || data.name=="") && "Entrez une url valide"}
                  </span>
                    <Field name="date" type="date" r={false} image={<Calendar2DateFill color="#4a00b4" size="20px" />} value={data.date} onChange={handleChangeText}  >  Entrez à partir de laquelle la pub sera activer </Field>
                    <span className="error">
                        {errors && data.date == "" && "Entrez une date valide"}
                    </span>
                    <Field name="days" type="number" r={false} image={<Mastodon color="#4a00b4" size="20px" />} auto="Entrez le nombre de jour de la publicité exp: 2" value={data.days} onChange={handleChangeText}  >  Entrez le nombre de jour de la publicité  </Field>
                    <span className="error">
                        {errors && (data.days == "" || data.days <= 0) && "Entrez un nombre de jours valide"}
                    </span>
                    <File name="logo" def={data.logo} onChange={handleImage} >Importer L'image de la publicité</File>
                    <span className="error">
                        { errors && data.logo == "" && "Le logo est obligatoire"}
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