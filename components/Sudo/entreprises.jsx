import React from 'react'
import { SudoContext, Test2, Verif1 } from '../../pages/Sudo'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import { Tr } from './Schools'


function Entreprises() {
        const [visbility3, v3] = useModal(false)

    const schools = React.useContext(SudoContext).data.school
    const dispacth = React.useContext(SudoContext).dispacth

        const handleClick = (pos) => {
            v3(true)

         
        }


    const handleClickDelete = React.useCallback(async (id, index) => {


        await axios.put("/DelStatusSchool/" + id, {}).then(res => null).catch(r => null)
        dispacth({ type: "DELETE", name: "school", data: { ...schools, id: index } })


    })

    const handleSubmit = React.useCallback(async (id, index) => {
        await axios.put("/TogglevStatusSchool/" + id, {}).then(res => null).catch(r => null)

        dispacth({ type: "UPDATE", name: "school", data: { ...schools, id: index } })



    })


        return (
            <>
                <div className={style.end}>
                    <a className="btnPri">Ajouter</a>
                </div>



                <table>
                    <thead>
                        <tr>
                            <th>#id</th><th>Liste des Entreprises</th><th>Status des publicités</th><th>Actions</th>

                        </tr>

                    </thead>
                    <tbody>

                        {schools.map((e, f) => <Tr key={f} id={f} value={e} onSubmit={handleSubmit} onDelete={handleClick} />)}

                    </tbody>
                </table>
                {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 />} />}
            </>
        )
    }



export default Entreprises
