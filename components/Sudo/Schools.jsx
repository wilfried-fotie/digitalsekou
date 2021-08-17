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
    const [visbility, v] = useModal(false)

    const [position, setPosition] = React.useState({})
    const schools = React.useContext(SudoContext).data.school
    const dispacth = React.useContext(SudoContext).dispacth


        const handleClick =(pos) => {
            v3(true)

         
        }

    const handleClickDelete = React.useCallback(async (id, index) => {


        await axios.put("/DelStatusSchool/" + id, {}).then(res => null).catch(r => null)
        dispacth({ type: "DELETE", name: "school", data: { ...schools, id: index } })


    })

    const handleSubmit = React.useCallback(async (id, index) => {
alert("y")
        await axios.put("/TogglevStatusSchool/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "school", data: { ...schools, id: index } })



    })
    
    
        return (
            <>
                <div className={style.end}>
                    <a className="btnPri" onClick={() =>v(true)}>Ajouter</a>
                </div>



                <table>
                    <thead>
                        <tr>
                            <th>#id</th><th>Liste des Etablissements</th><th>Status</th><th>Actions</th>

                        </tr>

                    </thead>
                    <tbody>
{schools.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={handleSubmit} onDelete={handleClick} />)}
                    </tbody>
                </table>
                {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
                {visbility && <CustomModal onModalChange={v} component={<AddSchool />} />}
            </>
        )
    }


export default Schools



export function Tr({ id, onDelete, onSubmit, value }) {
    
    
      
 
    return (<>
        <tr >
            <td>#{value.id}</td>
            <td>{value.sigle}</td>
            <td>{value.pro ? "Pro" : "Gratuit"}</td>
            <td className="dfss">
                <a className={style.disagree2} onClick={() => { onSubmit(value.id, id) }}> <ToggleOff size={20} color="#ffff"  className={style.icon} /> Changer le status</a>

                <a className={style.agree} onClick={() => {

                    onDelete(value.id, id)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr>    </>) 
}
