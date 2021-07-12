import React from 'react'
import { XCircle } from 'react-bootstrap-icons'
import { createPortal } from 'react-dom'
import styles from '../styles/fine.module.css'

function FineModal({ onModalChange, component, position }) {
    const handleClick = (value) => {
        onModalChange(value)
    }
    return createPortal(
        <div className={styles.app} onClick={() => { handleClick(false) }}>
            <div className={styles.modal} style={position} onClick={(e) => {
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

export default FineModal
