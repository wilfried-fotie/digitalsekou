import React from 'react'
import { ArrowClockwise, CurrencyExchange, EyeFill, RecordFill, Sliders, Toggle2Off, Toggle2On, ToggleOff } from 'react-bootstrap-icons'
import { EntrepriseContext } from '../../pages/StartPub'
import { verifSupDate } from '../CustomHooks/supDate'
import useModal from '../CustomHooks/useModal'
import CustomModal from '../customModal'
import { Visualisation as Vi} from './Offre'
import { Edit, Visualisation  } from './Pub'
import styles from "./stat.module.css"


export default function Activity() {
    const getPub = React.useContext(EntrepriseContext).data.getPub.pubs
    const getOffer = React.useContext(EntrepriseContext).data.getOffer.offers
    return (
        <div className={styles.top}>

            {/* {JSON.stringify(getPub)} */}
            {/* {JSON.stringify(getOffer)} */}
            <div>

                <center className="h1">Status de vos Ativités</center>


                <div className={styles.tab}>

                    <table>
                    
                        <tbody>
                            { getPub == "" && getOffer == "" && <center><span className="pad"> Aucune activité en cours... </span></center>}
                            {getPub.map((e,k) => <Tr key={k} e={e} k={k + 1} pub={true} />)}
                            {getOffer.map((e, k) => <Tr key={k} e={e} k={k + 1} pub={false}/>)}
                        </tbody>
                    </table>

                </div>
            </div>

            
        </div>
    )
}

export function Tr({e,pub,k}) {
    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)

   

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
            <td> {"#" + k} </td>

            <td>{pub ? null  : new Date(e.expire).toLocaleDateString() || new Date(e.expiration).toLocaleDateString()} </td>
            <td> {pub ? e.days + " jours" : null} </td>
            <td> {pub ? "Publicité" : "Offre"} </td>
            <td ><a className="btnSecondary dfss" onClick={() => v(true)}> Voir <EyeFill size={20} color="#4a00b4" /> </a></td>
            <td> <span className={styles.dfss} > {pub ? verifSupDate(new Date(), new Date(e.available || e.date)) ? <><Toggle2On color="green" size={20} /> Active</> : <> <Toggle2Off color="red" size={20} /> Non Active</> : verifSupDate(new Date(), new Date(e.expire || e.expiration)) ? <><Toggle2On color="green" size={20} /> Active</> : <> <Toggle2Off color="red" size={20} /> Non Active</>}</span> </td>
        </tr>

        
        {visible && <CustomModal onModalChange={v} component={pub ? <div style={{ minWidth: "45vw" }}> <Visualisation data={{ ...e, logo: e.media, media: "" }} /> </div> : <div style={{ minWidth: "45vw", maxWidth: "60vw" }}>  <Vi data={{ ...e, outro: e.content, objet: e.title, expiration: e.expire.split("T", -1)[0] }} /> </div>} />}
        {visible2 && <CustomModal onModalChange={v2} component={pub ?  <Edit

            onHandleImageStateChange={handleImageChange}
            onHandleTextStateChange={handleChange}
            id={getIdForMod}
            k={getkForMod}
            data={state}

        /> :   <Vi data={e} />} />}
    </>)
}