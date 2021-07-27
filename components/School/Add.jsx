import Link from 'next/link'
import React from 'react'
import { Building, EyeFill, EyeSlashFill, ImageAlt, NodeMinus, TelephoneFill } from 'react-bootstrap-icons'
import { useRouter } from "next/router"
import axios from 'axios'
import "../../global"
import { useForm, useController } from "react-hook-form"
import Select from 'react-select'
import styles from '../../styles/AddSchool.module.css'
import { Field, File, Password, TextArea } from '../FormTools'





export default function Add({ onSelectChange, onImageChange, onChange, state, control, errors, handleSubmit, getValue}) {
    
    


    const options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaoundé" }, { value: "Douala", label: "Douala" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]

    const handleChangeSelect = (e) => {
        onSelectChange(e)

    }

    const handleImage = (e) => {
        onImageChange(e)

    }
    const handle = (e) => {
        onChange(e)
    }
   
  
    const onSubmit = (data) => {
        console.log(data)
        if (isValid) {
            console.log(errors)
        }

        if (isSubmitted) {
            console.log(errors.name)
        }
    }

    return (
<form onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.left}>
                {getValue("name")}

                <Field control={control} auto="exp: Institut universitaire...." name="name" image={<Building size={20} color="#4a00b4" />} >Nom Complet De L'établissement</Field> 
                {errors.name && errors.name.type === "required" && (
                    <span className="error">Le nom est obligatoire</span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                    <span className="error">Le nom doit faire au moins 4 caractères</span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                    <span className="error">Le nom doit faire au max 100 caractères</span>
                )}
            {/* <Field name="cible" auto="exp: INSAM" onChange={handle} value={state.cible}>Sigle De L'établissement </Field>
            <Field name="tel" auto="exp: 678 55 02 04" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} onChange={handle} value={state.tel}>Ajouter Le Numéro de Téléphone</Field> */}


            <Password name="password">Entrez un mot de passse</Password>

            <File name="logo" onChange={handleImage}>Importer Le Logo</File>


           
            <div className={styles.dg}>
                <span className={styles.ds}>Selectionner les villes dans lesquelles vous êtes situer</span>
                    <Select isMulti options={options} value={state.position} name="position" id="react-select-2-input" className="basic-multi-select"
                    classNamePrefix="select" onChange={handleChangeSelect} />
            </div>
            <File name="profil" onChange={handleImage}>Importer Une Image de Profil</File>
            <TextArea name="description" onChange={handle} value={state.description}>Description De L'établissement </TextArea>

                <div className={styles.dg}> <center> <button type="submit" className="btnPri"> Enregistrer </button> </center>  </div>


        </div>
        </form>    )
}


