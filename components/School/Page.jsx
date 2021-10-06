import React from 'react'
import { BellFill, BriefcaseFill, CloudArrowUpFill, GeoAlt, Grid3x3GapFill, HouseFill, PhoneFill, TelephoneFill, Tools } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import style from '../../styles/sudo.module.css'
import useChangeBool from '../handleBool'
import { Markup } from 'interweave';
import Link from 'next/link'
import styl from "../Entreprise/offre.module.css"
import useModal from '../CustomHooks/useModal'
import ModalEditor from '../modalEditor'
import { View } from '../SchoolAdmin/Fiches'
import Menu from '../Menu'




function Page({data,positions,types,spe,getPost,handleSubs,ab,abo,userId}) {


    const [choise, handleChoiseState] = useChangeBool(true)
    const [fixed, setFixed] = React.useState(false)
    const tab = abo ? abo.abo.abo : []
    const [menu, setMenu] = useModal(false)
const handleMenuClick = () => {
        setMenu(true)
    }
    const handleSubCribe = () => {
       handleSubs && handleSubs()
    }
    const handleCloseClick = () => {
        setMenu(false)

    }
    

    return (
        <div>
            
            <article>
                <div className={fixed ? styles.fixed : null} >

                    <div >

                        <div className={choise ? styles.offDesk : styles.offMob}>

                            <div className={styles.nav}>
<div className="desktopScreen">


                                    
                                <div className={choise ? "dfss" : styles.dfb}>
                                    <div>
                                        <img src={"/" + data.logo} className={styles.img} alt="Logo" />
                                    </div>
                                    <div className="mobileScreen" >
                                        {data.sigle.toUpperCase() || "Sigle"}
                                    </div>
                                        <Grid3x3GapFill className="mobileScreen" onClick={handleMenuClick} color="#4a00b4" size={20} />
                                        
                                    <div style={{ textTransform: "uppercase!important" }} className={!choise ? styles.bloc : styles.menu}>
                                        {data.sigle || "Sigle"}
                                    </div>
                                        <Grid3x3GapFill onClick={handleMenuClick} className={!choise ? styles.bloc : styles.menu} color="#4a00b4" size={20} />

                                    
                                    <div className={choise ? styles.links : styles.menu}>
                                        <a className="active"> Acceuil </a>
                                        <Link href="#spe"><a > Spécialités </a></Link>
                                        <Link href="#contact"><a > Contact </a></Link>


                                        </div></div></div> 
                                    <div className={choise ? "mobileScreen" : styles.dfb}>
                                    <div className={choise ? "dfbm" : styles.dfb}>

                                    <div>
                                        <img src={"/" + data.logo} className={styles.img} alt="Logo" />
                                    </div>
                                    <div className="mobileScreen" >
                                        {data.sigle.toUpperCase() || "Sigle"}
                                    </div>
                                        <Grid3x3GapFill onClick={handleMenuClick} className="mobileScreen" color="#4a00b4" size={20} />

                                    <div style={{ textTransform: "uppercase!important" }} className={!choise ? styles.bloc : styles.menu}>
                                        {data.sigle || "Sigle"}
                                    </div>
                                        <Grid3x3GapFill onClick={handleMenuClick} className={!choise ? styles.bloc : styles.menu} color="#4a00b4" size={20} />
                                    <div className="desktopScreen">

                                    
                                    <div className={choise ? styles.links : styles.menu}>
                                        <a className="active"> Acceuil </a>
                                        <Link href="#spe"><a > Spécialités </a></Link>
                                        <Link href="#contact"><a > Contact </a></Link>


                                            </div></div> </div>
                                </div>
                            </div>
                            <div className="pad">
                                <div className={data.disposition == 1 ? styl.tabl : data.disposition == 3 ? "dfonly" : styl.dfr}>

                                <div>


                                        <div className={data.disposition == 1 ? "padding" :"containText"}><Markup content={data.description} /> </div>


                                        <div className="mlef pad">
                                            <div className="d">
                                            
                                        <Link href={"https://wa.me/237" + data.tel}><a id="contact" className="btnSecondary ">Nous Contacter</a></Link>
                                            <a  className={(ab || tab.includes(parseInt(userId))) ? "btnSecondary" : "btnPrimary"} onClick={ab || tab.includes(parseInt(parseInt(userId))) ? ()=>{alert("Veuillez vous connecter avant de vous abonner")} : handleSubCribe}> <BellFill size={20} color={ab || tab.includes(parseInt(userId)) ? "#4a00b4" : "#FFF"} />{ab || tab.includes(parseInt(parseInt(userId)))? "Se Désabonner" : "Abonner-Vous !"} </a>
                                            
                                            </div>
                                        </div>
                                        <div className="padding">
                                <center style={{ display: "flex" }}> <GeoAlt size={20} color="#4a00b4" /> {positions.map(e => e.position + ", ")}</center> <br />
                                <center style={{ display: "flex" }}><TelephoneFill size={20} color="#4a00b4" /> {data.tel} </center>

                                    </div>
                                </div>
                                {data.profil.substring(data.profil.lastIndexOf(".")) == ".mp4" || data.profil.substring(data.profil.lastIndexOf(".")) == ".MP4" ? <video src={"/" + data.profil} width="40%" controls>La vidéo n'as pas pu se charger</video> : <img className="imgFill" src={"/" + data.profil} alt="image de profil" />}
                                  
                                </div></div>

                         
                            {data.pro && <div className="pad" id="spe">

                                {(data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) && types.types.map((e,k) => {
                                    return <div key={k} id={e.types}>
                                        <center className="h2">{e.types}</center>
                                        <div className="padding tab">
                                    <div className={style.article2} id={e.types}>

                                            <Tab value={spe.filter(i => i.who == e.types)} pre={false} />

                                            </div>
                                        </div>

                                    </div>
                                })}

                                {spe.length >= 1 && data.multiple == "Non" && <><center className="h2">Nos {types.types.map(e => e.types == "Supérieur").includes(true) ? "Spécialités" : "Classes"}</center>
                                    <div className="padding">
                                        <div className={style.article2} id={types.types[0].types}>
                                        <Tab value={spe} pre={false} data={data} types={types}/>
                                        </div></div></>}
                                <div className={styles.outro}>
                                    <div>

                                        <Markup content={data.outro} />
                                    </div>

                                </div>

                            </div>
                            }
                            <div className={styles.cont}>


                                {getPost.map((e, k) => <div key={k} style={{marginTop: "5%"}}>

                                    <center className="pading h2">{e.name.toUpperCase()}</center>
                                    <div className="pad">
                                    <div className={e.disposition == 1 ? style.dgp : e.disposition == 2 ? styl.dfss : styl.dfr}>



                                        <div className="dfss">

                                                {/* <img src={"/" + e.image} className={e.disposition !== 2 ? "imgFill" : "imgFill"} alt="image d'un post" /> */}
                                                <img src={"/Images/" + e.image} className={e.disposition !== 2 ? "imgFill" : "imgFill"} alt="image d'un post" />


                                        </div>

                                            <div></div>

                                            <div className={e.disposition == 1 ? "padding" : styles.textContent}>
                                                <Markup content={e.description} />
                                            </div>

                                        </div>

                                    </div>




                                </div>

                                )}

                            </div>




                            <div>

                            </div>
                        </div>
<div className="pad"></div>
                    </div>
                </div>









            </article>
            {menu && <Menu onModalChange={setMenu} component={<>
                <div className="tableMenu">
                    
          
                    <a className="active ds" ><HouseFill size={20} color="#4a00b4" /> Acceuil </a>
                    <Link href="#spe" ><a  className="ds"> <BriefcaseFill size={20} color="#4a00b4"/> Spécialités </a></Link>
                    <Link href="#contact" ><a  className="ds"> <PhoneFill size={20} color="#4a00b4"/> Contact </a></Link>

              </div>
            </>} />}
        </div>
    )
}

export default Page


export function Tab({ value, spe = true, pre = true,  data={}, types }) {



    let that = (data.multiple == "Non" && types.types[0].types == "Supérieur") ? "Spécialité" : (data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) ? "Spécialité ou Classe" : "Classe"


    return (
        <>
            <center>
            <table >

                <tbody>


                    {value.length == 0 && pre && <center><h1>Aucune {that} Créeé</h1></center>}


                    {value.map((e, f) => {

                        return <Tr key={f} spe={spe} k={f} pre={pre} value2={value} value={e}  />
                    }
                    )}
                </tbody>



            </table>
            </center>
        </>
    )
}





export function Tr({ k, value, value2, spe, pre }) {

    const [visbility, v] = useModal(false)

    const handleClick = () => {
        v(true)
    }

    return (<>

        <tr>
            {pre && <td>{k + 1}</td>}
            <td>{value.name}</td>

            {spe && <td >{value2[k].prix || value.price} FRCFA</td>}
            {spe && !pre && <td ><div> <a className="btnSecondary dfss" onClick={handleClick}  > <CloudArrowUpFill size={20} color="#4a00b4" />En savoir plus</a></div></td>}
        
            {visbility && <ModalEditor onModalChange={v} component={<View id={k} value={value} value2={value2} />} />}

        </tr>
    </>)
}

