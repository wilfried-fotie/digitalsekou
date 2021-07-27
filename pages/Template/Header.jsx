import Image from 'next/image'
import styles from '../../styles/Header.module.css'
import CustomModal from '../../components/customModal'
import React, { useState } from 'react'
import Link from 'next/link'
import CreateAccount from '../../components/CreateAccount'
import Login from '../../components/Login'
import { useEffect } from 'react'
import { Display, Lamp, LockFill, PersonBoundingBox, PersonCircle, PersonDash } from 'react-bootstrap-icons'
import FineModal from '../../components/fineModal'
import axios from 'axios'
import "../../global"


function useModal(initial) {

    const [value, setValue] = useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}



function Header({ value,visibleName }) {

    const [visbility, v] = useModal(false)
    const [visbility3, v3] = useModal(false)
    const [visbility4, v4] = useModal(false)
    const [visbility2, v2] = useModal(false)
    const [position, setPosition] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [user, setUser] = React.useState()
    const [entreprise, setEntreprise] = React.useState()
    const [token, setToken] = React.useState()
    const [etoken, setEtoken] = React.useState()


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

    React.useEffect(() => {
        if (value == 4) {

            setEtoken(sessionStorage.getItem("etoken"))
            setEntreprise(sessionStorage.getItem("entreprise"))

        }

    }, [entreprise])


    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
        setUser(sessionStorage.getItem("username"))

    }, [token])






    const handleToken = (e) => {
        setToken(e)
    }

    const handleEtoken = (e) => {
        setEtoken(e)
    }
  

    return (
        <nav >
            <main className={!scroll ? styles.main : styles.fixed} >

                <div className="logos">
                    <Link href="/"><a className="logo">  <Image src="/logo.svg" alt="Digital Education Logo" width={50} height={50} /></a></Link>
                    <Link href="/"><a>{!scroll && !visibleName ? <span className="log"><img src="/log.svg" alt="" /> </span> : null}</a></Link>

                </div>
                <div className={styles.links}>




                    {value == 1 ? <Link href="/"><a className="active">Acceuil</a></Link> : <Link href="/">Acceuil</Link>}
                    {value == 2 ? <Link href="/Schools"><a className="active">Trouver une école</a></Link> : <Link href="/Schools">Trouver une école</Link>}
                    {value == 3 ? <Link href="/AddSchool"><a className="active">Ajouter une école</a></Link> : <Link href="/AddSchool">Ajouter une école</Link>}
                    {value == 4 ? <Link href="/Entreprises"><a className="active">Pour les Entreprises</a></Link> : <Link href="/Entreprises">Pour les Entreprises</Link>}


                </div>



                {

                    value == 4 ? etoken !== "" && etoken !== undefined && etoken ?

                       

                        <Account user={entreprise} e={true} onTokenChange={setEtoken} /> : <Auth v={v3} e={true} v2={v4} visbility2={visbility4} visbility={visbility3} setToken={handleEtoken} /> 

                        : token !== "" && token !== undefined && token !== null ?
                            <Account user={user} onTokenChange={setToken} />
                            :
                            <Auth v={v} v2={v2}  visbility2={visbility2} visbility={visbility} setToken={handleToken} />
                        
                }

            </main>
        </nav >


    )
}

export default Header





export function Auth({ visbility, visbility2, v, v2, setToken, e  }) {
    return (
        <div>
            <div className={styles.connect}>
                <a style={{ color: "#4a00b4" }} onClick={v2}>  Se Connecter</a>

                <a className="btnPrimary" onClick={v}
                > Créer Un Compte </a>
            </div>
            {visbility && <CustomModal onModalChange={v} component={<CreateAccount stateChange={v} setToken={setToken} e={e} />} />}
            {visbility2 && <CustomModal onModalChange={v2} component={<Login stateChange={v2} setToken={setToken} e={e} />} />}
        </div>
    )
}


export function Account({ user, onTokenChange, e }) {
    const [visible, setVisible] = useModal(false)

    return (
        <div>

            <div >

                <span className={styles.acc} onClick={() => setVisible(true)}> <PersonCircle size={25} color="#fff" /> {user} </span>
            </div>

            {visible && <FineModal onModalChange={setVisible} e={e} component={<Disconnect v={setVisible} onTokenChange={onTokenChange} e={e} />} position={{ top: 90, right: 60 }} />}
        </div>)
}


export function Disconnect({ v, onTokenChange, e }) {
    const [visbility, v1] = useModal(false)
    const token = sessionStorage.getItem("token")
    const entreprise = sessionStorage.getItem("etoken")
    const entrepriseId = sessionStorage.getItem("entrepriseId")
    const userId = sessionStorage.getItem("userId")

    const [data, setData] = React.useState({})
    const handleDisconnect = () => {

      

        if (e !== null && e !== undefined && e)  {
            sessionStorage.removeItem("etoken")
            sessionStorage.removeItem("entreprise")
            sessionStorage.removeItem("entrepriseId")
            v(false)
            onTokenChange("")
        } else {
              sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("userId")
            v(false)
            onTokenChange("")
        }

    }
    const handleClick = React.useCallback(async () => {
        v1(true)
        
        if (e !== null && e !== undefined && e) {
            await axios.get('/entreprises/' + entrepriseId, {
                headers: {
                    Authorization: "Bearer " + entreprise
                }
            }).then(res => {
                setData(res.data)
                

            }).catch(e => console.error(e))
        } else {
            await axios.get('/users/' + userId, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                
                setData(res.data)
            }).catch(e => console.error(e))
 
        }


    },[])


    return (
        <div className={styles.tab}>
            <a className={styles.dfss} onClick={handleDisconnect}>
                <PersonBoundingBox size={20} color="#4a00b4" /> Se Déconnecter</a>

            <a className={styles.dfss} onClick={handleClick}>
                <LockFill size={20} color="#4a00b4" /> Changer vos informations</a>
           { (data !== null && data !== undefined && data) ? visbility && <CustomModal onModalChange={v1} component={<CreateAccount stateChange={v1} e={e} data={data} />} />:
            visbility && <CustomModal onModalChange={v1} component={<CreateAccount stateChange={v1} e={e} data={data} />} />} 
        </div>
    )
}