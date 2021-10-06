import React from 'react'
import { XCircle } from 'react-bootstrap-icons'
import { createPortal } from 'react-dom'
import styles from '../styles/modal.module.css'





function Menu({ onModalChange, component,color=false }) {
    const state = React.useRef(null)
    const [closeur, setCloseur] = React.useState(false)
 

    React.useEffect(() => {
    
        if (closeur) {
              const timer = window.setTimeout(() => {
            onModalChange(true)

        }, 600)
        return timer
        }
      
    },[closeur])
    

    return createPortal(
        <div className={styles.appMenu} onClick={(e) => { state.current.classList.add(styles.remove); setCloseur(s => !s)}}>
            <div className={styles.menu} ref={state} style={{ backgroundColor: color ? "#4a00b4" : "#FFF" }} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={styles.header}>
                    <XCircle size="25" color={ color ? "#FFF" : "#4a00b4"} onClick={(e) => { state.current.classList.add(styles.remove);setCloseur(s=> !s) }} />
                </div>
                <div onClick={(e) => { state.current.classList.add(styles.remove); setCloseur(s => !s) }}>
   {component}
                </div>
             
            </div>
        </div>, document.body
    )
}

export default Menu
