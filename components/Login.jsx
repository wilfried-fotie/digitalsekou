import React from 'react'
import { Lock, Person, StopwatchFill, Telephone } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import "../global"
import axios from "axios"
import { useRouter } from "next/router"

function CreateAccount() {

    const [info, setInfo] = React.useState({
        username: "",
        password: ""
    })
    const router = useRouter()
    const token = sessionStorage.getItem("token")
    const error = React.useRef(null)
    const [store, setStore] = React.useState()
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
                    sessionStorage.setItem("token", res.data.access_token)
                    setStore(res.data.access_token)
                    router.push('/addSchoolPro')
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

export default CreateAccount
