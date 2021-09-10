import React from 'react'
import { AlignMiddle, Back, Bookmark, Briefcase, Cash, CashCoin, DoorClosed, KanbanFill, Pen, Pencil, Trash } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import style from '../../styles/sudo.module.css'
import styles from '../../styles/startpub.module.css'
import { SchoolContext, useModal } from '../../pages/addSchoolPro/[id]'
import CustomModal from '../customModal'
import { Field, FieldValidate, Selector, SelectorValid, TextAreaValidate } from '../FormTools'
import "../../global"
import axios from "axios"





export function Home() {
    const [visbility3, v3] = useModal(false)
    const position = React.useRef(null)
    const context = React.useContext(SchoolContext)
    let spe = context.data.spe
    let school = context.data.schoolData.school
    
    

    const dispacth = context.dispacth
    const dispacth2 = context.dispacth

    const handleClick = (pos) => {
        v3(true)
    }

    const handleClick2 = (pad) => {
        v(true)
    }

    const handleAlert = () => {
        alert("Cette fonctionnalité est réservé à la version pro")
    }
    return (<>
        <div className={styles.pad}>
            
      </div>
        <div className={style.end}>
            <a className="btnPri" onClick={!school.pro ? handleAlert : handleClick } style={{ marginRight: "20px" }}>Ajouter Une Spécialité</a>
        </div>
       
            <div className={styles.right}>
                <center> <Tab value={spe} spe={true} dispacth={dispacth2}  state={spe} /> </center>


            </div>
            
    
        {visbility3 && <CustomModal onModalChange={v3} component={<AddSpeciality dispacth={dispacth2} />} />}


    </>)
}




export function AddSpeciality({dispacth}) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
   
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched" })
    const [loader, setLoader] = React.useState(false)

    const schoolData = React.useContext(SchoolContext).data
   
    const onSubmit = React.useCallback(
        async (data) => {

            if (isValid) {
                setLoader(true)
                
                const dataToSend = { name: data.name, price: data.price + " FRCFA", description: data.description, schoolId: schoolData.schoolData.school.id }
                await axios.post('/add-speciality', dataToSend)
                    .then(res => {
                        setErr()
                        setFine("Cette spécialité a été  ajouter avec succes!")
                        dispacth({ type: "ADD", name: "spe", data: { ...dataToSend, k: res.data.id } })


                    })
                    .catch(res => {
                        setFine()
                        setErr("Cette spécilaité existe déja" + res)
                    })
                    .finally(setLoader(false))

            }
        })
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>


                {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                    {err}
                </div>}
                {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                    {fine}
                </div>}


                <FieldValidate name="name" r={false} image={<Back color="#4a00b4" size="20px" />} auto="Entrez le nom de la spécilaité" control={control} >Nom de la spécialité/classe</FieldValidate>
                {errors.name && errors.name.type === "required" && (
                    <span className="error">Le nom de la spécialité est obligatoire</span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moiuns trois caracteres</span>
                )}

                <FieldValidate name="price" r={false} type="number" image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le montant de la spécialité" control={control} >Prix  de la spécialité/classe</FieldValidate>
                {errors.price && errors.price.type === "required" && (
                    <span className="error">Le price de la spécialité est obligatoire</span>
                )}
                {errors.price && errors.price.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moins trois caracteres</span>
                )}


                <TextAreaValidate name="description" r={false} type="number" image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le montant de la spécialité" control={control} >Nom de la filière</TextAreaValidate>
                {errors.description && errors.description.type === "required" && (
                    <span className="error">Le description de la spécialité est obligatoire</span>
                )}
                {errors.description && errors.description.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moins trois caracteres</span>
                )}

                
              
                <center style={{ padding: "5px 20px 10px" }}>
                    <button disabled={loader} className="dfss btnPri" >
                        {loader && <Loader
                            type="TailSpin"
                            color="white"
                            height={20}
                            width={50}
                        />}

                        Enregistrer</button>
                </center>
            </form>

        </>
    )
}







export function Delete({ v, id, k, state, dispacth, spe, dispacth2 }) {
    let Token = sessionStorage.getItem("schoolToken")
    let val = k !== undefined ? k : state[id] && state[id].k

    const [fine, setFine] = React.useState()
    const [error, setError] = React.useState()
    const handleCancel = () => {
        v(false)
    }
    const handleDelete = async () => {
        if (spe) {
            await axios.delete(`/speciality/${val}`,
            {
                headers: {
                    Authorization: "Bearer " + Token
                }

            }
        )
            .then(() => {
                setError()
                setFine("Suppression réussi")
            
                dispacth({ type: "DELETE", name: "spe", id: id })
                v(false)
            }
            )
            .catch((e) => {

                setFine()
                setError("Erreur lors de la suppression..." )

            }
            );
        
}

       
        
    }
    return (<>
        {fine && <div className="fine">
            {fine}
        </div>}
        {error && <div className="error">
            {error}
        </div>}
        <div className={styles.grid}>
            <div>
                 <center>Voulez vous supprimer?</center>
            </div>
            
            <div className={"dfss"}>
                <a className={style.disagree} onClick={handleCancel}>
            <DoorClosed size={20} color="#ffff" className={style.icon} /> Annuler </a>
            <a className={style.agree} onClick={handleDelete}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></div>
        </div>
       
    </>)
}


export function Edit({ v, id, k, dispacth, state, spe }) {
   
    const [err, setErr] = React.useState("")
    const [fine, setFine] = React.useState("")
    const [loader, setLoader] = React.useState(false)


    // let def = { label: state[id].fil, value: state[id].fil }
    // let def2 = { label: options[0].value, value: options[0].value }
    let val = k !== undefined ? k : state[id].k
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched", defaultValues: { name: state[id].name, price: state[id].price || state[id].prix,description: state[id].description } })
    let Token = sessionStorage.getItem("schoolToken")
    const onSubmit = React.useCallback(
        async (data) => {

            if (data.description && data.price && data.name) {

                setLoader(true)

                await axios.put(`/speciality/${val}`, data,
                    {
                        headers: {
                            Authorization: "Bearer " + Token
                        }

                    }
                )
                    .then(() => {
                        setErr("")
                        setFine("MIS A JOUR réussi")

                        dispacth({ type: "UPDATE", name: "spe", id: id, value: data.name, description: data.description, price: data.price })
                        v(false)
                    }
                    )
                    .catch((e) => {

                        setFine("")
                        setErr("Erreur lors de la mis à jour ...")

                    }
                    );
            }
        },[]);
                
            
        return (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                                {err}
                            </div>}
                            {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                                {fine}
                            </div>}



           
          
                            <FieldValidate name="name" r={false} image={<Pencil color="#4a00b4" size="20px" />} auto="Entrez le nom de la filière" control={control} >Nom de la spécialité</FieldValidate>
                            {errors.name && errors.name.type === "required" && (
                                <span className="error">Le nom de la spécialité est obligatoire</span>
                            )}
                            {errors.name && errors.name.type === "minLength" && (
                                <span className="error"> ce champ doit faire au moiuns trois caracteres</span>
                            )}
          
        
         
                            {spe && <FieldValidate name="price" r={false} max="1000000000000" image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le montant de la spécialité" control={control} >Prix de la spécialité</FieldValidate>
                            }



                            <TextAreaValidate name="description" r={false}  image={<Pencil color="#4a00b4" size="20px" />} auto="Entrez le nom de la filière" control={control} >Nom de la spécialité</TextAreaValidate>
                            {errors.description && errors.description.type === "required" && (
                                <span className="error">Le nom de la spécialité est obligatoire</span>
                            )}
                            {errors.description && errors.description.type === "minLength" && (
                                <span className="error"> ce champ doit faire au moiuns trois caracteres</span>
                            )}


                            <center style={{ padding: "5px 20px 10px" }}>
                                <button disabled={loader} className="dfss btnPri" >
                                    {loader && <Loader
                                        type="TailSpin"
                                        color="white"
                                        height={20}
                                        width={50}
                                    />}

                                    Enregistrer</button>
                            </center>
                        </form>
                    </>)
            }

        
      
     
            export function Tab({ value, spe = true, pre = true, dispacth, state, dispacth2 }) {

                const [visbility3, v3] = useModal(false)
                const [visbility, v] = useModal(false)
                const [getIdForDel, setGetIdForDel] = React.useState()
                const [getIdForMod, setGetIdForMod] = React.useState()
                const [getkForDel, setGetkForDel] = React.useState()
                const [getkForMod, setGetkForMod] = React.useState()

                const data = React.useContext(SchoolContext).data.schoolData.school
                
                

                const handleClick = (id, k) => {
                    v3(true)
                    setGetIdForDel(id)
                    setGetkForDel(k)

      
                }

                const handleClick2 = (id, k) => {
                    v(true)
                    setGetIdForMod(id)
                    setGetkForMod(k)

                }

    



                return (
                    <>
  
                        <table border=".5px!important">
                            <thead>
                                <tr>
                                    {pre && <th>Id</th>}
                                    <th>Nom de la  spécialité/classe </th>
                                    <th>Descripiton de la spécialité/classe</th>
                                    <th>Prix de la spécialité/classe</th>
                                    {pre && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>

                                {/* {spe ? newArray.map((e, f) => <Tr key={f} spe={spe} k={f} value={e} pre={pre} value2={value} filieres={filieres} onDelete={handleClick} onEdit={handleClick2} />)
                    
                        : value.map((e, f) => <Tr key={f} spe={spe} k={f} value={e} value2={value} pre={pre}  filieres={filieres} onDelete={handleClick} onEdit={handleClick2} />)
                    } */}

                                {value.map((e, f) => {
                       
                                    return <Tr key={f} spe={spe} k={f} pre={pre} value2={value} value={e} onDelete={handleClick} onEdit={handleClick2} />
                                }
                                )}
                            </tbody>
              


                        </table>
                        {visbility3 && <CustomModal onModalChange={v3} component={<Delete v={v3} id={getIdForDel} k={getkForDel} spe={spe} dispacth={dispacth} state={state} dispacth2={dispacth2} />} />}
                        {visbility && <CustomModal onModalChange={v} component={<Edit v={v} k={getkForMod} id={getIdForMod} spe={spe} dispacth={dispacth} state={state} />} />}
                    </>
                )
            }
        
        



            export function Tr({ k, value, value2, spe, onDelete, onEdit, pre }) {



                return (<>

                    <tr>
                        {pre && <td>{k + 1}</td>}
                        <td>{value.name}</td>
                        {spe && <td>{value2[k].description || value.description}</td>}
                        {spe && <td>{value2[k].prix || value.price}</td>}

                        {pre && <td>
                            
                            <div className="dfss">

                            
                            <a className={style.disagree} onClick={() => {
                            onEdit(k, value.id !== 1 ? value.id : value.k || 1)


                        }}>
                            <Pen size={20} color="#ffff" className={style.icon} /> Modifier</a>
                            <a className={style.agree} onClick={() => {

                                onDelete(k, value.id !== 1 ? value.id : value.k || 1)

                            }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a>
                            
                            </div>
                            </td>
                        }

                    </tr></>)
            }
