import React from 'react'
import { ArrowLeft, BarChart, CursorFill, Bell, Building, CartX, Check, ChevronCompactLeft, Clipboard, Disc, Exclude, Eye, Flower1, Gear, Link, Lock, LockFill, Person, PersonCircle, SuitDiamond, Trash, Whatsapp, } from 'react-bootstrap-icons'
import styles from '../components/Style/CreateAccount.module.css'
import style from '../styles/sudo.module.css'
import "../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../components/handleBool'
import FineModal from '../components/fineModal'
import CustomModal from '../components/customModal'

import { useForm } from 'react-hook-form'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { FieldValidate, PasswordValidate } from '../components/FormTools'
import Loader from 'react-loader-spinner'
import { fetchAllSchoolData } from '../Model/getter'
import Activity from '../components/Sudo/Activity'
import Entreprises from '../components/Sudo/entreprises'
import Schools from '../components/Sudo/Schools'
import Abonner from '../components/Sudo/Abonner'
import Notifications from '../components/Sudo/Notifications'
import Stats from '../components/Sudo/Stats'

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
    const [loader, setLoader] = React.useState(false)

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

                        <div className="dfss">
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

export const SudoContext = React.createContext({})


export default function Controller({ schools }) {

    const [schoolId, setSchoolId] = React.useState()
    const [schoolToken, setSchoolToken] = React.useState()
    const [err, setErr] = React.useState()
    const router = useRouter()




    const schoolReducer = React.useCallback((state, action) => {
        switch (action.type) {

            case "ADD":
                const newSatate = [...state[action.name]]

                newSatate.push({ ...action.data })
                let finish = { ...state, [action.name]: newSatate }

                return finish
            case "ADDSPE":
                const newSatate2 = [...state[action.name]]

                newSatate2.push({ ...action.data })
                finish = { ...state, [action.name]: newSatate2 }


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

            case "UPDATESCHOOL":
                const upSchoolState = state[action.name]
                upSchoolState.school = action.value

                finish = { ...state, [action.name]: upSchoolState }
                return finish
            case "UPDATENewArray":
                const upState2 = [...state[action.name]]

                upState2[action.id].name = action.value
                upState2[action.id].fil = action.fil
                upState2[action.id].prix = action.prix


                finish = { ...state, [action.name]: upState2 }

                return finish

            case "UPDATE":
                const upState = [...state[action.name]]

                upState[action.id] = action.value
                if (upState[action.id].fil) {
                    upState[action.id].fil = action.fil
                    upState[action.id].prix = action.prix
                }

                finish = { ...state, [action.name]: upState }

                return finish
            default:

                const defState = [...state[action.name]]

                finish = { ...state, [action.name]: defState }

                return finish
        }

    }, [])



    useIsomorphicLayoutEffect(() => {


        setSchoolToken(sessionStorage.getItem("sudoToken"))
        setSchoolId(sessionStorage.getItem("sudo"))
    }, [])

    const handleSubmit = async(data) => {
        await axios.post("/sudo", data).then( (res) => {

            sessionStorage.setItem("sudoToken", res.data.token)
            sessionStorage.setItem("sudo", res.data.id)
            setSchoolToken(res.data.token)

            
            router.push(`/Sudo?token=${res.data.token}`)


        }).catch(e => setErr("Cet utilisateur n'existe pas"))
    }

    const [data, dispacth] = React.useReducer(schoolReducer, { ...schools})

    const value = React.useMemo(() => ({ data, dispacth }), [data, dispacth])

    return (
        <>
            {(schoolToken && schoolToken !== "" && schoolToken !== undefined )
                ?
               
                <SudoContext.Provider value={value}>
                        <Dasboard />
                </SudoContext.Provider>
                
                :
                <ControllerBuilder submitData={handleSubmit} err={err} />
                
            }
        </>
    )
}


export async function getServerSideProps({ params, query }) {

    const token = query.token
    
    const schools = await fetchAllSchoolData()


    return {
        props: {
            schools,
         

        },
    };



}






// export async function getServerSideProps({ params }) {

//     const token = query.token
//     const id = parseInt(params.id)
//     const fils = await fetchFilieres(id);
//     const specialities = await fetchSpecialities(id);
//     const types = await fetchTypes(id);
//     const positions = await fetchPositions(id);
//     const schoolData = await fetchSchoolData(id, token);
//     const abo = await fetSchoolAbo(id)
//     const mes = await fetSchoolMessages(id)



//     return {
//         props: {
//             schoolData,
//             fils,
//             specialities,
//             types,
//             positions,
//             abo,
//             mes

//         },
//     };



// }







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


export function Dasboard() {

    const router = useRouter()
    const [level, setLevel] = React.useState(1)

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

                            <span className={level == 1 ? style.active : style.span} onClick={() => { setLevel(1) }} > <Flower1 size={20} color={level == 1 ? "#fff" : "#4a00b4"} className={level == 1 ? style.acticon : style.icon} /> Activités </span>
                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <Building size={20} color={level == 2 ? "#fff" : "#4a00b4"} className={level == 2 ? style.acticon : style.icon} /> Entreprises </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <SuitDiamond size={20} color={level == 3 ? "#fff" : "#4a00b4"} className={level == 3 ? style.acticon : style.icon} /> Etablissements </span>
                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#4a00b4"} className={level == 4 ? style.acticon : style.icon} /> Parents/Élève </span>
                            {/* <span className={level == 5 ? style.active : style.span} onClick={() => { setLevel(5) }}> <Bell size={20} color={level == 5 ? "#fff" : "#4a00b4"} className={level == 5 ? style.acticon : style.icon} /> Notifications </span> */}
                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChart size={20} color={level == 6 ? "#fff" : "#4a00b4"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>

                        </div>

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">


                            <span className={level == 1 ? style.h1 : style.no}  >Activités </span>
                            <span className={level == 2 ? style.h1 : style.no} > Entreprises </span>
                            <span className={level == 3 ? style.h1 : style.no} >  Etablissements </span>
                            <span className={level == 4 ? style.h1 : style.no} >  Parents/Élève </span>
                            {/* <span className={level == 5 ? style.h1 : style.no} >Envoyer Des Notifications </span> */}
                            <span className={level == 6 ? style.h1 : style.no} > Statistiques </span>

                            <Connect />

                        </nav>

                        <div className={style.right}>

                            {level == 1 && <Activity choise={choise} handleChoiseState={handleChoiseState} />}
                            {level == 2 && <Entreprises />}
                            {level == 3 && <Schools />}
                            {level == 4 && <Abonner />}
                            {/* {level == 5 && <Notifications />} */}
                            {level == 6 && <Stats />}
                        </div>

                    </article>
                </div>
            </div>
        </>
    )
}





export function Verif() {
    const router = useRouter()
    const [visible, v] = useModal(false)
    const handleDisconnect = () => {
        sessionStorage.removeItem("sudoToken")
        sessionStorage.removeItem("sudo")
        router.push("/")
    }

    const handleChangePassWord = () => {
        v(true)
    }
    return (
        <>
            <div className={style.dg}>


                <a onClick={handleDisconnect} className="dfss">
                    <Link size={20} color="#4a00b4"  className={style.icon} /> Se Déconnecter</a>

                <a onClick={handleChangePassWord} className="dfss">
                    <LockFill size={20} color="#4a00b4" className={style.icon} /> Changer de mot de passe</a>



            </div>
            {visible && <CustomModal onModalChange={v} component={<ChangePasse />} />}
        </>
    )
}



export function ChangePasse() {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched"})

  
  
    const onSubmit =  (data) => {
        console.log(isValid)
        if (isValid) {
            axios.put("/sudo", {...data,username: "admin"}, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("sudoToken")
                }

            }).then(res=> setFine("Modification éffectuer avec succès")).catch(rres=> setErr("Une erreur est survenu veuillez réessayer")).finally(setLoader(false))
    }
}


    return (
        <div>


            {isSubmitted && fine && isSubmitSuccessful && <div className="fine">
                {fine}
            </div>}
            {err && isSubmitted && isValid && <div className="error">
                {err}
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                
                <PasswordValidate name="oldpassword" r={false} control={control} image={<LockFill size={20} color="#4a00b4" />} old={true} >Ancien mot de passe</PasswordValidate>
                {errors.oldpassword && errors.oldpassword.type === "required" && (
                    <span className="error">ce champ est obligatoire</span>
                )}
                {errors.oldpassword && errors.oldpassword.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moins trois caracteres</span>
                )}

                <PasswordValidate name="password" r={false} control={control} image={<LockFill size={20} color="#4a00b4" />} newp={true} >Nouveau mot de passe</PasswordValidate>
       
                {errors.password && errors.password.type === "required" && (
                    <span className="error">Le mot de passe est requis</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <span className="error">Le mot de passe doit faire au moins 8 caracteres</span>
                )}


                <div className={styles.df}>
                    <button  className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}

                        Enregistrer</button>
                </div>
                <center style={{ fontSize: ".9em" }}>  <span>mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span></center>

            </form>

        </div>
    )
}





export function Verif1() {
    return (
        <>
            Voulez vous delete?

            <a className={style.agree}>
                <Check size={20} color="#ffff" className={style.icon} /> Accepter</a>
            <a className={style.disagree} >  <Trash size={20} color="#ffff" className={style.icon} /> Annuler</a>
        </>
    )
}









export function Login({ handleSetSudoToken }) {

    const { register, handleSubmit, formState: { errors } } = useForm()


    const onSubmit = data => {

        handleSetSudoToken()

    }

    return (

        <div>



            <form onSubmit={handleSubmit(onSubmit)}>
                <center className={styles.h2}>
                    Connection
                </center>
                <div className={styles.df}>
                    <label htmlFor="name"> <Person color="#4a00b4" size="20px" /> </label>

                    <input type="text" id="name" name="username" placeholder="Entrez votre Nom" {...register("username", { required: true })} />

                </div>
                <div className="error" >
                    {errors.username && <span className="error">Le nom est obligatoire</span>}
                </div>
                <div className={styles.df}>
                    <label htmlFor="password"> <Lock color="#4a00b4" size="20px" /> </label>
                    <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" {...register("password", { required: "Required" })} />

                </div> <div className="error" >
                    {errors.password && <span className="error"> Le mot de passe est obligatoire</span>}
                </div>

                <div className={styles.df}>

                    <button type="submit" className="btnPri">Se Connecter </button>
                </div>


                <div className={styles.df}>
                    <span> mot de passe oublié? <span style={{ color: "#4a00b4" }}>Oui</span></span>
                </div>
            </form>
        </div>
    )
}



export function Test3({ id, onDelete }) {
    const refIci = React.useRef(null)
    return (<>
        <tr ref={refIci}>
            <td>#{id}</td>
            <td>Lorem ipsum </td>
            <td>+237 678 61 56 77 </td>
            <td className="dfss">
                <a className={style.disagree3}>
                 <Whatsapp color="#FFF" size={20}  className={style.icon} /> écrire whatsapp</a>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}
