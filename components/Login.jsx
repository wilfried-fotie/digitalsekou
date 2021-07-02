import React from 'react'
import { Lock, Person, StopwatchFill, Telephone } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'

function CreateAccount() {
    return (
        <div>

            <center className={styles.h2}>
                Connection
            </center>
            <div className={styles.df}>
                <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                <input type="text" id="name" placeholder="Entrez votre Nom" />
            </div>

            <div className={styles.df}>
                <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                <input type="password" id="password" placeholder="Entrez votre mot de passe" />
            </div>

            <div className={styles.df}>
                <a className="btnPri">Se Connecter</a>
            </div>


            <div className={styles.df}>
                <span> mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span>
            </div>

        </div>
    )
}

export default CreateAccount
