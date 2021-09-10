import React from 'react'
import { Rainbow, Reception0, Reception4 } from 'react-bootstrap-icons'
import { SchoolContext } from '../../pages/addSchoolPro/[id]'
import styles from '../../styles/startpub.module.css'

function Stats() {
    const school = React.useContext(SchoolContext).data.schoolData.school
    const users = React.useContext(SchoolContext).data.users
    const spe = React.useContext(SchoolContext).data.spe

    return (
    <>
   {school.pro &&     <div>
            
            <div className="dfss">
              <Card text={"Nombres de clics dans les résultats de récherches"} value={school.stat} />
            <Card text={"Nombres d'abonner"} value={users.length} /> 
            
            </div>
        <div className="dfss">
                <Card text={"Nombres de spécialités"} value={spe.length} />

            </div>
           
            </div>
            }
        {!school.pro && <p> <center className="error">Cette fonctionnalité est réservé aux pros</center> </p>}
        </>
    )
}

export default Stats


export function Card({text,value}) {
    return (
        <div className={styles.card}>

            <center>
                {text}

            </center>
            <div className="dfss">
                <center style={{ padding: "5px 20px 10px", fontSize: "2em" }}>
                    {value}

                </center>
            </div>
           

        </div>
    )
}