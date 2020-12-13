import React,{useState,useEffect} from 'react'
import * as Places from '../../../../Services/PlacesServices'
import {GetCompanies} from '../../../../Services/CompaniesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import {useHistory} from 'react-router-dom'

function PlacesEdit({match},props) {
    const [Place, setPlace] = useState('')
    const [Companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)
    
    const history = useHistory();
    useEffect(() => {
        Places.GetPlace(match.params.id,localStorage.getItem('token')).then((res)=>{
           setPlace(res.data);
        }).then(
            GetCompanies().then((res)=>{setCompanies(res.data)})
        ).then(setLoading(false))
    }, [])


    const handleSubmit=()=>{
     Places.UpdatePlace(match.params.id,Place,localStorage.getItem('token')).then(()=>{
        let path =`/dashboard`;
        history.push(path);
        window.location.reload(false);
     })
    }

    return (
        <div className="container-fluid">
            <h1>Edit Place</h1>
          {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
             {!loading &&
                <form >
                    <div className="form-group">
                        <label htmlFor="PlaceName">Name</label>
                        <input className="form-control" type="text" name="PlaceName" value={Place.name} 
                        onChange={(e) => setPlace({name:e.target.value, age:Place.age, type:Place.type,localCode:Place.localCode,city:Place.city,country:Place.country}) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Type">Type</label>
                        <input className="form-control" type="text" name="Type" value={Place.type} 
                        onChange={(e) => setPlace({name:Place.name, age:Place.age, type:e.target.value,localCode:Place.localCode,city:Place.city,country:Place.country})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="localCode">localcode</label>
                        <input className="form-control" type="text" name="localCode" value={Place.localCode} 
                        onChange={(e) => setPlace({name:Place.name, age:Place.age, type:Place.type,localCode:e.target.value,city:Place.city,country:Place.country})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Country">Country</label>
                        <input className="form-control" type="text" name="Country" value={Place.country} 
                        onChange={(e) => setPlace({name:Place.name, age:Place.age, type:Place.type,localCode:Place.localCode,city:Place.city,country:e.target.value})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">city</label>
                        <input className="form-control" type="text" name="city" value={Place.city} 
                        onChange={(e) => setPlace({name:Place.name, age:Place.age, type:Place.type,localCode:Place.localCode,city:e.target.value,country:Place.country})}></input>
                    </div>
                 
                    <Button  onClick={handleSubmit} variant="primary">Submit</Button>
                </form>
            } 
        </div>
    )
}

export default PlacesEdit
