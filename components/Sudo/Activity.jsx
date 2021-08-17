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

    const [position, setPosition] = React.useState({})
    const schools = React.useContext(SudoContext).data.school
    const dispacth = React.useContext(SudoContext).dispacth
    const schoolDemande = schools.filter(e => e.demande == true )
    const handleClick = React.useCallback(async(id, index) => {


        await axios.put("/DelStatusSchool/"+id,{}).then(res => null).catch(r=> null)
        dispacth({ type: "DELETE", name: "school", data: { ...schools, id: index } })

   
    })

    const handleSubmit = React.useCallback(async(id, index)=>{

        await axios.put("/ToggleStatusSchool/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "DELETE", name: "school", data: { ...schools, id: index } })
        


    })



    return (
        <>
            <div className={style.choose}>
                <span className={choise ? style.act : style.noact} onClick={() => { handleChoiseState(choise) }}> <Clipboard className={style.icon} size={20} color="#4a00b4" /> Publicités </span>
                <span className={choise ? style.noact : style.act} onClick={() => { handleChoiseState(!choise) }}> <Building className={style.icon} size={20} color="#4a00b4" /> Etablissement Pro</span>
            </div>

            <div className={!choise ? style.no : null}>
                <div className={style.end}>
                    <a className="btnPri" >Ajouter</a>
                </div>
              

                <table>
                    <thead>
                        <tr><th>#id</th><th>Sigle de l'établissement</th><th>Actions</th></tr>

                    </thead>
                    <tbody>
                        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9].map((e, f) => <Test key={f} id={e} onDelete={handleClick} />)} */}

                        
                    </tbody>
                </table>
            </div>
            
            <div className={choise ? style.no : null} style={{marginTop: "3%"}}>

              

                <table>
                    <thead>
                        <tr>
                            <th>id</th><th>Date de création</th><th>Nom de l'établissement</th><th>Actions</th>
                        </tr>
                        
                    </thead>
                    <tbody>

                        {schoolDemande.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={handleSubmit} onDelete={handleClick} />)}
                    </tbody>
                </table>
                
         

            </div>
            {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 />} />}
            {visbility2 && <CustomModal onModalChange={v2} component={<Verif1 />} />}

              

      


        </>
    )
}



export function Tr({ id, value, onDelete ,onSubmit}) {
    
    return (<>
        <tr >
            <td>{value.id}</td>
            <td>{value.create_at}</td>
            <td>{value.sigle}</td>
          
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
