import Head from 'next/head'
import styles from '../styles/AddSchool.module.css'
import Header from './Template/Header.jsx'
import React from 'react'
import ADD from '../components/School/AddSchool'





function AddSchool() {



    return (
        <>
            <Head>

            </Head>
            <Header value="3" />
            <main className={styles.main}>
                <div className={styles.lending}>

                    <div className={styles.pad}> <center><h1>Créer gratuitement le site web de votre établissement</h1></center>
                    </div>
                    <p className={styles.p}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.

                    </p>


                    <ADD/>



                </div>

            </main>
        </>
    )
}

export default AddSchool
