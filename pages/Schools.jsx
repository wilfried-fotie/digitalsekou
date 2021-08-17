import Head from 'next/head'
import Header from './Template/Header.jsx'
import Image from 'next/image'
import CustomModal from '../components/customModal'
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

    const [state, setState] = React.useState({})


    const change = (e) => {
        const name = e.target.id
        const value = e.target.checked
        setState(s => ({ ...s,[name]: value}))
    }
    
   

    const filter = []
    const schoolData = [...tab]

    const fineData = typesData.map(s => {

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
            <Header value={2} />
            <main>
                <div className={styles.search}>
                    <h1>Rechercher les établissements</h1>
                </div>

                <div className={styles.df}>  <div className={styles.searBar}>
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
                                    <input type="checkbox" name="public" value={state.type} onChange={change} className={styles.pub} id="pub" />
                                    <label htmlFor="pub">Public</label>
                                </div>
                                <div >
                                    <input type="checkbox" name="Privé" onChange={change} className={styles.pub} id="priv" />
                                    <label htmlFor="priv">Privé</label>
                                </div>
                            </div>

                        </div>


                        <div className={styles.pad}>
                            <a>Niveau</a>

                            <div className={styles.pad}>

                                <div >
                                    <input type="checkbox" name="Supérieur" onChange={change} className={styles.pub} id="uni" />
                                    <label htmlFor="uni">Universités</label>
                                </div>

                                <div >
                                    <input type="checkbox" name="Secondaire" onChange={change} className={styles.pub} id="lyc" />
                                    <label htmlFor="lyc">Secondaire</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="Primaire" onChange={change} className={styles.pub} id="pri" />
                                    <label htmlFor="pri">Primaire</label>
                                </div>
                                <div >
                                    <input type="checkbox" name="Maternelles" onChange={change} className={styles.pub} id="mat" />
                                    <label htmlFor="mat">Maternelles</label>
                                </div>

                                <div >
                                    <input type="checkbox" name="Crèches" onChange={change} className={styles.pub} id="cre" />
                                    <label htmlFor="cre">Crèches</label>
                                </div>



                            </div>

                        </div>

                    </div>
                    <div className={styles.right}>
                        {fineData.map((e,k) => {

                            const ts = typesData.filter(t => {
                                return t.school_id == e.school.id
                            })
                            

                           
                            
                            for (const key in state) {
         
                        



                                if (state[key] && key == "priv"  ) {

                                    if (e.school.status !== "Privé") {
                                        return
                                    }
                                    

                                }
                                  





                                if (state[key] && key == "pub" ) {

                                    if (e.school.status !== "Public") {
                                        
                                              return
                                      
                                      
                                    }


                                }
                                
                                if (state[key] && key == "uni" ) {
                                   
                                    if (e.type !== "Supérieur") {
                                        return
                                    }


                                   

                                }
                                if (state[key] && key == "lyc") {

                                    if (e.type !== "Secondaire") {
                                        return
                                    }



                                }

                                if (state[key] && key == "pri") {

                                    if (e.type !== "Primaire") {
                                        return
                                    }



                                }

                                if (state[key] && key == "mat") {

                                    if (e.type !== "maternelle") {
                                        return
                                    }



                                }


                                if (state[key] && key == "cre") {

                                    if (e.type !== "crêche") {
                                        return
                                    }



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