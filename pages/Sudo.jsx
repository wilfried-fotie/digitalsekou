import React from 'react'
import { ArrowLeft, BarChart, CursorFill,  Bell, Building, CartX, Check, ChevronCompactLeft, Clipboard, Disc, Exclude, Eye, Flower1, Gear, Link as Lk, Lock, LockFill, Person, PersonCircle, SuitDiamond, Trash, Whatsapp, CashStack, CartFill, CartDashFill, FileLockFill, } from 'react-bootstrap-icons'
import styles from '../components/Style/CreateAccount.module.css'
import style from '../styles/sudo.module.css'
import "../global"
import axios from "axios"
import { useRouter } from "next/router"
import useChangeBool from '../components/handleBool'
import FineModal from '../components/fineModal'
import CustomModal from '../components/customModal'
import Head from "next/head"
import { useForm } from 'react-hook-form'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { FieldValidate, PasswordValidate } from '../components/FormTools'
import Loader from 'react-loader-spinner'
import { fetchAllEntrepriseData, fetchAllEntrepriseSiteData, fetchAllSchoolData, fetchAllUsersData } from '../Model/getter'
import Activity from '../components/Sudo/Activity'
import Entreprises from '../components/Sudo/entreprises'
import Schools from '../components/Sudo/Schools'
import Abonner from '../components/Sudo/Abonner'
import Notifications from '../components/Sudo/Notifications'
import Stats from '../components/Sudo/Stats'
import { fecthAllOffer, fecthAllPub } from '../Model/getIndex'
import Pubs from '../components/Sudo/pubs'
import Offres from '../components/Sudo/offres'
import Link from "next/link"


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

                        <center>  <a > Connexion Compte Administrateur</a></center>

                        {err && isSubmitted && isValid && <div className="error">
                            {err}
                        </div>}
                        <FieldValidate name="username" image={<Person color="#4a00b4" size="20px" />} auto="Entrez votre login" control={control} />
                        {errors.username && errors.username.type === "required" && (
                            <span className="error">Le sigle est obligatoire</span>
                        )}

                        {errors.sigle && errors.sigle.type === "minLenght" && (
                            <span >La valeur trop court</span>
                        )}

                        <PasswordValidate name="password" image={<Lock color="#4a00b4" size="20px" />} auto="Entrez votre login" control={control} />
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


export default function Controller({ schools, entreprises,sites, pubs, offers,users }) {

    const [schoolId, setSchoolId] = React.useState()
    const [schoolToken, setSchoolToken] = React.useState()
    const [err, setErr] = React.useState()
    const router = useRouter()

     entreprises = entreprises.entreprise
     sites = sites.sites
     pubs = pubs.pubs
    offers = offers.offers
    users = users.users

    const schoolReducer = React.useCallback((state, action) => {
        switch (action.type) {

        
            case "DELETE":
                const delState = [...state[action.name]]
                let num = action.id
                delState.splice(num, 1)
                let finish = { ...state, [action.name]: delState }
                
                return finish

            case "DELETEDEP":
                let delState2 = [...state[action.name]]
                num = action.id
                let newVal = delState2.filter(e => e.entreprise_id == num)
                newVal.map(e => {
                    delState2.splice(delState2.indexOf(e),1)
                })
                finish = { ...state, [action.name]: delState2 }
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
               console.log(upState)

                 finish = { ...state, [action.name]: upState }

                return finish
            default:

                const defState = [...state[action.name]]

                finish = { ...state, [action.name]: defState }

                return finish
        }

    }, [])



    useIsomorphicLayoutEffect(() => {


        setSchoolToken(localStorage.getItem("sudoToken"))
        setSchoolId(localStorage.getItem("sudo"))
    }, [])

    const handleSubmit = async(data) => {
        await axios.post("/sudo", data).then( (res) => {

            localStorage.setItem("sudoToken", res.data.token)
            localStorage.setItem("sudo", res.data.id)
            setSchoolToken(res.data.token)

            
            router.push(`/Sudo?token=${res.data.token}`)


        }).catch(e => setErr("Cet utilisateur n'existe pas"))
    }

    const [data, dispacth] = React.useReducer(schoolReducer, { ...schools, entreprises, sites, pubs, offers, users})

    const value = React.useMemo(() => ({ data, dispacth }), [data, dispacth])

    return (
        <>
            <main>
                <Head>
                    <title>Administration du site</title>
          </Head>
            {(schoolToken && schoolToken !== "" && schoolToken !== undefined )
                ?
               
                <SudoContext.Provider value={value}>
                        <Dasboard />
                </SudoContext.Provider>
                
                :
                <ControllerBuilder submitData={handleSubmit} err={err} />
                
            } </main>
        </>      
           
    )
}








export function Connect({info}) {
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

            {visbility2 && <FineModal onModalChange={v2} position={position} component={<Verif info={ info}/>} />}

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
                            }}> <ArrowLeft size={20} color={level == 0 ? "#fff" : "#fff9"} className={level == 0 ? style.acticon : style.icon} /> Revenir au site</span>

                            
                            <div className="avatar">
                                <center className="padding">  <PersonCircle size={50} color="#FFF" />
                                    <center style={{ color: "#FFF" }}>  Admin </center>
                                </center>
                                
</div>

                            <span className={level == 1 ? style.active : style.span} onClick={() => { setLevel(1) }} > <Flower1 size={20} color={level == 1 ?  "#fff" : "#fff9"} className={level == 1 ? style.acticon : style.icon} /> Demandes </span>
                            <span className={level == 2 ? style.active : style.span} onClick={() => { setLevel(2) }}> <Building size={20} color={level == 2 ?  "#fff" : "#fff9"} className={level == 2 ? style.acticon : style.icon} /> Entreprises </span>
                            <span className={level == 3 ? style.active : style.span} onClick={() => { setLevel(3) }}> <SuitDiamond size={20} color={level == 3 ?  "#fff" : "#fff9"} className={level == 3 ? style.acticon : style.icon} /> Etablissements </span>

                            <span className={level == 7 ? style.active : style.span} onClick={() => { setLevel(7) }}> <CashStack size={20} color={level == 6 ? "#fff" : "#fff9"} className={level == 7 ? style.acticon : style.icon} /> Publicités </span>
                            <span className={level == 8 ? style.active : style.span} onClick={() => { setLevel(8) }}> <CartDashFill size={20} color={level == 6 ? "#fff" : "#fff9"} className={level == 8 ? style.acticon : style.icon} /> Offres </span>                            <span className={level == 4 ? style.active : style.span} onClick={() => { setLevel(4) }}> <PersonCircle size={20} color={level == 4 ? "#fff" : "#fff9"} className={level == 4 ? style.acticon : style.icon} /> Parents/Élèves </span>

                            <span className={level == 6 ? style.active : style.span} onClick={() => { setLevel(6) }}> <BarChart size={20} color={level == 6 ? "#fff" : "#fff9"} className={level == 6 ? style.acticon : style.icon} /> Statistiques </span>
                     

                        </div>

                    </aside>
                    <article className={style.article}>
                        <nav className="dfb">


                            <span className={level == 1 ? style.h1 : style.no} > Demande Paser Pro </span>
                            <span className={level == 2 ? style.h1 : style.no} > Entreprises </span>
                            <span className={level == 3 ? style.h1 : style.no} >  Etablissements </span>
                            <span className={level == 4 ? style.h1 : style.no} >  Parents/Élève </span>
                            <span className={level == 6 ? style.h1 : style.no} > Statistiques </span>
                            <span className={level == 7 ? style.h1 : style.no} > Publicités </span>
                            <span className={level == 8 ? style.h1 : style.no} > Offres </span>

                            <Connect info={{ url: "/sudo", data: {}, token: { name: "sudo", token: "sudoToken", id: "sudo" } }}/>

                        </nav>

                        <div className={style.right}>

                            {level == 1 && <Activity choise={choise} handleChoiseState={handleChoiseState} />}
                            {level == 2 && <Entreprises />}
                            {level == 3 && <Schools />}
                            {level == 4 && <Abonner />}
                            {level == 6 && <Stats />}
                            {level == 7 && <Pubs />}
                            {level == 8 && <Offres />}
                        </div>

                    </article>
                </div>
            </div>
        </>
    )
}





export function Verif({info}) {
    const router = useRouter()
    const [visible, v] = useModal(false)
    const handleDisconnect = () => {
        localStorage.removeItem(info.token.name)
        localStorage.removeItem(info.token.id)
        localStorage.removeItem(info.token.token)
        router.push("/")
    }

    const handleChangePassWord = () => {
        v(true)
    }
    return (
        <>
            <div className={style.dg}>


                <a onClick={handleDisconnect} className="dfss">
                    <Lk size={20} color="#4a00b4"  className={style.icon} /> Se Déconnecter</a>

                <a onClick={handleChangePassWord} className="dfss">
                    <LockFill size={20} color="#4a00b4" className={style.icon} /> Changer de mot de passe</a>



            </div>
            {visible && <CustomModal onModalChange={v} component={<ChangePasse info={info} />} />}
        </>
    )
}



export function ChangePasse({info}) {

    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched"})

  
  
    const onSubmit =  (data) => {
        if (isValid) {
            setLoader(true)
            axios.put(info.url, { ...info.data, password: data.password, oldpassword: data.oldpassword }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem(info.token.token)
                }

            }).then(res => { setFine("Modification éffectuer avec succès"); setErr(""); setLoader(false) }).catch(rres => { setErr("Une erreur est survenu veuillez réessayer"); setFine(""); setLoader(false) })
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
                    <span className="error"> ce champ doit faire au moins 8 caracteres</span>
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





export function Verif1({ info, v }) {
    const dispacth = React.useContext(SudoContext).dispacth

    const handleDelete = async () => {
        await axios.delete(`/${info.url}/` + info.id,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("sudoToken")
                }

            }
        ).then(res => {

            dispacth({ type: "DELETE", name: info.name, id: info.index })
v(false)
        }).catch(r => alert(r))

    }
    const handleSubmit = () => {
        v(false)
    }
    return (
        <>
            Voulez vous delete?
            <div className="dfss pad">
                <a className={style.agree} onClick={handleDelete}>
                <Check size={20} color="#ffff" className={style.icon} /> Accepter</a>
            <a className={style.disagree} onClick={handleSubmit} >  <Trash size={20} color="#ffff" className={style.icon} /> Annuler</a></div>
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



export function Test3({ id, value, onDelete }) {
    const refIci = React.useRef(null)
    const tel = value.tel
    return (<>
        <tr ref={refIci}>
            <td>{id + 1}</td>
            <td>{value.username} </td>
            <td>{value.tel} </td>
            <td>{value.status} </td>
            <td className="dfss">
                <Link href={"https://wa.me/237" + tel}><a className={style.disagree3}>
                <Whatsapp color="#FFF" size={20}  className={style.icon} /> écrire whatsapp</a></Link>
                <a className={style.agree} onClick={() => {

                    onDelete(refIci)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}



export async function getServerSideProps({ params, query }) {

    const token = query.token

    const schools = await fetchAllSchoolData()
    const entreprises = await fetchAllEntrepriseData()
    const users = await fetchAllUsersData()
    const sites = await fetchAllEntrepriseSiteData()
    const pubs = await fecthAllPub()
    const offers = await fecthAllOffer()


    return {
        props: {
            schools,
            entreprises,
            sites,
            pubs,
            offers,
            users


        },
    };



}