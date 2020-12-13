import React , {useState} from "react";
import loginImg from "../../../images/login.svg";
import {LoginUser} from "../../../Services/userService"
import classname from "classnames"
import { withRouter } from 'react-router-dom';
import "./style.scss";
function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [loginErr, setLoginErr] = useState('')

  const handleChange = (e, name) =>{
    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    switch (name) {
      case "email":
        setEmail(user.email)
            !emailRegEx.test(user.email) ? setEmailErr('Email is not valid or too short'): setEmailErr('')
            break;
        case 'password':
          setPassword(user.password)
          user.password.length < 6 ? setPasswordErr('Password must be at least 6 characters'): setPasswordErr('')
          break;
      default:
        break;
    }
  }
  const fetchData = async () => {
    return (await LoginUser({email, password}))
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    if(email &&  password &&  !emailErr && !passwordErr ){
      fetchData().then((data) =>{
         localStorage.setItem('token',data.data.accessToken)}).then(() => {
         props.history.push('/')
         window.location.reload(false);
      }).catch((err) =>{
        setLoginErr(err);
      })
    }
  }
    return (
      <form onSubmit={handleLogin} >
        <div className="base-container" ref={props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="example@email.com"
              className = {classname("input", {'is-invalid':emailErr , 'is-valid': !emailErr && email.length})}  minLength="6" required onChange={(e) => handleChange(e, 'email')}/>
             {emailErr && <small className = "text-danger">{emailErr}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" required className = {classname("input", {'is-invalid':passwordErr , 'is-valid': !passwordErr && password.length})} 
              placeholder="Password" minLength="6" onChange={(e) => handleChange(e, 'password')} />
              {passwordErr && <small className = "text-danger">{passwordErr}</small>}
            </div>
          </div>
        </div>
        {loginErr && <small id = "registerErr" className = "text-danger">{loginErr}<br/>
    <br/></small>}
        <div className="footer">
          <button  type="submit" className="btn">
            Login
          </button>
        </div>
      </div>
      </form>
      
    );
}
export default withRouter(Login);