import Image from 'next/image'
import styles from '../../styles/Search.module.css'
import { Bell, FileWordFill, GeoAlt, GeoAltFill, LayersFill, PieChartFill } from 'react-bootstrap-icons'


import React from 'react'
import Link from 'next/link'
import { Markup } from 'interweave'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Result({ school, positions,type }) {
const router = useRouter()
    const p = positions.filter(i => i.school_id == school.id)

    const handleClick = (e) => {
        e.preventDefault()
        axios.put("/addStatSchool/" + school.id).then(r => null).catch(r => null)
        router.push("/site/" + school.sigle)
    }
    return (

        <div className={styles.res}>
            <div className="dfss">

                <div className="dfss" style={{maxWidth: "20%"}}>
                    <img style={{maxWidth: "100px",maxHeight: "75px"}} src={"/" + school.sigle + "-" + school.logo} />
                </div>
                <div>
                </div>

                <div className={styles.app} >
                    <Link href={"/" + school.sigle} ><span className="h2 a" onClick={handleClick} style={{ color: "#4a00b4" }}> {school.name} </span></Link> <br />
           
<p>
                    { <Markup content={school.description.substr(0, 200) + " ..."} />}
                    </p>
                 
                    {/*    <div >
                        <PieChartFill size={20} color="#4a00b4" />  Status: {school.status}

                    </div> */}
                    

                    <div className="dfs"> <GeoAltFill color="#4a00b4" size={20} /> <span>{p.map(e => e.position + ", ")}</span></div>
                </div></div>
        </div>
    )
}


