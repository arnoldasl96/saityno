import React, { Component }  from "react";
import "./login.scss";
import Login from "../Components/Forms/Login/login"
import  Register from "../Components/Forms/Login/register";
import { BsFillHouseFill } from "react-icons/bs";
class Login_Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount() {
    document.getElementById('navBg').style.display="none";
    document.getElementById('footer').style.display="none";
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
        <div className="container-fluid">
        <div className="homebutton" >
            <a href="/">
            <BsFillHouseFill className="btnh" />
            </a>
        </div>
        
        <div className="loginform">
            <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
                {isLogginActive && (
                <Login login={this.props.login} error={this.props.error} containerRef={ref => (this.current = ref)} />
                )}
                {!isLogginActive && (
                <Register containerRef={ref => (this.current = ref)} />
                )}
            </div>
            <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={ref => (this.rightSide = ref)}
                onClick={this.changeState.bind(this)}
            />
            </div>
        </div>
        </div>
        
       
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default Login_Register;
