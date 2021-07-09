import Head from 'next/head'
import Header from './Template/Header.jsx'
import React from 'react'
import Footer from './Template/footer'
import axios from 'axios';
import "../global"
function AddSchoolPro() {

    const [store, setStore] = React.useState("")
    const [data, setData] = React.useState("")

    React.useEffect(() => {
        axios.post("/login", {
            username: "test",
            password: "test"
        }).then(res => {
            sessionStorage.setItem("token", res.data.access_token)
            setStore(res.data.access_token)

        })
            .catch(res => alert(res))


        const conf = {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        axios.get("/protected", conf).then(res => setData(res.data.username))
            .catch(res => console.log(res))




    }, [])




    return (
        <div>
            <Head>

            </Head>
            <Header value="3" />
            <main >
                <h1>The First One</h1>
                {
                    store && store != "" && store != undefined && `Logged as ${data}`}
            </main>
            <Footer />
        </div>
    )
}

export default AddSchoolPro
