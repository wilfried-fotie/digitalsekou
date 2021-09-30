import React from 'react'
import { ChatRightQuoteFill, Clipboard, ClipboardData, CurrencyExchange, HandIndexFill, Sliders, Toggle2Off, ToggleOff } from 'react-bootstrap-icons'
import { EntrepriseContext } from '../../pages/StartPub'
import { verifSupDate } from '../CustomHooks/supDate'
import styles from "./stat.module.css"

function Stat() {
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers
    const getPost = React.useContext(EntrepriseContext).data.getPost.posts
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const context = React.useContext(EntrepriseContext)
    const mes = context.data.getMesssage.messages
    return (
        <div className={styles.top}>

            
<center className="h1">Statistiques de vos Ativités</center>

                <div className={styles.tab}>

                    <table>
                    
                        <tbody>
                        {getPub == "" && getOffer == "" && <center><span className="pad"> Aucune activité en cours... </span></center>}
                        {getPub.map((e, k) => <Tr key={k} e={e} k={k + 1} pub={true} />)}
                        {getOffer.map((e, k) => <Tr key={k} e={e} k={k + 1} pub={false} />)}
                        </tbody>
                    </table>

                </div>
        
           


            <div className={styles.top}>
            <center className="h1">Statistiques de votre profil</center> <br />
            <div className={styles.df}>

                
                    <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={getPub.length} />
                    <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre de cliques sur le site"} number={site.stat} />
                    <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre d'offres"} number={getOffer.length} />
                    {site.id && <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre de Messages"} number={mes.length} />}
                    {site.pres && <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre de prestations"} number={getPost.length} />}
                    {site.prod && <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombre d'articles"} number={getProduct.length} />}
             

            </div>
            </div>
        </div>


            

    )
}

export default Stat



export function Card({ icon = <ClipboardData size={40} color="#4a00b4" />,desc = "Descripiton",number = 0}) {
    return (
        <>
            <div className={styles.card}>

                
                <div>
                    {icon}  
                </div>
                <div>
                    {desc}
                </div>
                <div>
                    <span className="h2"> {number}</span>
                </div>



            </div>

            </>
    )
}


export function Tr({ e, pub, k }) {
 



    const handleDel = (id, k) => {
        v2(true)
        setGetIdForDel(id)
        setGetkForDel(k)


    }

    const handleMod = () => {
        v2(true)
        setGetIdForMod(id)
        setGetkForMod(k)

    }


    


    return (<>

        <tr>
            <td>{k}</td>
            <td> {pub ? "Publicité  Numéro : " + k : "Offre Numéro :" + k} </td>

            <td> {e.stat} Cliques </td>
        </tr>


      
    </>)
}