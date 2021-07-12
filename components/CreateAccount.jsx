import React from 'react'
import { Lock, Person, BookmarkStar, Telephone } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'
import { useRouter } from "next/router"
import axios from 'axios'
import "../global"





function CreateAccount() {

    const [data, setData] = React.useState({
        username: "",
        tel: "",
        password: "",
        status: "student"

    })

    const router = useRouter()
    const error = React.useRef(null)
    const [store, setStore] = React.useState()

    const handleChange = (e) => {

        const name = e.target.id
        const value = e.target.value.toString()

        setData(state => {
            return {
                ...state,
                [name]: value
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        try {


            if (data.username === "" || data.username == undefined) {
                throw new Error("Veuillez ajouter un Nom")
                return
            } else if (data.tel === "" || data.tel == undefined) {

                throw new Error("Veuillez ajouter un Numéro de tel")
                return
            } else if (data.status === "" || data.status == undefined) {
                throw new Error("Veuillez ajouter un status")
                return
            } else if (data.password === "" || data.password == undefined) {
                throw new Error("Veuillez ajouter un password")
                return
            } else {
                axios.post("/create", data).then(res => {
                    sessionStorage.setItem("token", res.data.access_token)
                    setStore(res.data.access_token)

                    router.push('/addSchoolPro')
                }).catch(res => alert(res))

            }

        } catch (e) {
            error.current.innerText = e
            return

        }

    }


    return (
        <div>
            {JSON.stringify(data)}
            <div className="error" ref={error}>

            </div>
            <form onSubmit={handleSubmit}>
                <center className={styles.h2}>
                    Créer Votre Compte
                </center>
                <div className={styles.df}>
                    <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                    <input type="text" value={data.username} onChange={handleChange} id="username" placeholder="Entrez votre Nom" />
                </div>
                <div className={styles.df}>
                    <label htmlFor="tel">  <Telephone color="#4a00b4" size="20px" /> </label>
                    <input type="text" id="tel" value={data.tel} onChange={handleChange} placeholder="Entrez votre numéro Whatsapp" />
                </div>
                <div className={styles.df}>
                    <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type="password" id="password" value={data.password} onChange={handleChange} placeholder="Entrez votre mot de passe" />
                </div>

                <div className={styles.df}>
                    <div className={styles.dfss}>
                        <label htmlFor="select"> <BookmarkStar color="#4a00b4" size="20px" /> </label>
                        <label htmlFor="select"> Status</label>

                    </div>

                    <select name="select" id="status" value={data.status} onChange={handleChange}>
                        <option value="student">Élève</option>
                        <option value="parent">Parent D'Élève</option>
                    </select>
                </div>

                <div className={styles.df}>
                    <button className="btnPri">Enregistrer</button>
                </div>
            </form>

        </div>
    )
}

export default CreateAccount
