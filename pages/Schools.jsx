import Head from 'next/head'
import Header from './Template/Header.jsx'
import Image from 'next/image'
import CustomModal from '../components/customModal'
import styles from '../styles/Search.module.css'
import React from 'react'
import Footer from './Template/footer'
import { Search, GeoAlt } from 'react-bootstrap-icons'
import Result from '../components/School/result.jsx'

function Schools() {
    return (
        <>
            <Header value={2} />
            <main>
                <div className={styles.search}>
                    <h1>Rechercher les établissements</h1>
                </div>

                <div className={styles.df}>  <div className={styles.searBar}>
                    <input type="text" id={styles.input} placeholder="Recherchez tous sur les écoles" />
                    <div className={styles.icon}>
                        <Search color="#fff" size="20px" />
                    </div>
                </div>
                </div>
                <div className={styles.result}>
                    <div className={styles.left}>
                        <b>Filtrer Par</b> <br />
                        <div className={styles.pad}>
                            <a>types</a>

                            <div className={styles.pad}>
                                <div>
                                    <input type="radio" name="public" className={styles.pub} id="pub" />
                                    <label htmlFor="pub">Public</label>
                                </div>
                                <div >
                                    <input type="radio" name="public" className={styles.pub} id="priv" />
                                    <label htmlFor="priv">Privé</label>
                                </div>
                            </div>

                        </div>


                        <div className={styles.pad}>
                            <a>Niveau</a>

                            <div className={styles.pad}>

                                <div >
                                    <input type="radio" name="level" className={styles.pub} id="uni" />
                                    <label htmlFor="uni">Universités</label>
                                </div>

                                <div >
                                    <input type="radio" name="level" className={styles.pub} id="lyc" />
                                    <label htmlFor="lyc">Lycée</label>
                                </div>
                                <div>
                                    <input type="radio" name="level" className={styles.pub} id="pri" />
                                    <label htmlFor="pri">Primaire</label>
                                </div>
                                <div >
                                    <input type="radio" name="level" className={styles.pub} id="mat" />
                                    <label htmlFor="mat">Maternelles</label>
                                </div>

                                <div >
                                    <input type="radio" name="level" className={styles.pub} id="cre" />
                                    <label htmlFor="cre">Crèches</label>
                                </div>



                            </div>

                        </div>

                    </div>
                    <div className={styles.right}>
                        <Result />
                        <Result />
                        <Result />
                        <Result />

                    </div>

                </div>
            </main>


            <Footer />
        </>
    )
}

export default Schools
