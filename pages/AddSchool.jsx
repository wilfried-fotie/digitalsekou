import Head from 'next/head'
import styles from '../styles/AddSchool.module.css'
import Header from './Template/Header.jsx'
import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import Add from '../components/School/Add'
import Preview from '../components/School/Preview'





function useDisplayImage() {
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



function useText() {
    const [text, setText] = useState("")
    const handleText = (e) => {
        setText(e)
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






function AddSchool() {


    const app = {
        logo: "",
        logoName: "",
        logoData: "",
        sigle: "",
        tel: "",
        name: "",
        description: "",
        password: "",
        status: "Privé",
        type: [],
        multiple: "Non",
        outro: "...",
        profil: "",
        profilName: "",
        profilData: "",
        position: [],
       

    }

    const [data, setData] = useState(app)


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        name == "sigle" ? value.toUpperCase() : value
        setData(s => {
            return {
                ...s,
                [name]: value
            }
        }
        )
    }
    const handleCheckChange = (e) => {
        const name = e.target.name
        console.log(e.target.value)
        const value = e.target.id
        setData(s => {
            return {
                ...s,
                [name]: value
            }
        }
        )
    }

    const handleImageChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        if (e.target.files && e.target.files[0]) {

            
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
                reader.onload = (ev) => {
                    setData(s => {
                        return {
                            ...s,
                            [name]: ev.target.result,
                            [id]: e.target.files[0],
                            [name + "Name"]: e.target.files[0].name
                            

                        }
                    });
                };
                
            }

    }
    const handleSelectChange = (e) => {
        
        setData(s => {
            return {
                ...s,
                position: [...e]
            }
        }
        )
    }
    const handleSelectStatusChange = (e) => {

        setData(s => {
            return {
                ...s,
                type: s.multiple == "Oui" ? [...e] : [e]
            }
        }
        )
    }
   


    return (
        <>
            <Head>

            </Head>
            <Header value="3" />
            <main className={styles.main}>
                <div className={styles.lending}>

                    <div className={styles.pad}> <center><h1>Créer gratuitement le site web de votre établissement</h1></center>
                    </div>
                    <p className={styles.p}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.

                    </p>





                    <div className={styles.gen} id="start">
                        <Add
                            onChange={handleChange}
                            onImageChange={handleImageChange}
                            state={data}
                            onSelectChange={handleSelectChange}
                            onSelectStatusChange={handleSelectStatusChange}
                            onStatusCheckedChange={handleCheckChange}

                        />
                        <div className={styles.right}>
                            <Preview
                                data={data}
                               

                            />
                        </div>
                    </div>

                </div>

            </main>
        </>
    )
}

export default AddSchool
