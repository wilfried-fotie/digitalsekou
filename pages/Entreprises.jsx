import Head from 'next/head'
import styles from '../styles/Entreprises.module.css'
import Header from './Template/Header.jsx'
import HelpEntre from '../components/Entreprise/HelpEntre'
import CustomModal from '../components/customModal'
import React from 'react'
import Footer from './Template/footer'
import { ArrowRight } from 'react-bootstrap-icons'
import { useState } from 'react'
import Link from 'next/link'

function Entreprises() {

    const [state, setState] = useState(false)

    const handleClose = (s) => {
        setState(s => !s)
    }
    return (
        <>
            <Head>

            </Head>
            <Header value="4" />
            <main className={styles.main}>

                <div className="db">
                    <img src="/entreLeft.svg" />

                    <div >
                        <span className={styles.text}>
                            Il y'a  vous d'un côté et
                            les étudiants de l' autre
                            aujourd' hui il est possible
                            de vous réunir.
                            Obtenez de la visisbilité ou faites découvrir vos produits et services à des étudiants

                        </span>
                    </div>

                    <img src="/entreRight.svg" />

                </div>


                <h1 className={styles.h1}> OBTENER DE LA VISIBILITÉ AU PRÈS DES ÉTUDIANTS </h1>

                <center className={styles.split}>Comment ça marche</center>

                <div className={styles.df}>

                    <div className={styles.grid}>

                        <center> <span className={styles.os}>1</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                    <ArrowRight color="#4a00b4" size="300" />


                    <div className={styles.grid}>

                        <center> <span className={styles.os}>2</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                    <ArrowRight color="#4a00b4" size="300px" className={styles.icon} />


                    <div className={styles.grid}>

                        <center> <span className={styles.os}>3</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                </div>

                <div className={styles.mg}>
                    <Link href="/StartPub"><a className="btnPrimary" >Commencer maintenant</a></Link>
                    <a className="btnSecondary" onClick={() => {
                        handleClose(false)


                    }} >Obtenir de l'aide</a>
                </div>

                <h1 className={styles.h1}> FAITES DES OFFRES AUX ÉTUDIANTS </h1>


                <div className={styles.df}>

                    <div className={styles.grid}>

                        <center> <span className={styles.os}>1</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                    <ArrowRight color="#4a00b4" size="300" />


                    <div className={styles.grid}>

                        <center> <span className={styles.os}>2</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                    <ArrowRight color="#4a00b4" size="300px" className={styles.icon} />


                    <div className={styles.grid}>

                        <center> <span className={styles.os}>3</span></center>
                        <p className={styles.p}>
                            Créer des post publicitaires en quelques clics,
                            sous toutes les formes (texte, images , vidéos ),
                            ciblez les personnes les mieux supceptible à votre offre


                        </p>
                    </div>

                </div>

                <div className={styles.mg}>
                    <Link href="/StartPub"><a className="btnPrimary" >Commencer maintenant</a></Link>
                    <a className="btnSecondary"
                        onClick={React.useCallback((e) => {
                            e.preventDefault()
                            handleClose(false)


                        })}

                    >Obtenir de l'aide</a>
                </div>
                {state && <CustomModal onModalChange={handleClose} component={<HelpEntre />} />}
                {state && <CustomModal onModalChange={handleClose} component={<HelpEntre />} />}


            </main>
            <Footer />
        </>
    )
}

export default Entreprises
