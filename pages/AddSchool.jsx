import Head from 'next/head'
import styles from '../styles/AddSchool.module.css'
import Header from './Template/Header.jsx'
import React from 'react'
import { useState } from 'react'
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






function Entreprises() {


    const [image, setImage] = useState("");
    const [result, uploader] = useDisplayImage();





    const app = {
        logo: "",
        cible: "",
        tel: "",
        name: "",
        description: "",
        profil: "",
        position: [],

    }

    const [data, setData] = useState(app)


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
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

        if (e.target.files && e.target.files[0]) {


            //     let reader = new FileReader();
            //     reader.onload = (ev) => {
            //         setData(s => {
            //             return {
            //                 ...s,
            //                 name: event.target.result
            //             }
            //         });
            //     };
            //     reader.readAsDataURL(e.target.files[0]);
            // }

            setData(s => {
                return {
                    ...s,
                    [name]: URL.createObjectURL(e.target.files[0])
                }
            });
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

                        <img src={data} alt="LOGO" />
                    </p>





                    <div className={styles.gen} id="start">
                        <Add
                            onChange={handleChange}
                            onImageChange={handleImageChange}
                            state={data}
                            onSelectChange={handleSelectChange}


                        />
                        <div className={styles.right}>
                            <Preview data={data}

                            />
                        </div>
                    </div>

                </div>

            </main>
        </>
    )
}

export default Entreprises
