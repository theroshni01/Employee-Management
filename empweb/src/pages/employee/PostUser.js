import React, { useState } from 'react'
import './postUser.css'
import  Form  from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const PostUser = () => {

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

    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        console.log(formData);
        try{
            const responce = await fetch("http://localhost:8080/api/employee", {
                method :  "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(formData)
            });

            const data = await responce.json();
            console.log("Employee Created: ", data);
            navigate("/")
        }
        catch(error)
        {
            console.log("Error Creating Employee: ", error.message)
        }
    }

  return (
    <div>
        <div className='center-form'>
            <h1>Post New Employee </h1><br />
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

                <Button variant='primary' type='submit' className='w-100'>Post Employee</Button>
            </Form>
        </div>
    </div>
  )
}

export default PostUser