import React from 'react'
import { ClipboardData, Rainbow, Reception0, Reception4 } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import NotPro from '../CustomHooks/NotPro'
import { Card } from '../Entreprise/Stat'
import styles from "../Entreprise/stat.module.css"

function Stats() {
    const school = React.useContext(SchoolContext).data.schoolData.school
    const users = React.useContext(SchoolContext).data.users
    const spe = React.useContext(SchoolContext).data.spe
    const schoolData = React.useContext(SchoolContext)



    const mes = schoolData.data.mes.mes
    return (
    <>
  <div>
                <center className="h1 padding">Statistiques </center>
               
                <div className={styles.df}>
                    
     
                    <Card icon={<ClipboardData size={40} color="#4a00b4" />} desc={"Nombres de clics dans les résultats de récherches"} number={school.stat} />
                    <Card desc={"Nombres d'abonner"} number={users.length} icon={<ClipboardData size={40} color="#4a00b4" />} />
                    <Card desc={"Nombres de Messages"} number={mes.length} icon={<ClipboardData size={40} color="#4a00b4" />} />
                    <Card desc={"Nombres de spécialités"} number={spe.length} icon={<ClipboardData size={40} color="#4a00b4" />} />

               </div>
           
            </div>
            
        </>
    )
}

export default Stats


