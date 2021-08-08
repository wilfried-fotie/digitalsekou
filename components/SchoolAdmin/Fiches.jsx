import React from 'react'
import { AlignMiddle, Back, Bookmark, Briefcase, Cash, DoorClosed, KanbanFill, Pen, Pencil, Trash } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import Select from 'react-select'
import style from '../../styles/sudo.module.css'
import styles from '../../styles/startpub.module.css'
import { SchoolContext, useModal } from '../../pages/addSchoolPro/[id]'
import CustomModal from '../customModal'
import { Field, FieldValidate, Selector, SelectorValid } from '../FormTools'
import "../../global"
import axios from "axios"


function init(init) {
    return [...init.val]
}
function init2(init) {
    return [...init.valSpe]
}


export function Home({ filieres, specialities}) {
    const [state, setState] = React.useState(1)
    const [visbility3, v3] = useModal(false)
    const [visbility, v] = useModal(false)
    const position = React.useRef(null)
    let val = filieres.filieres
    let valSpe = specialities.specialities
    const [fil, dispacth] = React.useReducer(reducer, { val }, init)
    const [spe, dispacth2] = React.useReducer(reducer, { valSpe }, init2)

    const handleClick = (pos) => {
        v3(true)
    }

    const handleClick2 = (pad) => {
        v(true)
    }
    return (<>
        <div className={styles.pad}>
            
      </div>
        <div className={style.end}>
            <a className="btnPri" onClick={handleClick} style={{ marginRight: "20px" }}>Ajouter Une Spécialité</a>
            <a className="btnPri" onClick={handleClick2} ref={position}>Ajouter Une Filière</a>
        </div>
        <div style={{ marginTop: "50px" }}>

            <div className="df" style={{ borderBottom: "2px solid #4a00b4" }}>
                <span className={state == 1 ? styles.active2 : styles.span} onClick={() => { setState(1) }}> <KanbanFill size={20} color={state == 1 ? "#fff" : "#4a00b4"} /> <span className={state == 1 ? styles.acticon : styles.icon}  > Spécialités </span> </span>

                <hr />

                <span className={state == 2 ? styles.active2 : styles.span} onClick={() => { setState(2) }}> <KanbanFill size={20} color={state == 2 ? "#fff" : "#4a00b4"} /><span className={state == 2 ? styles.acticon : styles.icon} >Filières </span></span>

            </div>
            <div className={styles.left}>
                <center>{state == 1 && <Tab value={spe} spe={true} dispacth={dispacth2} filieres={fil} state={spe} />} </center>


            </div>
            <div className={styles.right}>
              
                <center>{state == 2 && <Tab value={fil} spe={false} dispacth={dispacth} dispacth2={dispacth2} state={fil }/>} </center>
                 
            </div>
        </div>
        {visbility3 && <CustomModal onModalChange={v3} component={<AddSpeciality dispacth={dispacth2} filieres= { fil}/>} />}
        {visbility && <CustomModal onModalChange={v} component={<AddFiliaire dispacth={ dispacth}/>} />}


    </>)
}




export function AddSpeciality({filieres,dispacth}) {
    const [err, setErr] = React.useState()
    const [fine, setFine] = React.useState()
   
    const options = filieres.map(e => ({ value: e.name, label: e.name }))
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched" })
    const [loader, setLoader] = React.useState(false)
    const schoolData = React.useContext(SchoolContext)

    const onSubmit = React.useCallback(
        async (data) => {

            if (isValid) {
                setLoader(true)
                
                const dataToSend = { name: data.name, fil: data.fil.value, schoolId: schoolData.schoolData.school.id}
                await axios.post('/add-speciality', dataToSend)
                    .then(res => {
                        setErr()
                        setFine("Cette spécialité a été  ajouter avec succes!")
                        dispacth({ type: "ADD", data: { ...dataToSend, k: res.data.id } })


                    })
                    .catch(res => {
                        setFine()
                        setErr("Cette spécilaité existe déja" + res)
                    })
                    .finally(setLoader(false))

            }


        }
    )
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>


                {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                    {err}
                </div>}
                {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                    {fine}
                </div>}


                <FieldValidate name="name" r={false} image={<Back color="#4a00b4" size="20px" />} auto="Entrez le nom de la spécilaité" control={control} >Nom de la filière</FieldValidate>
                {errors.name && errors.name.type === "required" && (
                    <span className="error">Le nom de la spécialité est obligatoire</span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                    <span className="error"> ce champ doit faire au moiuns trois caracteres</span>
                )}

                <Selector name="fil" r={false} control={control} image={<Bookmark color="#4a00b4" size="20px" />} options={options}>Selectionner la filière correspondante</Selector>

                {errors.fil && errors.fil.type === "required" && (
                    <span className="error">Le nom de la filière est obligatoire</span>
                )}
                {errors.fil && errors.fil.type === "minLength" && (
                    <span className="error"> il doit faire au moiuns trois caracteres</span>
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

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            
             state.push({...action.data})
            return [...state]
        case "DELETE":
            let num = action.id
            state.splice(num,1)
            return [...state]
        case "UPDATE":
            state[action.id].name = action.value
            if (state[action.id].fil) {
                state[action.id].fil = action.fil
            } 
            return [...state]
       
        default:
            throw new Error("Cette action n'existe pas")
        
    }
    
}



export function AddFiliaire({dispacth}) {

    const [err, setErr] = React.useState("")
    const [fine, setFine] = React.useState("")
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onChange" })
    const [loader, setLoader] = React.useState(false)
    
    const schoolData = React.useContext(SchoolContext)
    const onSubmit = React.useCallback(
        async(data) => {
            
            if (isValid) {
                setLoader(true)
                const dataToSend = { ...data, schoolId: schoolData.schoolData.school.id }

               
                await axios.post('/add-filiaire', dataToSend)
                    .then(res => {
                        setErr()
                        setFine("Cette filiaire a été  ajouter avec succes!")
                        dispacth({ type: "ADD", data: {  name: data.fil, id: schoolData.schoolData.school.id ,k: res.data.id }})
                       
                    
                    })
                    .catch(res => {
                        setFine()
                        setErr("Cette filiare existe déja")
                    })
                    .finally(setLoader(false))
                
            }


        }
    )


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>



                {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                    {err}
                </div>}
                {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                    {fine}
                </div>}

                <FieldValidate name="fil" r={false} image={<AlignMiddle color="#4a00b4" size="20px" />} auto="Entrez le nom de la filière" control={control} >Nom de la filière</FieldValidate>
                {errors.fil && errors.fil.type === "required" && (
                    <span className="error">Le nom de la filière est obligatoire</span>
                )}
                {errors.fil && errors.fil.type === "minLength" && (
                    <span className="error">Le nom de la filière doit faire au moins 3</span>
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




export function Delete({ v, id, k, state,dispacth,spe,dispacth2}) {
    let Token = sessionStorage.getItem("schoolToken")
    let val = k !== undefined ? k : state[id].k
    console.log(val)
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
            
                dispacth({ type: "DELETE", id: id })
                v(false)
            }
            )
            .catch((e) => {

                setFine()
                setError("Erreur lors de la suppression..." )

            }
            );
        } else {
            await axios.delete(`/filieres/${k}`,
                {
                    headers: {
                        Authorization: "Bearer " + Token
                    }

                }
            )
                .then((res) => {
                    setError()
                    setFine("Suppression réussi")
                    

                    dispacth({ type: "DELETE", id: id })
                    res.data !== null ? res.data.map(e => dispacth2({ type: "DELETE", name: e.name })) : null
                    v(false)
                }
                )
                .catch((e) => {

                    setFine()
                    setError("Erreur lors de la suppression..."  )

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


export function Edit({v,id,k,dispacth,state,spe ,filieres}) {
    const options = spe ?  filieres.map(e => ({ value: e.name, label: e.name })) : null
    const [err, setErr] = React.useState("")
    const [fine, setFine] = React.useState("")
    const [loader, setLoader] = React.useState(false)
    const [state1, setState1] = React.useState()
    let def = { label: state[id].fil, value: state[id].fil }
    let val = k !== undefined ? k : state[id].k
    console.log(val)
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched", defaultValues: { name: state[id].name, fil: def }})
    let Token = sessionStorage.getItem("schoolToken")
    const onSubmit = React.useCallback(
        async (data) => {
if(isValid){
            if (spe) {
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
    

                        dispacth({ type: "UPDATE", id: id, value: data.name,fil: data.fil.value })
                        v(false)
                    }
                    )
                    .catch((e) => {

                        setFine("")
                        setErr("Erreur lors de la mis à jour ...")

                    }
                    );

            } else {
                await axios.put(`/filieres/${k}`, { name: data.name },
                    {
                        headers: {
                            Authorization: "Bearer " + Token
                        }

                    }
                )
                    .then(() => {
                        setErr("")
                        setFine("MIS A JOUR réussi")
                        dispacth({ type: "UPDATE", id: id, value: data.name })
                        v(false)
                    }
                    )
                    .catch((e) => {

                        setFine("")
                        setErr("Erreur lors de la mis à jour ...")

                    }
                    );
            }
           
        
        setLoader(false)
            }
        }
    )
return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>


            {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                {err}
            </div>}
            {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                {fine}
            </div>}



           
          
            <FieldValidate name="name" r={false} image={<Pencil color="#4a00b4" size="20px" />} auto="Entrez le nom de la filière" control={control} >Nom de la filière</FieldValidate>
            {errors.name && errors.name.type === "required" && (
                <span className="error">Le nom de la spécialité est obligatoire</span>
            )}
            {errors.name && errors.name.type === "minLength" && (
                <span className="error"> ce champ doit faire au moiuns trois caracteres</span>
            )}
          
          
            {spe &&
                <Selector name="fil" r={false} control={control} image={<Bookmark color="#4a00b4" size="20px" />} options={options}>Selectionner la filière correspondante</Selector>

            
}

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





export function Tab({ value, spe = true, dispacth,state,dispacth2,filieres}) {

    const [visbility3, v3] = useModal(false)
    const [visbility, v] = useModal(false)
    const [getIdForDel, setGetIdForDel] = React.useState()
    const [getIdForMod, setGetIdForMod] = React.useState()
    const [getkForDel, setGetkForDel] = React.useState()
    const [getkForMod, setGetkForMod] = React.useState()


    const handleClick = (id,k) => {
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
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                        <th>Nom de la {!spe ? "filière" : "spécialité"}</th>
                        {spe && <th>Filière</th>}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((e, f) => <Tr key={f} spe={spe} k={f} value={e} filieres={filieres} onDelete={handleClick} onEdit={handleClick2} />)}
                </tbody>
              


            </table>
            {visbility3 && <CustomModal onModalChange={v3} component={<Delete v={v3} id={getIdForDel} k={getkForDel} spe={spe} dispacth={dispacth} state={state} dispacth2={dispacth2}/>} />}
            {visbility && <CustomModal onModalChange={v} component={<Edit v={v} k={getkForMod} filieres={filieres} id={getIdForMod} spe={spe} dispacth={dispacth} state={state }/>} />}
        </>
    )
}





export function Tr({ k, value, spe, filieres, onDelete, onEdit }) {
    console.log(filieres,value)
    return (<>
        <tr>
            <td>{k + 1}</td>
            <td>{value.name}</td>
            {spe && <td>{value.fil}</td>}
            <td className="dfss"> <a className={style.disagree} onClick={() => {
                onEdit(k , value.id !== 1 ? value.id : value.k)


            }}>
                <Pen size={20} color="#ffff" className={style.icon} /> Modifier</a>
                <a className={style.agree} onClick={() => {

                    onDelete(k , value.id !== 1 ? value.id : value.k)

                }}>  <Trash size={20} color="#ffff" className={style.icon} /> Supprimer</a></td>

        </tr></>)
}

