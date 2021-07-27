import React from 'react'
import { Lock, Person, BookmarkStar, Telephone } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import { useRouter } from "next/router"
import axios from 'axios'
import "../global"
import { useForm } from "react-hook-form"






function Login({ stateChange, setToken, e }) {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()

    const entrepriseId = sessionStorage.getItem("entrepriseId")
    const userId = sessionStorage.getItem("userId")

    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched" })

    const onSubmit = async (data) => {



        if (isValid) {
            if (e !== null && e !== undefined && e) {

                await axios.post('/entreprise', data).then(res => {

                    sessionStorage.setItem("etoken", res.data.etoken)
                    sessionStorage.setItem("entreprise", res.data.username)
                    sessionStorage.setItem("entrepriseId", res.data.id)
                    setToken(sessionStorage.getItem("etoken"))
                    setFine("Votre comte est connecter avec succes!" + e)
                    stateChange(false)
                    router.push("/StartPub")


                }).catch(e => setErr("Cet utilisateur n'existe pas" + e))


            }
            else {

                await axios.post('/user', data).then(res => {



                    sessionStorage.setItem("token", res.data.token)
                    sessionStorage.setItem("username", res.data.username)
                    sessionStorage.setItem("userId", res.data.id)
                    setToken(sessionStorage.getItem("token"))
                    setFine("Votre comte est connecter avec succes!")
                    stateChange(false)
                    // router.push("/Entreprises")
                }).catch(e => setErr("Cet utilisateur n'existe pas" + e))


            }


        }




    }

    return (
        <div>
            {isSubmitted && fine && isSubmitSuccessful && <div className="fine">
                {fine}
            </div>}
            {err && isSubmitted && isValid && <div className="error">
                {err}
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <center className={styles.h2}>
                    Connexion
                </center>
                <div className={styles.df}>
                    <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                    <input type="text" {...register("username", { required: true, maxLenght: 5 })} id="username" placeholder={!e ? "Entrez votre Nom" : "Entrez Le Nom d'Entrerise"} />

                </div>
                {errors.username && errors.username.type === "required" && (
                    <span className="error">Le nom est obligatoire</span>
                )}

                {errors.username && errors.username.type === "maxLenght" && (
                    <span >La valeur trop longue</span>
                )}

                <div className={styles.df}>
                    <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type="password" id="password" aria-invalid={errors.password ? "true" : "false"} {...register("password", { required: true, maxLenght: 9 })} placeholder="Entrez votre mot de passe" />

                </div>
                {errors.password && errors.password.type === "required" && (
                    <span className="error">Le mot de passe est requis</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}


                <div className={styles.df}>
                    <button className="btnPri">Connexion</button>
                </div>
                <center style={{ fontSize: ".9em" }}>  <span>mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span></center>

            </form>

        </div>
    )
}

export default Login
