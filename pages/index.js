import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './Template/Header.jsx'
import SimpleSlider from "../components/caroussel"
import React from "react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Binoculars, Check, Facebook, Globe, Google, Linkedin, PersonBoundingBox } from 'react-bootstrap-icons'
import Footer from './Template/footer';
import Link from 'next/link';
import { fecthFinePub, fecthFineOffer } from '../Model/getIndex';
import { Markup } from 'interweave'



export default function Home({getPub,getOffer}) {
  return (
    <div className={styles.container}>

      <Head>

        <title > DigitalSekou </title>
        <meta name="description"
          content="Découvrez toutes les informations relatives aux établiments(universités, lycées, collèges,
              écoles primaire, crèches, etc...).Puis créer vous un compte pour être alerté par les établissements ou même encore entrer en contact avec à distance et être au courant de tous ce qui s 'y passe." />
        <link rel="icon"
          href="/favicon.ico" />
      </Head>

      <Header 
      value="1" 
      
      />

      <main className={styles.main} >

        <div className={styles.df} >

          <div className={styles.left} >

            <h1 className={styles.text} >
              Prenez Le Contrôle De Votre Éducation Ou Celui De Vos Enfants.
            </h1> <p className={styles.description} >
              Découvrez toutes les informations relatives aux établiments(universités, lycées, collèges,
              écoles primaire, crèches, etc...).Puis créer vous un compte pour être alerté par les établissements ou même encore entrer en contact avec à distance et être au courant de tous ce qui s 'y passe. </p>

            <div className={styles.btns} >
              <Link href="/Schools"><a className="btnPrimary"> Commencer Maintenant </a></Link>
              <Link href="/AddSchool"><a className="btnSecondary"> Ajouter votre établissement </a></Link>
            </div>
            
          </div> <div className={styles.right} >
            <img src="/right.png" className="imgScreen" alt="profil education" />
          </div>



        </div>

   


      { (getPub.pubs && getPub.pubs[0] !== undefined || getOffer.offers && getOffer.offers[0]  !== undefined) &&   <div className={styles.pub} >

          <div className={styles.span} >

            <h2 > Publicité </h2> </div > <div className={styles.slider} >

           <SimpleSlider data={getOffer.offers} pub={getPub.pubs }/>

          </div> </div>}

        <div className={styles.icones}>

          <center>
            <h2>ILS NOUS FONT CONFIANCE</h2>

          </center>


          <div className={styles.dfc}>




            <img src="/misofe.png" height="80px" alt="misofe" />
            <img src="/telechargement.jpeg" height="80px" alt="" />
            
            <img src="/lounch.png" height="80px" alt="lounch" />
            
            
          </div>
        </div>


        <div className={styles.plan}>
          <center>
            <h2> POURQUOI TRAVAILLER AVEC NOUS </h2>

          </center>

          <div className="df">

            <div className={styles.card3}>
              <Globe className={styles.icon} color="#4a00b4" size="50px" />
              <div className={styles.content}>
                Digitaliser votre établissement ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </div>
            </div>

            <div className={styles.card3}>
              <PersonBoundingBox className={styles.icon} color="#4a00b4" size="50px" />
              <div className={styles.content}>
                Être proche des parents et de vos élèves ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </div>
            </div>

            <div className={styles.card3}>
              <Binoculars className={styles.icon} color="#4a00b4" size="50px" />
              <div className={styles.content}>
                Automatiser la gestion de votre établissement
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </div>
            </div>

          </div>


        </div>


        <div className={styles.raison}>

          <center>
          <div className="spacer"> 
            <h2> LES PLANS TARIFAIRES </h2>
          </div>
          </center>

          <div className={styles.df}>


            <div className={styles.card}>

              <h2 className={styles.h3}>   Gratuit </h2>

              <div className={styles.def}>
                <Check color="green" size="30" />
                <div>
                  Faites connaître votre établissement

                </div>
              </div>
              <div className={styles.def}>
                <Check color="green" size="30" />
                <div>
                  Trouver de la visibilité

                </div>

              </div>

              <center> < a href="" className="btnSecondary" > Commencer gratuitement </a></center>
            </div>


            <div className={styles.card}>

              <h2 className={styles.h3}>   Professionnel </h2>

              <div className={styles.def}>
                <Check color="green" size="30" />
                <div className={styles.op}>
                  Faites connaître votre établissement

                </div>
              </div>
              <div className={styles.def}>
                <Check color="green" size="30" />
                <div className={styles.op}>
                  Trouver de la visibilité

                </div>


              </div>
              <div className={styles.def}>
                <Check color="green" size="30" />
                <div className={styles.op}>
                  Trouver de la visibilité

                </div>


              </div>
              <div className={styles.def}>
                <Check color="green" size="30" />
                <div className={styles.op}>
                  Trouver de la visibilité

                </div>


              </div>
              <div className={styles.def}>
                <Check color="green" size="30" />
                <div className={styles.op}>
                  Trouver de la visibilité

                </div>


              </div>

              <center>  <a href="/SingUp" className="btnPrimary">Commencer Maintenant</a> </center>

            </div>

          </div>



        </div>
        

      </main>

      <Footer />
    </div >
  )
}



export async function getServerSideProps() {


    const getOffer = await fecthFineOffer()
    const getPub = await fecthFinePub()



    return {
        props: {
            
         
            getOffer,
            getPub

          

        },
    };



}




