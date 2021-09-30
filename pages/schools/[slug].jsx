import React from 'react'
import Footer from '../Template/footer'
import Link from 'next/link'
import { fetchAbonnement, fetchFilieres, fetchPositions, fetchSchoolSlugData, fetchSpecialities, fetchTypes } from '../../Model/getter'
import { ArrowLeft, Bell, ChevronLeft, EmojiNeutralFill, EmojiSmileFill, GeoAlt, Grid3x3GapFill, TelephoneFill, Whatsapp, XCircleFill, XOctagonFill } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import { Markup } from 'interweave';

import Head from 'next/head'
import App from '../../components/SchoolAdmin/notif'
import axios from 'axios'
import Header from '../Template/Header'
import { fecthPost } from '../../Model/getEntreprise'
import Page from '../../components/School/Page'
import FineModal from '../../components/fineModal'

function ViewSchool({ school, positions, types, specialities, abo, getPost }) {
    const data = school.school
    const spe = specialities ? [...specialities.specialities] : []

    const [message, setMessage] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [abonnement, setAbonnement] = React.useState(false)
    const [userId, setuserId] = React.useState(false)
    React.useEffect(() => {
    setuserId(localStorage.getItem("userId"))
},[userId])
    const handleClickSuscribe = () => {
        if (localStorage.getItem("userId")) {
            axios.post("/abonnement", { userId: parseInt(localStorage.getItem("userId")), schoolId: data.id}).then(res => setAbonnement(true)).catch(e=> console.log(e))
            setAbonnement(true)
        } else {
            setError(true)
        }
    }




    const handleSendData = async(e) => {
        await axios.post("/message",{userId: localStorage.getItem("userId"), message: e.toString(), schoolId: data.id}).then(res => null).catch(r=>alert(r))
    }
  
    return (
       <>
       {!school.error  &&  <div>
           
                <Head>
                    <title>{data.sigle}</title>
<meta name="description" content={data.description} />
                </Head>
                {!userId ? <Header value={2} normal={false} /> : <Link href="/Schools" ><a style={{margin: "3% 5% 2%"}} className="btnPri"> <ArrowLeft size={20} color="#FFF" />Retour</a></Link>}
           
            <main>
                    <div className="article">
                  {data.id  && <Page
                        data={data}
                        positions={positions.positions}
                        types={types}
                        spe={spe}
                            getPost={getPost.posts}
                            handleSubs={handleClickSuscribe}
                            ab={abonnement}
                            abo={abo}
                            userId={userId}
                    />}
                    </div>
                
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
                <Whatsapp color="green" onClick={() => (localStorage.getItem("userId") ? setMessage(false) : setError(true))} size={40} />


            </div>}
            {!message && <div className={styles.message}>
                <XCircleFill size={30} onClick={() => setMessage(true)} color="#4a00b4" className={styles.closeur} />

                <App school={data} size={40} send={handleSendData }/>


            </div>}
            {error && <FineModal position={{ top: 30, left: "35%" }} component={<div color="red"> <center> <EmojiSmileFill size={40} color="red" /> </center><br />  Veuillez vous connecter ou Créer vous un compte!</div>} onModalChange={setError} />}

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
    const abo = !school.error && school.school.id ? await fetchAbonnement(school.school.id) : null
    const getPost = !school.error && school.school.id ? await fecthPost(school.school.id, "school") : null
 return {
            props: {
                school,
                positions,
                types,
                fils,
         specialities,
         abo,
         getPost
            },
        };



}
