import Head from 'next/head'
import styles from '../styles/AddSchool.module.css'
import Header from './Template/Header.jsx'
import React from 'react'
import ADD from '../components/School/AddSchool'
import { fetchAllSchoolData } from '../Model/getter'







function AddSchool({ schoolData}) {



    return (
        <>
            <Head>

            </Head>
            <Header value="3" />
            <main className={styles.main}>
                {/* <div className={styles.lending}>

                    <div className={styles.pad}> <center><h1>Créer gratuitement le site web de votre établissement</h1></center>
                    </div>
                    <p className={styles.p}>

                    </p>


                </div> */}
                <div className={styles.flex}>



                    <div className={styles.bar}>
                        
                        <center>  <div className={styles.round}>
                            1
                        </div></center>
                        <p>
                            Créer la version minimale du site web de votre établissement.
                        </p>  

                        <center>  <div className={styles.round}>
                            2
                        </div></center>
                        <p>
                            Accéder à votre administration et ajouter vos Spécialités / classes et prix, puis communiquer avec les parents et étudiants abonner à votre page.
                        </p>

                        <center>  <div className={styles.round}>
                            3
                        </div></center>
                        <p>
                           Accéder aux fonctionnalités avancé et enrichissez votre site web.
                        </p>


                    </div>
                    <div style={{flex: 1}}>
                        <ADD lastId={schoolData.school[[...schoolData.school].length - 1] && schoolData.school[[...schoolData.school].length - 1].id || 1}/>


                    
                       </div>
                    
                </div>
                
                


            </main>
          
        </>
    )
}

export default AddSchool





export async function getServerSideProps() {

    const schoolData = await fetchAllSchoolData();




    return {
        props: {
            schoolData,
          

        },
    };



}