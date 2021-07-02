import React, { useState } from 'react'
import styles from '../../styles/AddSchool.module.css'





function useText() {
    const [text, setText] = useState("")
    const handleText = (e) => {
        setText(e.target.value)
    }

    return [text, handleText]
}

function useChecked(initial) {
    const [text, setChecked] = useState(initial)
    const handleCheck = (e) => {
        setChecked(e.target.checked)
    }


    return [text, handleCheck]
}



function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
        const imageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setResult(e.target.result);
        });

        reader.readAsDataURL(imageFile);
    }


    return [result, uploader];
}



export default function Add({ onLogoChange }) {

    const [image, setImage] = React.useState("");
    const imageRef = React.useRef(null);
    const imageRef2 = React.useRef(null);
    const imageRef3 = React.useRef(null);


    const [result2, uploader2] = useDisplayImage();
    const [result3, uploader3] = useDisplayImage();
    const [state1, handleChange1] = useText()
    const [state2, handleChange2] = useText()
    const [state3, handleChange3] = useText()
    const [state4, handleChange4] = useText()
    const [checked, handleCheck] = useChecked(false)
    const [checked2, handleCheck2] = useChecked(false)
    const [checked3, handleCheck3] = useChecked(false)
    const [checked4, handleCheck4] = useChecked(false)
    const [checked5, handleCheck5] = useChecked(false)
    const [checked6, handleCheck6] = useChecked(false)
    const [checked7, handleCheck7] = useChecked(false)


    const change = (e) => {

        onLogoChange(e.target.files[0])
    }

    const changeText = (e) => {

        onLogoChange(e.target.value)
    }


    return (
        <div className={styles.left}>
            <center> <h2>Bienvenue !</h2> </center>
            <div className={styles.dg}>

                Image du Logo
                <input
                    type="file"
                    onChange={change}
                />
            </div>
            <div className={styles.dg}>

                Sigle de l'établissement(optionnel exp: INSAM)
                <input type="text" placeholder="Description de l'établissement"
                    name="name" id="input" />

            </div>
            <div className={styles.dg}>

                Nom Complet de l'établissement(obligatoire exp: Institut...)
                <input type="text" placeholder="Description de l'établissement" value={state2} onChange={handleChange2} name="name" id="input" />

            </div>

            <div className={styles.dg}>

                Description de l'établissement (obligatoire)

                <textarea name="desc" id="area" rows="10" value={state3} onChange={handleChange3} />

            </div>
            <div className={styles.dg}>

                Images Principaux
                <input
                    type="file"
                    multiple="multiple"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        uploader3(e);
                    }}
                />
                {result2}
            </div>
            <div className={styles.dg}>

                Slogan(optionnel)
                <input type="text" placeholder="slogan de l'établissement" name="name" value={state4} onChange={handleChange4} id="input" />

            </div>
            <div className={styles.dg}>

                où êtes vous situer ?(obligatoire)


                <div className={styles.tab}>


                    <div className={styles.ds}> <input type="checkbox" checked={checked} onChange={handleCheck} name="" id="Baf" /> <label htmlFor="Baf">Bafoussam</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked2} onChange={handleCheck2} name="" id="gola" /> <label htmlFor="gola">gola</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked3} onChange={handleCheck3} name="" id="doul" /> <label htmlFor="doul">Maroua</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked4} onChange={handleCheck4} name="" id="bouda" /> <label htmlFor="bouda">Douala</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked5} onChange={handleCheck5} name="" id="dsahng" /> <label htmlFor="dsahng">Dschang</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked6} onChange={handleCheck6} name="" id="garoue" /> <label htmlFor="garoue">Bouda</label></div>
                    <div className={styles.ds}> <input type="checkbox" checked={checked7} onChange={handleCheck7} name="" id="im" /> <label htmlFor="im">Bertoua</label></div>
                </div>
            </div>

            <div className={styles.dg}>

                IMage de couverture
                <input
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        uploader2(e);
                    }}
                />

            </div>





            <div className={styles.end}>
                <center>  <a className="btnPri">Enregistrer</a></center>

            </div>

        </div>
    )
}
