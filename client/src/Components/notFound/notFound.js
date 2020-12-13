import React, { Component }  from "react";
import image from "../../images/ups.gif"
import  './notFound.css'
class Login_Register extends Component {
 
  render() {
    
    return (
        <div className="container-fluid">
        <div className="main">
            <h1 className="not-found"> Whoops!</h1>
            <h1 className="info">404 Page Not Found</h1>
            <img className="image" src={image} alt="let's go for a trip"></img>
            <h1 className="info">Nothing interesting here, go back to homepage </h1>
        </div>
        </div>
    );
  }
}

export default Login_Register;
