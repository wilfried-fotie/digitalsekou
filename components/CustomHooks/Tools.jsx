import React from 'react'
import { EmojiDizzyFill } from 'react-bootstrap-icons'

export function Tools() {
    return (
        <div style={{ color: "red" }}>
            
           <center>  <EmojiDizzyFill size={50} color="red"/> </center><br />
            Cet Établissement existe déja!
        </div>
    )
}

export function ToolsBefore() {
    return (
        <div style={{ color: "red" }}>

            <center>  <EmojiDizzyFill size={50} color="red" /> </center><br />
            Veuillez vérifier les informations soumis!
        </div>
    )
}
 
