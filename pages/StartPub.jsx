import React, { useEffect, useLayoutEffect } from 'react'
import styles from '../styles/startpub.module.css'
import { Building, ImageAlt, NodeMinus, TelephoneFill, BarChart, Pen, Display, Person, ArrowLeft, Diagram2Fill, CurrencyExchange, PersonCircle, FileWord, FileWordFill, BarChartFill, Flower1, PencilSquare, CartFill, CashStack, DisplayFill } from 'react-bootstrap-icons'
import { useRouter } from "next/router"
import Head from 'next/head'
import Pub from '../components/Entreprise/Pub'
import Offre from '../components/Entreprise/Offre'
import Stat from '../components/Entreprise/Stat'
import Site, { Preview } from '../components/Entreprise/Site'
import Activity from '../components/Entreprise/Activity'
import AddProduct from '../components/CustomHooks/AddProduct'
import AddPost from '../components/CustomHooks/AddPost'
import { ControllerBuilder } from './addSchoolPro/[id]'
import axios from 'axios'
import { fecthOffer, fecthPost, fecthProduct, fecthPub, fetchEntrepriseData, fetchentrEprisePositionData, fetchEntrepriseSiteData } from '../Model/getEntreprise'
import { ModSite } from '../components/Entreprise/ModSite'
import Page from '../components/Entreprise/Page'


const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useModal(initial) {

    const [value, setValue] = React.useState(initial)

    const toggle = function (s) {
        setValue(s => !s)

    }
    return [value, toggle]
}


export const EntrepriseContext = React.createContext({})


            
export default function Controller({ entreprise, entrepriseSite, entreprisePosition,getPost,getProduct,getPub,getOffer}) {

    const [entrepriseId, setEntrepriseId] = React.useState()
   
    const router = useRouter()
    const [err, setErr] = React.useState()
  
    const schoolReducer = React.useCallback((state, action) => {
        switch (action.type) {

            case "ADD":
                const newState = [...state[action.name][action.pre]]
                newState.push({ ...action.data })
                let finish = { ...state, [action.name]: {[action.pre]: newState}}
                return finish

            case "ADDSPE":
                
            case "DELETE":
                const delState = [...state[action.name][action.pre]]

                let num = action.id
                delState.splice(num, 1)
                finish = { ...state, [action.name]: { [action.pre]: delState } }
                return finish
            case "UPDATE":
                const upState = [...state[action.name][action.pre]]
                upState[action.id] = action.data
                finish = { ...state, [action.name]: { [action.pre]: upState } }
                return finish
            case "UPDATESITE":
                const upSiteState = state[action.name][action.pre]

                finish = { ...state, [action.name]: { [action.pre]: action.data }, entreprisePosition: { position: action.position }}
                
                return finish
            default:

            
        }

    }, [])

   





    const [data, dispacth] = React.useReducer(schoolReducer, { entreprise, entrepriseSite, entreprisePosition, getPost, getProduct,getPub,getOffer})




    const value = React.useMemo(() => ({ data, dispacth }), [data, dispacth])

    const [etoken, setEntrerpiseToken] = React.useState()
    let dataError = entreprise.error




    useIsomorphicLayoutEffect(() => {


        setEntrerpiseToken(sessionStorage.getItem("etoken"))
        setEntrepriseId(sessionStorage.getItem("entrepriseId"))
    }, [])

    const handleSubmit = (data) => {
        axios.post("/entreprise", data).then(async (res) => {

            sessionStorage.setItem("etoken", res.data.etoken)
            sessionStorage.setItem("entreprise", res.data.username)
            sessionStorage.setItem("entrepriseId", res.data.id)
            setEntrerpiseToken(res.data.etoken)


            router.push(`/StartPub?id=${res.data.id}&token=${res.data.etoken}`)



        }).catch(e => setErr("Cet utilisateur n'existe pas"))
    }

    // let dataError = schoolData.error

    return (
        <>
            {(etoken && etoken !== "" && etoken !== undefined && dataError !== true && !dataError  )
                ?
                <EntrepriseContext.Provider value={value}>
                    <StartPub />
                </EntrepriseContext.Provider>
                :
                <ControllerBuilder e={true} submitData={handleSubmit} err={err} />
                // <AddSchool/>
            }
        </>
    )
}







export function StartPub() {

    const [level, setLevel] = React.useState(1)
    const router = useRouter()
    const entreprise = React.useContext(EntrepriseContext).data.entreprise.entreprise
    const site = React.useContext(EntrepriseContext).data.entrepriseSite.site
    const position = React.useContext(EntrepriseContext).data.entreprisePosition.position
    const getPost = React.useContext(EntrepriseContext).data.getPost.posts
    const getProduct = React.useContext(EntrepriseContext).data.getProduct.products
    return (
<>
<Head>
            <title>Administration Entreprise</title>
</Head>

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
                            <span className={styles.dbcText}>{site.name}</span>
                        </div>
                       


                        <span className={level == 1 ? styles.active : styles.span} onClick={() => { setLevel(1) }}> <CurrencyExchange size={20} color={level == 1 ? "#fff" : "#fff9"} className={level == 1 ? styles.acticon : styles.icon} /> Publicités </span>
                        <span className={level == 2 ? styles.active : styles.span} onClick={() => { setLevel(2) }}> <Diagram2Fill size={20} color={level == 2 ? "#fff" : "#fff9"} className={level == 2 ? styles.acticon : styles.icon} /> Offres </span>
                        {!entreprise.site ?  <span className={level == 4 ? styles.active : styles.span} onClick={() => { setLevel(4) }}> <FileWordFill size={20} color={level == 4 ? "#fff" : "#fff9"} className={level == 4 ? styles.acticon : styles.icon} /> Créer une page </span>
                      :   <span className={level == 8 ? styles.active : styles.span} onClick={() => { setLevel(8) }}> <FileWordFill size={20} color={level == 8 ? "#fff" : "#fff9"} className={level == 8 ? styles.acticon : styles.icon} /> Modifier votre page </span>}
                       
                        {site.pres && <span className={level == 6 ? styles.active : styles.span} onClick={() => { setLevel(6) }}> <CashStack size={20} color={level == 6 ? "#fff" : "#fff9"} className={level == 6 ? styles.acticon : styles.icon} /> Ajouter vos prestations </span>}
                            {site.prod && <span className={level == 7 ? styles.active : styles.span} onClick={() => { setLevel(7) }}> <CartFill size={20} color={level == 7 ? "#fff" : "#fff9"} className={level == 7 ? styles.acticon : styles.icon} /> Ajouter des produits </span>}
                            {entreprise.site  && <span className={level == 9 ? styles.active : styles.span} onClick={() => { setLevel(9) }}> <DisplayFill size={20} color={level == 9 ? "#fff" : "#fff9"} className={level == 9 ? styles.acticon : styles.icon} /> Visualiation de la page </span>}

                        <span className={level == 3 ? styles.active : styles.span} onClick={() => { setLevel(3) }}> <Flower1 size={20} color={level == 3 ? "#fff" : "#fff9"} className={level == 3 ? styles.acticon : styles.icon} /> Activités </span>
                        <span className={level == 5 ? styles.active : styles.span} onClick={() => { setLevel(5) }}> <BarChartFill size={20} color={level == 5 ? "#fff" : "#fff9"} className={level == 5 ? styles.acticon : styles.icon} /> Statistiques </span>
                          
                    </nav>
                </div>
                <div className={styles.content}>

                 


                    {level == 1 && <Pub />}
                    {level == 2 && <Offre />}
                    {level == 3 && <Activity />}
                    {level == 5 && <Stat />}
                    {entreprise.site ? level == 8 && <ModSite/>  : level == 4 && <Site />}
                        {level == 6 && <AddPost />}
                        {level == 9 && <Page data={site} position={position} getProduct={getProduct} getPost={getPost}/>}
                    {level == 7 && <AddProduct />}
                </div>
            </div>
            </main >
            </>
    )
}





export async function getServerSideProps({ query }) {

    const token = query.token
    const id = parseInt(query.id,10)
    const entreprise = await fetchEntrepriseData(id, token);
    const entrepriseSite = await fetchEntrepriseSiteData(id, token);
    const entreprisePosition = await fetchentrEprisePositionData(id, token);
    const getPost = await fecthPost(id)
    const getProduct = await fecthProduct(id)
    const getPub = await fecthPub(id)
    const getOffer = await fecthOffer(id)



    return {
        props: {
            
            entreprise,
            entrepriseSite,
            entreprisePosition,
            getPost,
            getProduct,
            getPub,
            getOffer

          

        },
    };



}