import Link from 'next/link'
import React from 'react'
import { ClipboardData, Whatsapp } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/startpub.module.css'
import NotPro from '../CustomHooks/NotPro'



export default function Abonner() {
    
    const users = React.useContext(SchoolContext).data.users
    const data = React.useContext(SchoolContext).data.schoolData.school

    return (
        
        <>
        {
                data.pro && <>
                    <center className="h1 padding">Liste de vos abonnés</center>
            
                <div className="container">
                    {users.lenght !== 0 ? <table>
                  
                        <tbody>
                            {users.map((e, k) => <Tr key={k} value={e} />)}
                        </tbody>

                    </table>
                        :
                        <span className="fine">Aucune personne n'est déja abonner</span>
                    } </div></> }
            
            
            {!data.pro && <NotPro/>}
                
            </>
    )
}



export function Tr({ value }) {
    return (
        <tr>
            <td style={{textAlign: "center",padding: "10px 20px 10px"}}>{value.username}</td>
            <td style={{ textAlign: "center",padding: "10px 20px 10px" }}>{value.tel}</td>
            <td style={{ textAlign: "center", padding: "10px 20px 10px" }}>{value.status}</td>
            <td style={{ textAlign: "center", padding: "10px 20px 10px" }}> <Link href={"https://wa.me/237" + value.tel}><a className={styles.wa} > <Whatsapp color="#FFF" size={20} /> écrire</a></Link></td>
        </tr>
    )
}