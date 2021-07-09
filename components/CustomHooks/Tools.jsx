import React, { useState } from 'react'


export function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
        const imageFile = e;

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setResult(e.target.result);
        });

        reader.readAsDataURL(imageFile);
    }


    return [result, uploader];
}




export function useText() {
    const [text, setText] = useState("")
    const handleText = (e) => {
        setText(e)
    }

    return [text, handleText]
}

export function useChecked(initial) {
    const [text, setChecked] = useState(initial)
    const handleCheck = (e) => {
        setChecked(e.target.checked)
    }


    return [text, handleCheck]
}
