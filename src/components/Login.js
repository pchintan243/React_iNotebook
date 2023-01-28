import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Logged in Succesfull", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        // Add value in your notes
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} id="password" name="password" autoComplete='on' onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login