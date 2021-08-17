import React from 'react'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import CustomModal from '../customModal'
import { Test3, Verif1 } from '../../pages/Sudo'


function Abonner() {

        const [visbility3, v3] = useModal(false)

        const [position, setPosition] = React.useState({})


        const handleClick = (pos) => {
            v3(true)

            setPosition({
                top: (pos.current.offsetHeight) + "px",
                left: pos.current.offsetHeight + "px"

            })
        }

        return (
            <>
                <div className={style.end}>
                    <a className="btnPri">Ajouter</a>
                </div>



                <table>
                    <thead>
                        <th>#id</th><th colSpan={2}>Liste des Parents et Élèves</th><th>Actions</th>

                    </thead>
                    <tbody>

                        {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((e, f) => <Test3 key={f} id={e} onDelete={handleClick} />)}
                    </tbody>
                </table>
                {visbility3 && <CustomModal onModalChange={v3} position={position} component={<Verif1 />} />}
            </>
        )
    }


export default Abonner
