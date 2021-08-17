import React from 'react'
import axios from 'axios'
import "../global"
import { File, Selector, SelectorValid } from '../components/FormTools';
import { useForm } from 'react-hook-form';

// function Upload() {
//    

//     const [state,setState] = React.useState({
//         data: "",
//         uri: ""

//     });
//     const handleImageChange = (e) => {
//         let reader = new FileReader();
//         reader.readAsDataURL(e.target.files[0])
//         console.log((e.target.files[0].name).split(".", -1)[1])
//         reader.onload = (ev) => {
//             setState(s => ({
//                 ...s,
//                 uri: e.target.files[0],
//                 data: ev.target.result}))
//         };
    
//         // setState(s => {
//         //     return {
//         //         ...s,
//         //         data: URL.createObjectURL(e.target.files[0])
//         //     }
//         // });

//     } 
    
// const handleUploadImage = (ev) => {
//     ev.preventDefault();
   
//     const formData = new FormData();

//     formData.append("file", state.uri);



//     axios
//         .post("/upload", formData)
//         .then(res => console.log(res))
//         .catch(err => console.warn(err));
// }
//     return (
//         <div>
//             <form onSubmit={handleUploadImage}>
//                 <File name="logo" onChange={handleImageChange}>Importer Le Logo</File>
          
//                 <br />

//                 <SelectorValid opt={ options }/>
//                 <div>
//                     <button type="submit" className="btnPri">Upload</button>
//                 </div>
//                 <img src={state.data} alt="img" />
//             </form>
//         </div>
//     )
// }

// export default Upload




function Upload() {
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
}

export default Upload
