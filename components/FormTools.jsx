import React from "react"
import { EyeFill, EyeSlashFill, ImageAlt, NodeMinus } from 'react-bootstrap-icons'
import {  useController } from "react-hook-form"

import styles from '../styles/AddSchool.module.css'



export function Field({ auto, children, name, control, type = "text", min = 4, max = 100, image = <NodeMinus size={30} color="#4a00b4" /> }) {
    
    const { field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
    formState: {touchedFields, dirtyFields}} = useController({name,control,rules:{required: true, minLength: min, maxLength: max},defaultValue:""})
    return <div className={styles.dg}>

        <div> <label htmlFor={name} className="dfs"> {image} {children}</label> </div>
        <div>  <input type={type} placeholder={auto} {...inputProps} ref={ref}  id={name} />   </div>

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


export function Password({ children, name }) {


    const [value, setValue] = React.useState({
        showPassword: false,
        password: ""
    });

    const handleChange = (event) => {
        setValue({ ...value, password: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValue({ ...value, showPassword: !value.showPassword });
    };

    return (
        <div className={styles.dg}>
            <label htmlFor={name}>{children}</label>
            <div className="df">
                <input id={name} type={value.showPassword ? "text" : "password"} placeholder="mot de passe" className={styles.password} value={value.password} onChange={handleChange} />
                <div>

                    {!value.showPassword ? <EyeSlashFill size={20} color="#4a00b4" onClick={handleClickShowPassword} /> : <EyeFill size={20} color="#4a00b4" onClick={handleClickShowPassword} />}
                </div>
            </div>
        </div>
    )
}

