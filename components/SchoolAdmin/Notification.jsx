import React from 'react'
import { LayersFill, PersonFill, Whatsapp, Trash } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/startpub.module.css'
import useModal from '../CustomHooks/useModal'
import FineModal from '../fineModal'
import Link from "next/link"

function Notification() {


    const schoolData = React.useContext(SchoolContext)


    const data = schoolData.data.schoolData.school
    const position = schoolData.data.positions.positions
    const mes = schoolData.data.mes.mes
    const dispacth = schoolData.dispacth

    const [visbility3, v3] = useModal(false)
    const handleClick = ()=>{
            v3(true)
    }
    return (
<>
  
            {mes.map((e,k) => <Row key={k} sender={e.user} onHandleClick={handleClick} message={e.message} />) }
  
            {visbility3 && <FineModal position={{ width: "40%", height: "auto",left: "35%",top: "5%" }} onModalChange={v3} component={<Message message={message} />} />}
  </>
            )
}

export default Notification


export  function Message({message}) {
     return (
             <div className="message__container">
                 <div className="message__row">
                     <span className={`message message--in`}>
                         {message}
                     </span>
                 </div>
                 <div className="message__tile"></div>
         </div>
    )
 }


export function Row({sender,message,onHandleClick}) {
    return (
        <>
            <div className={styles.wraper}>
                <div>
                <b className="dfs">
                        <PersonFill size={20} color="#4a00b4" />    {sender.username.toUpperCase()}
                    </b> <br />
                    <span className="dfs">
                        <LayersFill size={20} color="#4a00b4"/>    {sender.status}
                    </span>
               
                
                <p className={styles.mex}>
{message}
                </p>
                </div>
                <div className={styles.dgs}>
                    <Link href={"https://wa.me/237" + sender.tel}><a className={styles.wa} > <Whatsapp color="#FFF" size={20} /> Répondre</a></Link>
                    {/* <a className={styles.del}>  <Trash size={20} color="#ffff" /> Supprimer</a> */}
                </div>
            </div>
            </>
     )
 }