import React from "react"
import { BoxSeam, Calendar2CheckFill, CalendarCheckFill, EyeFill, EyeSlashFill, ImageAlt, Lock, LockFill, NodeMinus, NutFill, PencilSquare } from 'react-bootstrap-icons'
import {  Controller, useController, useForm } from "react-hook-form"
import Select from 'react-select'
import ArticleEditor from "../pages/editor"

import styles from '../styles/AddSchool.module.css'



export function FieldValidate({ auto, children, name, r=true, control, type = "text", min = 3,def="", max = 100, image = <NodeMinus size={30} color="#4a00b4" /> }) {
    
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
    formState: {touchedFields, dirtyFields}} = useController({name,control,rules:{required: true, minLength: min, maxLength: max},defaultValue: def})
    return <div  className={ r? "dfss": styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type={type}  placeholder={auto} {...inputProps} ref={ref}  id={name} />   </div>

    </div>
}

export function PasswordValidate({  children, name, r = true, newp = false,req=true, control, old=false,  min = 8, max = 100, image = <NodeMinus size={30} color="#4a00b4" /> }) {

    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: req, minLength: min, maxLength: max }, defaultValue: "" })
   
    const [state, setState] = React.useState(false)
    const handleClickShowPassword = () => {
        setState(s => !s);
    };

    return (
        <div className={r ? "dfss" : styles.dg}>
            <div> <label htmlFor={name} className="dfs">   {image}{children}</label> </div>
            <div className="df">
               
                <input name={name} id={name} type={state ? "text" : "password"} placeholder= {old ? "ancien mot de passe" : newp ? "nouveau mot de passe" : "mot de passe"} className={styles.password} {...inputProps}/>
                

                    {!state ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}
               
            </div>
        </div>
    )
}

export function Field({ auto, children, r = false,name, type = "text", value, onChange, image = <NodeMinus size={30} color="#4a00b4" /> }) {

    return (<div className={r ? "dfss" : styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type={type} min={type == "date" ? new Date().toLocaleDateString().replaceAll("/","-") : null} placeholder={auto} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>)
}



export function TextArea({ children, name, value, onChange,auto }) {
    return <div>

        <div> <label htmlFor={name} className="dfs">
            <PencilSquare size={20} color="#4a00b4" />
            {children}</label> </div>
        <div className="padding">  <textarea rows={10} placeholder={auto} style={{ padding: "10px 20px 10px", fontFamily: "Montserrat" }} className={styles.area} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>
}

export function TextAreaValidate({ children,size = 10, name,min=3,max="1000",image, control,def="" }) {
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: true, minLength: min, maxLength: max }, defaultValue: def })

    return <div>

        <div> <label htmlFor={name} className="dfs">
            <PencilSquare size={20} color="#4a00b4"/>
            {children}</label> </div>
        <div>  <textarea style={{padding: "10px 20px 10px", fontFamily: "Montserrat"}} rows={size} className={styles.area}
            {...inputProps}
            ref={ref} name={name} id={name} />   </div>

    </div>
}

export function FileValidate({ children, name, multiple = false, def = "", r = true, control, edit = true }) {
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: edit } })

    return <div className={styles.dg}>
        <div className="dfs">
            <ImageAlt size={20} color="#4a00b4" />
            <label htmlFor={name}>{children}</label>
            
        </div>
        {def && <img src={def} height="50px" />}
        <div>
            <input type="file" name={name} id={name + "Data"}
                accept="image/*"
                multiple={multiple == true ? multiple : null}
                {...inputProps}
                ref={ref}
            />

        </div>
    </div>
}
    
    
export function File({ children, name, def = "",defData = null,  r = true, onChange, profil=false, multiple = false }) {
    return <div className={styles.dg}>
        <div className="dfs">
            <ImageAlt size={20} color="#4a00b4" />
            <label htmlFor={name}>{children}</label>
        </div>
        <center>  {def && (def.substring(def.lastIndexOf(".")) == ".mp4" || def.substring(def.lastIndexOf(".")) == ".MP4" ? <video src={def} alt="video" height={50} controls>La vidéo n'as pas pu se charger</video> : <img src={ def} height={30} alt="image ou vidéo en cours de chargement" />)}</center>
        {defData && <center>{<img height={30} src={defData}/>}</center>}

        <div>
            <input type="file" name={name} id={name + "Data"}
                accept={profil ? "image/*,.mp4,.MP4" : "image/*"}
                multiple={multiple == true ? multiple : null}
                onChange={onChange}
            />

        </div>
    </div>
}


export function Password({ children, name, value, onChange, image = <LockFill size={20} color="#4a00b4" />}) {

    const [state,setState] = React.useState(false)
    const handleClickShowPassword = () => {
        setState(s => !s);
    };

    return (
        <div className={styles.dg}>
            <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
            <div className="df">
                <input name={name} id={name} type={state ? "text" : "password"} placeholder="mot de passe" className={styles.password} value={value} onChange={onChange} />
                <div>

                    {!state ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}
                </div>
            </div>
        </div>
    )
}


export function Radio({ children, name, r = true, data,value, onChange, image = <BoxSeam size={20} color="#4a00b4" /> }){
    return (
        <>
            
            <div className={styles.border}>
            <div >
                    <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
                <div style={{ paddingTop: r ? "20px" : null }} className={r ? "dfss" : styles.checkbox}>
                

                    {data.map(e => <div key={e}> <input type="radio" value={e} onChange={onChange} name={name} id={e} defaultChecked={e==value}  /><label htmlFor={e}>{e}</label></div>)}
    


            </div>
            </div>
        </>
    )
}

export function RadioValidate({ children, name, r = true, control, data, image = <BoxSeam size={20} color="#4a00b4" /> }) {

    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: true}})
    return <>

        <div className={styles.border}>
            <div>
                <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
           

            <div style={{paddingTop: r? "20px" : null}} className={ r? "dfss": styles.checkbox}>
                {data.map(e => <div key={e}> <input type="radio" {...inputProps} ref={ref}  name={name} id={e} defaultChecked={e == "Non" || e == "Privé"}  /><label htmlFor={e}>{e}</label></div>)}


            </div>
        </div>
    </>
}

export function Selector({ options,r=false, mult=false, def = [],children, name, control,  image = <NodeMinus size={30} color="#4a00b4" /> }) {
    const newDef = []
  def &&  def.map(e => newDef.push({ value: e.position || e.types || e, label: e.position || e.types || e}))
    
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: true }, defaultValue: newDef})
    
    return <div className={r ? "dfss" : styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <Select options={options} defaultValue={newDef} isMulti={mult} {...inputProps} ref={ref} name={name}
            classNamePrefix="select" /></div>

    </div>
}

export function SelectoR({ options, r = false, mult = false,def=[], onChange,state, children, name,  image = <NodeMinus size={30} color="#4a00b4" /> }) {
   
 
    return <div className={r ? "dfss" : styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <Select options={options} isMulti={mult} onChange={onChange} defaultValue={def} value={state} name={name}
            classNamePrefix="select" /></div>

    </div>
}


export function Editor({ handleEdit, state, edit, r, defHeight="200px", image = <NodeMinus size={30} color="#4a00b4" />, name, children }) {
    return (
        <>

            <div >

                <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
                <div style={{ marginTop: "20px"}}>
                
                
                <ArticleEditor
                handleContent={handleEdit}
                state={state}
                edit={edit}
                height={defHeight}
                className="editor"
            />
                
                
                </div>

            </div>

            

        </>
    )
}


export function CheckBox({ children, name, dataId,p=false, r = true, state = [], onChange, image = <Calendar2CheckFill size={20} color="#4a00b4" /> }) {
    return (
        <>
            <div className={styles.border}>
                <div>
                    <label htmlFor={name} className="dfs" style={{color: "#000"}}> {image} {children}</label> </div>
                <div style={{ paddingTop: r ? "20px" : null }} className={r ? "dfss" : styles.checkbox}>

                        {state.map((e, k) => <div key={k} className={p ? "pad" : null}> <input type="checkbox" checked={e.value} value={e.value} onChange={onChange} name={name[k]} data-id={dataId} id={e.label}/><label htmlFor={e.label}>{e.label}</label></div>)}


                </div>
            </div>
        </>
    )
}