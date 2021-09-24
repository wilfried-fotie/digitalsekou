import React from 'react'
import styles from "../Entreprise/offre.module.css"
import { AlignMiddle, ArrowLeft, ArrowRight, Bank2, BoundingBoxCircles, Building, Calendar2DateFill, CalendarX, CashCoin, DisplayFill, FileEarmarkPostFill, FileImageFill, ImageFill, Link as Lk, Outlet, PaintBucket, PencilFill, PencilSquare, PenFill, Person, PhoneFill, PhoneVibrateFill, PinFill, TelephoneFill, TrashFill, TrophyFill } from 'react-bootstrap-icons'
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
import CustomModal from '../customModal'
import ModalEditor from '../modalEditor'


const ALLOWED_EXTENSIONS = ['webp', 'svg', 'png', 'jpg',"JPG","PNG","JPEG", 'jpeg']

const allowOnlyPicture = (filename) => {

    let ext = (filename).split(".", -1)[1]
    if (ALLOWED_EXTENSIONS.includes(ext)) {
        return true
    }
    return false

}


function AddProduct() {


    const [state, setState] = React.useState({ media: "", price: "",name:"" })
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
                        [name + "Name"]: e.target.files[0].name.replaceAll("'", "").replaceAll(" ", "").replaceAll("(", "").replaceAll('"', "").replaceAll(")", "").replaceAll("'", "")


                    }
                });
            };

        }

    }

    const handleClick = (e) => {
        setState(s => ({ ...s, position: e }))
    }

    return (
        <div>

            <center className="h1 pad">Création d'une Offre</center>


            {/* <center className={styles.nav}>
                <a className={choise ? styles.active : styles.inactive} onClick={() => handleChoiseState(true)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={!choise ? styles.active : styles.inactive} onClick={() => handleChoiseState(false)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
            </center> */}

            
            <center className={styles.nav}>
                <a className={choise == 0 ? styles.active : styles.inactive} onClick={() => handleChoiseState(0)}><PencilSquare className="mr" size={25} color="#4a00b4" /> Création </a>
                <a className={choise == 1 ? styles.active : styles.inactive} onClick={() => handleChoiseState(1)}><DisplayFill size={25} className="mr" color="#4a00b4" /> Visualiation </a>
                <a className={choise == 2 ? styles.active : styles.inactive} onClick={() => handleChoiseState(2)}><Bank2 size={25} className="mr" color="#4a00b4" /> Gestionnaire de produits </a>
            </center>

            <div className={choise !== 2 ? "container" : null}>

                {choise == 0 && <Creation

                    onHandleImageStateChange={handleImageChange}
                    onHandleTextStateChange={handleChange}
                    data={state}
                    handleClick={handleClick}
                    reset={setState}

                />}
                {choise == 1 && <Visualisation

                    data={state}

                />}

                {choise == 2 && <Gestionnaire

                

                />}

            </div>









        </div>
    )
}

export default AddProduct

export function Gestionnaire() {
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products
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
        setState({ ...getProduct[k], media: getProduct[k].image })

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
                    {/* <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom de la prestation</th>
                            <th>Actions</th>
                        </tr>
                    </thead> */}
                    <tbody>

                        {getProduct == "" ? <center className="h2">Aucun article</center> :
                            getProduct.map((e, k) => <tr key={k}>
                            <td>#{k + 1}</td>
                            <td>{e.name}</td>
                                <td> <div className={styles.dfss}> <a className="btnPri dfss" onClick={() => handleMod(e.id, k)}> <PenFill className={styles.right} size="20px" color="#FFF" /> Modifier</a><a className="btnPriRed dfss" onClick={() => handleDel(e.id, k)}> <TrashFill className={styles.right} size={20} color="#FFF" /> Delete</a></div></td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
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
        </>
    )
}





export function Visualisation({ data }) {


    return (
        <>

            <div className={styles.anim}>

                <div className={styles.actp }>


                <div className={styles.dg}>

                    <div className="dfss">

                        {data.media ? <img src={data.media} className="imgFill" alt="image d'un post" /> : <span> <FileImageFill size={200} color="#4a00b4" /> </span>}


                    </div>
                        <center className="pad">{data.name ? data.name : "Nom du produit"}</center>
                        <span className="pad">Prix: {data.price ? data.price + " FRCFA" : "prix du produit"}</span>
                    <div>

                       
                    </div>
                </div>

                </div>
            </div>

        </>
    )
}

export function Creation({ onHandleImageStateChange, onHandleTextStateChange, data, reset }) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [state, setState] = React.useState(data.position)
    const [errors, setErrors] = React.useState(false)
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products
    const id = getProduct.length - 1
    const post = id < 0 ? 1 : getProduct[id].id + 1

    const [loader, setLoader] = React.useState(false)
    const [visible, v] = useModal(false)

    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
    }

    const handleSubmit = (e) => {
        setLoader(true)

        e.preventDefault()
        
        if (data.media && data.name && data.price) {
                    if (allowOnlyPicture(data.mediaName)) {
                        const formData1 = new FormData();
                        const img = entreprise.id + "-entreprise-product-" + post + "." + data.mediaName.split(".", -1)[1]

                        setLoader(true)
                        formData1.append("file", data.mediaData, img);



                        axios.all([
                            axios.post("/add-product-entreprise/" + entreprise.id, { media: img, entrepriseId: entreprise.id, name: data.name, price: data.price, proprio: "entreprise" }),
                            axios.post("/upload", formData1),

                        ]


                        ).then(res => {
            
                            dispacth({ type: "ADD", name: "getProduct", pre: "products", data: res[0].data })

                            setLoader(false)
                            reset({ media: "", price: "", name: "" ,image: ""})

                        })
                            .catch(err => {
                                console.log(err)
                                v(true)
                                setLoader(false)

                            })
                
                    } else {
                        setErrors(true)
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
                    



                    <File name="media" def={data.media} onChange={handleImage} state={data.media}>Importer Une Image</File>

                    <span className="error">
                        {errors && data.media == "" && "Ce champs est réquis"}
                    </span>
                    <Field name="name" r={false}  auto="Entrez le nom ou une petite description" value={data.name} onChange={handleChangeText}  >  Entrez le nom ou une petite description  </Field>
                    <span className="error">
                        {errors && data.name == "" && "Entrez le nom de l'article"}
                    </span>
                    <Field name="price"  type="number" r={false} image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le numéro de téléphone" value={data.price} onChange={handleChangeText}  >  Entrez le prix de l'article  </Field>
                    <span className="error">
                        {errors && data.price == "" && "Entrez le prix"}
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




export function Edit({ onHandleImageStateChange, onHandleTextStateChange, data, id, k, }) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [state, setState] = React.useState(data.position)
    const [errors, setErrors] = React.useState(false)
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products[k]
    const dispacth = React.useContext(EntrepriseContext).dispacth

    const [loader, setLoader] = React.useState(false)
    const [visible, v] = useModal(false)

    const handleChangeText = (e) => {
        onHandleTextStateChange(e)
    }


    const handleImage = (e) => {
        onHandleImageStateChange(e)
    }

    const handleSubmit = (e) => {
        setLoader(true)

        e.preventDefault()

        if (data.media && data.name && data.price) {
            if (allowOnlyPicture(data.media) || (data.mediaName && allowOnlyPicture(data.mediaName)) ) {
                const formData1 = new FormData();
                const random = Math.floor(Math.random() * 10)
                const img = data.mediaName && entreprise.id + "-entreprise-product-" + id + "-" + random + "." + data.mediaName.split(".", -1)[1]

                setLoader(true)
                data.mediaName && formData1.append("file", data.mediaData,img);

                

                axios.all([
                    

                    axios.put("/products/" + id, { media: img || data.media, image: img || data.media, entrepriseId: entreprise.id, name: data.name, price: data.price, proprio: "entreprise" }, {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("etoken")
                        }
                    }),

                    data.mediaName && axios.post("/upload", formData1),
                    data.mediaName && axios.delete("/upload/" + getProduct.image),

                ]


                ).then(res => {
                    const img = data.mediaName && entreprise.id + "-entreprise-product-" + id + "-" + random + "." + data.mediaName.split(".", -1)[1]

                    dispacth({ type: "UPDATE", name: "getProduct", pre: "products", id: k, data: {id: id, name: data.name, media: img || data.media, image: img || data.media,price: data.price} })

                    setLoader(false)

                })
                    .catch(err => {
                        console.log(err)
                        v(true)
                        setLoader(false)

                    })

            } else {
                setErrors(true)
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




                    <File name="media" def={data.media} onChange={handleImage} state={data.media}>Importer Une Image</File>

                    <span className="error">
                        {errors && data.media == "" && "Ce champs est réquis"}
                    </span>
                    <Field name="name" r={false} auto="Entrez le nom ou une petite description" value={data.name} onChange={handleChangeText}  >  Entrez le nom ou une petite description  </Field>
                    <span className="error">
                        {errors && data.name == "" && "Entrez le nom de l'article"}
                    </span>
                    <Field name="price" type="number" r={false} image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le numéro de téléphone" value={data.price} onChange={handleChangeText}  >  Entrez le prix de l'article  </Field>
                    <span className="error">
                        {errors && data.price == "" && "Entrez le prix"}
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




export function Delete({ close, id, k }) {
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products[k]
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise

    const handleClick = () => {
        close(true)
    }

    const handleDelete = async () => {
        await axios.all([
            axios.delete(`/products/${id || getProduct.id}`,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("etoken")
                }

            }
            ),
            axios.delete("/upload/" + getProduct.image)
        ])
            .then(() => {
                // setError()
                // setFine("Suppression réussi")
                dispacth({ type: "DELETE", name: "getProduct", pre: "products", id: k })

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


export function Validator() {
    return (
        <div className={styles.testAnim}>
            <center> <BoundingBoxCircles color="red" size={40} /></center>
            <p>
               <center className="error"> Echec de l'envoie</center>
            </p>

        </div>
    )
}

