import Link from 'next/link'
import React from 'react'
import { Whatsapp } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/startpub.module.css'


export default function Abonner() {
    
    const users = React.useContext(SchoolContext).data.users
    const data = React.useContext(SchoolContext).data.schoolData.school

    return (
        
        <>
        {
            data.pro &&
                <div className="container">
            
                    {users.lenght !== 0 ? <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Tel</th>
                                <th>Status</th>
                                <th>Contacter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((e, k) => <Tr key={k} value={e} />)}


                        </tbody>



                    </table>
                        :
                        <span className="fine">Aucune personne n'est déja abonner</span>
                    } </div> }
            
            
          {!data.pro && <p><center className="error">Cette fonctionnalité est réserver  à la version pro</center></p>}
                
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