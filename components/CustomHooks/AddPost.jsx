import React from 'react'
import styles from "../Entreprise/offre.module.css"
import { AlignMiddle, DisplayFill, FileEarmarkPostFill, FileImageFill, ImageFill, Link as Lk, Outlet, PaintBucket, PencilFill, PencilSquare, PenFill, Person, PhoneFill, PhoneVibrateFill, PinFill, TelephoneFill, TrashFill, TrophyFill } from 'react-bootstrap-icons'
import { Editor,  Field,  File} from '../FormTools'
import FineModal from '../fineModal'
import { useModal } from '../../pages/addSchoolPro/[id]'
import { Markup } from 'interweave'
import draftToHtml from 'draftjs-to-html'
import PasserPro from '../Entreprise/PasserPro'
import axios from 'axios'
import { EntrepriseContext } from '../../pages/StartPub'
import Loader from 'react-loader-spinner'
import CustomModal from '../customModal'
import ModalEditor from '../modalEditor'
import NotPro from './NotPro'

export default function PostTeur() {


    const [state, setState] = React.useState({ media: "", outro: "",position: 1,name: "" })
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

    const handleClick = (e) => {
        setState(s => ({ ...s, position: e}))
    }

    return (
        <div>

            <center className="h1 pad">Création d'un Post</center>


            <center className={styles.nav}>
                <a className={choise == 0 ? styles.active : styles.inactive} onClick={() => handleChoiseState(0)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={choise == 1 ? styles.active : styles.inactive} onClick={() => handleChoiseState(1)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
                <a className={choise == 2 ? styles.active : styles.inactive} onClick={() => handleChoiseState(2)}><AlignMiddle size={25} className="mr" color="#4a00b4" /> Gestionnaire de prestations </a>
            </center>

            <div className= {choise !== 2 ? "container" : null}>

                {choise ==  0 && <Creation

                    onHandleImageStateChange={handleImageChange}
                    onHandleTextStateChange={handleChange}
                    onHandleEditor={handleEditorContentOutro}
                    data={state}
                    handleClick={handleClick}
                    reset={setState}

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

export  function AddPost() {
    const getPost =  React.useContext(EntrepriseContext).data.getPost.posts

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
         
                    <tbody>

                        {getPost == "" ? <center className="h2">Vide!!!</center> : 
                        getPost.map((e,k)=>  <tr key={k}>
                            <td>#{k + 1}</td>
                            <td>{e.name}</td>
                            <td> <div className={styles.dfss}> <a className="btnPri dfss" onClick={() => handleMod(e.id,k)}> <PenFill className={styles.right} size="20px" color="#FFF" /> Modifier</a><a className="btnPriRed dfss" onClick={() => handleDel(e.id,k)}> <TrashFill className={styles.right} size={20} color="#FFF" /> Supprimer</a></div></td>
                        </tr>)} 
                    </tbody>
                </table>

                {visible && <ModalEditor onModalChange={v} component={
                    <center>
                  {state &&  <Edit

                            onHandleImageStateChange={handleImageChange}
                            onHandleTextStateChange={handleChange}
                            onHandleEditor={handleEditorContentOutro}
                            id={getIdForMod}
                            k = {getkForMod}
                            data={state}
                            handleClick={handleClick}
                    // data = {{}}

                        />}
                    </center>
                        } />
                }
                {visible2 && <CustomModal onModalChange={v2} component={<Delete close={v2} k={getkForDel} id={getIdForDel}/>} />}
            </div>

            </>
    )
}






export function Visualisation({ data }) {


    return (
        <>

            <div className={styles.anim}>


                <div className={styles.act}>
                    
                    <center className="h2">{ data.name || "Nom de la prestation"}</center>
                <div className={data.position == 1 ? styles.dg : data.position == 2 ? "dfss" : styles.dfr }>

                    <div className="dfss">

                            {data.media ? <img src={data.media} className={data.position !== 1 ? "imgFill" : styles.imageFill} alt="image d'un post" /> : <span> <FileImageFill size={200} color="#4a00b4" /> </span>}


                    </div>

                    <div>

                        <div className="pad">
                            {data.outro ? <Markup content={draftToHtml(data.outro)} /> : "Message ou description ici"}
                            </div>
                            <center className="pad"><a className="btnSecondary">Demander un dévis</a></center>
                    </div>
                </div>

            </div>
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

export function Creation({ onHandleImageStateChange, onHandleTextStateChange, data, onHandleEditor, handleClick,reset}) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [state, setState] = React.useState(data.position)
    const [errors, setErrors] = React.useState(false)
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const getPost = React.useContext(EntrepriseContext).data.getPost.posts
    const id = getPost.length - 1
    const post = id < 0 ?  1 : getPost[id].id + 1
    const [loader, setLoader] = React.useState(false)
    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)

    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
    }
    const handleClickPro = (e) => {
        e.preventDefault()
        v2(true)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (data.media && data.outro && data.name) {
            if (allowOnlyPicture(data.mediaName)) {
                const formData1 = new FormData();
                const img = entreprise.id + "-entreprise-prestation-" + post + "." + data.mediaName.split(".", -1)[1]
                setLoader(true)
                formData1.append("file", data.mediaData, img);



                axios.all([
                    axios.post("/add-post-entreprise/" + entreprise.id, { name: data.name, media: img, entrepriseId: entreprise.id, outro: draftToHtml(data.outro), disposition: state, proprio: "entreprise"}),
                    axios.post("/upload", formData1),

                ]


                ).then(res => {
                   

                    dispacth({ type: "ADD", name: "getPost",pre: "posts",data: res[0].data })
                    
                    setLoader(false)
                    reset({ media: "", outro: "", position: 1, name: "" })
                   
                })
                    .catch(err => {
                        setLoader(false)

                    })
            }
        } else {
            setErrors(true)
        }
    }
    const handleEdit = (e) => {
        onHandleEditor(e)
    }


    return (
        <>

            <div className={styles.anim}>

                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                   
                    
                    <File name="media" def={data.media} onChange={handleImage} state={data.media}>Importer Une Image</File>
                   
                    <span className="error">
                        {errors && data.media == "" && "Ce champs est réquis"}
                    </span>
                    <Field name="name" r={false} image={<PencilSquare color="#4a00b4" size="20px"/>} auto="Entrez le nom de la prestation" value={data.name} onChange={handleChangeText}  >  Entrez le nom de la prestation  </Field>
                    <span className="error">
                        {errors && data.name == "" && "Entrez le nom de l'article"}
                    </span>


                    <Editor name="editor" r={false} state={draftToHtml(data.outro)} handleEdit={handleEdit} edit={true}>

                        Description de votre offre
                    </Editor>
                    <span className="error">
                        {errors && data.outro == "" && "Entrez la description de l'offre"}
                    </span>


                    <div className="a">
                        <p className="dfs"> <FileEarmarkPostFill size={20} color="#4a00b4" /> Disposition</p>
                        <div className="dfss">
                            <div className={state === 1 ? styles.activeborder0 : styles.border0} onClick={() => { setState(1); handleClick(1) }}>
                                <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                            </div>
                            <div className={state === 2 ? styles.activeborder : styles.border} onClick={() => { setState(2); handleClick(2) }}>
                                <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                            </div>

                            <div className={state === 3 ? styles.activeborder2 : styles.border2} onClick={() => { setState(3); handleClick(3) }}>
                                <span>Texte</span>    <ImageFill size={20} color="#4a00b4" />

                            </div>

                        </div>
                    </div>



                    <center className="pad">   <div className={styles.df}>
                        <button disabled={loader} onClick={entreprise.pro ? null : handleClickPro} className="dfss btnPri" >
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
            {visible2 && <CustomModal onModalChange={v2} component={<NotPro />} />}

        </>
    )
}


export function Edit({ onHandleImageStateChange, onHandleTextStateChange, data, id, k, onHandleEditor, handleClick }) {
  
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [errors, setErrors] = React.useState(false)
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const getPost = React.useContext(EntrepriseContext).data.getPost.posts[k]
   
    const [loader, setLoader] = React.useState(false)
    
    const initial = data.media

    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(true)
        if (data.media && data.outro && data.name) {
            if (allowOnlyPicture(data.media) || (data.mediaName && allowOnlyPicture(data.mediaName)) ) {
                const formData1 = new FormData();
                const random = Math.floor(Math.random() * 10)

                setLoader(true)
                data.mediaName && formData1.append("file", data.mediaData, entreprise.id + "-entreprise-prestation-" + id + "-" + random + "." + data.mediaName.split(".", -1)[1]);



                axios.all([
                    axios.put("/posts/" + id, { name: data.name, media: data.mediaName && entreprise.id + "-entreprise-prestation-" + id + "-" + random  + "." + data.mediaName.split(".", -1)[1] || data.media, outro: draftToHtml(data.outro) || data.outro, disposition: data.position, proprio: "entreprise" }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("etoken")
                            }
                        
                    }),
                    data.mediaName && axios.post("/upload", formData1),
                    data.mediaName &&  axios.delete("/upload/" + getPost.image),

                ]


                ).then(res => {
                   
                    dispacth({ type: "UPDATE", name: "getPost", pre: "posts", id: k, data: { id: id, description: draftToHtml(data.outro) || data.outro, name: data.name, media: data.mediaName && entreprise.id + "-entreprise-prestation-" + id + "-" + random + "." + data.mediaName.split(".", -1)[1] || data.media, image: data.mediaName && entreprise.id + "-entreprise-prestation-" + id + "-" + random + "." + data.mediaName.split(".", -1)[1] || data.media, outro: draftToHtml(data.outro) || data.outro, disposition: data.position, proprio: "entreprise" } })

                    setLoader(false)
                })
                    .catch(err => {
                        alert("une erreur est survenu" + err)
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

       

                <center className="h2">Modification</center>

                <form onSubmit={handleSubmit}>

                    <File name="media" def={data.mediaName ? null :  "/" + data.media} defData={data.mediaName ? data.media : null} onChange={handleImage} state={data.media}>Importer Une Image</File>

                    <span className="error">
                        {errors && data.media == "" && "Ce champs est réquis"}
                    </span>
                    <Field name="name" r={false} image={<PencilSquare color="#4a00b4" size="20px" />} auto="Entrez le nom de la prestation" value={data.name} onChange={handleChangeText}  >  Entrez le nom de la prestation  </Field>
                    <span className="error">
                        {errors && data.name == "" && "Entrez le nom de l'article"}
                    </span>


                    <Editor name="editor" r={false} state={draftToHtml(data.outro) || data.outro } className={styles.width} handleEdit={handleEdit} edit={true}>

                        Description de votre offre
                    </Editor>
                    <span className="error">
                        {errors && data.outro == "" && "Entrez la description de l'offre"}
                    </span>


                    <div className="a">
                        <p className="dfs"> <FileEarmarkPostFill size={20} color="#4a00b4" /> Disposition</p>
                        <div className="dfss">
                            <div className={data.position === 1 ? styles.activeborder0 : styles.border0} onClick={() => {  handleClick(1) }}>
                                <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                            </div>
                            <div className={data.position === 2 ? styles.activeborder : styles.border} onClick={() => { handleClick(2) }}>
                                <ImageFill size={20} color="#4a00b4" /> <span>Texte</span>
                            </div>

                            <div className={data.position === 3 ? styles.activeborder2 : styles.border2} onClick={() => {  handleClick(3) }}>
                                <span>Texte</span>    <ImageFill size={20} color="#4a00b4" />

                            </div>

                        </div>
                    </div>



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


export function Error() {
    return (
        <div className={styles.testAnim}>
            <p className="error">
                Veuillez verifier les informations soumis!!! Il existe déja
            </p>
            <center>

                <button className="btnPri" type="submit">Envoyer la publicité</button>
            </center>
        </div>
    )
}


export function Delete({ close, id,k }) {
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getPost = React.useContext(EntrepriseContext).data.getPost.posts[k]
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const handleClick = () => {
    close(true)
    }
    
    const handleDelete = async () => {
        await axios.all([
            axios.delete(`/posts/${id || getPost.id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("etoken")
                }

            }
            ),
            axios.delete("/upload/" + getPost.image)
        ])
            .then(() => {
                // setError()
                // setFine("Suppression réussi")
                dispacth({ type: "DELETE", name: "getPost",pre: "posts", id: k })

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
