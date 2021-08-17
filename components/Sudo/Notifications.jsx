import React from 'react'
import { CursorFill } from 'react-bootstrap-icons'
import Select from 'react-select'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'

function Notifications() {

        const options = [{ value: "Bafoussam", label: "Wilfried" }, { value: "Yaounde", label: "Toi" }, { value: "Doula", label: "Moi" }, { value: "Bertoua", label: "Elles" }, { value: "Garoua", label: "Vous" }, { value: "Limbe", label: "Nous" }]

        return (
            <>
                <div className={style.dfp}>
                    <Select isMulti options={options} name="position" className="basic-multi-select op"
                        classNamePrefix="select" />
                    <div >
                     
                        <center className={style.dab}> <a className="btnSecondary">Envoyer Le Message<CursorFill size={20} color="#4a00b4" /></a></center>
                    </div>
                </div>
            </>
        )
}

export default Notifications
