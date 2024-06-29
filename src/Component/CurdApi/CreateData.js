import { useState } from "react";
import showToastMessage from "./Toastify";
import Layout from "./Layout";

const CreateData=()=>{
    const initialValues = {name:"",email:"",phone:"",message:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [image, setImage] = useState(null);

    const changeFormHandle=(e)=>{
        const { name, value } = e.target;        
            setFormValues({...formValues, [name]:value});
            console.log(formValues);
    }
    const changeFileHandle=(e)=>{
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    const submitFormHandle=(e)=>{
        e.preventDefault();
        PostApiFormData();        
    }
    const PostApiFormData=async()=>{
        // const formData = formValues();
        //formData.append('file', image.file);
        const Data = new FormData();
        Data.append('name', formValues.name);
        Data.append('email', formValues.email);
        Data.append('phone', formValues.phone);
        Data.append('message', formValues.message);
        Data.append('file', image);
        console.log(Data);
        await fetch("http://127.0.0.1:8000/api/data-list-store",{
            method:"POST",            
            body: Data
        }).then((data)=>{
            data.json().then((response)=>{
                console.log(response);
                setFormValues(initialValues);
                setImage("");
                showToastMessage(response?.message, "success");
                showToastMessage(response?.error, "error");
            })
        });
    }    
    return(<>
        <Layout title="Create Data List" link="/" linkTitle="View Data"/>
        <div className="container">
            <form className="py-3" onSubmit={submitFormHandle}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={changeFormHandle}
                        value={formValues.name} placeholder="Enter Name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={changeFormHandle}
                        value={formValues.email} placeholder="Enter Email Address"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" onChange={changeFormHandle}
                        value={formValues.phone} placeholder="Enter Phone No."/>
                </div>                
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="3" column="10" name="message" onChange={changeFormHandle}
                        value={formValues.message} placeholder="Enter Message"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Document</label>
                    <input type="file" className="form-control" name="file" onChange={changeFileHandle}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>        
    </>)
}
export default CreateData;