import React from 'react'
import useModal from '../CustomHooks/useModal'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
import CustomModal from '../customModal'
import { SudoContext, Test3, Verif1 } from '../../pages/Sudo'


function Abonner() {

        const [visbility3, v3] = useModal(false)
        const [info,setInfo] = React.useState({id: "",index:""})

        const users = React.useContext(SudoContext).data.users

        const handleClick = (id,index) => {
            v3(true)
            setInfo({ id: id, index: index,name: "users",url: "users" })
            
        }

        return (
            <>

                <table>
                  
                    <tbody>
                    {users.map((e, f) => <Test3 key={f} id={f} value={e} onDelete={()=>handleClick(e.id,f)} />)}
                    </tbody>
                </table>
                {visbility3 && <CustomModal onModalChange={v3} component={<Verif1 info={info} v={v3}/>} />}
            </>
        )
    }


export default Abonner
