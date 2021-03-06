import Image from 'next/image'
import styles from '../../styles/Search.module.css'
import { Bell, FileWordFill, GeoAlt, GeoAltFill, LayersFill, LayoutSidebarReverse, PieChartFill } from 'react-bootstrap-icons'


import React from 'react'
import Link from 'next/link'
import { Markup } from 'interweave'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Result({ school, positions,type }) {
const router = useRouter()
    const p = positions.filter(i => i.school_id == school.id)

    const handleClick = (e) => {
        // e.preventDefault()
        axios.put("/addStatSchool/" + school.id).then(r => null).catch(r => null)
    }
    return (

        <div className={styles.res}>
            
            <div className={styles.dfss} >

                <div className="dfss" style={{maxWidth: "20%"}}>
                    <img style={{maxWidth: "100px",maxHeight: "75px"}} src={"/" + school.logo} />
                </div>
                <div>
                </div>

                <div className={styles.app} >
                    <Link href={"/schools/" + school.sigle + "#" + type} className={styles.title} ><center><a className="h2 a" onClick={handleClick} style={{ color: "#4a00b4" }}> {school.name}  ( {school.sigle.toUpperCase()} ) </a></center></Link> <br />
                    <div className={styles.site}>
                        
           
                    <div className="dfs"> <LayoutSidebarReverse color="#4a00b4" size={20} /> <span>{type}</span></div>
                    <div className="dfs pad"> <GeoAltFill color="#4a00b4" size={20} /> <span>{p.map(e => e.position + ", ")}</span></div>
                </div></div></div>
        </div>
    )
}


