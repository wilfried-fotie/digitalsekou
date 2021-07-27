import React from 'react'
import Footer from './Template/footer'
import Link from 'next/link'
import styles from '../styles/ViewSchool.module.css'
import { ArrowLeft } from 'react-bootstrap-icons'

function ViewSchool() {
    return (
        <div>
            <nav>
                <div className={styles.upper}>
                    <Link href="/Schools"><a className="logo"><ArrowLeft size={20} color="#4a00b4"/>    <img src="/logo.svg" alt="Digital Education Logo" width={50} height={50} /></a></Link>

                </div>
            </nav>
            <div className="container">
                je suis au sol
            </div>
            <Footer/>
        </div>
    )
}

export default ViewSchool
