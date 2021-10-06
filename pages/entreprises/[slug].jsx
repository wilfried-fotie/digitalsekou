import React from 'react'
import Footer from '../Template/footer'
import Link from 'next/link'
import { ArrowLeft, ArrowLeftRight, Bell, ChevronLeft, EmojiNeutralFill, EmojiSmileFill, GeoAlt, Grid3x3GapFill, TelephoneFill, Whatsapp, XCircleFill, XOctagonFill } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import { Markup } from 'interweave';
import Head from 'next/head'
import App from '../../components/SchoolAdmin/notif'
import axios from 'axios'
import Header from '../Template/Header'
import { fecthOffer, fecthPost, fecthProduct, fecthPub, fecthSiteOffer, fecthSitePost, fecthSiteProduct, fecthSitePub, fetchentrEprisePositionData, fetchEntrepriseSiteData, fetchEntrepriseSiteDataSlug, fetchentrEpriseSitePositionData, fetchEntrepriseSiteSlugData, fetchEntrepriseSlugData } from '../../Model/getEntreprise'
import { fecthFinePub, fecthFineOffer} from '../../Model/getIndex'
import Page from '../../components/Entreprise/Page'
import FineModal from '../../components/fineModal'

function ViewSchool({ entreprise, positions, site, getProduct, getPost, getOffer,getPub}) {
    



    const [message, setMessage] = React.useState(true)
    const [errorConnect, setErrorConnect] = React.useState(false)
    const [abonnement, setAbonnement] = React.useState(false)
    const [userId, setuserId] = React.useState(false)
    React.useEffect(() => {
        setuserId(localStorage.getItem("userId"))
    }, [userId])
 

    const handleClik = () => {
        if (localStorage.getItem("userId")) {
            setMessage(false)
        } else {
            setErrorConnect(true)
        }

    }

    const handleSendData = async (e) => {
       
        await axios.post("/message-entreprise", { userId: localStorage.getItem("userId"), message: e.toString(), schoolId: entreprise.entreprise.id }).then(res => null).catch(r => alert(r))

    }

    return (
        <>
            {!site.error && site.site.id &&  <div>

                <Head>
                    <title>{site.site.name}</title>
                    <meta name="description" content={site.site.outro.substr(0, 1000) } />
                </Head>
                {userId ? <div className="container" style={{marginLeft: "5%"}}> <Link href="/"><a className="btnSecondary dfss" > <ArrowLeft size={20} color="#4a00b4" /> Retour </a></Link></div>: <Header value={2} normal={false} />}

                <main className={styles.body}>

                    <Page data={site.site} getPub={getPub} getOffer={getOffer} mode={true} entreprise={entreprise.entreprise} position={positions.position} getProduct={getProduct.products} getPost={getPost.posts} />

                </main>
                {site.error && !site.site.id && <div>

                    <div className={styles.contain}>
                        <center>
                            <EmojiNeutralFill size={200} color="#FF0000" /> <br />
                            <span className="h1">404 ! Cet établissement n'existe pas </span>
                        </center>

                    </div>


                </div>}
                   
                <Footer />


                {message && <div className={styles.mess}>
                    <Whatsapp color="green" onClick={handleClik} size={40} />
                </div>}
                
                {!message && <div className={styles.message}>
                    <XCircleFill size={30} onClick={() => setMessage(true)} color="#4a00b4" className={styles.closeur} />

                    <App  school={entreprise.entreprise} size={40} send={handleSendData} />


                </div>}
            </div>}
            {(site.error || !site.site.id) && <div>

                <div className={styles.contain}>
                    <center>
                        <EmojiNeutralFill size={200} color="#FF0000" /> <br />
                        <span className="h1">404 ! Cet Entreprise n'existe pas </span>
                    </center>

                </div>


            </div>}
            <div>

            </div>
            {errorConnect && <FineModal position={{ top: 30, left: "25%" }} component={<div color="red"> <center> <EmojiSmileFill size={40} color="red" /> </center><br />  Veuillez vous connecter ou  inscrirez vous!</div>} onModalChange={setErrorConnect} />}

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

    const site = await fetchEntrepriseSiteSlugData(params.slug)

    const entreprise = !site.site.error && site.site.entreprise_id ? await fetchEntrepriseSiteDataSlug(site.site.entreprise_id) : null ;
    const positions = !site.site.error && site.site.entreprise_id ? await fetchentrEpriseSitePositionData(site.site.entreprise_id) : null;
    const getPost = !site.site.error && site.site.entreprise_id ? await fecthSitePost(site.site.entreprise_id) : null
    const getProduct = !site.site.error && site.site.entreprise_id ? await fecthSiteProduct(site.site.entreprise_id) : null
    const getOffer = !site.site.error && site.site.entreprise_id ? await fecthSiteOffer(site.site.entreprise_id) : null
    const getPub = !site.site.error && site.site.entreprise_id ? await fecthSitePub(site.site.entreprise_id) : null

    return {
        props: {
            entreprise,
            positions,
            site,
            getPost,
            getProduct,
            getOffer,
            getPub
          
        },
    };



}
