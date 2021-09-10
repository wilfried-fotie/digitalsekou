import React from 'react'
import { GeoAlt, Grid3x3GapFill, TelephoneFill } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/AddSchool.module.css'
import useChangeBool from '../handleBool'
import { Markup } from 'interweave';
import Link from 'next/link'
import { Tab } from '../SchoolAdmin/Fiches'


function WebsitePreview() {

    const data = React.useContext(SchoolContext).data.schoolData.school
    const positions = React.useContext(SchoolContext).data.positions.positions
    const types = React.useContext(SchoolContext).data.types
    const spe = React.useContext(SchoolContext).data.spe
    const [choise, handleChoiseState] = useChangeBool(true)
    const [fixed, setFixed] = React.useState(false)

   
    
    return (
        <div>

            <article>
                <div className={fixed ? styles.fixed : null} >
                    <div className={styles.nav}>
                        <a onClick={() => { handleChoiseState(choise) }} className={choise ? styles.active : null}>Desktop</a>
                        <a className={!choise ? styles.active : null} onClick={() => { handleChoiseState(!choise) }}>Mobile</a> </div>
                    <div className={styles.content}>

                        <div className={choise ? styles.offDesk : styles.offMob}>
                            <div className={styles.nav}>
                                <div className={choise ? "dfss" : styles.dfb}>

                                    <div>
                                        <img src={"/" + data.sigle + "-" + data.logo} className={styles.img} alt="Logo" />
                                    </div>
                                    <div style={{textTransform: "uppercase!important"}}  className={!choise ? styles.bloc : styles.menu}>
                                        {data.sigle || "Sigle"}
                                    </div>
                                    <Grid3x3GapFill className={!choise ? styles.bloc : styles.menu} color="#4a00b4" size={20} />
                                    <div className={choise ? styles.links : styles.menu}>
                                        <a className="active"> Acceuil </a>
                                        <Link href="#spe"><a > Spécialités </a></Link>
                                        <Link href="#contact"><a > Contact </a></Link>


                                    </div>
                                </div>
                            </div>
                                <div className={styles.df}>

                                    <div className={styles.app}>
                                        <div className="h1">

                                            {data.name}
                                            ( {data.sigle} ) </div>

                                        <div><Markup content={data.description} /> </div>
                                        

                                        <div>
                                            <Link href={"https://wa.me/237" + data.tel}><a id="contact" className="btnPrimary">Nous Contacter</a></Link>
                                        </div>
                                    </div>
                                {data.profil.substring(data.profil.lastIndexOf(".")) == ".mp4" || data.profil.substring(data.profil.lastIndexOf(".")) == ".MP4" ? <video src={"/" + data.sigle + "-" + data.profil} width="40%" controls>La vidéo n'as pas pu se charger</video> : <img height="250px" src={"/" + data.sigle + "-" + data.profil} alt="image de profil"/> }
                            </div>
                        
                            <center style={{ display: "flex" }}> <GeoAlt size={20} color="#4a00b4" /> {positions.map(e => e.position + ", ")}</center> <br />
                                <center style={{ display: "flex" }}><TelephoneFill size={20} color="#4a00b4" /> {data.tel} </center>
                              {data.pro && <div id="spe">
                                
                             
                                    <center className="h2">Nos Spécialités</center>
                                    <div className="pad">
                                        <Tab value={spe} pre={false}/>
                                   </div>
                                <div className={styles.outro}>
                                    <div>
                                        <center className="h2">Notes</center>

                                        <Markup content={data.outro} />
                                    </div>

                                   </div>



                                </div>
                            }
                                <div>

                            </div>
                             </div>

                        </div>
                    </div>





              


                
            </article>
        </div>
    )
}

export default WebsitePreview


export function Tr({spe}) {
    return (<tr>
        <td style={{ textAlign: "left!important" }}>{spe.name}</td>
        <td>{spe.prix}</td>
    </tr>)
}

export function Th({ spe }) {
    return (<tr>
        <td colSpan="2" style={{color: "#4a00b4" }}>{spe.fil}</td>
        
    </tr>)
}

