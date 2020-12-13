import React,{useState, useEffect} from 'react'
import * as Company from '../../../../Services/CompaniesServices'
import * as Plane from '../../../../Services/PlanesServices'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/esm/Spinner'
import '../forms.css'

function CompaniesCreate() {
    const [name, setName] = useState(null)
    const [age, setAge] = useState(null)
    const [type, settype] = useState(null)
    const [space, setspace] = useState(null)
    const [ownerID, setownerID] = useState(null)
    const [Companies, setCompanies] = useState([])
    const history = useHistory();
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Company.GetCompanies().then((res)=>{setCompanies(res.data)}).then(setLoading(false))
    }, [])

    
    const handlechange=(e,names)=>{
        const companyEl = {}
        companyEl[names]= e.target.value
    
        switch (names) {
            case 'CompanyName':
              setName(companyEl.CompanyName)
              break;
              case 'age':
                setAge(companyEl.age)
                break;
                case 'type':
                settype(companyEl.type)
                break;
                case 'space':
                setspace(companyEl.space)
                break;
                case 'owner':
                setownerID(companyEl.owner)
                break;
            default:
              break;
        }
    }
    const handleSubmit=()=>{
        let path=`/dashboard`;
        
        if(name && age && type && space && ownerID){
            console.log({name:name, age:age, type:type, space:space, ownerID:ownerID})
            Plane.AddPlane({name:name, age:age, type:type, space:space, ownerID:ownerID},localStorage.getItem('token')).then(()=>{
                history.push(path);
                window.location.reload(false);
              })
        }else{
            console.log('something is null')
        }
      
    }

    return (
        <div className="container-fluid">
        {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}

       {!loading &&<div className="container-md">
           <div><h1> Add Plane</h1></div>
       <Form onSubmit={handleSubmit} >
              <Form.Row>
              <Form.Label>Plane name</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="name" minLength="4" name="PlaneName" onChange={(e)=>handlechange(e,'CompanyName') }/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Plane created</Form.Label>
              <Form.Control size="lg" type="number" required minLength="4" maxLength="4" placeholder="years" name="age" onChange={(e) => handlechange(e,'age')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Model</Form.Label>
              <Form.Control size="lg" type="text" required minLength="4" placeholder="model" name="type" onChange={(e) => handlechange(e,'type')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Space</Form.Label>
              <Form.Control size="lg" type="number" required placeholder="amount of space" name="space" onChange={(e) => handlechange(e,'space')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Owner</Form.Label>{'\n'}
              <br></br>
            <select className="custom-select" required size="lg"  name="owner" onChange={(e) => handlechange(e,'owner')}>
                <option value={''}>Select</option>
                    {Companies.map(i=>{
                       return <option key={i._id} value={i._id}>{i.name}</option>
                    })}
              </select>              
              </Form.Row>
              <br></br>
              <Button variant="primary" type="submit">Create</Button>
          </Form>
       </div>} 
  </div>
    )
}

export default CompaniesCreate

