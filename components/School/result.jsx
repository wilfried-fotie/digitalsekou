import Image from 'next/image'
import styles from '../../styles/Search.module.css'
import { Bell, GeoAlt } from 'react-bootstrap-icons'


import React from 'react'
import Link from 'next/link'

export default function Result() {
    return (
        <div className={styles.res}>
            <div className={styles.df}>
                <Image src="/téléchargement.jpeg" height={200} width={200} />

                <div className={styles.app} > <Link href="/ViewSchool"><a> <h2>Institut Universitaire de l'estuaire (INSAM)</h2></a></Link>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, suscipit! Atque eum optio distinctio velit earum ad ducimus dolores error? Quo fuga corrupti fugit, culpa distinctio ullam commodi veritatis libero!
                    </p>
                    <a className="btnPri">Abonner-vous <Bell size={15} color="#FFF"/> </a>
                    <div className={styles.res}> <GeoAlt /> <a >Bafoussam, Douala, N'Djamena, Gabon, Yaoundé</a></div>
                </div></div>
        </div>
    )
}


