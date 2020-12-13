import "./style.scss";
import React,{useState} from "react";
import loginImg from "../../../images/login.svg";
import {withRouter} from 'react-router-dom'
import classname from "classnames"
import {RegisterUser} from "../../../Services/userService"
function Register(props)  {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [usernameErr, setUserNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [repasswordErr, setRepasswordErr] = useState('')
  const [registerErr, setRegisterErr] = useState('')

  const handleChange = (e, name) =>{
    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    setType("user")
    switch (name) {
      case 'name':
        setName(user.name)
        user.name.length < 6 ? setUserNameErr('Name must be at least 6 characters'): setUserNameErr('')
        break;
        case 'email':
          setEmail(user.email)
          !emailRegEx.test(user.email) ? setEmailErr('Email is not valid or too short'): setEmailErr('')
          break;
        case 'password':
        setPassword(user.password)
        user.password.length < 6 ? setPasswordErr('Password must be at least 6 characters'): setPasswordErr('')
        user.rePassword !== password? setRepasswordErr('Passwords must match'): setRepasswordErr('')
        break;
        case 'rePassword':
        setRepassword(user.rePassword)
        user.rePassword !== password? setRepasswordErr('Passwords must match'): setRepasswordErr('')
        break;
      default:
        break;
    }
  }

  const fetchData = async () => {
  
    return (await RegisterUser({name, email,password,type}))
  }
  
  const handleRegister = (e) => {
    e.preventDefault();
    if(name && email && password && repassword && !usernameErr && !emailErr && !passwordErr && !repasswordErr){
      fetchData().then(() => { 
        props.history.push('/')
        window.location.reload(false);
      }).catch((err) =>{setRegisterErr(err.response.data.Message);})
    }
  }

    return (
      <form onSubmit={handleRegister}>
          <div className="base-container" ref={props.containerRef}>
                  <div className="header">Register</div>
                  <div className="content">
                    <div className="image">
                      <img src={loginImg} alt="registration" />
                    </div>
                    <div className="form">
                      <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input className = {classname("input", {'is-invalid':usernameErr , 'is-valid': !usernameErr && name.length})} 
                        type="text" name="name" placeholder="username"  minLength="6" required onChange={(e) => handleChange(e, 'name')}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className = {classname("input", {'is-invalid':emailErr , 'is-valid': !emailErr && email.length})} 
                        type="email" name="email" placeholder="email" minLength="6" required onChange={(e) => handleChange(e, 'email')} />
                        {emailErr && <small className = "text-danger">{emailErr}</small>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className = {classname("input", {'is-invalid':passwordErr , 'is-valid': !passwordErr && password.length})} 
                        type="password" name="password" placeholder="password" minLength="6" required onChange={(e) => handleChange(e, 'password')}/>
                        {passwordErr && <small className = "text-danger">{passwordErr}</small>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="re-password">Re-Password</label>
                        <input className = {classname("input", {'is-invalid':repasswordErr , 'is-valid': !repasswordErr && repassword.length})} 
                        type="password" name="repassword" placeholder="repassword" minLength="6" required onChange={(e) => handleChange(e, 'rePassword')} />
                        {repasswordErr && <small className = "text-danger">{repasswordErr}</small>}
                      </div>
                    </div>
                    {registerErr && <small id = "registerErr" className = "text-danger">{registerErr}  <br/>
            <br/></small>}
                  </div>
                  <div className="footer">
                    <button type="submit" className="btn">
                      Register
                    </button>
                  </div>
                </div>
      </form>
     
    );
}
export default withRouter(Register)