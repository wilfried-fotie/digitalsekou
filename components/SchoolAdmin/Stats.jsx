import React from 'react'
import { ClipboardData, Rainbow, Reception0, Reception4 } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import { Card } from '../Entreprise/Stat'
import styles from "../Entreprise/stat.module.css"

function Stats() {
    const school = React.useContext(SchoolContext).data.schoolData.school
    const users = React.useContext(SchoolContext).data.users
    const spe = React.useContext(SchoolContext).data.spe

    return (
    <>
   {school.pro &&     <div>
                <center className="h1 padding">Statistiques </center>
               
                <div className={styles.df}>
                    
     
                    <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombres de clics dans les résultats de récherches"} number={school.stat} />
                    <Card desc={"Nombres d'abonner"} number={users.length} icon={<ClipboardData size={40} color="#4a00b4" />} />
            
            
       
                    <Card desc={"Nombres de spécialités"} number={spe.length} icon={<ClipboardData size={40} color="#4a00b4" />} />

               </div>
           
            </div>
            }
        {!school.pro && <p> <center className="error">Cette fonctionnalité est réservé aux pros</center> </p>}
        </>
    )
}

export default Stats


// export function Card({text,value}) {
//     return (
//         <div className={styles.card}>

//             <center>
//                 {text}

//             </center>
//             <div className="dfss">
//                 <center style={{ padding: "5px 20px 10px", fontSize: "2em" }}>
//                     {value}

//                 </center>
//             </div>
           

//         </div>
//     )
// }