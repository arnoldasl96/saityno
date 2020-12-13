import React, { Component } from 'react'
import '../App.css'

export default class Home extends Component {
    componentDidMount(){
        document.body.className = 'homepage';
        document.getElementById('navBg').style.display="flex";
        document.getElementById('footer').style.display="flex";
    }
    componentWillUnmount(){
        document.body.className = '';
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="home">
               <h1>home</h1>
            </div>
            </div>
            
        )
    }
}
