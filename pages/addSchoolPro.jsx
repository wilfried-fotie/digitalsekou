import React from 'react'
import { ArrowLeft, BarChart, CursorFill, Bell, Building, Clipboard, Exclude, Eye, Check, Flower1, Gear, Link, Lock, LockFill, Person, PersonCircle, Trash, DisplayFill, FileRuled, Pen, DoorClosed, Bookmark, Briefcase, Cash, } from 'react-bootstrap-icons'
import styles from '../components/Style/CreateAccount.module.css'
import style from '../styles/sudo.module.css'
import "../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../components/handleBool'
import FineModal from '../components/fineModal'
import CustomModal from '../components/customModal'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react';
import { Field } from "../components/School/Add"


export function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}






export function Verif() {
    return (
        <>
            <div className={style.dg}>


                <a className="dfss">
                    <Link size={20} color="#4a00b4" className={style.icon} /> Se Déconnecter</a>

                <a className="dfss">
                    <LockFill size={20} color="#4a00b4" className={style.icon} /> Changer de mot de passe</a>



            </div>
        </>
    )
}


export function Connect() {
    const [visbility2, v2] = useModal(false)
    const pos = React.useRef(null)
    const [position, setPosition] = React.useState({})


    const handleClick = () => {
        v2(true)

        setPosition({
            top: (pos.current.offsetTop + pos.current.offsetHeight + 5) + "px",
            right: 40 + "px"

        })
    }

    return (<>
        <div>
            <a className={style.dfss} onClick={handleClick} ref={pos}>

                <Gear size={20} className={style.icon} color="#4a00b4" /> <span>Paramètre</span>  </a>

            {visbility2 && <FineModal onModalChange={v2} position={position} component={<Verif />} />}

        </div>

    </>)
}




export default function Dasboard() {

    const router = useRouter()
    const [level, setLevel] = React.useState(2)
    const [choise, handleChoiseState] = useChangeBool(true)
    const [visbility, v] = useModal(false)

    return (
        <>
            <div className={style.container}>


                <div className="dfb">

                    <aside>
                        <div className={style.bar}>
                            <span className={level == 0 ? style.active : style.span} onClick={(e) => {
                                e.preventDefault()
                                setLevel(0)
                                router.push("/")
                            }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#4a00b4"} className={level == 0 ? style.acticon : style.icon} /> Revenir au site</span>

                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <FileRuled size={20} color={level == 2 ? "#fff" : "#4a00b4"} className={level == 2 ? style.acticon : style.icon} /> Fiches  </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <DisplayFill size={20} color={level == 3 ? "#fff" : "#4a00b4"} className={level == 3 ? style.acticon : style.icon} /> Site Web </span>
                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#4a00b4"} className={level == 4 ? style.acticon : style.icon} /> Parents/Élève </span>
                            <span className={level == 5 ? style.active : style.span} onClick={() => { setLevel(5) }}> <Bell size={20} color={level == 5 ? "#fff" : "#4a00b4"} className={level == 5 ? style.acticon : style.icon} /> Notifications </span>
                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChart size={20} color={level == 6 ? "#fff" : "#4a00b4"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>

                        </div>

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">


                            <span className={level == 2 ? style.h1 : style.no} > Fiches </span>
                            <span className={level == 3 ? style.h1 : style.no} >  Site Web </span>
                            <span className={level == 4 ? style.h1 : style.no} >  Parents/Élève </span>
                            <span className={level == 5 ? style.h1 : style.no} >Envoyer Des Notifications </span>
                            <span className={level == 6 ? style.h1 : style.no} > Statistiques </span>

                            <Connect />

                        </nav>

                        <div className={style.right}>

                            {level == 2 && <Un />}
                            {level == 3 && <Six />}
                            {level == 4 && <Quatre />}
                            {level == 5 && <Cinq />}
                            {level == 6 && <Six />}
                        </div>

                    </article>
                </div>
            </div>
        </>
    )
}


export function Un() {
    const [visbility3, v3] = useModal(false)
    const [visbility, v] = useModal(false)

    const [position, setPosition] = React.useState({})


    const handleClick = (pos) => {
        v3(true)
        
        setPosition({
            top: (pos.current.offsetHeight) + "px",
            left: pos.current.offsetHeight + "px"

        })
    }

    const handleClick2 = (pad) => {
        v(true)

        setPosition({
            top: (pad.left) + "px",
            left: pad.left + "px"

        })
    }

    return (<>

        Exemple :
        <table>
            <thead>
                <th>FILIERE</th><th>SPECIALITES</th><th>PRIX</th><th>CLASSE</th><th>Actions</th>

            </thead>
            <tbody>

                {[1, 2].map((e, f) => <Test key={f} id={e} onDelete={handleClick} />)}

            </tbody>
        </table>
        {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Trois />} />}
        {visbility && <CustomModal onModalChange={v} position={{ top: 0, left: 0 }} component={<Edit />} />}


        Vos Filaires
        <div className={style.end}>
            <a className="btnPri">Ajouter</a>
        </div>



        <table>
            <thead>
                <th>FILIERE</th><th>SPECIALITES</th><th>PRIX</th><th>CLASSE</th><th>Actions</th>

            </thead>
            <tbody>

                {[1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test key={f} id={e} onDelete={handleClick} onEdit={handleClick2} />)}

            </tbody>
        </table>




    </>)
}



export function Six() {
    return (
        <>

            <div className={style.dfw}>
                {[{
                    label: "Lorem ipsum dolor, sit amet",
                    val: 124
                }, {
                    label: "Lorem ipsum dolor, sit ",
                    val: 421
                }, {
                    label: "Lorem ipsum dolor, sit amet",
                    val: 1234
                }, {
                    label: "Lorem ipsum dolor",
                    val: 45
                }, {
                    label: "Lorem ipsum dolor, sit amet",
                    val: 30
                }, {
                    label: "Lorem ipsum dolor",
                    val: 110
                }].map(e => <Card text={e.label} val={e.val} inc={<Exclude size={30} color="#4a00b4" />} />)}
            </div>

        </>
    )
}
export function Card({ text, val, inc }) {
    return (
        <>
            <div className={style.ca}>
                <div>
                    <center>   {inc}</center>
                </div>
                <div className={style.txt}>
                    {text}
                </div>
                <div className={style.val}>
                    {val}
                </div>
            </div>
        </>
    )
}


export function Trois() {
    return (<>
        <center>Voulez vous supprimer?</center>
        <div className="dfss">   <a className={style.disagree}>
            <DoorClosed size={20} color="#ffff" className={style.icon} /> Annuler </a>
            <a className={style.agree} onClick={() => {

                onDelete(refIci)

            }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></div>
    </>)
}


export function Edit() {
    const options = [{ value: "Bafoussam", label: "Reseau" }, { value: "Yaounde", label: "Logistique" }, { value: "Doula", label: "Transport" }, { value: "Bertoua", label: "Maka" }, { value: "Garoua", label: "Elec" }, { value: "Limbe", label: "Nous" }]

    return (<>
        <table>
            <thead></thead>
            <th></th>
            <tbody>

                <tr>
                    <td><div className="dfss"> <Briefcase size={20} color="#4a00b4" /> Filière</div></td>
                    <td><Select isMulti defaultValue="Reseau et telecom" options={options} name="position" className="basic-multi-select op"
                        classNamePrefix="select" /></td>
                </tr> <tr>
                    <td colSpan={2}> <Field name="name" auto="Master" image={<Briefcase size={20} color="#4a00b4" />} >Classe</Field></td>
                </tr>
                <tr>
                    <td colSpan={2}> <Field name="name" auto="Administration t securité réseau" image={<Cash size={20} color="#4a00b4" />} >Filière</Field></td>
                </tr>
                <tr>
                    <td colSpan={2}> <Field name="name" auto="700 000" image={<Cash size={20} color="#4a00b4" />} >Prix</Field></td>
                </tr>

            </tbody>
        </table>

    </>)
}



export function Quatre() {
    return (<>
        Liste De Vos Abonner

    </>)
}




export function Test({ onDelete, onEdit }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>Reseau et telecom</td>
            <td>Administration t securité réseau</td>
            <td> 700 0000</td>
            <td>Master</td>
            <td className="dfss"> <a className={style.disagree} onClick={() => {
                onEdit({ top: 20, left: 20 })


            }}>
                <Pen size={20} color="#ffff" className={style.icon} /> Modifier</a>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}