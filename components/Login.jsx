import React from 'react'
import { Lock, Person, BookmarkStar, Telephone, EyeSlashFill, EyeFill } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import { useRouter } from "next/router"
import axios from 'axios'
import "../global"
import { useForm } from "react-hook-form"
import Loader from 'react-loader-spinner'
import { AccountContext } from '../pages/Template/Header'






function Login({ stateChange, setToken, e ,school}) {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched" })

    const onSubmit = async (data) => {

      

        if (isValid) {

            setLoader(true)

            data.username = data.username.trim().toLowerCase()
            if (e !== null && e !== undefined && e) {
                
                await axios.post('/entreprise', data).then(res => {

                    localStorage.setItem("etoken", res.data.etoken)
                    localStorage.setItem("entreprise", res.data.username)
                    localStorage.setItem("entrepriseId", res.data.id)
                    setToken(localStorage.getItem("etoken"))
                    setFine("Votre comte est connecter avec succes!")
                    stateChange(false)
                    router.push(`/StartPub?id=${res.data.id}&token=${res.data.etoken}`)


                }).catch(e => {
                    setErr("Cet utilisateur n'existe pas")
                    setLoader(false)
                })


            } else if (school) {
                
                await axios.post("/school", data).then(res => {

                    localStorage.setItem("schoolToken", res.data.schoolToken)
                    localStorage.setItem("school", res.data.school)
                    localStorage.setItem("schoolId", res.data.id)
                    setFine("Vous êtes connecter avec succes!")
                    stateChange(false)
                    router.push(`/addSchoolPro/${res.data.id}?token=${res.data.schoolToken}`)


                }).catch(e => {
                    setErr("Cet utilisateur n'existe pas")
                    setLoader(false)
                })
            }
            else {

                await axios.post('/user', data).then(res => {

                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", res.data.username)
                    localStorage.setItem("userId", res.data.id)
                    setToken(localStorage.getItem("token"))
                    setFine("Votre comte est connecter avec succes!")
                    stateChange(false)
                  
                }).catch(e => {
                    setErr("Cet utilisateur n'existe pas")
                    setLoader(false)
                })


            }


        }




    }

    const [state, setState] = React.useState(false)
    const handleClickShowPassword = () => {
        setState(s => !s);
    };

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
                    {school ? <a> Connexion compte Etablissement</a> : e ? <a> Connexion compte Entreprise</a> : <a> Connexion compte Etudiant/Parent</a>}
                </center>
                <div className={styles.df}>
                    <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                    <input type="text" {...register("username", { required: true, maxLenght: 5 })} id="username" placeholder={!e ? "Entrez votre Nom" : school ? "Entrez Le Sigle de l'école " : "Entrez Le Nom d'Entrerise"} />
                    <EyeSlashFill size={20} color="#FFF"  />
                </div>
                {errors.username && errors.username.type === "required" && (
                    <span className="error">Le nom est obligatoire</span>
                )}

                {errors.username && errors.username.type === "maxLenght" && (
                    <span >La valeur trop longue</span>
                )}

                <div className={styles.df}>
                    <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type={!state ? "password" : "text"} id="password" aria-invalid={errors.password ? "true" : "false"} {...register("password", { required: true, maxLenght: 9 })} placeholder="Entrez votre mot de passe" />
                    {!state ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}
                </div>
                {errors.password && errors.password.type === "required" && (
                    <span className="error">Le mot de passe est requis</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}


                <div className={styles.df}>
                    <button disabled={loader} className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}

                        Enregistrer</button>
                </div>
                <center style={{ fontSize: ".9em" }}>  <span>mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span></center>

            </form>

        </div>
    )
}

export default Login
