import React from 'react'
import { Lock, Person, BookmarkStar, Telephone, AspectRatio, EyeSlashFill, EyeFill } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import { useRouter } from "next/router"
import axios from 'axios'
import "../global"
import { useForm } from "react-hook-form"
import Loader from 'react-loader-spinner'
import { AccountContext } from '../pages/Template/Header'






function CreateAccount({ stateChange, setToken, e}) {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const token = localStorage.getItem("token")
    const etoken = localStorage.getItem("etoken")
    const router = useRouter()
    const entrepriseId = localStorage.getItem("entrepriseId")
    const userId = localStorage.getItem("userId")
    const data = React.useContext(AccountContext).data

    console.log(data)
    
    

    // const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched", defaultValues: (data && data !== undefined && data !== "") ?  data : null})
    const onSubmit = async (formData) => {




        if (isValid) {


            if (e !== null && e !== undefined && e) {

                if (data && data !== undefined && data !== "") {
                    formData.username = formData.username.trim()
                    formData.tel = formData.tel.trim()
                    setLoader(true)
                    await axios.put('/entreprises/' + entrepriseId, formData, {
                        headers: {
                            Authorization: "Bearer " + etoken
                        }

                    }).then(res => {

                        localStorage.setItem("username", formData.username)
                        setFine("Votre comte à été créer avec succes!")


                        stateChange(false)
                        // router.push("/Entreprises")

                    }).catch(e =>{
                        setLoader(false)
                        
                     setErr("Ancien Mot de passe incorrect")
                })

                } else {
                    formData.username = formData.username.trim()
                    formData.tel = formData.tel.trim()
                    setLoader(true)
                    await axios.post('/add-entreprise', formData).then(res => {
                        localStorage.setItem("etoken", res.data.etoken)
                        localStorage.setItem("entreprise", res.data.username)
                        localStorage.setItem("entrepriseId", res.data.id)
                        setToken(localStorage.getItem("etoken"))
                        setFine("Votre comte à été créer avec succes!")
                        stateChange(false)
                        router.push(`/StartPub?id=${res.data.id}&token=${res.data.etoken}`)

                    }).catch(e =>{
                        setLoader(false)
                        
                     setErr("Cet utilisateur existe déjà")
                })
                }


            }
            else {



                if (data && data !== undefined && data !== "") {

                    formData.username = formData.username.trim()
                    formData.tel = formData.tel.trim()
                    setLoader(true)
                     await axios.put('/users/' + userId, formData, {
                        headers: {
                            Authorization: "Bearer " + token
                        }

                    }).then(res => {

                        localStorage.setItem("username", formData.username)
                        setFine("Votre comte à été créer avec succes!")


                        stateChange(false)
                        // router.push("/Entreprises")

                    }).catch(e =>{
                        setLoader(false)
                        
                     setErr("Ancien Mot de passe incorrect")
                })
                


                } else {
                  



                    formData.username = formData.username.trim()
                    formData.tel = formData.tel.trim()
                    setLoader(true)
                    await axios.post('/add-user', formData).then(res => {
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("username", res.data.username)
                        localStorage.setItem("userId", res.data.id)
                        setToken(localStorage.getItem("token"))


                        setFine("Votre compte à été créer avec succes!")


                        stateChange(false)


                        // router.push("/Entreprises")

                    }).catch(e =>{
                        setLoader(false)
                        
                     setErr("Cet utilisateur existe déja")
                })





                }



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
                    <input type="number" id="tel"  {...register("tel", { required: (data && data !== undefined && data !== "") ? false : true, minLenght: 5 })}  placeholder="Entrez votre numéro Whatsapp" />

                </div>
                {errors.tel && errors.tel.type === "required" && (
                    <span className="error">Le numéro de téléphone est requis</span>
                )}
                {errors.tel && errors.tel.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}

                {data && data.password && <div><div className={styles.df}>
                    <label htmlFor="oldpassword"> <Lock color="#4a00b4" size="20px" /> </label>
                    <div className="bb">
                    <input type={!state ? "password" : "text"} id="oldpassword" {...register("oldpassword", { required: true, minLenght: 6 })} placeholder="Entrez l'ancien mot de passe" />
                    {!state ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}
                    </div>
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
                   
                    
 <div className="bb">
                        <input type={!state ? "password" : "text"} id="password"  {...register("newpassword", { required: (data && data !== undefined && data !== "") ? false : true, maxLenght: 9 })} placeholder={data !== undefined && data ? "Entrez votre nouveau mot de passe" : "Entrez votre mot de passe"} />
                    {!state ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}

                   </div>

                    </div>
              
                {errors.password && errors.password.type === "required" && (
                    <span className="error">Le mot de passe est requis</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <span >Max length exceeded</span>
                )}

                {(e !== null && e !== undefined && e) ?

null


                    :


                   <div className={styles.df}> 
  <div className={styles.dfss}>
                            <label htmlFor="select"> <BookmarkStar color="#4a00b4" size="20px" /> </label>
                            <label htmlFor="select"> Status</label>

                    
                        </div>

                    <div className={styles.dg}>
                       
                        <div className="dfs">
                            <input type="radio" name="status" id="eleve" value="eleve" {...register("status", { required: (data && data !== undefined && data !== "") ? false : true })} />
                            <label htmlFor="eleve">Élève</label>

                        </div>


                        <div className="dfs">
                                <input type="radio" name="status" id="parent" value="parent" {...register("status", { required: (data && data !== undefined && data !== "") ? false : true })}/>
                         <label htmlFor="parent">Parent D'Élève</label>
                         
                        </div>

                       
                    
                        {errors.status && errors.status.type === "required" && (
                            <span className="error">Le status est requis</span>
                        )}

                        </div>
                    </div>
                }

                <div className={styles.df}>
                    <button disabled={loader}  className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}
                    
                        Enregistrer</button>
                </div>
            </form>

        </div>
    )
}

export default CreateAccount
