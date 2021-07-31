import React from 'react'
import { CloudArrowUp, EmojiDizzyFill } from 'react-bootstrap-icons'

export function Tools() {
    return (
        <div style={{ color: "red" }}>
            
           <center>  <EmojiDizzyFill size={50} color="red"/> </center><br />
            Cet Établissement existe déja!
        </div>
    )
}

export function ToolsBefore({children}) {
    return (
        <div style={{ color: "red" }}>

            <center>  <EmojiDizzyFill size={50} color="red" /> </center><br />
          {children}
        </div>
    )
}
 

export function SendData({ children }) {
    return (
        <div style={{ color: "green" }}>

            <center>  <CloudArrowUp size={50} color="#4a00b4" /> </center><br />
            <center style={{ color: "green" }}> {children}</center>
        </div>
    )
}
