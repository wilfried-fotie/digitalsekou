import React from 'react'
import axios from 'axios'
import "../global"
import { File } from '../components/FormTools';
import { useForm } from 'react-hook-form';
import { config } from '../components/imageConfig'
import S3 from 'react-aws-s3';



// jes usi au sol

function Upload() {

const ReactS3Client = new S3(config);


    const [state,setState] = React.useState({
        data: "",
        uri: ""

    });
    const handleImageChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        console.log((e.target.files[0].name).split(".", -1)[1])
        reader.onload = (ev) => {
            setState(s => ({
                ...s,
                uri: e.target.files[0],
                data: ev.target.result}))
        };
    
        // setState(s => {
        //     return {
        //         ...s,
        //         data: URL.createObjectURL(e.target.files[0])
        //     }
        // });

    } 
    
const handleUploadImage = (ev) => {
    ev.preventDefault();
   
    const formData = new FormData();

    formData.append("file", state.uri);


ReactS3Client
    .uploadFile(state.uri, "01-logo-profil")
    .then(data => console.log("Upload fine"))
    .catch(err => console.log("error" + err))
}
    return (
        <div>
            <form onSubmit={handleUploadImage}>
                <File name="logo" onChange={handleImageChange}>Importer Le Logo</File>
          
                <br />

             
               
                <button type="submit" className="btnPri">Sub</button> 
                <img src={state.data ||  "https://digitalsekou.s3.us-east-2.amazonaws.com/01-logo-profil.jpeg"} alt="img" />
               
            </form>
        </div>
    )
}

export default Upload




/*function Upload() {
    const options = [{ value: "zizi", label: "zozo" }, { value: "zizi", label: "zozo" }, { value: "zizi", label: "zozo" },]
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } } = useForm({ mode: "onTouched" })
    const [data, setData] = React.useState()
    const onSubmit = (data) => {
        setData(data)
     
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <Selector name="position" control={control} options={options}>Je suis au sol et rien que du sall</Selector>
                <button type="submit" className="btnPri">Sub</button>
{JSON.stringify(data)}
            </form>
        </div>
    )
}*/

