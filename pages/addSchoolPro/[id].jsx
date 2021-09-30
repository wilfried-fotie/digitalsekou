import React, { useEffect, useLayoutEffect } from 'react'
import { ArrowLeft, Lock, Person, PersonCircle, FileWordFill,  DisplayFill, FileRuled, Pen, DoorClosed, Briefcase, Cash,  KanbanFill, AlignMiddle, Link, ChevronRight, HouseFill, BellFill, BarChartFill, Joystick, TrophyFill, FileWord, Globe, } from 'react-bootstrap-icons'
import style from '../../styles/sudo.module.css'
import "../../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../../components/handleBool'
import FineModal from '../../components/fineModal'
import { useForm } from 'react-hook-form'
import { FieldValidate, PasswordValidate } from '../../components/FormTools'
import styles from '../../styles/startpub.module.css'
import Loader from "react-loader-spinner";
import { fetchPositions, fetchTypes, fetchFilieres, fetchSchoolData, fetchSpecialities, fetSchoolAbo, fetSchoolMessages } from "../../Model/getter"
import { Account } from '../Template/Header'
import { ModSchool, SiteWeb } from '../../components/SchoolAdmin/web'
import Welcome from '../../components/SchoolAdmin/Welcome'
import { Home } from '../../components/SchoolAdmin/Fiches'
import Abonner from '../../components/SchoolAdmin/Abonner'
import Stats from '../../components/SchoolAdmin/Stats'
import Notification from '../../components/SchoolAdmin/Notification'
import WebsitePreview from '../../components/School/WebsitePreview'
import { Connect } from '../Sudo'
import Head from "next/head"
import { AddPost } from '../../components/CustomHooks/AddPost'
import AddThink from '../../components/SchoolAdmin/AddThink'
import { fecthPost } from '../../Model/getEntreprise'
import CustomModal from '../../components/customModal'
import NotPro from '../../components/CustomHooks/NotPro'


const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}












export function ControllerBuilder({ submitData, err ,e=false}) {
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched" })

    const router = useRouter()
    const [loader,setLoader] = React.useState(false)

    const onSubmit = async (data) => {
        if (isValid) {
            setLoader(true)
            await submitData(data)
          
            setLoader(false)
        }
        if (!isSubmitSuccessful) {
            setLoader(false)

        }

    }
    return (
        <>
           
            <main className={style.main}>
            
                <div className={style.ok}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <center>  <a > Connexion Compte Etablissements</a></center>

                    {err && isSubmitted && isValid && <div className="error">
                        {err}
                    </div>}
                        <FieldValidate name="username" image={<Person color="#4a00b4" size="20px" />} auto={!e ? "Entrez le sigle de votre établissement" : "Entre le nom d'entreprise"} control={control} />
                    {errors.username && errors.username.type === "required" && (
                            <span className="error">{e ? "Le sigle est obligatoire" : "Le Nom d'entreprise est obligatoire"}</span>
                    )}

                    {errors.sigle && errors.sigle.type === "minLenght" && (
                        <span >La valeur trop court</span>
                    )}

                    <PasswordValidate name="password" image={<Lock color="#4a00b4" size="20px" />}  control={control} />
                    {errors.password && errors.password.type === "required" && (
                        <span className="error">Le mot de passe est obligatoire</span>
                    )}

                    {errors.password && errors.password.type === "minLenght" && (
                        <span >Le mot de passe à au moins 8 caractère</span>
                    )}

                     <div className={styles.dfss}>
                  <center>  <button disabled={loader} className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}

                            Enregistrer</button></center>
                </div>

                    <center style={{ fontSize: ".9em" }}>  <span>mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span></center>

                </form>
            </div> </main>

        </>
    )

}


// Context Reducer SchoolData

export const SchoolContext = React.createContext({})




export default function Controller({ schoolData, fils, specialities, types, positions, abo, mes, getPost}) {
  
    const [schoolId, setSchoolId] = React.useState()
    const [schoolToken, setSchoolToken] = React.useState()
    const router = useRouter()
    const [err, setErr] = React.useState()
    const users = abo.abo
    const schoolReducer = React.useCallback((state, action) => {
        switch (action.type) {
           
            case "ADD":
                const newSatate = [...state[action.name]]
                 
                newSatate.push({ ...action.data })
                let finish = { ...state, [action.name]: newSatate }

                return finish
            case "ADDSPE":
                const newStatea = [...state[action.name][action.pre]]
                newStatea.push({ ...action.data })

                finish = { ...state, [action.name]: { [action.pre]: newStatea } }
                return finish


            case "DELETESPE":
                const delStat = [...state[action.name][action.pre]]

                let num2 = action.id
                delStat.splice(num2, 1)
                finish = { ...state, [action.name]: { [action.pre]: delStat } }
                return finish
            case "UPDATESPE":
                const upState2 = [...state[action.name][action.pre]]
                upState2[action.id] = action.data
                finish = { ...state, [action.name]: { [action.pre]: upState2 } }
                return finish
            case "DELETE":
                 const delState = [...state[action.name]]
                let num = action.id
                delState.splice(num, 1)
                if (delState.payload) {
                    num = delState.payload
                }
                finish = { ...state, [action.name]: delState }
                return finish
            case "DELETE2":
                const delState3 = [...state[action.name][action.name]]
                
                delState3.splice(action.id, 1)
               
                finish = { ...state, [action.name]: { [action.name]: delState3} }
                return finish
           
            case "UPDATESCHOOL":
                const upSchoolState = state[action.name]
                const upSchoolStatePosition = state["positions"]
                const upSchoolStateType = action.value.types
                upSchoolState.school = action.value
               
                const dolor = { positions: [] }
                const dolorPosition = { types: [] }
                action.value.positions.map(e => {
                    dolor.positions.push({position: e.value })
                })
                
                action.value.multiple !== "Non" ? action.value.type.map(e => {
                    dolorPosition.types.push({ types: e.value })
                }) : null



                finish = { ...state, [action.name]: upSchoolState, positions: dolor, types: action.value.multiple == "Non" ? { types: [action.value.type.value] } : dolorPosition }

                return finish
            case "UPDATEOBJ":
                

                finish = { ...state, [action.name]: { [action.pre]: action.data } }



                return finish
           
            case "UPDATE":
                 const upState = [...state[action.name]]

                upState[action.id] = action.data
                finish = { ...state, [action.name]: upState }

                return finish
            case "UPDATEALL":

                const upStateAll = [state[action.name]]

                finish = { ...state, [action.name]: { [action.name]: action.data,error: false } }

                return finish
            default:

                const defState = [...state[action.name]]

                finish = {
                    ...state, [action.name]: { [action.name]: defState } }

                return finish
        }

    }, [])
   
    const spe = [...specialities.specialities]
   

  
  

    const [data, dispacth] = React.useReducer(schoolReducer, { schoolData, positions, types, spe, users, mes, getPost})
   



    const value = React.useMemo(() => ({ data, dispacth }),[data,dispacth])







    useIsomorphicLayoutEffect(() => {


        setSchoolToken(localStorage.getItem("schoolToken"))
        setSchoolId(localStorage.getItem("schoolId"))
    }, [])

    const handleSubmit = (data) => {
        axios.post("/school", data).then(async (res) => {

            localStorage.setItem("schoolToken", res.data.schoolToken)
            localStorage.setItem("school", res.data.school)
            localStorage.setItem("schoolId", res.data.id)
            setSchoolToken(res.data.schoolToken)


            router.push(`/addSchoolPro/${res.data.id}?token=${res.data.schoolToken}`)



        }).catch(e => setErr("Cet utilisateur n'existe pas"))
    }

    let dataError = schoolData.error

    return (
        <>
            {(schoolToken && schoolToken !== "" && schoolToken !== undefined && dataError !== true && !dataError )
                ?
                <SchoolContext.Provider value={value}>
                    <Dasboard specialities={specialities}/>
                </SchoolContext.Provider>
                :
                <ControllerBuilder submitData={handleSubmit} err={err} />
                // <AddSchool/>
            }
        </>
    )
}






export function Dasboard({  specialities}) {
    
    const router = useRouter()
    const [level, setLevel] = React.useState(1)
    const [choise, handleChoiseState] = useChangeBool(true)
    const [visbility, v] = useModal(false)

    const school = React.useContext(SchoolContext)
    const dataSchool = school.data.schoolData && school.data.schoolData.school
    const [schoolToken, setSchoolToken] = React.useState()
    const user = React.useContext(SchoolContext).data.schoolData.school.sigle

    return (
        <>
            <Head>
                <title>School Administration</title>
            </Head>
            <div className={style.container}>


                <div className={styles.flex}>
                    <aside>
                        <div className={style.bar}>
                            <span className={level == 0 ? style.active : style.span} onClick={(e) => {
                                e.preventDefault()
                                setLevel(0)
                                router.push("/")
                            }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#FFF9"} className={level == 0 ? style.acticon : style.icon} /> Revenir au site</span>

                            
                            <div className={style.ava} >
                                <img className={style.avatar}  src={dataSchool && "/"  + dataSchool.logo} alt={dataSchool && dataSchool.sigle || "Logo"} />

                            </div>


                            <span className={level == 1 ? style.active : style.span} onClick={() => { setLevel(1) }}> <HouseFill size={20} color={level == 1 ? "#fff" : "#FFF9"} className={level == 1 ? style.acticon : style.icon} /> Acceuil  </span>
                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <FileRuled size={20} color={level == 2 ? "#fff" : "#FFF9"} className={level == 2 ? style.acticon : style.icon} /> Fiches  </span>
                            <span className={level == 8 ? style.active : style.span} onClick={() => { setLevel(8) }}> <Globe size={20} color={level == 8 ? "#fff" : "#FFF9"} className={level == 8 ? style.acticon : style.icon} /> Enrichir Votre Site Web </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <FileWordFill size={20} color={level == 3 ? "#fff" : "#FFF9"} className={level == 3 ? style.acticon : style.icon} /> Modifier Votre Site Web </span>
                            <span className={level == 7 ? style.active : style.span} onClick={() => { setLevel(7) }}> <DisplayFill size={20} color={level == 7 ? "#fff" : "#FFF9"} className={level == 7 ? style.acticon : style.icon} /> Visualiser Votre Site Web </span>
                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#FFF9"} className={level == 4 ? style.acticon : style.icon} /> Abonnés </span>
                            <span className={level == 5 ? style.active : style.span} onClick={() => { setLevel(5) }}> <BellFill size={20} color={level == 5 ? "#fff" : "#FFF9"} className={level == 5 ? style.acticon : style.icon} /> Notifications </span>
                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChartFill size={20} color={level == 6 ? "#fff" : "#FFF9"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>

                        </div>
                        

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">

<ForPro />
                            <Connect info={{ url: "/school-change-pass", data: dataSchool,token: {name: "school",token:"schoolToken",id: "schoolId"}}}/>

                           


                        </nav>

                        <div className={style.right}>

                          
                            {level == 1 && <Welcome />}
                            {level == 2 && <Home specialities={specialities} />}
                            {level == 8 && <AddThink />}
                            {level == 3 && <center><> <ModSchool specialities={specialities} /></> </center>}
                            {level == 7 && <WebsitePreview  />}
                            {level == 4 && <Abonner />}
                            {level == 5 && <Notification/>}
                            {level == 6 && <Stats />}
                        </div>

                    </article>
                </div>
            </div>

        </>
    )
}


export function ForPro() {
    const [visbility, v] = useModal(false)
    const school = React.useContext(SchoolContext).data.schoolData.school
    const handleChange = () => {
        v(false)
    }
  
    return (

        <>
            <div>
                {school.demande ? <a className="btnPri" onClick={handleChange}>  Demande en cours... </a> : school.pro ? <a className={styles.wa}> <TrophyFill color="green" size={20} /> Bravo!! Vous êtes pro  </a> : <a className="btnPri" onClick={handleChange}> Passer Pro </a> }
            </div>

            {visbility && <CustomModal onModalChange={v} component={<><NotPro pass={false}/><ProMode/></>} />}
        </>
    )
}

export function ProMode() {

    const school = React.useContext(SchoolContext).data.schoolData.school
    const dispacth = React.useContext(SchoolContext).dispacth
    const handleSubmit = () => {
      
        axios.put(`/demande/${school.id}`, { demande: true }).then(r => null).catch(e => null)
        dispacth({ type: "UPDATEOBJ", name: "schoolData",pre: "school", data: {...school,demande: !school.demande} })
    }
    return (
        <>
            
            <center className="padding"><a className="btnPri" onClick={handleSubmit}>Valider La Demande</a></center>
          

        </>
    )
}








export  async function getServerSideProps ({ params, query}) {
  
  const token = query.token
    const id = parseInt(params.id)
    const specialities = await fetchSpecialities(id);
    const types = await fetchTypes(id);
    const positions = await fetchPositions(id);
    const schoolData = await fetchSchoolData(id, token);
    const abo = await fetSchoolAbo(id)
    const mes = await fetSchoolMessages(id)
    const getPost = await fecthPost(id,"school")


    return {
        props: {
            schoolData,
            specialities,
            types,
            positions,
            abo,
            mes,
            getPost
            
        },
    };
   
    
 
}