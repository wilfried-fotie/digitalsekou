import React from 'react'
import { SchoolContext} from "../../pages/addSchoolPro/[id]"
import Add from '../School/Add'


export function SiteWeb({ }) {




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


    const school = React.useContext(SchoolContext)
    const dataSchool = school.schoolData.school
    const [data, setData] = React.useState(dataSchool)


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
            <Add
                onChange={handleChange}
                onImageChange={handleImageChange}
                state={data}
                onSelectChange={handleSelectChange}
                onSelectStatusChange={handleSelectStatusChange}
                onStatusCheckedChange={handleCheckChange}
            />


        </>
    )
}