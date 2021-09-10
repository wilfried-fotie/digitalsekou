import React from 'react'
import { ArrowClockwise, CurrencyExchange, EyeFill, RecordFill, Sliders, Toggle2Off, ToggleOff } from 'react-bootstrap-icons'
import styles from "./stat.module.css"


export default function Activity() {
    return (
        <div className={styles.top}>

            <div>

                <center className="h1">Status de vos Ativités</center>


                <div className={styles.tab}>

                    <table>
                    
                        <tbody>
                            {[1, 2, 3, 4, 8].map(e => <Tr key={e} id={e} />)}
                        </tbody>
                    </table>

                </div>
            </div>

            
        </div>
    )
}

export function Tr({id}) {

    return (<>

        <tr>
            <td>30-08-2021 </td>
            <td> 04 jours </td>
            <td> {id % 2 ? "Publicité" : "Offre"} </td>
            <td ><a className={styles.dfss}> Voir <EyeFill size={20} color="#4a00b4" /> </a></td>
            <td> <span className={styles.dfss}><Toggle2Off color="red" size={20} /> Non active </span> </td>
            <td><a className="btnSecondary dfss"> Relancer <ArrowClockwise size={20} color="#4a00b4" /></a> </td>
        </tr>

    </>)
}