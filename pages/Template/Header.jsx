import Image from 'next/image'
import styles from '../../styles/Header.module.css'
import CustomModal from '../../components/customModal'
import React, { useState } from 'react'
import Link from 'next/link'
import CreateAccount from '../../components/CreateAccount'
import Login from '../../components/Login'
import { useEffect } from 'react'
import ErrorBoundary from '../../components/CustomHooks/ErrorBoundary'


function useModal(initial) {

    const [value, setValue] = useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}



function Header({ value }) {

    const [visbility, v] = useModal(false)
    const [visbility2, v2] = useModal(false)
    const [position, setPosition] = useState(0)
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.document.addEventListener("scroll", () => {
            setPosition(window.document.body.getBoundingClientRect().top)
            if (window.document.body.getBoundingClientRect().top < -23) {
                setScroll(true)

            } else {
                setScroll(false)
            }

        })
    }, [])


    return (
        <nav >
            <main className={!scroll ? styles.main : styles.fixed} >

                <div className="logos">
                    < a href="/" className="logo">  <Image src="/logo.svg" alt="Digital Education Logo" width={50} height={50} /></a>
                    {!scroll ? <span className="log"> <img src="/log.svg" alt="" /> </span> : null}

                </div>
                <div className={styles.links}>




                    {value == 1 ? <Link href="/"><a className="active">Acceuil</a></Link> : <Link href="/">Acceuil</Link>}
                    {value == 2 ? <Link href="/Schools"><a className="active">Trouver une école</a></Link> : <Link href="/Schools">Trouver une école</Link>}
                    {value == 3 ? <Link href="/AddSchool"><a className="active">Ajouter une école</a></Link> : <Link href="/AddSchool">Ajouter une école</Link>}
                    {value == 4 ? <Link href="/Entreprises"><a className="active">Pour les Entreprises</a></Link> : <Link href="/Entreprises">Pour les Entreprises</Link>}


                </div>
                <div className={styles.connect}>
                    <a style={{ color: "#4a00b4" }} onClick={v2}>  Se Connecter</a>

                    <a className="btnPrimary" onClick={v}
                    > Créer Un Compte </a>
                </div>


                {visbility && <CustomModal onModalChange={v} component={<CreateAccount />} />}
                {visbility2 && <CustomModal onModalChange={v2} component={<Login />} />}


            </main>
        </nav >


    )
}

export default Header




