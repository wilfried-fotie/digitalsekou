import React from 'react'
import { Exclude } from 'react-bootstrap-icons'
import { Card } from '../SchoolAdmin/Stats'
import styles from '../../components/Style/CreateAccount.module.css'
import style from '../../styles/sudo.module.css'
function Stats() {
    
        return (
            <>

                <div className={style.dfw}>
                    {[{
                        label: "Lorem ipsum dolor, sit amet",
                        val: 124
                    }, {
                        label: "Lorem ipsum dolor, sit ",
                        val: 421
                    }, {
                        label: "Lorem ipsum dolor, sit amet",
                        val: 1234
                    }, {
                        label: "Lorem ipsum dolor",
                        val: 45
                    }, {
                        label: "Lorem ipsum dolor, sit amet",
                        val: 30
                    }, {
                        label: "Lorem ipsum dolor",
                        val: 110
                        }].map(e => <Card text={e.label} value={e.val}  />)}
                </div>

            </>
        )

}

export default Stats
