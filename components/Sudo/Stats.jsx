import React from 'react'
import { Exclude } from 'react-bootstrap-icons'
import { SudoContext } from '../../pages/Sudo'
import { verifSupDate } from '../CustomHooks/supDate'
import { verifTwoDate } from '../CustomHooks/verifTwoDate'
import { Card } from '../Entreprise/Stat'
import styles from '../Entreprise/stat.module.css'
function Stats() {
    const schools = React.useContext(SudoContext).data.school
    const entreprises = React.useContext(SudoContext).data.entreprises
    const sites = React.useContext(SudoContext).data.sites
    const schoolsPro = React.useContext(SudoContext).data.school.filter(e => e.pro == true)

    
    const sitesPro = sites.map(e1 => ({ ...e1, ...entreprises.find(e => e.id == e1.entreprise_id) })).filter(e => e.pro == true)
    const users = React.useContext(SudoContext).data.users
    const getPubs = React.useContext(SudoContext).data.pubs.filter(e => (e.valid == true && verifSupDate(new Date(), new Date(e.days)) && verifTwoDate(new Date(e.available), new Date(e.days))));

    const getOffers = React.useContext(SudoContext).data.offers.filter(e => (e.valid == true && verifSupDate(new Date(), new Date(e.expire))))
        return (
            <>
                <center className="pad h1">
En Activité
                </center>
                <div className="pad"></div>

                <div className={styles.df}>
                    <Card desc="Nombre Total Entreprises Pro" number={sitesPro.length} />
                    <Card desc="Nombre Total Etablissements Pro" number={schoolsPro.length} />
                    <Card desc="Nombre Total De Pub Active" number={getPubs.length} />
                    <Card desc="Nombre Total D' Offre Active" number={getOffers.length} />
                </div>
                <center className="pad h1">
                    Générale
                </center>
                <div className="pad"></div>

                    <div className={styles.df}>

                        <Card desc="Nombre Total Etablissement" number={schools.length} /> 
                    <Card desc="Nombre de Total Visiteurs" number={users.length} />
                    <Card desc="Nombre Total Entretreprises" number={entreprises.length} />
                    <Card desc="Nombre Total De Sites Entretreprises" number={sites.length} />
                    

                    
                   
</div>
            </>
        )

}

export default Stats
