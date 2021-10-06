import Head from 'next/head'
import Header from './Template/Header.jsx'
import styles from '../styles/Search.module.css'
import React from 'react'
import Footer from './Template/footer'
import { Search, GeoAlt } from 'react-bootstrap-icons'
import Result from '../components/School/result.jsx'
import { fetchAllPositions, fetchAllSchoolData, fetchAllTypes } from '../Model/getter.jsx'

function Schools({ schools,positions,types}) {
    const tab = schools.school
    
    const positionData = positions.positions
    const typesData = types.types

    const [state, setState] = React.useState({types: "all",level: "all"})


    const change = (e) => {
        const name = e.target.name
        const value = e.target.value
        
        setState(s => ({ ...s,[name]: value}))
    }
    
   

    const filter = []
    const schoolData = tab

    const fineData = typesData && typesData.map(s => {

        const res = tab.filter(i => i.id == s.school_id)
        const type = res.map(e => e)
      

        return {type: s.types, school: type[0]}

    })
    const [search, setSearch] = React.useState("")

    const  handleSearch = (e) => {
        setSearch(e.target.value)
    }



    return (
        <>
            <Head>
                <title>trouver toutes les informations rélative aux établissement camerounais</title>
            </Head>
            <Header value={2} />
            <main>
                <div className={styles.search}>
                    <h1>Rechercher les établissements</h1>
                </div>

                <div className={styles.df}>
                    <div className={styles.searBar}>
                    <input type="search" id={styles.input} value={search} onChange={handleSearch} placeholder="Recherchez tous sur les écoles" />
                    <div className={styles.icon}>
                        <Search color="#fff" size="20px" />
                    </div>
                </div>
                </div>
                <div className={styles.result}>
                    <div className={styles.left}>
                        <b>Filtrer Par</b> <br />
                        <div className={styles.pad}>
                            <a>types</a>
                            <div className={styles.pad}>
                                <div>
                                    <input type="radio" name="types" value="all" defaultChecked={state.types == "all"} onChange={change}  className={styles.pub} id="all" />
                                    <label htmlFor="all">Tous</label>
                                </div>
                                <div>
                                    <input type="radio" name="types" value="pub" defaultChecked={state.types == "pub"} onChange={change} className={styles.pub} id="pub" />
                                    <label htmlFor="pub">Public</label>
                                </div>
                                <div >
                                    <input type="radio" name="types" onChange={change} value="priv" defaultChecked={state.types == "priv"} className={styles.pub} id="priv" />
                                    <label htmlFor="priv">Privé</label>
                                </div>
                                <div >
                                    <input type="radio" name="types" onChange={change} value="para" defaultChecked={state.types == "para"} className={styles.pub} id="para" />
                                    <label htmlFor="para">Para-Publique</label>
                                </div>
                            </div>

                        </div>


                        <div className={styles.pad}>
                            <a>Niveau</a>
                            <div className={styles.pad}>

                                <div >
                                    <input type="radio" name="level" value="all" onChange={change} defaultChecked={state.level == "all"} className={styles.pub} id="tous"/>
                                    <label htmlFor="tous">Tous</label>
                                </div>
                                <div >
                                    <input type="radio" name="level" value="Supérieur" onChange={change} defaultChecked={state.level == "Supérieur"} className={styles.pub} id="uni" />
                                    <label htmlFor="uni">Universités</label>
                                </div>

                                <div >
                                    <input type="radio" name="level" value="Secondaire" onChange={change} defaultChecked={state.level == "Secondaire"} className={styles.pub} id="lyc" />
                                    <label htmlFor="lyc">Secondaire</label>
                                </div>
                                <div>
                                    <input type="radio" name="level" value="Primaire" onChange={change} defaultChecked={state.level == "Primaire"} className={styles.pub} id="pri" />
                                    <label htmlFor="pri">Primaire</label>
                                </div>
                                <div >
                                    <input type="radio" name="level" value="Maternelles" onChange={change} defaultChecked={state.level == "Maternelles"} className={styles.pub} id="mat" />
                                    <label htmlFor="mat">Maternelles</label>
                                </div>

                                <div >
                                    <input type="radio" name="level" value="Crèches" onChange={change} defaultChecked={state.level == "Crèches"} className={styles.pub} id="cre" />
                                    <label htmlFor="cre">Crèches</label>
                                </div>



                            </div>

                        </div>

                    </div>
                    <div className={styles.right}>
                        {fineData && fineData.map((e,k) => {
                            if (state.level !== e.type && state.level !== "all" ) {
                                    return
                            }
                            
                           
                            if (state.types == "priv") {
                                if (e.school.status !== "Privé") {
                                        return
                                }
                            }
                            if (state.types == "pub") {
                                if (e.school.status !== "Public") {
                                    return
                                }
                            }
                            if (state.types == "para") {
                                if (e.school.status !== "Para-Public") {
                                    return
                                }
                            }
                         
                            

                            if (e.school.name.toLowerCase().indexOf(search.toLowerCase()) === -1 && e.school.sigle.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                                return
                            }
                       
                             filter.push(<Result key={k} school={e.school} type={e.type} positions={positionData} />)
                           
                            
                            
                        })}
                        {state && filter }
                      
                    </div>
                </div>

              
            </main>


            <Footer />
        </>
    )
}

export default Schools






export async function getServerSideProps() {


    const schools = await fetchAllSchoolData();
    const positions = await fetchAllPositions();
    const types = await fetchAllTypes();




    return {
        props: {
            schools,
            positions,
            types
         },
    };



}