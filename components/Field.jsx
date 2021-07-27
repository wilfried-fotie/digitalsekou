import React from 'react'
import styles from './Style/CreateAccount.module.css'
// import { useRouter } from "next/router"
import axios from 'axios'
import "../global"

function Field({onChange, label}) {
    return (
        <div>
            <div className={styles.df}>
                <label htmlFor="name"> {icon} </label>
                <input type="text" {...register("username", { required: true, maxLenght: 5 })} id="username" placeholder={!e ? "Entrez votre Nom" : "Entrez Le Nom d'Entrerise"} />

            </div>
            {errors.username && errors.username.type === "required" && (
                <span className="error">Le nom est obligatoire</span>
            )}

            {errors.username && errors.username.type === "maxLenght" && (
                <span >La valeur trop longue</span>
            )}
        </div>
    )
}

export default Field
