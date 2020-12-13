import React,{useState,useEffect} from 'react'
import * as Planes from '../../../../Services/PlanesServices'
import {GetCompanies} from '../../../../Services/CompaniesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import {useHistory} from 'react-router-dom'

function PlanesEdit({match},props) {
    const [plane, setplane] = useState('')
    const [Companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)
    
    const history = useHistory();
    useEffect(() => {
        Planes.GetPlane(match.params.id,localStorage.getItem('token')).then((res)=>{
           setplane(res.data);
        }).then(
            GetCompanies().then((res)=>{setCompanies(res.data)})
        ).then(setLoading(false),
        )
    }, [])


    const handleSubmit=()=>{
     Planes.UpdatePlane(match.params.id,plane,localStorage.getItem('token'))
     let path =`/dashboard`;
     history.push(path);
     window.location.reload(false);
    }

    return (
        <div className="container-fluid">
            <div className="container">
            <h1>Edit Plane</h1>
          {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
             {!loading &&
                <form   onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="PlaneName">Name</label>
                        <input className="form-control" required type="text" name="PlaneName" value={plane.name} 
                        onChange={(e) => setplane({name:e.target.value, age:plane.age, type:plane.type,space:plane.space,ownerID:plane.ownerID}) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">age</label>
                        <input className="form-control" required type="text" name="age" value={plane.age} 
                        onChange={(e) => setplane({name:plane.name, age:e.target.value, type:plane.type,space:plane.space,ownerID:plane.ownerID})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Type">Type</label>
                        <input className="form-control" required type="text" name="Type" value={plane.type} 
                        onChange={(e) => setplane({name:plane.name, age:plane.age, type:e.target.value,space:plane.space,ownerID:plane.ownerID})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Space">Space</label>
                        <input className="form-control" required type="text" name="Space" value={plane.space} 
                        onChange={(e) => setplane({name:plane.name, age:plane.age, type:plane.type,space:e.target.value,ownerID:plane.ownerID})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Companies">Companies</label>
                        <select className="form-control"  required id="companies"  onChange={(e) => setplane({name:plane.name, age:plane.age, type:plane.type,space:plane.space,ownerID:e.target.value})}
                        value={plane.ownerID}>
                            <option value={''}>Select</option>
                            {Companies.map((i)=>{
                          return <option value={i._id}>{i.name}</option>
                        }
                        )}
                        </select>
                       
                    </div>
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            } 
            </div>
        </div>
    )
}

export default PlanesEdit
