import React from 'react'
import { SudoContext, Test2, Verif1 } from '../../pages/Sudo'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import CustomModal from '../customModal'
import { Visualisation as Vi } from '../Entreprise/Offre'
import { Edit, Visualisation } from '../Entreprise/Pub'
import { EyeFill, Toggle2Off, Toggle2On, ToggleOff, Trash } from 'react-bootstrap-icons'
import { verifSupDate } from '../CustomHooks/supDate'
import { verifTwoDate } from '../CustomHooks/verifTwoDate'
import axios from 'axios'


function Pubs() {
    const [visbility3, v3] = useModal(false)

    const getPubs = React.useContext(SudoContext).data.pubs
    const dispacth = React.useContext(SudoContext).dispacth
    const entreprises = React.useContext(SudoContext).data.entreprises

    const fineEntreprise = getPubs.map(e1 => ({ ...e1, username: entreprises.find(e => e.id == e1.entreprise_id) && entreprises.find(e => e.id == e1.entreprise_id).username }))

    const handleClick = (pos) => {
        v3(true)


    }


    const handleClickDelete = async (id, index) => {


       
            dispacth({ type: "UPDATE", name: "pubs", id: index, value: { ...getPubs[index], demande: false, pro: !getPubs[index].pro } })

       



    }

    const handleSubmit = async (id, index) => {
 await axios.put("/ToggleStatusPub/" + id, {}).then(res => {
        dispacth({ type: "UPDATE", name: "pubs",id: index, value: { ...getPubs[index], demande: false, valid: !getPubs[index].valid } })

 }).catch(r => null)

    }


    return (
        <>
            <table>

                <tbody>

                    {fineEntreprise.map((e, k) => <Tr key={k} onSubmit={handleSubmit}  e={e} id={k } pub={true} />)}
                
                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 />} />}
        </>
    )
}



export default Pubs





export function Tr({id, e, pub, onSubmit }) {
    const [visible, v] = useModal(false)
    const [visible2, v2] = useModal(false)





    return (<>
        <tr>
            <td> {"Par: " + e.username} </td>
            <td>{pub ? "Début: " +  new Date(e.available).toLocaleDateString() || new Date(e.date).toLocaleDateString()  : "Fin: " + new Date(e.expire).toLocaleDateString() || new Date(e.expiration).toLocaleDateString()} </td>
            <td> {pub ? "Fin: " + new Date(e.days).toLocaleDateString() : "Créer le: " + new Date(e.create_at).toLocaleDateString() } </td>
            <td ><a className="btnSecondary dfss" onClick={() => v(true)}> Voir <EyeFill size={20} color="#4a00b4" /> </a></td>
            <td> <span className={"dfss"} > {pub ? verifSupDate(new Date(), new Date(e.days)) && e.valid ? <><Toggle2On color="green" size={20} /> Active</> : <> <Toggle2Off color="red" size={20} /> Non Active</> : verifSupDate(new Date(), new Date(e.expire || e.expiration)) && e.valid ? <><Toggle2On color="green" size={20} /> Active</> : <> <Toggle2Off color="red" size={20} /> Non Active</>}</span> </td>
            <td className="dfss">
                <a className={style.disagree2} onClick={() => { onSubmit(e.id, id) }}> <ToggleOff size={20} color="#ffff" className={style.icon} /> Changer le status</a>

               

      </td> 
        </tr>


        {visible && <CustomModal onModalChange={v} component={pub ? <div style={{ minWidth: "45vw" }}> <Visualisation data={{ ...e, logo: e.media, media: "" }} /> </div> : <div style={{ minWidth: "45vw", maxWidth: "60vw" }}>  <Vi data={{ ...e, outro: e.content, objet: e.title, expiration: e.expire.split("T", -1)[0] }} /> </div>} />}
        {visible2 && <CustomModal onModalChange={v2} component={pub ? <Edit

            onHandleImageStateChange={handleImageChange}
            onHandleTextStateChange={handleChange}
            id={getIdForMod}
            k={getkForMod}
            data={state}

        /> : <Vi data={e} />} />}
    </>)
}