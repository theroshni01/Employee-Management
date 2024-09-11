import React, { useEffect, useState } from 'react'
import './postUser.css';
import  Form  from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: '',
        department: ""
    })

    const handleInputChange = (event) =>
    {
        const {name, value} = event.target;
        setFormData({
            ...formData, [name]:value,
        })
    }

    useEffect(() =>
    {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            }
            catch(error) {
                console.error("Error fetching user: ", error.message);
            }
        }

        fetchEmployee();

    },[id])

    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method : "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(formData),
            })

            const data = await response.json();
            console.log("User Updated: ", data);

            navigate('/')

        }
        catch(error) {
            console.error("Error in Updating employee : ",error.message)
        }
    }

  return (
    <div>
         <div className='center-form'>
            <h1>Edit Employee </h1><br />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text" name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange} />
                </Form.Group><br />
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="email" name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange} />
                </Form.Group><br />
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text" name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleInputChange} />
                </Form.Group><br />
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text" name="department"
                        placeholder="Enter department"
                        value={formData.department}
                        onChange={handleInputChange} />
                </Form.Group><br />

                <Button variant='primary' type='submit' className='w-100'>Edit Employee</Button>
            </Form>
        </div>
    </div>
  )
}

export default UpdateUser