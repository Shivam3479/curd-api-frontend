import { useEffect, useState } from "react";
const GetApiLocal = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/form-data-store')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Ensure data is an array
                setMyData(data);
                //console.log(Array.isArray(data)); // Check if data is an array
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (<>
        <div className="container">
            <h3>Table Api Local</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(myData.formDataStore) && myData.formDataStore.map((item, index) => {
                        const { name, email, phone, file } = item;
                        return (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>
                                    <img src={`http://127.0.0.1:8000/data/${file}`} alt="img"/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </>)
}
export default GetApiLocal;