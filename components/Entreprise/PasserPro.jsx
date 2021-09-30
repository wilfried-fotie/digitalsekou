import axios from 'axios'
import React from 'react'
import { EntrepriseContext } from '../../pages/StartPub'
import styles from "../Entreprise/offre.module.css"

function PasserPro() {
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const dispacth = React.useContext(EntrepriseContext).dispacth
    const [state, setState] = React.useState(entreprise.demande)
    const state2 = entreprise.pro
    const handleClick = () => {
        axios.put("/demande-entreprise/" + entreprise.id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("etoken")
            }
        }).then().catch(()=>alert("Erreur"))
        setState(entreprise.demande)
        dispacth({ type: "UPDATEENTREPRISE", name: "entreprise", pre: "entreprise", data: { ...entreprise, demande: !entreprise.demande} })
        setState(s=> !s)
    }
    return (
        <div>
            <div >
                {!state? <a className="btnPri" onClick={handleClick}> Passer pro </a> : state2 ? <a className="btnFine" > Bravo !!! </a> :  <a className="btnPri" onClick={handleClick}> Demande en cours... </a>}
            </div>

        </div>
    )
}

export default PasserPro
