import React from 'react'
import './Planes.css'

import {useHistory} from 'react-router-dom'
import {TakeToken} from '../../TakeToken';
let token = TakeToken();

const Carrier =({id,name,age,type,space,owner}) =>{
    const history = useHistory();
    const routeChange =()=>{
        if(token){
            let path =`companies/${owner}/planes/${id}`;
            history.push(path);
        }
     else{
        let path =`login/`;
        history.push(path);
     }
    }
        return (
            <div onClick={routeChange} className="Plane">
                <div className="Planel">
                <h1>{name}</h1>
                <h3>Made: {age}</h3>
                {token?<a href="">read more</a>: <a href="">login to read more</a>}
                </div>
           
            </div>
        )
    
} 

export default Carrier
