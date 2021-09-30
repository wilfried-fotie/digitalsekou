import React from 'react'
import { SudoContext, } from '../../pages/Sudo'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import { Tr } from './Schools'
import CustomModal from '../customModal'
import { Check, Trash } from 'react-bootstrap-icons'
import axios from 'axios'


function Entreprises() {
    const [visbility3, v3] = useModal(false)

    const entreprises = React.useContext(SudoContext).data.entreprises
    const dispacth = React.useContext(SudoContext).dispacth
    const sites = React.useContext(SudoContext).data.sites
    const [info, setInfo] = React.useState({})

    const handleClickDelete = async (id, index) => {
        v3(true)

        await axios.delete("/entreprises/" + id, 
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("sudoToken")
                }

            }
        ).then(res => {
              dispacth({ type: "DELETEDEP", name: "pubs", id: entreprises[index].id })
        dispacth({ type: "DELETEDEP", name: "offers", id: entreprises[index].id })
        dispacth({ type: "DELETE", name: "entreprises", id: index })

        }).catch(r => alert(r))
      

    }

    const handleInfo = (id, index) => {
        v3(true)
setInfo({id:id,index:index})
    }

    const handleSubmit = async (id, index) => {
        await axios.put("/TogglevStatusEntreprise/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "entreprises", id: index, value: { ...entreprises[index], demande: false, pro: !entreprises[index].pro } })



    }


    return (
        <>
            <table>

                <tbody>

                    {entreprises.map((e, f) => <Tr key={f} id={f} e={true} value={e} onSubmit={handleSubmit} onDelete={handleInfo} />)}

                </tbody>
            </table>
            {visbility3 && <CustomModal onModalChange={v3} component={<Verif2 v={v3} info={info} handleDelete={handleClickDelete} />} />}

        </>
    )
}



export default Entreprises




export function Verif2({ v,info, handleDelete }) {


    const handleSubmit = () => {
        v(false)

    }
    return (
        <>
            Voulez vous delete?
            <div className="dfss pad">
                <a className={style.agree} onClick={() => handleDelete(info.id,info.index)}>
                    <Check size={20} color="#ffff" className={style.icon} /> Accepter</a>
                <a className={style.disagree} onClick={handleSubmit} >  <Trash size={20} color="#ffff" className={style.icon} /> Annuler</a></div>
        </>
    )
}
