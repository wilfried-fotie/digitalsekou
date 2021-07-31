import React from "react"
import { BoxSeam, EyeFill, EyeSlashFill, ImageAlt, Lock, LockFill, NodeMinus } from 'react-bootstrap-icons'
import {  useController } from "react-hook-form"

import styles from '../styles/AddSchool.module.css'



export function FieldValidate({ auto, children, name, control, type = "text", min = 4, max = 100, image = <NodeMinus size={30} color="#4a00b4" /> }) {
    
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
    formState: {touchedFields, dirtyFields}} = useController({name,control,rules:{required: true, minLength: min, maxLength: max},defaultValue:""})
    return <div className={styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type={type} placeholder={auto} {...inputProps} ref={ref}  id={name} />   </div>

    </div>
}


export function Field({ auto, children, name, type = "text", value, onChange, image = <NodeMinus size={30} color="#4a00b4" /> }) {

    return <div className={styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type={type} placeholder={auto} value={value} onChange={onChange} name={name} id={name} />   </div>

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


export function Radio({ children, name, data, onChange, image = <BoxSeam size={20} color="#4a00b4" /> }){
    return (
        <>
            
            <div className={styles.border}>
            <div>
                <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
            <div className={styles.checkbox}>

                    {data.map(e => <div key={e}> <input type="radio" name={name} id={e} defaultChecked={e == "Non" || e == "Privé"} onChange={onChange} /><label htmlFor={e}>{e}</label></div>)}
     

            </div>
            </div>
        </>
    )
}

