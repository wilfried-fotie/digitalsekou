import React from 'react'
import { LayersFill, PersonFill, Whatsapp, Trash, FileX, DoorClosed } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/startpub.module.css'
import useModal from '../CustomHooks/useModal'
import FineModal from '../fineModal'
import Link from "next/link"
import style from '../../styles/sudo.module.css'
import CustomModal from '../customModal'
import axios from 'axios'

function Notification() {


    const schoolData = React.useContext(SchoolContext)


    
    const mes = schoolData.data.mes.mes
    const dispacth = schoolData.dispacth
    const [ident,setIdent] = React.useState()
    const [visbility3, v3] = useModal(false)
    const handleClick = (id,k)=>{
        v3(true)
        setIdent({id: id,k: k})
    }
    return (
        <>
            <center className="h1 padding">Liste de messages</center>
            {mes && mes.map((e, k) => <Row key={k} sender={e.user} onHandleClick={() => handleClick(e.message.id, k)} message={e.message.message} />) }
  
            {visbility3 && <CustomModal onModalChange={v3} component={<Delete v={v3} data={ident}/>} />}
  </>
            )
}

export default Notification



export function Delete({ v,data}) {
    let Token = sessionStorage.getItem("schoolToken")
    const [fine, setFine] = React.useState()
    const [error, setError] = React.useState()
    const schoolData = React.useContext(SchoolContext)
    const dispacth = schoolData.dispacth
    const handleCancel = () => {
        v(false)
    }
    const handleDelete = async () => {
       
            await axios.delete(`/messages/${data.id}`,
                {
                    headers: {
                        Authorization: "Bearer " + Token
                    }

                }
            )
                .then(() => {
                    setError()
                    setFine("Suppression réussi")
                    dispacth({ type: "DELETE2", name: "mes", id: data.k })
                    v(false)
                }
                )
                .catch((e) => {

                    setFine()
                    setError("Erreur lors de la suppression...")

                }
                );

        



    }
    return (<>
        {fine && <div className="fine">
            {fine}
        </div>}
        {error && <div className="error">
            {error}
        </div>}
        <div className={styles.grid}>
            <div>
                <center>Voulez vous supprimer?</center>
            </div>
            <div className={"dfss"}>
                <a className={style.disagree} onClick={handleCancel}>
                    <DoorClosed size={20} color="#ffff" className={style.icon} /> Annuler </a>
                <a className={style.agree} onClick={handleDelete}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></div>
        </div>

    </>)
}




export function Row({sender,message,onHandleClick}) {
    return (
        <>
            <div className={styles.wraper}>
                <div>

                    <div >
                        

                    <div className={styles.box}>
                               <b className={styles.flex2}>
                                <span className="iconiseur">  <PersonFill size={20} color="#4a00b4" /></span>    {sender.username.toUpperCase()}  ( { sender.status } )
                    </b><br />
                    </div>
         

                    <p className={styles.mex}>
                        {message}
                    </p>
                    </div>
                </div>
                <div className={styles.dgs}>
                    <Link href={"https://wa.me/237" + sender.tel}><a className={styles.wa} > <Whatsapp color="#FFF" size={20} /> Répondre</a></Link>
                    <a className={styles.del} onClick={onHandleClick}>  <Trash size={20} color="#ffff" /> Supprimer</a>
                </div>
            </div>
            </>
     )
 }