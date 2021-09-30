import React from 'react'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import { SudoContext, Test2, Verif1 } from '../../pages/Sudo'
import CustomModal from '../customModal'
import { Check, ToggleOff, Trash } from 'react-bootstrap-icons'
import AddSchool from '../School/AddSchool'
import axios from 'axios'


function Schools() {

    const [visbility3, v3] = useModal(false)
    const [info, setInfo] = React.useState({ id: "", index: "" })

    const schools = React.useContext(SudoContext).data.school
    const dispacth = React.useContext(SudoContext).dispacth

    const handleClick = async(id, index) => {
        v3(true)
        setInfo({ id: id, index: index, name: "school",url: "schools" })
        
    }
       
   

    const handleSubmit = async (id, index) => {

        await axios.put("/TogglevStatusSchool/" + id, {}).then(res => null).catch(r => alert(r))

        dispacth({ type: "UPDATE", name: "school", id: index, value: { ...schools[index], demande: false, pro: !schools[index].pro } })



    }
    
    
        return (
            <>
              


                <table>
                   
                    <tbody>
                        {schools.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={handleSubmit} onDelete={handleClick} />)}
                    </tbody>
                </table>
                {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 info={info} v={v3}/>} />}
            </>
        )
    }


export default Schools



export function Tr({ id, onDelete, onSubmit, value,e=false }) {
    
    
      
 
    return (<>
        <tr >
            <td>{id + 1}</td>
            <td>{value.sigle || value.username || value.name}</td>
            <td>{value.tel}</td>
            {e ? <td>{value.site ? "A Créer Un Site" : "N'as Pas De Site"}</td> : null}
            <td>{value.pro || value.valid ? "Pro" : "Gratuit"}</td>
            <td className="dfss">
                <a className={style.disagree2} onClick={() => { onSubmit(value.id, id) }}> <ToggleOff size={20} color="#ffff"  className={style.icon} /> Changer le status</a>

                <a className={style.agree} onClick={() => {

                    onDelete(value.id, id)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>) 
}
