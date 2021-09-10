import React from 'react'
import Footer from '../Template/footer'
import Link from 'next/link'
import { fetchAbonnement, fetchFilieres, fetchPositions, fetchSchoolSlugData, fetchSpecialities, fetchTypes } from '../../Model/getter'
import { ArrowLeft, Bell, ChevronLeft, EmojiNeutralFill, GeoAlt, Grid3x3GapFill, TelephoneFill, Whatsapp, XCircleFill, XOctagonFill } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import { Markup } from 'interweave';
import Head from 'next/head'
import App from '../../components/SchoolAdmin/notif'
import axios from 'axios'
import Header from '../Template/Header'

function ViewSchool({ school, positions, specialities, abo }) {
    const data = school.school
    const spe = specialities ? [...specialities.specialities] : []

    const [message, setMessage] = React.useState(true)
    const [abonnement, setAbonnement] = React.useState(false)
    const [userId, setuserId] = React.useState(false)
    React.useEffect(() => {
    setuserId(sessionStorage.getItem("userId"))
},[userId])
    const tab = abo ? abo.abo.abo : []
    const handleClickSuscribe = () => {
        if (sessionStorage.getItem("userId")) {
            axios.post("/abonnement", { userId: parseInt(sessionStorage.getItem("userId")), schoolId: data.id}).then(res => setAbonnement(true)).catch(e=> console.log(e))
            setAbonnement(true)
        } else {
            alert("veuiller créer un compte ou vous connecter  avant de pouvoir vous abonner aux établissements")
        }
    }

    const url = "/" + data.sigle + "-" + data.profil



    const handleSendData = async(e) => {
        await axios.post("/message",{userId: sessionStorage.getItem("userId"), message: e.toString(), schoolId: data.id}).then(res => null).catch(r=>alert(r))
    }
  
    return (
       <>
       {!school.error  &&  <div>
           
                <Head>
                    <title>{data.sigle}</title>
<meta name="description" content={data.description} />
            </Head>
<Header value={2} normal={false}/>
           
            <main>
                  
                <article className={styles.art}>
                    <div  >
                      
                      

                                    <div className={ "dfss" }>
                                        <div>
                                            <img src={"/" + data.sigle + "-" + data.logo} className={styles.img} alt="Logo" />
                                            <div style={{ textTransform: "uppercase!important", fontFamily: "MontserratBold" }} className={styles.bloc}>
                                        <center>  {data.sigle}</center>
                                    </div>
                                    
                                        </div>
                                       
                                        <Grid3x3GapFill className={styles.menu} color="#4a00b4" size={20} />

                                        <div className={styles.links}>
                                            <a className="active"> Acceuil </a>
                                            <Link href="#spe"><a > Spécialités </a></Link>
                                            <Link href="#contact"><a > Contact </a></Link>


                                        </div>
                                    </div>
                        </div>
                     
                    <div className={styles.contain}>
                                <div className={styles.df}>

                                    <div className={styles.app}>
                                        <div className="h1">

                                            {data.name}
                                         </div>

                                    <div id="contact"><Markup content={data.description} /> </div>

                                    

                                        <div style={{marginTop: "30px"}}>
                                        <Link href={"https://wa.me/237" + data.tel}><a className="btnSecondary">Nous Contacter</a></Link>
                                        {abonnement || tab.includes(parseInt(userId)) ? <a style={{ marginLeft: "20px", padding: "6px 15px 5px" }} onClick={() => alert("veuillez nous écrire les raison de votre choix")} className="btnSecondary">Se Désabonner <Bell size={15} color="#4a00b4" /> </a> : <a style={{ marginLeft: "20px", padding: "6px 15px 5px" }} onClick={handleClickSuscribe} className="btnPrimary">Abonner-vous <Bell size={15} color="#FFF" /> </a>}
                                        
                                        
                                        
                    
                                    </div>
                                   
                                    <div className={styles.digi}>
                                        <center style={{ display: "flex" }}> <GeoAlt size={20} color="#4a00b4" /> {positions && positions.positions.map(e => e.position + ", ")}</center> <br />
                                        <center style={{ display: "flex" }}><TelephoneFill size={20} color="#4a00b4" /> {data.tel} </center>

                                    </div>
                                    </div>
                                {data.profil.substring(data.profil.lastIndexOf(".")) == ".mp4" || data.profil.substring(data.profil.lastIndexOf(".")) == ".MP4" ? <video width="40%" src={url} controls>La vidéo n'as pas pu se charger</video> : <img src={"/" + data.sigle + "-" + data.profil} alt="image de profil" />}

                        </div>
 </div>
               
                        {data.pro &&

                               <div id="spe">
                                    <center className="h2">Nos Spécialités</center>
                                    <div style={{ marginTop: "30px" }}>
                             <center>   <table boredr="1px!important">
                                    <thead>
                                        <tr>
                                             <th>Spécialité/Classes</th>
                                            <th>Description</th>
                                            <th>Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {spe.map((e,k) => <Tr key={k} value={e}/>)}
                                       
                                   
                                    </tbody>



                                </table></center>
                                    </div>
                                    <div className={styles.outro}>
                                        <div>
                                            <center className="h2">Notes</center>

                                            <Markup content={data.outro} />
                                        </div>

                                    </div>

                       

                                </div>

                        }        <div>
                                </div>
                      
                        







                </article>

                
</main>


            <Footer />
           
            </div>}
            {school.error && <div>
            
                <div className={styles.contain}>
                    <center>
                        <EmojiNeutralFill size={200} color="#FF0000" /> <br />
                        <span className="h1">404 ! Cet établissement n'existe pas </span>
                     </center> 
                 
            </div>
                

            </div>}
            {message && <div className={styles.mess}>
                <Whatsapp color="green" onClick={() => (sessionStorage.getItem("userId") ? setMessage(false) : alert("Vous devez être inscrit ou connecter! pour effectuer cette opération"))} size={40} />


            </div>}
            {!message && <div className={styles.message}>
                <XCircleFill size={30} onClick={() => setMessage(true)} color="#4a00b4" className={styles.closeur} />

                <App school={data} size={40} send={handleSendData }/>


            </div>}

            </>
    )
}

export default ViewSchool


export function Tr({ value }) {
    return (
        <tr>
            <td>{value.name}</td>
            <td>{value.description}</td>
            <td>{value.price}</td>
        </tr>
    )
}

export async function getServerSideProps({ params}) {

    if (params.slug == "") {
    return
}

    const school =  await fetchSchoolSlugData(params.slug);
    const positions = !school.error && school.school.id   ? await fetchPositions(school.school.id ) :null ;
    const types = !school.error && school.school.id ?  await fetchTypes(school.school.id ) : null;
    const specialities = !school.error && school.school.id ?  await fetchSpecialities( school.school.id ) : null;
    const fils = !school.error && school.school.id ?  await fetchFilieres(school.school.id ) : null;
    const abo = !school.error && school.school.id ?  await fetchAbonnement(school.school.id ) : null

 return {
            props: {
                school,
                positions,
                types,
                fils,
         specialities,
                abo
            },
        };



}
