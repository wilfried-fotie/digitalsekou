import axios from 'axios'
import React from 'react'
import { EntrepriseContext } from '../../pages/StartPub'
import styles from "../Entreprise/offre.module.css"

function PasserPro() {
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const [state, setState] = React.useState(entreprise.demande)
    const state2 = entreprise.pro
    const handleClick = () => {
        axios.put("/demande-entreprise/" + entreprise.id, {}).then().catch()
        setState(s=> !s)
    }
    return (
        <div>
            <div className={styles.end}>
                {!state? <a className="btnPri" onClick={handleClick}> Passer pro </a> : state2 ? <a className="btnFine" > Bravo !!! </a> :  <a className="btnPri" onClick={handleClick}> Demande en cours... </a>}
            </div>

        </div>
    )
}

export default PasserPro
