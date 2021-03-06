import React, { useEffect, useState } from 'react'
import { GeoAlt, Grid3x3GapFill, Image,  MenuButton } from 'react-bootstrap-icons'
import styles from '../../styles/AddSchool.module.css'
import useChangeBool from '../handleBool'
import draftToHtml from 'draftjs-to-html'
import { Markup } from 'interweave'


function Preview({ data}) {
    const article = React.useRef(null)
    const [choise, handleChoiseState] = useChangeBool(true)
    const [fixed, setFixed] = useState(false)

    useEffect(() => {



        window.document.addEventListener("scroll", () => {
            if (window.document.querySelector("article") !== null) {
                let p = window.document.querySelector("article").getBoundingClientRect().top
                let b = window.document.querySelector("article").getBoundingClientRect().bottom
             
                if (p < 60) {
                    setFixed(true)
                }
                else {

                    setFixed(false)
                }
            } else {

            }

        }
        )


    }, [])



    return (
        <article ref={article}>

            <div className={fixed ? styles.fixed : null} >
                <div className={styles.nav}>
                    <a onClick={() => { handleChoiseState(choise) }} className={choise ? styles.active : null}>Desktop</a>
                    <a className={!choise ? styles.active : null} onClick={() => { handleChoiseState(!choise) }}>Mobile</a> </div>
                <div className={styles.content}>

                    <div className={choise ? styles.desk : styles.mob}>
                        <nav className={styles.nav}>
                            <div className={choise ? "dfss" : styles.dfb}>

                                <div>
                                    <img src={data.logo} className={styles.img} alt="Logo" />
                                </div>
                                <div className={!choise ? styles.bloc : styles.menu}>
                                    { data.sigle || "Sigle" }
                                </div>
                                <Grid3x3GapFill className={!choise ? styles.bloc : styles.menu} color="#4a00b4" size={20}/>
                                <div className={styles.links}>
                                    <a > Acceuil </a>
                                    <a > Sp??cialit??s </a>
                                    <a > Contact </a>


                                </div>
                            </div>

                            <div className={styles.df}>

                                <div className={styles.app}>
                                    <div className="h1">

                                        {data.name  || "Nom complet de l'??tablissement"}
                                       </div>

                                    <p> {<Markup content={draftToHtml(data.description).substr(0, 1000)} />  || 
                                                    "Ajouter la description de votre ??tablissement ici"
                                    } </p>
{}

                                    <div>
                                        <a className="btnPrimary">Nous Contacter</a>
                                    </div>
                                </div>
                                {data.profil == "" || data.profil == undefined ? <Image size={250} color="#4a00b4" /> : <img src={data.profil} className={styles.profil} />}
                            </div>
                            <center style={{ display: "flex" }}> <GeoAlt size={20} color="#4a00b4" /> {data.position == [] ? "Votre position" : data.position && data.position.map(e => e.label + ", ")}</center>
                            <div>
                                <center className="h2">Nos Sp??cialit??s</center>
                                <p>
                                    enregistrer les infos puis acceder ?? votre interface pro pour ajouter vos sp??cialit??s et les prix
                                </p>
                            </div>

                            <div>

                            </div>
                        </nav>

                    </div>
                </div>





            </div>
        </article>
    )
}

export default Preview
