import React,{useState} from 'react'
import * as Company from '../../../../Services/CompaniesServices'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
function CompaniesCreate() {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const history = useHistory();
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
            default:
              break;
        }
    }
    const handleSubmit=()=>{
        let path=`/dashboard`;
        Company.AddCompany({name:name, age:age},localStorage.getItem('token')).then(()=>{
        history.push(path);
        window.location.reload(false);
        })
    }

    return (

        <div className="container-fluid">
            <div className="container-md">
                <div><h1> Add Company</h1></div>
            <Form >
                   <Form.Row>
                        <Form.Label>Company name</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Company name" minLength="4" name="CompanyName" onChange={(e)=>handlechange(e,'CompanyName') }/>
                   </Form.Row>
                   <Form.Row>
                   <Form.Label>Company founded</Form.Label>
                   <Form.Control size="lg" type="number" minLength="4" maxLength="4" placeholder="1908" name="age" onChange={(e) => handlechange(e,'age')}/>
                   </Form.Row>
                   <br></br>
                   <Button variant="primary" onClick={handleSubmit} >Create</Button>
               </Form>
            </div>
               
        </div>
    )
}

export default CompaniesCreate

