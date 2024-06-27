import { useState } from "react";

const PostApiLocal = () => {
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [file, SetFile] = useState(null);
    const [sucessMsg, setSucessMsg] = useState();
    const fileHandle =(e)=>{
        SetFile(e.target.files[0]);
        console.log(e.target.files[0]);
        let files =e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=(e)=>{
            console.log("img data", e.target.result);
        }
    }
    function saveData() {
        // console.log(name, email, number);
        // const formData={files:e.target.result};
        fetch("http://127.0.0.1:8000/api/data-store", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone})
        }).then((result) => {
            // console.log(result);
            result.json().then((resp)=>{
                console.log(resp);
                setSucessMsg(resp.message);
            });
        });
    }

    return (<>
        <form>
            <div className="container">
            {sucessMsg && <div className="alert alert-success">{sucessMsg}</div>}
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Name</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={(e) => (SetName(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Email</label>
                    <input type="email" className="form-control" name="email" value={email}
                        onChange={(e) => (SetEmail(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Phone</label>
                    <input type="text" className="form-control" name="phone" value={phone}
                        onChange={(e) => (SetPhone(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Image</label>
                    <input type="file" className="form-control" name="file"
                        onChange={fileHandle} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="button" onClick={saveData}>Submit</button>
                </div>
            </div>
        </form>
    </>)
}
export default PostApiLocal;