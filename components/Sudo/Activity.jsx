import React from 'react'
import useModal from '../CustomHooks/useModal'
import style from '../../styles/sudo.module.css'
import CustomModal from '../customModal'
import { Building, Check, Clipboard, ToggleOff, ToggleOn, Trash } from 'react-bootstrap-icons'
import { SudoContext, Verif1 } from '../../pages/Sudo'
import axios from 'axios'
import { SiteWeb } from '../SchoolAdmin/web'
import AddSchool from '../School/AddSchool'

export default function Activity({ choise, handleChoiseState }) {

    const [visbility3, v3] = useModal(false)
    const [visbility2, v2] = useModal(false)

    const schools = React.useContext(SudoContext).data.school
    const entreprises = React.useContext(SudoContext).data.entreprises
    const eFine = React.useContext(SudoContext).data.entreprises.map(e=> ({username: e.username}))
    const sites = React.useContext(SudoContext).data.sites
    const getPubs = React.useContext(SudoContext).data.pubs
    const getOffers = React.useContext(SudoContext).data.offers
    const dispacth = React.useContext(SudoContext).dispacth
    const schoolDemande = schools.filter(e => e.demande == true)
    const fineEntreprise = sites.map(e1 => ({ ...e1, ...entreprises.find(e => e.id == e1.entreprise_id) }))
    const finePubs = getPubs.map(e1 => ({ ...e1, ...eFine.find(e => e.id == e1.entreprise_id) })).filter(e => e.demande == true)
    const fineOffers = getOffers.map(e1 => ({ ...e1, ...eFine.find(e => e.id == e1.entreprise_id) })).filter(e => e.demande == true)
    const en = fineEntreprise.map(e => e).filter(e => e.demande == true)

    
    const handleEntrepriseSubmit = async(id, index) => {
        await axios.put("/ToggleStatusEntreprise/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "entreprises", id: index, value: { ...en[index], demande: false, pro: true } })

    }
  
    const handleSchoolSubmit = async(id, index) => {
        await axios.put("/ToggleStatusSchool/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "school", id: index,value: { ...schools[index], demande: false,pro: true } })
    }
    const handleEntrepriseClick = async(id, index) => {
        await axios.put("/DelStatusEntreprise/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "entreprises", id: index, value: { ...en[index], demande: false } })
    }
    const handleSchoolClick = async(id,index) => {
        await axios.put("/DelStatusSchool/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "school", id:index, value: {...schools[index],demande: false} })


    }


    return (
        <>
            {/* <div className={style.choose}>
                <span className={choise ? style.act : style.noact} onClick={() => { handleChoiseState(choise) }}> <Clipboard className={style.icon} size={20} color="#4a00b4" /> Publicités et Offres </span>
                <span className={choise ? style.noact : style.act} onClick={() => { handleChoiseState(!choise) }}> <Building className={style.icon} size={20} color="#4a00b4" /> Demande Passer Pro</span>
            </div> */}
            <div className={choise ? style.no : null}>

                <table>
                  <tbody>
                        {finePubs.map((e, f) => <Tr key={f} one={true} id={f} value={e} onSubmit={() => handlePubSubmit(e.id, f)} onDelete={() => handlePubClick(e.id,f)} />)}
                        {fineOffers.map((e, f) => <Tr key={f} one={true} id={f} value={e} onSubmit={() => handleOfferSubmit(e.id, f)} onDelete={() => handleOfferClick(e.id,f)} />)}
                        
                    </tbody>
                </table>
            </div>
            
            <div >



                <table>
                  
                    <tbody>
                        {en.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={() => handleEntrepriseSubmit(e.id, f)} onDelete={() =>handleEntrepriseClick(e.id,f)} />)}
                        {schoolDemande.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={()=>handleSchoolSubmit(e.id,f)} onDelete={()=>handleSchoolClick(e.id,f)} />)}
                    </tbody>
                </table>
                
         

            </div>
            {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 />} />}
            {visbility2 && <CustomModal onModalChange={v2} component={<Verif1 />} />}

              

      


        </>
    )
}



export function Tr({ id, value, onDelete ,onSubmit,one=false}) {
    
    return (<>
        <tr >
            <td>{value.create_at ? (new Date(value.create_at).toLocaleDateString() + " à " + new Date(value.create_at).toLocaleTimeString() ) : (new Date(value.available).toLocaleDateString() + " à " + new Date(value.available).toLocaleTimeString())}</td>
            <td>{ value.username || value.sigle || value.name}</td>
            {one ? <td>{value.content ? "Offre" :  "Publicité"}</td> : <td>{value.sigle ? "Ecole" :  "Entreprises" }</td>}
          
            <td className="dfss"> <a className={style.disagree} onClick={() => {


                onSubmit(value.id, id)

            }}>
                <Check size={20} color="#ffff" className={style.icon}
                   
                
                /> Accepter</a>
                <a className={style.agree} onClick={() => {
              

                    onDelete(value.id,id)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>)
}
