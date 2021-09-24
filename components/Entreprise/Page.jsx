import React from "react"
import { GeoAlt, Image as Img, ImageFill, Globe, TelephoneFill } from 'react-bootstrap-icons'
import styles from "./site.module.css"
import { Markup } from 'interweave'
import Link from 'next/link'
import styl from "../Entreprise/offre.module.css"




export default function Page({ data,position,getPost,getProduct,entreprise ,mode}) {


    return (
        <div className={styles.pag}>
            <nav className={styles.nav}>


                {data.logo && <img src={"/" +  data.logo} className='logo' alt={data.name} /> || <div className="dfss"> <ImageFill size={20} color="#4a00b4" />  <span>Logo</span> </div>}



                <div  className={styles.df}>
                    <a className="active"> Acceuil</a>
                    {data.prod && <Link href="#catalogue"><a>Catalogue</a></Link>}
                    {data.pres && <Link href="#services"><a>Nos Services</a></Link>}
                    <Link href="#contact"><a>Nous Contacter</a></Link>
                </div>

            </nav>

            <div className={data.disposition == 1 ? styles.flexTab : data.disposition == 3 ? styles.dfb : styl.dfr} >
                <div className={mode ? styles.cont : styles.contain}>
                    {data.outro ? <Markup content={data.outro.substr(0, 1000) } /> : "Description de votre entreprise sera afficher ici"}

                </div>

                {/* {data.profil ? <img  src={data.profil} /> : } */}

                {data.profil ? <img src={"/" + data.profil} className="imgFill" alt="image ou vidéo chargé" /> : <Img size={250} color="#4a00b4" />}
            </div>

            <div className={mode ? styles.cont : "padding"} id="contact">
                <div className={mode ? styles.cont0 : "padding"}>
                <Link href={"https://wa.me/237" + data.tel}><a className="btnPrimary">Nous contacter</a></Link>

                </div>
                
            <b className="padding" style={{top: "30px"}}>{data.activity}</b>

            <div className={styles.padding}>

            
            <div>
                <span className={styles.dfs}>   <TelephoneFill size={20} color="#4a00b4" /> {data.tel || "Téléphone"}</span>

                    {data.offline && <span className={styles.dfs}>   <GeoAlt size={20} color="#4a00b4" /> {position == [] ? "Villes dans lesquelles vous êtes" : position && position.map(e => e.position + ", ")}</span>}
                    {data.offline && <span className={styles.dfs}>
                        {data.description_position ? data.description_position : " Description de votre emplacement "}
                        
                    </span>}
                    {(data.site || data.web) && <Link href={data.site || data.web}><a className={styles.dfs} style={{ color: "blue" }}>  <Globe size={20} color="#4a00b4" /> {data.name}</a></Link>}




                </div>

                </div></div>

            <div>
            
            </div>
            <div>

              {data.pres &&  <div className={mode ? styles.cont : "pad"}>
                    <center> <h1 id="services" className={styles.top} style={{color: "#4a00b4" }}>Nos Services</h1></center>

                    {getPost.map((e,k) => <div key={k}>

         <center className="pad h2">{e.name}</center>
  <div className={e.disposition == 1 ? styles.dgp : e.disposition == 2 ? styles.dfss : styles.dfr}>

                      

                            <div className="dfss">

                                <img src={ "/" +  e.image} className={e.disposition !== 1 ? "imgFill" : styles.imageFill} alt="image d'un post" />


                        </div>

                        <div>

                            <div className="pad">
                              <Markup content={e.description}/>
                                </div>
                                <center className="pad"><a className="btnSecondary">Demander un dévis</a></center>

                        </div>

                    </div>
                        
                        
                        
                      
                    </div>

                    )}

                </div>}
                {data.prod && <div className={mode ? styles.cont : "pad"}>
                    <center> <h1 id="catalogue" className={styles.top} style={{ color: "#4a00b4" }}>Nos Articles</h1></center>
                    <div className={styles.grid}>
     
                        {getProduct.map((e,k) => <div key={k} className="pad" >

                        <div className="dfss">

                                <img src={ "/" + e.image} className="imgFill" alt="image d'un post" />


                        </div>
                            <center className="pad b"> {e.name}</center>

                        <center className="pad b"> {e.price + " Frcfa"}</center>
                       
                    </div>)} </div>
                </div>}
            </div>

        </div>
    )
}

