import React from 'react'
import { Lock, Person, BookmarkStar, Telephone, AspectRatio } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import { useRouter } from "next/router"
import axios from 'axios'
import "../global"
import { useForm } from "react-hook-form"






function CreateAccount({ stateChange, setToken, e, data }) {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const token = sessionStorage.getItem("token")
    const etoken = sessionStorage.getItem("etoken")
    const router = useRouter()
    const entrepriseId = sessionStorage.getItem("entrepriseId")
    const userId = sessionStorage.getItem("userId")

    

    // const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched", defaultValues: (data && data !== undefined && data !== "") ?  data : null})
    const onSubmit = async (formData) => {




        if (isValid) {


            if (e !== null && e !== undefined && e) {

                if (data && data !== undefined && data !== "") {

                    await axios.put('/entreprises/' + entrepriseId, formData, {
                        headers: {
                            Authorization: "Bearer " + etoken
                        }

                    }).then(res => {

                        sessionStorage.setItem("username", formData.username)
                        setFine("Votre comte à été créer avec succes!")


                        stateChange(false)
                        // router.push("/Entreprises")

                    }).catch(e => setErr("Ancien Mot de passe incorrect"))


                } else {

                    await axios.post('/add-entreprise', formData).then(res => {
                        sessionStorage.setItem("etoken", res.data.etoken)
                        sessionStorage.setItem("entreprise", res.data.username)
                        sessionStorage.setItem("entrepriseId", res.data.id)
                        setToken(sessionStorage.getItem("etoken"))
                        setFine("Votre comte à été créer avec succes!")
                        stateChange(false)
                        router.push("/StartPub")

                    }).catch(e => setErr("Cet utilisateur existe déjaiii" + e))

                }


            }
            else {



                if (data && data !== undefined && data !== "") {


                     await axios.put('/users/' + userId, formData, {
                        headers: {
                            Authorization: "Bearer " + token
                        }

                    }).then(res => {

                        sessionStorage.setItem("username", formData.username)
                        setFine("Votre comte à été créer avec succes!")


                        stateChange(false)
                        // router.push("/Entreprises")

                    }).catch(e => setErr("Ancien Mot de passe incorrect"))

                


                } else {
                  






                    await axios.post('/add-user', formData).then(res => {
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("username", res.data.username)
                        sessionStorage.setItem("userId", res.data.id)
                        setToken(sessionStorage.getItem("token"))


                        setFine("Votre compte à été créer avec succes!")


                        stateChange(false)


                        // router.push("/Entreprises")

                    }).catch(e => setErr("Cet utilisateur existe déja" + e))






                }



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
                    {(data && data !== undefined && data !== "") ? "Modifications de compte" : " Créer Votre Compte"}
                </center>
                <div className={styles.df}>
                    <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                    <input type="text" {...register("username", { required: (data && data !== undefined && data !== "") ? !true : true, maxLenght: 5 })} id="username" placeholder={!e ? "Entrez votre Nom" : "Entrez Le Nom d'Entrerise"} />

                </div>
                {errors.username && errors.username.type === "required" && (
                    <span className="error">Le nom est obligatoire</span>
                )}

                {errors.username && errors.username.type === "maxLenght" && (
                    <span >La valeur trop longue</span>
                )}
                <div className={styles.df}>
                    <label htmlFor="tel">  <Telephone color="#4a00b4" size="20px" /> </label>
                    <input type="text" id="tel"  {...register("tel", { required: (data && data !== undefined && data !== "") ? false : true, minLenght: 5 })}  placeholder="Entrez votre numéro Whatsapp" />

                </div>
                {errors.tel && errors.tel.type === "required" && (
                    <span className="error">Le numéro de téléphone est requis</span>
                )}
                {errors.tel && errors.tel.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}

                {data && data.password && <div><div className={styles.df}>
                    <label htmlFor="oldpassword"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type="password" id="oldpassword" {...register("oldpassword", { required: true, minLenght: 6 })} placeholder="Entrez l'ancien mot de passe" />

                </div>
                    {errors.oldpassword && errors.oldpassword.type === "required" && (
                        <span className="error">Le mot de passe est requis</span>
                    )}
                    {errors.oldPassword && errors.oldPassword.type === "minLenght" && (
                        <span >Min length exceeded</span>
                    )}
                </div>
                }
                <div className={styles.df}>
                    <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type="password" id="password"  {...register("newpassword", { required: (data && data !== undefined && data !== "") ? false : true, maxLenght: 9 })} placeholder={data !== undefined && data ? "Entrez votre nouveau mot de passe" : "Entrez votre mot de passe"} />

                </div>
                {errors.password && errors.password.type === "required" && (
                    <span className="error">Le mot de passe est requis</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}

                {(e !== null && e !== undefined && e) ?


                    <div>
                        <div className={styles.df}>
                            <label htmlFor="activity"> <AspectRatio color="#4a00b4" size="20px" /> </label>
                            <input type="text" {...register("activity", { required: (data && data !== undefined && data !== "") ? false : true, maxLenght: 5 })} id="activity" placeholder="Secteur d'activité" />

                        </div>
                        {errors.activity && errors.activity.type === "required" && (
                            <span className="error">Le secteur d'activité est obligatoire</span>
                        )}

                        {errors.activity && errors.activity.type === "maxLenght" && (
                            <span >La valeur trop longue</span>
                        )}


                    </div>


                    :

                    <div className={styles.df}>
                        <div className={styles.dfss}>
                            <label htmlFor="select"> <BookmarkStar color="#4a00b4" size="20px" /> </label>
                            <label htmlFor="select"> Status</label>

                        </div>
                        <select name="select" id="status"  {...register("status", { required: (data && data !== undefined && data !== "") ? false : true })} >
                            <option value="student">Élève</option>
                            <option value="parent">Parent D'Élève</option>
                        </select>
                        {errors.status && errors.status.type === "required" && (
                            <span className="error">Le status est requis</span>
                        )}

                    </div>
                }

                <div className={styles.df}>
                    <button className="btnPri">Enregistrer</button>
                </div>
            </form>

        </div>
    )
}

export default CreateAccount
