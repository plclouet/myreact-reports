

import React, {useState} from 'react';
import axios from 'axios';
import { API_URL } from "../http";
import './LoginForm.css';

import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        message: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
    
// Request API.
axios
  .post(API_URL+'/auth/local', {
    identifier: state.email,
    password: state.password,
  })
  .then(response => {
     
           // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    localStorage.setItem("JWT_REPORTS",response.data.jwt);
     redirectToHome();
    // props.showError(null);
    
  })

  .catch(error => {
    setState(prevState => ({
        ...prevState,
        'message' : 'Mauvais identifiants'
    }))
    console.log('An error occurred:', error.response);
  });

       /*  return new Promise((resolve, reject) => {
            axios.post("http://localhost:1337/auth/local", payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("JWT_REPORTS",response.data.jwt);
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }) */
       
    }
     const redirectToHome = () => {
        //props.updateTitle('Home')
        props.history.push('/');
        window.location.reload();
    } 
    //const redirectToRegister = () => {
        //props.history.push('/register'); 
       // props.updateTitle('Register');
   // }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center p-2">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">Votre email professionnel.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
         <div className="alert alert-success mt-2" style={{display: state.message ? 'block' : 'none' }} role="alert">
                {state.message}
            </div>
            {/* <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>  */}
        </div>
    )
}

export default withRouter(LoginForm);