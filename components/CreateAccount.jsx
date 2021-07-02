import React from 'react'
import { Lock, Person, StopwatchFill, Telephone } from 'react-bootstrap-icons'
import styles from './Style/CreateAccount.module.css'

function CreateAccount() {
    return (
        <div>

            <center className={styles.h2}>
                Créer Votre Compte
            </center>
            <div className={styles.df}>
                <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>
                <input type="text" id="name" placeholder="Entrez votre Nom" />
            </div>
            <div className={styles.df}>
                <label htmlFor="tel">  <Telephone color="#4a00b4" size="20px" /> </label>
                <input type="text" id="tel" placeholder="Entrez votre numéro Whatsapp" />
            </div>
            <div className={styles.df}>
                <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                <input type="password" id="password" placeholder="Entrez votre mot de passe" />
            </div>

            <div className={styles.df}>
                <label htmlFor="select">Statut</label>

                <select name="select" id="select">
                    <option value="student">Élève</option>
                    <option value="parent">Parent D'Élève</option>
                </select>
            </div>

            <div className={styles.df}>
                <a className="btnPri">Enregistrer</a>
            </div>


        </div>
    )
}

export default CreateAccount
