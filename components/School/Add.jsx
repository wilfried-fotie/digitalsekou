import Link from 'next/link'
import React from 'react'
import { Building, ImageAlt, NodeMinus, TelephoneFill } from 'react-bootstrap-icons'

import Select from 'react-select'
import styles from '../../styles/AddSchool.module.css'

export function Field({ auto, children, name, value, onChange, image = <NodeMinus size={30} color="#4a00b4" /> }) {
    return <div className={styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type="text" placeholder={auto} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>
}

export function TextArea({ children, name, value, onChange }) {
    return <div>

        <div> <label htmlFor={name}>{children}</label> </div>
        <div>  <textarea rows={10} className={styles.area} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>
}


export function File({ children, name, onChange, multiple = false }) {
    return <div className={styles.dg}>
        <div className="dfs">
            <ImageAlt size={20} color="#4a00b4" />
            <label htmlFor={name}>{children}</label>
        </div>
        <div>
            <input type="file" name={name} id={name}
                accept="image/*"
                multiple={multiple == true ? multiple : null}
                onChange={onChange}
            />

        </div>
    </div>
}




class Add extends React.PureComponent {

    constructor(props) {
        super(props)


        this.options = [{ value: "Bafoussam", label: "Bafoussam" }, { value: "Yaounde", label: "Yaounde" }, { value: "Doula", label: "Doula" }, { value: "Bertoua", label: "Bertoua" }, { value: "Garoua", label: "Garoua" }, { value: "Limbe", label: "Limbe" }]
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.handle = this.handle.bind(this)


    }

    handleChangeSelect(e) {
        this.props.onSelectChange(e)

    }

    handleImage(e) {
        this.props.onImageChange(e)

    }
    handle(e) {
        this.props.onChange(e)
    }




    render() {

        return (
            <div className={styles.left}>

                <Field name="name" auto="exp: Institut universitaire...." image={<Building size={20} color="#4a00b4" />} onChange={this.handle} value={this.props.state.name}>Nom Complet De L'établissement</Field>
                <Field name="cible" auto="exp: INSAM" onChange={this.handle} value={this.props.state.cible}>Sigle De L'établissement </Field>
                <Field name="tel" auto="exp: 678 55 02 04" image={<TelephoneFill size={20} color="#4a00b4" />} tel={true} onChange={this.handle} value={this.props.state.tel}>Ajouter Le Numéro de Téléphone</Field>
                <File name="logo" onChange={this.handleImage}>Importer Le Logo</File>
                {/* <File name="logo" multiple={true} onChange={this.handleImage}>Importer Les Images Pour la page d'acceuil</File> */}
                <div className={styles.dg}>
                    <span className={styles.ds}>Selectionner les villes dans lesquelles vous êtes situer</span>
                    <Select isMulti options={this.options} value={this.props.state.position} name="position" className="basic-multi-select"
                        classNamePrefix="select" onChange={this.handleChangeSelect} />
                </div>
                <File name="profil" onChange={this.handleImage}>Importer Une Image de Profil</File>
                <TextArea name="description" onChange={this.handle} value={this.props.state.description}>Description De L'établissement </TextArea>

                <div className={styles.dg}> <center> <Link href="/addSchoolPro"><a href="/addSchoolPro" className="btnPri">Enregistrer</a></Link></center>  </div>


            </div>
        )
    }
}

export default Add
