import React,{useState,useEffect} from 'react'
import  {GetPlane } from '../../Services/PlanesServices'
import  {GetCompany } from '../../Services/CompaniesServices'
import './views.css'
import Spinner from 'react-bootstrap/esm/Spinner';
 function PlaneView({match},porps) {
    const [loading, setLoading] = useState(true);
    const [Plane, setPlane] = useState(null)
    const [Company, setCompany] = useState(null)
       useEffect(() => {
        GetPlane(match.params.planeid, localStorage.getItem('token')).then((res)=>{setPlane(res.data)}).then(()=>{
        GetCompany(match.params.id,localStorage.getItem('token')).then((res)=>{setCompany(res.data)}).then(() => {setLoading(false)})
        })
        
    }, [])
    return (
        <div className="container-fluid">
            {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
            {!loading &&
            <div className="main">
                <div className="info">
                    <h1>{Plane.name}</h1>
                    <h3>Type: {Plane.type}</h3>
                    <h3>Made: {Plane.age}</h3>
                    <h3>Seats: {Plane.space}</h3>
                    <h3>Owned by :{Company.name}</h3> 
                </div>
            </div>}
        </div>
    )
}
export default PlaneView;