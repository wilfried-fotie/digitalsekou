import React from 'react'
import styles from '../styles/startpub.module.css'
import { Building, ImageAlt, NodeMinus, TelephoneFill, BarChart, Pen, Display, Person, ArrowLeft, Diagram2Fill, CurrencyExchange, PersonCircle } from 'react-bootstrap-icons'
import Preview from '../components/School/Preview'
import { Connect, Six, App } from "./Sudo"
import { useRouter } from "next/router"





function Field({ auto, inputRef, children, name, value, onChange, image = <NodeMinus size={30} color="#4a00b4" /> }) {
    return <div className={styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type="text" ref={inputRef} placeholder={auto} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>
}

function TextArea({ children, inputRef, name, value, onChange }) {
    return <div>

        <div> <label htmlFor={name}>{children}</label> </div>
        <div>  <textarea rows={10} ref={inputRef} className={styles.area} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>
}


function File({ children, inputRef, name, onChange, multiple = false }) {
    return <div className={styles.dg}>
        <div className="dfs">
            <ImageAlt size={20} color="#4a00b4" />
            <label htmlFor={name}>{children}</label>
        </div>
        <div>
            <input type="file" name={name} id={name}
                accept="image/*"
                ref={inputRef}
                multiple={multiple == true ? multiple : null}
                onChange={onChange}
            />

        </div>
    </div>
}



function StartPub() {

    const [level, setLevel] = React.useState(1)
    const router = useRouter()

    return (

        <main>
            <div className={styles.db}>


                <div className={styles.bar}>
                    <nav className={styles.bar, styles.dss}>

                        <span className={level == 0 ? styles.active : styles.span} onClick={(e) => {
                            e.preventDefault()
                            setLevel(0)
                            router.push("/Entreprises")
                        }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#fff9"} className={level == 0 ? styles.acticon : styles.icon} />Retour</span>


                        <div className={styles.dgc}>
                            <PersonCircle size={80} color="#fff" />
                            <span className={styles.dbcText}>Wilfried</span>
                        </div>


                        <span className={level == 1 ? styles.active : styles.span} onClick={() => { setLevel(1) }}> <CurrencyExchange size={20} color={level == 1 ? "#fff" : "#fff9"} className={level == 1 ? styles.acticon : styles.icon} /> Publicités </span>
                        <span className={level == 2 ? styles.active : styles.span} onClick={() => { setLevel(2) }}> <Diagram2Fill size={20} color={level == 2 ? "#fff" : "#fff9"} className={level == 2 ? styles.acticon : styles.icon} /> Offres </span>
                        <span className={level == 3 ? styles.active : styles.span} onClick={() => { setLevel(3) }}> <BarChart size={20} color={level == 3 ? "#fff" : "#fff9"} className={level == 3 ? styles.acticon : styles.icon} /> Statistiques </span>

                    </nav>
                </div>
                <div className={styles.content}>
                    {level == 1 && <Pub />}
                    {level == 2 && <Pub />}
                    {level == 3 && <Stat />}
                </div>
            </div>
        </main >
    )
}

export default StartPub


export function Pub() {
    const [state, setState] = React.useState(1)

    return (
        <div>



            <center className="dfss"> <div className={styles.h1}> Création d'une publicité </div> <Connect /> </center>
            <div className={styles.app}>
                <div className="df">
                    <span className={state == 1 ? styles.active2 : styles.span} onClick={() => { setState(1) }}> <Pen size={20} color={state == 1 ? "#fff" : "#4a00b4"} className={state == 1 ? styles.acticon : styles.icon} /> Création </span>

                    <hr />

                    <span className={state == 2 ? styles.active2 : styles.span} onClick={() => { setState(2) }}> <Display size={20} color={state == 2 ? "#fff" : "#4a00b4"} className={state == 2 ? styles.acticon : styles.icon} /> Visualisation </span>

                </div>
            </div>
            <div className="df">

                <div className={styles.left}>
                    {state == 1 && <Left />}


                </div>
                <div className={styles.right}>
                    {state == 2 && <Preview data={""} />}
                </div>

            </div>



        </div>)
}
export function Stat() {
    return (
        <div>
            <center className="dfss"> <div className={styles.h1}> Statistiques </div> <Connect /> </center>


            <Six />

        </div>)
}
export function Offer() {
    return (
        <div>
            <center className="dfss"> <div className={styles.h1}> Ajouter Des Offres </div> <Connect /> </center>

            <App />



        </div>)
}



export function Left() {
    return (
        <div>


            <Field name="name" auto="exp: Institut universitaire...." image={<Building size={20} color="#4a00b4" />}  >Nom Complet De L'entreprise</Field>
            <Field name="cible" auto="exp: crtv (optionnel)">Sigle De l'Entreprise </Field>
            <Field name="tel" auto="exp: 678 55 02 04" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} >Ajouter Le Numéro de Téléphone</Field>
            <File name="logo">Importer Le Logo</File>
            <div className={styles.dg}>

            </div>
            <File name="logo">Importer Le Logo</File>

        </div>
    )
}


export function Right() {
    return (
        <div>

        </div>
    )
}