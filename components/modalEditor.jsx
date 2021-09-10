import React from 'react'
import { XCircle } from 'react-bootstrap-icons'
import { createPortal } from 'react-dom'
import styles from '../styles/modal.module.css'

function ModalEditor({ onModalChange, component }) {
    const handleClick = (value) => {
        onModalChange(value)
    }

    return createPortal(
        <div className={styles.app} onClick={() => { handleClick(false) }}>
            <div className={styles.modal2} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={styles.header}>
                    <XCircle size="25" color="#4a00b4" onClick={() => { handleClick(false) }} />
                </div>
                {component}
            </div>
        </div>, document.body
    )
}

export default ModalEditor
