import React from 'react'
import Footer from '../Template/footer'
import Link from 'next/link'
import { ArrowLeft, ArrowLeftRight, Bell, ChevronLeft, EmojiNeutralFill, GeoAlt, Grid3x3GapFill, TelephoneFill, Whatsapp, XCircleFill, XOctagonFill } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import { Markup } from 'interweave';
import Head from 'next/head'
import App from '../../components/SchoolAdmin/notif'
import axios from 'axios'
import Header from '../Template/Header'
import { fecthPost, fecthProduct, fetchentrEprisePositionData, fetchEntrepriseSiteData, fetchEntrepriseSlugData } from '../../Model/getEntreprise'
import Page from '../../components/Entreprise/Page'

function ViewSchool({ entreprise, positions, site, getProduct, getPost}) {
    



    const [message, setMessage] = React.useState(true)
    const [abonnement, setAbonnement] = React.useState(false)
    const [userId, setuserId] = React.useState(false)
    React.useEffect(() => {
        setuserId(sessionStorage.getItem("userId"))
    }, [userId])
    const handleClickSuscribe = () => {
        if (sessionStorage.getItem("userId")) {
            axios.post("/abonnement", { userId: parseInt(sessionStorage.getItem("userId")), schoolId: data.id }).then(res => setAbonnement(true)).catch(e => console.log(e))
            setAbonnement(true)
        } else {
            alert("veuiller créer un compte ou vous connecter  avant de pouvoir vous abonner aux établissements")
        }
    }



    const handleSendData = async (e) => {
        await axios.post("/message", { userId: sessionStorage.getItem("userId"), message: e.toString(), schoolId: data.id }).then(res => null).catch(r => alert(r))
    }

    return (
        <>
            {!entreprise.error && entreprise.entreprise.site &&  <div>

                <Head>
                    {/* <title>{data.sigle}</title>
                    <meta name="description" content={data.description} /> */}
                </Head>
                {userId ? <div className="container" style={{width: "8%",marginLeft: "5%"}}> <Link href="/"><a className="btnSecondary dfss" > <ArrowLeft size={20} color="#4a00b4" /> Retour </a></Link></div>: <Header value={2} normal={false} />}

                <main className={styles.body}>

                    <Page data={site.site} mode={true} entreprise={entreprise.entreprise} position={positions.position} getProduct={getProduct.products} getPost={getPost.posts} />

                </main>

                   
                <Footer />


                {message && <div className={styles.mess}>
                    <Whatsapp color="green" onClick={() => (sessionStorage.getItem("userId") ? setMessage(false) : alert("Vous devez être inscrit ou connecter! pour effectuer cette opération"))} size={40} />


                </div>}
                {!message && <div className={styles.message}>
                    <XCircleFill size={30} onClick={() => setMessage(true)} color="#4a00b4" className={styles.closeur} />

                    <App school={entreprise.entreprise} size={40} send={handleSendData} />


                </div>}
            </div>}
            {(entreprise.error || !entreprise.entreprise.site) && <div>

                <div className={styles.contain}>
                    <center>
                        <EmojiNeutralFill size={200} color="#FF0000" /> <br />
                        <span className="h1">404 ! Cet Entreprise n'existe pas </span>
                    </center>

                </div>


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

export async function getServerSideProps({ params }) {

    if (params.slug == "") {
        return
    }

    const entreprise = await fetchEntrepriseSlugData(params.slug);
    const positions = !entreprise.error && entreprise.entreprise.id ?  await fetchentrEprisePositionData(entreprise.entreprise.id) : null;
    const site = !entreprise.error && entreprise.entreprise.id ? await fetchEntrepriseSiteData(entreprise.entreprise.id) :null
    const getPost = !entreprise.error && entreprise.entreprise.id ? await fecthPost(entreprise.entreprise.id) : null
    const getProduct = !entreprise.error && entreprise.entreprise.id ? await fecthProduct(entreprise.entreprise.id) : null

    return {
        props: {
            entreprise,
            positions,
            site,
            getPost,
            getProduct
          
        },
    };



}
