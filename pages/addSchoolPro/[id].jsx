import React, { useEffect, useLayoutEffect } from 'react'
import { ArrowLeft,  Lock,  Person, PersonCircle,  DisplayFill, FileRuled, Pen, DoorClosed, Briefcase, Cash,  KanbanFill, AlignMiddle, Link, ChevronRight, HouseFill, BellFill, BarChartFill, Joystick, } from 'react-bootstrap-icons'
import style from '../../styles/sudo.module.css'
import "../../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../../components/handleBool'
import FineModal from '../../components/fineModal'
import CustomModal from '../../components/customModal'
import { useForm } from 'react-hook-form'
import { FieldValidate, PasswordValidate } from '../../components/FormTools'
import styles from '../../styles/startpub.module.css'
import Loader from "react-loader-spinner";
import { fetchPositions, fetchTypes, fetchFilieres, fetchSchoolData, fetchSpecialities } from "../../Model/getter"
import { Account } from '../Template/Header'
import { SiteWeb } from '../../components/SchoolAdmin/web'
import Welcome from '../../components/SchoolAdmin/Welcome'
import { Home } from '../../components/SchoolAdmin/Fiches'
import Abonner from '../../components/SchoolAdmin/Abonner'
import AddSchool from '../AddSchool'
import { schoolReducer } from '../../Reducer/schoolPro'
import Notif from '../../components/SchoolAdmin/notif'
import Stats from '../../components/SchoolAdmin/Stats'


const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}












export function ControllerBuilder({ submitData, err }) {
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
                    <FieldValidate name="username" image={<Person color="#4a00b4" size="20px" />} auto="Entrez le sigle de votre établissement" control={control} />
                    {errors.username && errors.username.type === "required" && (
                        <span className="error">Le sigle est obligatoire</span>
                    )}

                    {errors.sigle && errors.sigle.type === "minLenght" && (
                        <span >La valeur trop court</span>
                    )}

                    <PasswordValidate name="password" image={<Lock color="#4a00b4" size="20px" />} auto="Entrez le sigle de votre établissement" control={control} />
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




export default function Controller({ schoolData, fils, specialities, types,positions }) {
  
    const [schoolId, setSchoolId] = React.useState()
    const [schoolToken, setSchoolToken] = React.useState()
    const router = useRouter()
    const [err, setErr] = React.useState()
    const schoolReducer = React.useCallback((state, action) => {
        switch (action.type) {
            case "delete":

                break;
            case "update":
                let newState = { ...state.schoolData.school, name: "New Value" }
                state.schoolData.school = newState
               
                return { ...state}
                

            default:
                return [...state];
        }

    }, [])
   
    
    const [data, dispacth] = React.useReducer(schoolReducer, { schoolData, positions, types, fils, specialities})
   
console.log(dispacth)



    const value = React.useMemo(() => ({ data, dispacth }),[data,dispacth])

    // console.log(schoolValue.dispacth({ type: "update" }))






    useIsomorphicLayoutEffect(() => {


        setSchoolToken(sessionStorage.getItem("schoolToken"))
        setSchoolId(sessionStorage.getItem("schoolId"))
    }, [])

    const handleSubmit = (data) => {
        axios.post("/school", data).then(async (res) => {

            sessionStorage.setItem("schoolToken", res.data.schoolToken)
            sessionStorage.setItem("school", res.data.school)
            sessionStorage.setItem("schoolId", res.data.id)
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
                    <Dasboard filieres={fils} specialities={specialities}/>
                </SchoolContext.Provider>
                :
                <ControllerBuilder submitData={handleSubmit} err={err} />
                // <AddSchool/>
            }
        </>
    )
}






export function Dasboard({ filieres, specialities}) {
    
    const router = useRouter()
    const [level, setLevel] = React.useState(1)
    const [choise, handleChoiseState] = useChangeBool(true)
    const [visbility, v] = useModal(false)

    const school = React.useContext(SchoolContext)
    const dataSchool = school.data.schoolData.school
    const [schoolToken, setSchoolToken] = React.useState()
    const user = sessionStorage.getItem("school")

    return (
        <>

            <div className={style.container}>


                <div className={styles.flex}>

                    <aside>
                        <div className={style.bar}>
                            <span className={level == 0 ? style.active : style.span} onClick={(e) => {
                                e.preventDefault()
                                setLevel(0)
                                router.push("/")
                            }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#4a00b4"} className={level == 0 ? style.acticon : style.icon} /> Revenir au site</span>

                            <span className={level == 1 ? style.active : style.span} onClick={() => { setLevel(1) }}> <HouseFill size={20} color={level == 1 ? "#fff" : "#4a00b4"} className={level == 1 ? style.acticon : style.icon} /> Acceuil  </span>
                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <FileRuled size={20} color={level == 2 ? "#fff" : "#4a00b4"} className={level == 2 ? style.acticon : style.icon} /> Fiches  </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <DisplayFill size={20} color={level == 3 ? "#fff" : "#4a00b4"} className={level == 3 ? style.acticon : style.icon} /> Site Web </span>
                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#4a00b4"} className={level == 4 ? style.acticon : style.icon} /> Parents/Élève </span>
                            <span className={level == 5 ? style.active : style.span} onClick={() => { setLevel(5) }}> <BellFill size={20} color={level == 5 ? "#fff" : "#4a00b4"} className={level == 5 ? style.acticon : style.icon} /> Notifications </span>
                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChartFill size={20} color={level == 6 ? "#fff" : "#4a00b4"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>

                        </div>

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">

                            <img style={{width: "100px"}} src={dataSchool && "/" + dataSchool.sigle + "-" + dataSchool.logo} alt={dataSchool && dataSchool.sigle || "Logo"} />


                            <div className={styles.end}>
                                <ForPro />
                                <div className={styles.account}>
                                    <Account user={user} school={true} onTokenChange={setSchoolToken} />

                                </div>
                            </div>


                        </nav>

                        <div className={style.right}>

                            {level == 1 && <Welcome />}
                            {level == 2 && <Home filieres={filieres} specialities={specialities} />}
                            {level == 3 && <SiteWeb filieres={filieres} specialities={specialities}/>}
                            {level == 4 && <Abonner />}
                            {level == 5 && <Notif/>}
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
   
    const handleChange = () => {
        v(false)
    }
  
    return (

        <>
            <div>
                <a className="btnPri" onClick={handleChange}>Passer Pro</a>
            </div>

            {visbility && <FineModal position={{ top: 30, left: "35%", width: "30%" }} onModalChange={v} component={<ProMode />} />}
        </>
    )
}

export function ProMode() {
    return (
        <>
            <div >
                <a>Passer Pro et Vous aurez les avantages liés aux pros</a>
                <p>
                    Pour passer pro il faudrait Faire un depot à un numéro et attendre et pouvoir passer pro.

                </p>
                <p>
                    Si Vous avez effectuer le depot alors valider votre demande en cliquant SUR LE BOUTON <br />

                </p>
                <center><a className="btnPri">Valider La Demande</a></center>
            </div>


        </>
    )
}








export  async function getServerSideProps ({ params, query}) {
  
  const token = query.token
    const id = parseInt(params.id)
    const fils = await fetchFilieres(id);
    const specialities = await fetchSpecialities(id);
    const types = await fetchTypes(id);
    const positions = await fetchPositions(id);
    const schoolData = await fetchSchoolData(id, token);



    return {
        props: {
            schoolData,
            fils,
            specialities,
            types,
            positions
            
        },
    };
   
    
 
}