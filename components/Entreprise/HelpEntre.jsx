import Link from 'next/link'
import React, { useReducer, useState } from 'react'
import styles from './help.module.css'


const STEPPER = [
    {
        image: "/search.svg",
        desc: " Etape 1 description Lorem ipsum dolor sit amet consectetur, adipisicing elit.1 description Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        image: "/search.svg",
        desc: " Etape 2 description Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        image: "/search.svg",
        desc: " Etape 3 description Lorem ipsum dolor et consectetur, adipisicing elit.. 1 description Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
]



function reducer(state, action) {

    switch (action.type) {
        case 'next':
            if (state >= 2) return state
            return state + 1
        case 'prev':
            if (state <= -1) return state

            return state - 1
        default:
            break;
    }
}

function HelpEntre() {

    const [step, dispacth] = useReducer(reducer, 0)

    return (
        <div className={styles.all}>
            <center><b className={styles.title}>Etape {step + 1}</b></center>
            <center> <img src={STEPPER[step].image} width={200} /></center>

            <p>
                {STEPPER[step].desc}
            </p>
            <nav className="df">
                {step !== 0 && step < 2 ? <a className="btnSecondary" onClick={() => { dispacth({ type: "prev" }) }}>Précedent</a> : null}
                {step < 2 ? < a className="btnPrimary" onClick={() => { dispacth({ type: "next" }) }} >Suivant</a> : null}
                {step === 2 ? <Link href={"/StartPub?id=" + sessionStorage.getItem("entrepriseId") + "&token=" + sessionStorage.getItem("etoken")}><a className="btnPri" >commencer maintenant</a></Link> : null}

            </nav>
        </div>
    )
}

export default HelpEntre
