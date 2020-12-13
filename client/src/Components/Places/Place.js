import React from 'react'
import './Places.css'

const Place =({id,name,type,city,country}) =>{
    
        return (
            <div onClick={`/${id}`}  className="Place">
                <h1>{name}</h1>
                <h3>{type}</h3>
                <h3>{city}</h3>
                <h3>{country}</h3>
            </div>
        )
    
} 

export default Place
