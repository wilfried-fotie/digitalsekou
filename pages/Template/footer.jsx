import styles from '../../styles/Home.module.css'
import React from "react";
import "slick-carousel/slick/slick-theme.css"
import { Facebook } from 'react-bootstrap-icons'



function Footer() {
    return (
        <>

            <footer className={styles.footer} >
                <div className="ds">
                    <div className={styles.app}>
                        <div className="dfss">
                            <Facebook color="#fff" size="25" />
                            <span className={styles.ttx}>
                                DigitalSekou cameroun
                            </span>
                        </div>
                    </div>
                    <div className={styles.app}>
                        <div className="dfss">
                            <Facebook color="#fff" size="25" />
                        <span className={styles.ttx}>
                            MiSofe cameroun
                            </span>
                        </div>
                        
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer




