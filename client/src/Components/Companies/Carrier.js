import React from 'react'
import './Carriers.css'
import {useHistory} from 'react-router-dom'
import {TakeToken} from '../../TakeToken';
let token = TakeToken();
const Carrier =({id,name,age}) =>{

    const history = useHistory();
    const routeChange =()=>{
        if(token){
            let path =`companies/${id}`;
            history.push(path);
        }
     else{
        let path =`login/`;
        history.push(path);
     }
    }
        return (
            <div onClick={routeChange} className="Carrier">
                <h1>{name}</h1>
                <h3>Founded: {age}</h3>
                {token?<a href="">read more</a>: <a href="">login to read more</a>}
            </div>
        )
    
} 

export default Carrier
