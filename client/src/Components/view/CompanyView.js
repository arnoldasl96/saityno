import React,{useState,useEffect} from 'react'
import  {GetCompany, GetPlanes } from '../../Services/CompaniesServices'
import './views.css'
import {Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/esm/Spinner';
 function CompanyView({match},porps) {
    const [loading, setLoading] = useState(true);
    const [Company, setCompany] = useState(null)
    const [Planes, setPlanes] = useState([])
       useEffect(() => {
        GetCompany(match.params.id,localStorage.getItem('token')).then((res)=>{setCompany(res.data)}).then(()=>{
        GetPlanes(match.params.id,localStorage.getItem('token')).then((res)=>{setPlanes(res.data)}).then(() => {setLoading(false)})
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
                    <h1>{Company.name}</h1>
                    <h3>Founded: {Company.age}</h3>
                </div>
                <div className="planes">
                    <h1>Planes owned</h1>
                    {Planes.length===0 && <h3>no planes found</h3>}
                {Planes && Planes.map((plane) =>(
            <Link key = {plane._id} id = "routing" to = {`${Company._id}/planes/${plane._id}`}><div >{plane.name}</div></Link>))}  
                </div>


            </div>}
        </div>
    )
}
export default CompanyView;