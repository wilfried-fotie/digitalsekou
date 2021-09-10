import React from 'react'
import { CurrencyExchange, HandIndexFill, Sliders, Toggle2Off, ToggleOff } from 'react-bootstrap-icons'
import styles from "./stat.module.css"

function Stat() {
    return (
        <div className={styles.top}>

         

            <div className={styles.top}>
            <center className="h1">Statistiques de votre profil</center> <br />
            <div className={styles.df}>

                
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />
                <Card icon={<CurrencyExchange size={40} color="#4a00b4" />} desc={"Nombre de publicités"} number={14} />

            </div>
            </div>


            <div style={{marginTop: "30px"}}>

<center className="h1">Statistiques de vos Ativités</center>


                <div className={styles.tab}>

                    <table>
                    
                        <tbody>
                            {[1, 2, 3, 4, 8].map(e => <Tr key={e}/>)}
                        </tbody>
                    </table>

                </div>
            </div>


            </div>
    )
}

export default Stat



export function Card({icon,desc,number}) {
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

export function Tr() {

    return (<>
        
        <tr>
            <td>02-10-2021</td>
            <td>Publicite</td>
            <td>04 jours</td>
            <td> <span className="dfss"> <HandIndexFill size={20} color="#4a00b4" /> 10 Clicks </span> </td>
    </tr>
    
    </>)
}