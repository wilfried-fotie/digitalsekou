import Image from 'next/image'
import styles from '../../styles/Header.module.css'
import CustomModal from '../../components/customModal'
import Menu from '../../components/Menu'
import React, { useState } from 'react'
import Link from 'next/link'
import CreateAccount from '../../components/CreateAccount'
import Login from '../../components/Login'
import { useEffect } from 'react'
import { Display, Lamp, LockFill, GridFill,List, PersonBoundingBox, PersonCircle, PersonDash, HouseFill, Search, Building, BriefcaseFill } from 'react-bootstrap-icons'
import FineModal from '../../components/fineModal'
import "../../global"
import { useRouter } from 'next/router'


function useModal(initial) {

    const [value, setValue] = useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}


export const AccountContext = React.createContext({})



function Header({ value, visibleName, userData, entrepriseData, normal = true }) {
    const [visbility, v] = useModal(false)
    const [visbility3, v3] = useModal(false)
    const [visbility1, v1] = useModal(false)
    const [visbility5, v5] = useModal(false)
    const [visbility4, v4] = useModal(false)
    const [visbility2, v2] = useModal(false)
    const [menu, setMenu] = useModal(false)
    const [position, setPosition] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [user, setUser] = React.useState()
    const [entreprise, setEntreprise] = React.useState()
    const [school, setSchool] = React.useState()
    const [schoolId, setSchoolId] = React.useState()
    const [entrepriseId, setEntrepriseId] = React.useState()
    const [schoolToken, setSchoolToken] = React.useState()
    const [token, setToken] = React.useState()
    const [etoken, setEtoken] = React.useState()


    const handleMenuClick = () => {
    setMenu(true)
}


    useEffect(() => {

        window.document.addEventListener("scroll", () => {
            setPosition(window.document.body.getBoundingClientRect().top)
            if (window.document.body.getBoundingClientRect().top < -23 && value !== "3") {
                setScroll(true)

            } else {
                setScroll(false)
            }

        })
    }, [])



    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setUser(localStorage.getItem("username"))
        setSchoolToken(localStorage.getItem("schoolToken"))
        setSchool(localStorage.getItem("school"))
        setSchoolId(localStorage.getItem("schoolId"))

        setEtoken(localStorage.getItem("etoken"))
        setEntreprise(localStorage.getItem("entreprise"))
        setEntrepriseId(localStorage.getItem("entrepriseId"))

    }, [token,school,entreprise,user])


    const handleToken = (e) => {
        setToken(e)
    }

    const handleEtoken = (e) => {
        setEtoken(e)
    }

    const handleSchoolToken = (e) => {
        setSchoolToken(e)
    }

  

    return (
        <nav className="fullScreen">
         {normal &&   <main className={!scroll ? styles.main : styles.fixed} >

                <div className="logos">
                    <center >  <Link href="/"><a className="logo">  <Image src="/logo.png" className="logoHome" alt="Digital Education Logo" width={65} height={50} /></a></Link></center>
                    <center className={styles.log}> <Link href="/"><a>{!scroll && !visibleName ? <span className="log"><img src="/log.png" alt="" /> </span> : null}</a></Link></center>

                </div>

                <div className={styles.links}>

                    {value == 1 ? <Link href="/"><a className="active">Acceuil</a></Link> : <Link href="/">Acceuil</Link>}
                    {value == 2 ? <Link href="/Schools"><a className="active">Trouver une ??cole</a></Link> : <Link href="/Schools">Trouver une ??cole</Link>}
                    {value == 3 ? schoolToken !== "" && schoolToken !== undefined && schoolToken ? <Link href={`/addSchoolPro/${schoolId}?token=${schoolToken}`}><a className="active"> School Administration</a></Link> : <Link href="/AddSchool"><a className="active">Pour les ??tablissements</a></Link> : schoolToken !== "" && schoolToken !== undefined && schoolToken ? <Link href={`/addSchoolPro/${schoolId}?token=${schoolToken}`}><a > School Administration</a></Link> : <Link href="/AddSchool"><a > Pour les ??tablissements</a></Link>}
                    {value == 4 ? etoken !== "" && etoken !== undefined && etoken ? <Link href={"/StartPub?id=" + entrepriseId + "&token=" + etoken}><a className="active"> Entreprise Administration</a></Link> : <Link href="/Entreprises"><a className="active"> Pour les entreprises</a></Link> : etoken !== "" && etoken !== undefined && etoken ? <Link href={"/StartPub?id=" + entrepriseId + "&token=" + etoken}><a > Entreprise Administration</a></Link> : <Link href="/Entreprises"><a > Pour les entreprises</a></Link>  }


                </div>

                
                  
                

                
                {/* <div className="desktopScreen"> */}
                        
                 {   value == 4 ? etoken !== "" && etoken !== undefined && etoken ?


                        <Account user={entreprise} e={true} onTokenChange={setEtoken} userData={userData} entrepriseData={entrepriseData} /> :
                       
                        <Auth v={v3} e={true} v2={v4} visbility2={visbility4} visbility={visbility3} setToken={handleEtoken} />
                    
                            : value == 3 ? schoolToken !== "" && schoolToken !== undefined && schoolToken && schoolToken !== null ? <Account user={school} school={true} onTokenChange={setSchoolToken} /> : <Auth v={v1} v2={v5} visbility2={visbility5} school={true} visbility={visbility1} setToken={handleSchoolToken} />  :
                        
                        token !== "" && token !== undefined && token !== null ?
                                <Account user={user} onTokenChange={setToken} userData={userData} entrepriseData={entrepriseData}/>
                            :
                            <Auth v={v} v2={v2}  visbility2={visbility2} visbility={visbility} setToken={handleToken} />
                
                }
                      
                
                {/* </div> */}
                <div className="mobileScreen">
                    <List size={30} color="#4a00b4" onClick={handleMenuClick} className="rounder"/>
</div>
            </main>
            }
       
            
            {!normal && 
            
  <main style={{padding: "10px 20px 5px", borderBottom: "2px solid grey"}} className={ !scroll ? styles.main : styles.fixed}>
                
                <Link href="/" ><a className="desktopScreen">{scroll || !visibleName ? <span className="log"><img src="/log.svg" alt="" /> </span> : null}</a></Link>
                   <Link href="/"><a className="logo mobileScreen">  <Image src="/logo.png" className="logoHome" alt="Digital Education Logo" width={65} height={50} /></a></Link>

<div> </div>
               { token !== "" && token !== undefined && token !== null ?
                <Account user={user} onTokenChange={setToken} userData={userData} entrepriseData={entrepriseData} />
                :
                <Auth v={v} v2={v2} visbility2={visbility2} visbility={visbility} setToken={handleToken} />

                }
         
            </main>
        
            }
       
            {menu && <Menu onModalChange={setMenu} component={<>
            

            
                <div className="tableMenu">
                    <div className={styles.ds} >  <Link href="/"><a className="logo">  <Image src="/logo.png" className="logoHome" alt="Digital Education Logo" width={48} height={40} /></a></Link>
                        <Link href="/"><a> <span className="log"><img src="/log.png" className="logoHome" alt="" /> </span> </a></Link>

                    
                    </div>


                    {value == 1 ? <Link href="/"><a className="active ds"><HouseFill size={20} color="#4a00b4" /> Acceuil</a></Link> : <Link href="/" ><a className="ds a"><HouseFill size={20} color="#4a00b4" />Acceuil</a></Link>}
                    {value == 2 ? <Link href="/Schools"><a className="active ds"><Search size={20} color="#4a00b4" /> Trouver une ??cole</a></Link> : <Link href="/Schools"><a className="ds a"><Search size={20} color="#4a00b4" /> Trouver une ??cole</a></Link>}
                    {value == 3 ? schoolToken !== "" && schoolToken !== undefined && schoolToken ? <Link href={`/addSchoolPro/${schoolId}?token=${schoolToken}`}><a className="active ds"><Building size={20} color="#4a00b4" /> School Administration</a></Link> : <Link href="/AddSchool"><a className="active ds"><Building size={20} color="#4a00b4" />Pour les ??tablissements</a></Link> : schoolToken !== "" && schoolToken !== undefined && schoolToken ? <Link href={`/addSchoolPro/${schoolId}?token=${schoolToken}`}><a className="ds"><Building size={20} color="#4a00b4" /> School Administration</a></Link> : <Link href="/AddSchool"><a className="ds"><Building size={20} color="#4a00b4" /> Pour les ??tablissements</a></Link>}
                    {value == 4 ? etoken !== "" && etoken !== undefined && etoken ? <Link href={"/StartPub?id=" + entrepriseId + "&token=" + etoken}><a className="active ds"><BriefcaseFill size={20} color="#4a00b4" /> Entreprise Administration</a></Link> : <Link href="/Entreprises"><a className="active ds"><BriefcaseFill size={20} color="#4a00b4" /> Pour les entreprises</a></Link> : etoken !== "" && etoken !== undefined && etoken ? <Link href={"/StartPub?id=" + entrepriseId + "&token=" + etoken}><a className="ds"><BriefcaseFill size={20} color="#4a00b4" /> Entreprise Administration</a></Link> : <Link href="/Entreprises"><a className="ds"><BriefcaseFill size={20} color="#4a00b4" /> Pour les entreprises</a></Link>}


                </div>
            
            
            </>} />}
        </nav >
       


    )
}

export default Header





export function Auth({ visbility, visbility2, v, v2, setState, setToken, e, school = false }) {
 
    return (
        <div>
            <div className="flx">
                <a style={{ color: "#4a00b4" }} className={school ? "btnSecondary" : null } onClick={v2}>  Se Connecter</a>

                {school ? null :     <a className="btnPrimary" onClick={v}
                > Cr??er Un Compte </a>}
            </div>
            {visbility && <CustomModal onModalChange={v} component={<CreateAccount stateChange={v} e={e} setToken={setToken}/>} />}
            {visbility2 && <CustomModal onModalChange={v2} component={<Login stateChange={v2} e={e}  setToken={setToken} school={school}/>} />}
        </div>
    )
}


export function Account({ user, onTokenChange, e, school = false, userData, entrepriseData}) {
    const [visible, setVisible] = useModal(false)
    const [entreprise, setEntreprise] = React.useState()
    React.useEffect(() => {
        setEntreprise(localStorage.getItem("entreprise"))
    }, [entreprise])
    const handleClick = () => {
        setVisible(true)
    }
    return (
        <div>

            <div >

                <span className={styles.acc} onClick={handleClick}> <PersonCircle size={25} color="#fff" /> { e ? entreprise : user} </span>
            </div>

            {visible && <FineModal onModalChange={setVisible} component={<Disconnect v={setVisible} userData={userData} entrepriseData={entrepriseData} onTokenChange={onTokenChange} e={e} school={ school}/>} position={{ top: 90, right: 60 }} />}
        </div>)
}


export function Disconnect({ v, onTokenChange, e, school, userData, entrepriseData }) {
    const [visbility, v1] = useModal(false)
    const token = localStorage.getItem("token")
    const entreprise = localStorage.getItem("etoken")
    const entrepriseId = parseInt(localStorage.getItem("entrepriseId"))
    const userId = parseInt(localStorage.getItem("userId"))
    const router = useRouter()
    const [data, setData] = React.useState()
    const handleDisconnect = () => {


        if (e !== null && e !== undefined && e)  {
            localStorage.removeItem("etoken")
            localStorage.removeItem("entreprise")
            localStorage.removeItem("entrepriseId")
            v(false)
            onTokenChange("")
        } else if (school) {
            localStorage.removeItem("schoolToken")
            localStorage.removeItem("school")
            localStorage.removeItem("schoolId")
            router.push("/AddSchool")
            v(false)
            onTokenChange("")
         }
        else {
              localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userId")
            v(false)
            onTokenChange("")
        }

    }
    const handleClick = React.useCallback(async () => {
        v1(true)
        
        if (e !== null && e !== undefined && e) {
            if (entrepriseData && !entrepriseData.error) {
               
                setData(entrepriseData.entreprises[entrepriseId - 1])
}
                
                
        }
      
        else {
            if (userData && !userData.error) {

                setData(userData.users[userId - 1])

            }
 
        }


    },[])
    


    return (
        <div className={styles.tab}>
           
            <a className={styles.dfss} onClick={handleDisconnect}>
                <PersonBoundingBox size={20} color="#4a00b4" /> Se D??connecter</a>

                
           { (data !== null && data !== undefined && data) ? visbility && <CustomModal onModalChange={v1} component={<CreateAccount stateChange={v1} e={e} data={data} />} />:
            visbility && <CustomModal onModalChange={v1} component={<CreateAccount stateChange={v1} e={e} data={data} />} />} 
        </div>
    )
}




