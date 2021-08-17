import React from "react"
import { BoxSeam, EyeFill, EyeSlashFill, ImageAlt, Lock, LockFill, NodeMinus, PencilSquare } from 'react-bootstrap-icons'
import {  Controller, useController, useForm } from "react-hook-form"
import Select from 'react-select'

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
        <div>  <input type={type} placeholder={auto} value={value} onChange={onChange} name={name} id={name} />   </div>

    </div>)
}



export function TextArea({ children, name, value, onChange }) {
    return <div>

        <div> <label htmlFor={name}>{children}</label> </div>
        <div>  <textarea rows={10} className={styles.area} value={value} onChange={onChange} name={name} id={name} />   </div>

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
        <div>  <textarea rows={size} className={styles.area}
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
    
    
export function File({ children, name, def = "", r = true, onChange, multiple = false }) {
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
                

                    {data.map(e => <div key={e}> <input type="radio" value={e} onChange={onChange} name={name} id={e} defaultChecked={e==value} onChange={onChange} /><label htmlFor={e}>{e}</label></div>)}
    


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
    def.map(e => newDef.push({ value: e.position || e.types || e, label: e.position || e.types || e}))
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields } } = useController({ name, control, rules: { required: true }, defaultValue: newDef})
    
    return <div className={r ? "dfss" : styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <Select options={options} defaultValue={newDef} isMulti={mult} {...inputProps} ref={ref} name={name}
            classNamePrefix="select" /></div>

    </div>
}

