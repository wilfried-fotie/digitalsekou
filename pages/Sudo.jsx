import React from 'react'
import { ArrowLeft, BarChart, CursorFill, Bell, Building, CartX, Check, ChevronCompactLeft, Clipboard, Disc, Exclude, Eye, Flower1, Gear, Link, Lock, LockFill, Person, PersonCircle, SuitDiamond, Trash, } from 'react-bootstrap-icons'
import styles from '../components/Style/CreateAccount.module.css'
import style from '../styles/sudo.module.css'
import "../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../components/handleBool'
import FineModal from '../components/fineModal'
import CustomModal from '../components/customModal'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react';


export function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}





export function Sudo() {

    const [sudoToken, setSudoToken] = React.useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNTk4MDI5NSwianRpIjoiYWFlY2U0NmYtYjA5ZS00OTU2LWE4YzMtZDdiOTBiNTg4ZDY3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2MjU5ODAyOTUsImV4cCI6MTYyNTk4MTE5NX0.hz0L4rWi93ochvOpcCOF4OTZyRh8ocdIGRqyt-Yszkc")
    React.useEffect(() => {
        let tok = sessionStorage.getItem("sudoToken")
        setSudoToken(tok)
    }, [sudoToken])

    return (
        <>
            {sudoToken && sudoToken != undefined && sudoToken !== ""
                ?
                <Dasboard />
                :

                <main className={style.main}>   <div className={style.ok}>  <Login onSetSudoToken={setSudoToken} token={sudoToken} /> </div> </main>
            }
        </>
    )
}

export default Sudo


export function Connect() {
    const [visbility2, v2] = useModal(false)
    const pos = React.useRef(null)
    const [position, setPosition] = React.useState({})


    const handleClick = () => {
        v2(true)

        setPosition({
            top: (pos.current.offsetTop + pos.current.offsetHeight + 5) + "px",
            right: 40 + "px"

        })
    }

    return (<>
        <div>
            <a className={style.dfss} onClick={handleClick} ref={pos}>

                <Gear size={20} className={style.icon} color="#4a00b4" /> <span>Paramètre</span>  </a>

            {visbility2 && <FineModal onModalChange={v2} position={position} component={<Verif />} />}

        </div>

    </>)
}


export function Dasboard() {

    const router = useRouter()
    const [level, setLevel] = React.useState(1)
    const [choise, handleChoiseState] = useChangeBool(true)
    const [visbility, v] = useModal(false)







    return (
        <>
            <div className={style.container}>


                <div className="dfb">

                    <aside>
                        <div className={style.bar}>
                            <span className={level == 0 ? style.active : style.span} onClick={(e) => {
                                e.preventDefault()
                                setLevel(0)
                                router.push("/")
                            }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#4a00b4"} className={level == 0 ? style.acticon : style.icon} /> Revenir au site</span>

                            <span className={level == 1 ? style.active : style.span} onClick={() => { setLevel(1) }} > <Flower1 size={20} color={level == 1 ? "#fff" : "#4a00b4"} className={level == 1 ? style.acticon : style.icon} /> Activités </span>
                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <Building size={20} color={level == 2 ? "#fff" : "#4a00b4"} className={level == 2 ? style.acticon : style.icon} /> Entreprises </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <SuitDiamond size={20} color={level == 3 ? "#fff" : "#4a00b4"} className={level == 3 ? style.acticon : style.icon} /> Etablissements </span>
                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#4a00b4"} className={level == 4 ? style.acticon : style.icon} /> Parents/Élève </span>
                            <span className={level == 5 ? style.active : style.span} onClick={() => { setLevel(5) }}> <Bell size={20} color={level == 5 ? "#fff" : "#4a00b4"} className={level == 5 ? style.acticon : style.icon} /> Notifications </span>
                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChart size={20} color={level == 6 ? "#fff" : "#4a00b4"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>

                        </div>

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">


                            <span className={level == 1 ? style.h1 : style.no}  >Activités </span>
                            <span className={level == 2 ? style.h1 : style.no} > Entreprises </span>
                            <span className={level == 3 ? style.h1 : style.no} >  Etablissements </span>
                            <span className={level == 4 ? style.h1 : style.no} >  Parents/Élève </span>
                            <span className={level == 5 ? style.h1 : style.no} >Envoyer Des Notifications </span>
                            <span className={level == 6 ? style.h1 : style.no} > Statistiques </span>

                            <Connect />

                        </nav>

                        <div className={style.right}>

                            {level == 1 && <One choise={choise} handleChoiseState={handleChoiseState} />}
                            {level == 2 && <Deux />}
                            {level == 3 && <Trois />}
                            {level == 4 && <Quatre />}
                            {level == 5 && <Cinq />}
                            {level == 6 && <Six />}
                        </div>

                    </article>
                </div>
            </div>
        </>
    )
}




export function Deux() {

    const [visbility3, v3] = useModal(false)

    const [position, setPosition] = React.useState({})


    const handleClick = (pos) => {
        v3(true)
        console.log(pos)
        setPosition({
            top: (pos.current.offsetHeight) + "px",
            left: pos.current.offsetHeight + "px"

        })
    }

    return (
        <>
            <div className={style.end}>
                <a className="btnPri">Ajouter</a>
            </div>



            <table>
                <thead>
                    <th>#id</th><th>Liste des Entreprises</th><th>Actions</th>

                </thead>
                <tbody>

                    {[1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test2 key={f} id={e} onDelete={handleClick} />)}
                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
        </>
    )
}



export function Verif() {
    return (
        <>
            <div className={style.dg}>


                <a className="dfss">
                    <Link size={20} color="#4a00b4" className={style.icon} /> Se Déconnecter</a>

                <a className="dfss">
                    <LockFill size={20} color="#4a00b4" className={style.icon} /> Changer de mot de passe</a>



            </div>
        </>
    )
}

export function Verif1() {
    return (
        <>
            Voulez vous delete?

            <a className={style.agree}>
                <Check size={20} color="#ffff" className={style.icon} /> Accepter</a>
            <a className={style.disagree} >  <Trash size={20} color="#ffff" className={style.icon} /> Annuler</a>
        </>
    )
}




export function Trois() {
    const [visbility3, v3] = useModal(false)

    const [position, setPosition] = React.useState({})


    const handleClick = (pos) => {
        v3(true)
        console.log(pos)
        setPosition({
            top: (pos.current.offsetHeight) + "px",
            left: pos.current.offsetHeight + "px"

        })
    }

    return (
        <>
            <div className={style.end}>
                <a className="btnPri">Ajouter</a>
            </div>



            <table>
                <thead>
                    <th>#id</th><th>Liste des Etablissements</th><th>Actions</th>

                </thead>
                <tbody>

                    {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test2 key={f} id={e} onDelete={handleClick} />)}
                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
        </>
    )
}


export function Quatre() {
    const [visbility3, v3] = useModal(false)

    const [position, setPosition] = React.useState({})


    const handleClick = (pos) => {
        v3(true)
        console.log(pos)
        setPosition({
            top: (pos.current.offsetHeight) + "px",
            left: pos.current.offsetHeight + "px"

        })
    }

    return (
        <>
            <div className={style.end}>
                <a className="btnPri">Ajouter</a>
            </div>



            <table>
                <thead>
                    <th>#id</th><th colSpan={2}>Liste des Parents et Élèves</th><th>Actions</th>

                </thead>
                <tbody>

                    {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test3 key={f} id={e} onDelete={handleClick} />)}
                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
        </>
    )
}


export function App() {
    const editorRef = React.useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Veuillez ajouter votre message ici.</p>"
                apiKey="roxg071h4eh35zt1swqudbuc90qgc34k2gp50yz4k4tiio7k"

                init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Montserrat,Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

        </>
    );
}

export function Cinq() {

    const options = [{ value: "Bafoussam", label: "Wilfried" }, { value: "Yaounde", label: "Toi" }, { value: "Doula", label: "Moi" }, { value: "Bertoua", label: "Elles" }, { value: "Garoua", label: "Vous" }, { value: "Limbe", label: "Nous" }]

    return (
        <>
            <div className={style.dfp}>
                <Select isMulti options={options} name="position" className="basic-multi-select op"
                    classNamePrefix="select" />
                <div >
                    <App />
                    <center className={style.dab}> <a className="btnSecondary">Envoyer Le Message<CursorFill size={20} color="#4a00b4" /></a></center>
                </div>
            </div>
        </>
    )
}
export function Six() {
    return (
        <>

            <div className={style.dfw}>
                {[{
                    label: "Lorem ipsum dolor, sit amet",
                    val: 124
                }, {
                    label: "Lorem ipsum dolor, sit ",
                    val: 421
                }, {
                    label: "Lorem ipsum dolor, sit amet",
                    val: 1234
                }, {
                    label: "Lorem ipsum dolor",
                    val: 45
                }, {
                    label: "Lorem ipsum dolor, sit amet",
                    val: 30
                }, {
                    label: "Lorem ipsum dolor",
                    val: 110
                }].map(e => <Card text={e.label} val={e.val} inc={<Exclude size={30} color="#4a00b4" />} />)}
            </div>

        </>
    )
}


export function Card({ text, val, inc }) {
    return (
        <>
            <div className={style.ca}>
                <div>
                    <center>   {inc}</center>
                </div>
                <div className={style.txt}>
                    {text}
                </div>
                <div className={style.val}>
                    {val}
                </div>
            </div>
        </>
    )
}


export let One = React.memo(function One({ choise, handleChoiseState }) {

    const [visbility3, v3] = useModal(false)

    const [position, setPosition] = React.useState({})


    const handleClick = (pos) => {
        v3(true)
        console.log(pos)
        setPosition({
            top: (pos.current.offsetHeight) + "px",
            left: pos.current.offsetHeight + "px"

        })
    }

    return (
        <>
            <div className={style.choose}>
                <span className={choise ? style.act : style.noact} onClick={() => { handleChoiseState(choise) }}> <Clipboard className={style.icon} size={20} color="#4a00b4" /> Publicités </span>
                <span className={choise ? style.noact : style.act} onClick={() => { handleChoiseState(!choise) }}> <Building className={style.icon} size={20} color="#4a00b4" /> Etablissement Pro</span>
            </div>

            <div className={!choise ? style.no : null}>
                <div className={style.end}>
                    <a className="btnPri">Ajouter</a>
                </div>



                <table>
                    <thead>
                        <th>#id</th><th>Nom ou Description Entreprises</th><th>Actions</th>

                    </thead>
                    <tbody>

                        {[1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test key={f} id={e} onDelete={handleClick} />)}
                    </tbody>
                </table>
            </div>
            {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
            <div className={choise ? style.no : null}>

                <div className={style.end}>
                    <a className="btnPri">Ajouter</a>
                </div>



                <table>
                    <thead>
                        <th>#id</th><th>Nom ou Description Etablissements</th><th>Actions</th>

                    </thead>
                    <tbody>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9].map((e, f) => <Test key={f} id={e} onDelete={handleClick} />)}
                    </tbody>
                </table>
            </div>


        </>
    )
}
)



export function Login({ onSetSudoToken, token }) {

    const [info, setInfo] = React.useState({
        username: "",
        password: ""
    })



    const router = useRouter()
    const error = React.useRef(null)
    const handleChange = (e) => {
        // if (e.target.value == "") return

        const name = e.target.name
        const value = e.target.value.toString()
        setInfo(state => {
            return {
                ...state,
                [name]: value
            }
        }

        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (info.username === "") {
                // error.current.innerText = "Veuillez ajouter un Nom"
                throw new Error("Veuillez ajouter un Nom")


            } else if (info.password === "") {

                // error.current.innerText = "Veuillez ajouter un mot de passe"
                throw new Error("Veuillez ajouter un mot de passe")

            } else {
                axios.post("/login", info).then(res => {
                    sessionStorage.setItem("sudoToken", res.data.access_token)
                    onSetSudoToken({ "sudoToken": res.data.access_token })

                })
                    .catch(res => alert(res))
            }

        } catch (e) {
            error.current.innerText = e
            return

        }



    }

    return (

        <div>
            {JSON.stringify(info)}
            <div className="error" ref={error}>

            </div>
            {token && token != undefined && token !== "" ?
                <p>Vous êtes déja connecter {JSON.stringify(info.username)} </p>
                :
                <form action="" onSubmit={handleSubmit}>
                    <center className={styles.h2}>
                        Connection
                    </center>
                    <div className={styles.df}>
                        <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                        <input type="text" value={info.username} name="username" onChange={handleChange} id="name" placeholder="Entrez votre Nom" />
                    </div>

                    <div className={styles.df}>
                        <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                        <input type="password" name="password" value={info.password} onChange={handleChange} id="password" placeholder="Entrez votre mot de passe" />
                    </div>

                    <div className={styles.df}>

                        <button type="submit" className="btnPri">Se Connecter </button>
                    </div>


                    <div className={styles.df}>
                        <span> mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span>
                    </div>
                </form>
            }

        </div>
    )
}

export function Test({ id, onDelete }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>#{id}</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td className="dfss"> <a className={style.disagree}>
                <Check size={20} color="#ffff" className={style.icon} /> Accepter</a>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}

export function Test2({ id, onDelete }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>#{id}</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td className="dfss"> <a className={style.disagree}>
                <Eye size={20} color="#ffff" className={style.icon} /> Voir la page</a>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}

export function Test3({ id, onDelete }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>#{id}</td>
            <td>Lorem ipsum </td>
            <td>+237 678 61 56 77 </td>
            <td className="dfss">
                {/*<a className={style.disagree}>
                 <Eye size={20} color="#ffff" className={style.icon} /> Voir la page</a> */}
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}

export function Test4({ id, onDelete }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>#{id}</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td className="dfss"> <a className={style.disagree}>
                <Eye size={20} color="#ffff" className={style.icon} /> Voir la page</a>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}