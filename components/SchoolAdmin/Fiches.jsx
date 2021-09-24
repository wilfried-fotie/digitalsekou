import React from 'react'
import { AlignMiddle, ArrowUpSquareFill, Back, Bookmark, BoxArrowInDown, BoxArrowUp, Briefcase, Cash, CashCoin, CloudArrowUpFill, DoorClosed, GeoAltFill, KanbanFill, Pen, Pencil, Trash } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import style from '../../styles/sudo.module.css'
import styles from '../../styles/startpub.module.css'
import { SchoolContext, useModal } from '../../pages/addSchoolPro/[id]'
import CustomModal from '../customModal'
import { Editor, Field, FieldValidate, Selector, SelectoR,  TextAreaValidate } from '../FormTools'
import "../../global"
import axios from "axios"
import FineModal from '../fineModal'
import ModalEditor from '../modalEditor'
import draftToHtml from 'draftjs-to-html'
import draftjsToHtml from 'draftjs-to-html'
import { Markup } from 'interweave';





export function Home() {
    const [visbility3, v3] = useModal(false)
    const position = React.useRef(null)
    const context = React.useContext(SchoolContext)
    let spe = context.data.spe
    let school = context.data.schoolData.school
    const data = React.useContext(SchoolContext).data.schoolData.school
    const types = React.useContext(SchoolContext).data.types
    let that = (data.multiple == "Non" && types.types[0].types == "Supérieur") ? "Spécialité" : (data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) ? "Spécialité ou Classe" : "Classe"



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
            <a className="btnPri" onClick={!school.pro ? handleAlert : handleClick } style={{ marginRight: "20px" }}>Ajouter Une {that}</a>
        </div>
       
            <div className={styles.right}>
                <center> <Tab value={spe} spe={true} dispacth={dispacth2} data={data} types={types}  state={spe} /> </center>


            </div>
            
    
        {visbility3 && <ModalEditor onModalChange={v3} component={<AddSpeciality v={v3} dispacth={dispacth2} />} />}


    </>)
}




export function AddSpeciality({dispacth,v}) {
    const [err, setErr] = React.useState()
    const [error, setError] = React.useState()
    const [fine, setFine] = React.useState()
    const [da, setDa] = React.useState()
    const [outro, setOutro] = React.useState({outro: ""})
   
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched" })
    const [loader, setLoader] = React.useState(false)
    const data = React.useContext(SchoolContext).data.schoolData.school
    const types = React.useContext(SchoolContext).data.types
    let that = (data.multiple == "Non" && types.types[0].types == "Supérieur") ? "Spécialité" : (data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) ? "Spécialité ou Classe" : "Classe"
const state = data
    const options = types.types.map(e => ({label: e.types,value: e.types}))
    const schoolData = React.useContext(SchoolContext).data
   
    const handleEditChange = (content) => {
        setOutro(s => ({
            ...s,
            outro: content,
            articleUpdated: true
        }));
    }

    const onSubmit = React.useCallback(
       
        async (data) => {
            setError(true)
            if ((state.multiple == "Oui" && isValid && da && da[0].value && draftToHtml(outro.outro).length > 50) || (state.multiple == "Non" && isValid && draftToHtml(outro.outro).length > 50 )  ) {
                setLoader(true)
                const dataToSend = { name: data.name, who: state.multiple == "Non" ? types.types[0].types : da && da[0].value, price: data.price, description: draftToHtml(outro.outro), schoolId: schoolData.schoolData.school.id }
              
              
                await axios.post('/add-speciality', dataToSend)
                    .then(res => {
                        setErr()
                        setFine(`Cette ${that} a été  ajouter avec succes!`)
                        dispacth({ type: "ADD", name: "spe", data: res.data })
                        v(false)
                        setLoader(false)

                    })
                    .catch(res => {
                        setFine()
                        setErr(`Cette ${that} existe déja`)
                        setLoader(false)
                    })
                  

            }
        })
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

            <center>    {err && isSubmitted && !isSubmitting && isValid && <div className="error">
                    {err}
                </div>}
                {fine && isSubmitted && !isSubmitting && isValid && <div className="fine">
                        {fine}
                </div>}
</center>
           
                <FieldValidate name="name" r={false} image={<Back color="#4a00b4" size="20px" />} auto="Entrez le nom" control={control} >Nom de la {that}</FieldValidate>
                {errors.name && errors.name.type === "required" && (
                    <span className="error">Ce champ est obligatoire</span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                    <span className="error"> Ce champ doit faire au moiuns trois caracteres</span>
                )}

                <FieldValidate name="price" r={false} type="number" image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le prix" control={control} >Prix  de la {that}</FieldValidate>
                {errors.price && errors.price.type === "required" && (
                    <span className="error">Le prix de la {that} est obligatoire</span>
                )}
                {errors.price && errors.price.type === "minLength" && (
                    <span className="error"> Ce champ doit faire au moins trois caracteres</span>
                )}


                {data.multiple == "Oui" && <>

                    <SelectoR state={da} onChange={(e)=> setDa([e])} name="choise" r={false} image={<BoxArrowInDown color="#4a00b4" size="20px" />} options={options}>Elle quoi est-elle associer</SelectoR>

                    <span className="error">

                        {(error && !da ) ? "Ce Champ est réquis" : null}
                    </span>
                  
</>
                }

                <Editor name="outro" r={false} state={draftToHtml(outro.outro)} handleEdit={handleEditChange} edit={true}>

                    Ajouter une description ou une pétite orientation à cette {that}
                </Editor>
                <span className="error">

                    {(error && (outro.outro == "" || draftToHtml(outro.outro) == "")) ? "Ce Champ est réquis" : null}
                    {(error && (draftToHtml(outro.outro).length < 50)) ? "Ce Champ est doit faire au moins 50 caractères" : null}
                </span>
               
             

                
              
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
    let val = k !== undefined ? k : state[id] && state[id].id

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
    const [error, setError] = React.useState()

    const [fine, setFine] = React.useState("")
    const [loader, setLoader] = React.useState(false)
    const data = React.useContext(SchoolContext).data.schoolData.school
 const data2 = data
    const types = React.useContext(SchoolContext).data.types
    let that = (data.multiple == "Non" && types.types[0].types == "Supérieur") ? "Spécialité" : (data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) ? "Spécialité ou Classe" : "Classe"
    const [outro, setOutro] = React.useState({ outro: state[id].description })
    const [da, setDa] = React.useState([{ label: state[id].who, value: state[id].who }])



    const handleEditChange = (content) => {
        setOutro(s => ({
            ...s,
            outro: content,
            articleUpdated: true
        }));
    }

   
    let val = k !== undefined ? k : state[id].k
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched", defaultValues: { name: state[id].name, price: state[id].price || state[id].prix } })
    let Token = sessionStorage.getItem("schoolToken")
    const options = types.types.map(e => ({ label: e.types, value: e.types }))

   
       const onSubmit =  async (data) => {
            if ((data2.multiple == "Non" && (draftToHtml(outro.outro).length > 50 || outro.outro.length > 50) && data.price && data.name) || (data2.multiple == "Oui" && (draftToHtml(outro.outro).length > 50 || outro.outro.length > 50) && data.price && data.name && da[0].value)) {

                setLoader(true)
                const who = data2.multiple == "Non" ? types.types[0].types : da[0].value
                console.log(who)
                await axios.put(`/speciality/${val}`, { ...data, who: who, description: draftToHtml(outro.outro) || outro.outro },
                    {
                        headers: {
                            Authorization: "Bearer " + Token
                        }

                    }
                )
                    .then(() => {
                        setErr("")
                        setFine("MIS A JOUR réussi")
                        dispacth({ type: "UPDATE", name: "spe", id: id, data: { ...data, id: val, who: who, description: draftToHtml(outro.outro) || outro.outro } })
                        v(false)
                    }
                    )
                    .catch((e) => {

                        setFine("")
                        setErr("Erreur lors de la mis à jour ...")

                    }
                    );
            }
        
    };
                
            
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
                                <span className="error">Ce champ est obligatoire</span>
                            )}
                            {errors.name && errors.name.type === "minLength" && (
                                <span className="error"> ce champ doit faire au moins trois caracteres</span>
                            )}
          
        
         
                            {spe && <FieldValidate name="price" type="number" r={false} max="1000000000000" image={<CashCoin color="#4a00b4" size="20px" />} auto="Entrez le montant de la spécialité" control={control} >Prix de la spécialité</FieldValidate>
                            }


                    {data2.multiple == "Oui" && <>

                        <SelectoR def={da} state={da} onChange={(e) => setDa([e])} name="choise" r={false} image={<BoxArrowInDown color="#4a00b4" size="20px" />} options={options}>Elle quoi est-elle associer</SelectoR>

                        <span className="error">

                            {(error && !da) ? "Ce Champ est réquis" : null}
                        </span>

                    </>
                    }

                    <Editor name="outro" r={false} state={draftToHtml(outro.outro) || outro.outro} handleEdit={handleEditChange} edit={true}>

                        Ajouter une description ou une pétite orientation à cette {that}
                    </Editor>
                    <span className="error">

                        {(error && (outro.outro == "" || draftToHtml(outro.outro) == "")) ? "Ce Champ est réquis" : null}
                        {(error && (draftToHtml(outro.outro).length < 50)) ? "Ce Champ est doit faire au moins 50 caractères" : null}
                    </span>


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

        
      
     
            export function Tab({ value, spe = true, pre = true, dispacth, state, dispacth2,data,types }) {

                const [visbility3, v3] = useModal(false)
                const [visbility, v] = useModal(false)
                const [getIdForDel, setGetIdForDel] = React.useState()
                const [getIdForMod, setGetIdForMod] = React.useState()
                const [getkForDel, setGetkForDel] = React.useState()
                const [getkForMod, setGetkForMod] = React.useState()

                
                let that = (data.multiple == "Non" && types.types[0].types == "Supérieur") ? "Spécialité" : (data.multiple == "Oui" && types.types.map(e => e.types == "Supérieur").includes(true)) ? "Spécialité ou Classe" : "Classe"


                
                

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
                        <table >
                         
                            <tbody>

                             
                                {value.length == 0 && pre && <center><h1>Aucune {that} Créeé</h1></center>}

                                
                                {value.map((e, f) => {
                       
                                    return <Tr key={f} spe={spe} k={f} pre={pre} value2={value} value={e} onDelete={handleClick} onEdit={handleClick2} />
                                }
                                )}
                            </tbody>
              


                        </table>
                        {visbility3 && <CustomModal onModalChange={v3} component={<Delete v={v3} id={getIdForDel} k={getkForDel} spe={spe} dispacth={dispacth} state={state} dispacth2={dispacth2} />} />}
                        {visbility && <ModalEditor onModalChange={v} component={<Edit v={v} k={getkForMod} id={getIdForMod} spe={spe} dispacth={dispacth} state={state} />} />}
                    </>
                )
            }
        
        



            export function Tr({ k, value, value2, spe, onDelete, onEdit, pre }) {

const [visbility, v] = useModal(false)

                const handleClick = () => {
                    v(true)
                }

                return (<>

                    <tr>
                        {pre && <td>{k + 1}</td>}
                        <td>{value.name}</td>
                       
                        {spe && <td >{value2[k].prix || value.price} FRCFA</td>}
                        {spe && !pre && <td ><div> <a className="btnSecondary dfss" onClick={handleClick} style={{width: "60%"}} > <CloudArrowUpFill size={20} color="#4a00b4" />En savoir plus</a></div></td>}
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

                    </tr>
                    {visbility && <ModalEditor onModalChange={v} component={<View id={k} value={value} value2={value2}/>}/>}
                </>)
            }


export function View({id,value, value2 }) {
    return (
        <>
            
            <center><b className="h2"> {value.name} </b> </center>
            <p className="padding">Prix: {value2[id].prix || value.price} Frcfa</p>
            <div className="padding "><Markup content={value2[id].description || value.description} /></div>
            

        </>
    )
}