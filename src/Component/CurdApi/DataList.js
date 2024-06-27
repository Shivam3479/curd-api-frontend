import { useEffect, useState } from "react";
import Layout from "./Layout";
import Modal from 'react-bootstrap/Modal';
import showToastMessage from "./Toastify";

const DataList=()=>{
    const initailValues = {name:"",email:"",phone:"",message:""};
    const [formData, setFormData] = useState(initailValues);
    const [myList, setMyList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdateForm=async(id)=>{
        // alert(id);
        handleShow();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/data-list-store/${id}/edit`);
            const data = await response.json();
            setFormData({
                id: data.dataLists.id,
                name: data.dataLists.name,
                email: data.dataLists.email,
                phone: data.dataLists.phone,
                message: data.dataLists.message,
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const getApiData=async()=>{
        const dataa = await fetch("http://127.0.0.1:8000/api/data-list-store");
        const response = await dataa.json();
        // console.log(response);
        setMyList(response);
    }

    const deleteFormData=(id)=>{
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if(confirmDelete){
            fetch(`http://127.0.0.1:8000/api/data-list-store/${id}/delete`,{
                method:'DELETE'
            }).then((result)=>{
                result.json().then((response)=>{
                    console.log(response);
                    getApiData();
                    showToastMessage(response.message, "success");
                    showToastMessage(response.error, "error");
                })
            })
        }        
    }
    const changeFormHandle=(e)=>{
        const { name, value } = e.target;
        setFormData({...formData, [name]:value});
        // console.log(formValues);
    }
    const updateFormHandle=(e)=>{
        // console.log(formData.id);
        e.preventDefault();
        try{
            fetch(`http://127.0.0.1:8000/api/data-list-store/${formData.id}/update`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData),
            }).then((result)=>{
                result.json().then((response)=>{
                    handleClose();
                    showToastMessage(response?.message, "success");
                    showToastMessage(response?.error, "error");
                    getApiData();
                });                
            });            
        }catch (error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getApiData()
    }, []);
    return(<>
    <Layout title="Data List" link="create-data" linkTitle="Create Data"/>
    <div className="container">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(myList.dataLists) && myList.dataLists.map((items, index)=>{
                    const {id, name, email, phone, message} = items;
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>{message}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-info me-2" onClick={()=>handleUpdateForm(id)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteFormData(id)}>Del</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="py-3" onSubmit={updateFormHandle}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={changeFormHandle}
                        value={formData.name}  placeholder="Enter Name"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onChange={changeFormHandle}
                        value={formData.email}  placeholder="Enter Email Address"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" name="phone" onChange={changeFormHandle}
                        value={formData.phone}  placeholder="Enter Phone No."/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows="3" column="10" name="message" onChange={changeFormHandle}
                            value={formData.message}  placeholder="Enter Message"></textarea>
                    </div>
                    <div className="mb-3 text-end">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
      </Modal>
    </div>
    </>)
}
export default DataList;