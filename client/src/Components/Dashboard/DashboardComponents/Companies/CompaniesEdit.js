import React,{useState,useEffect} from 'react'
import * as Company from '../../../../Services/CompaniesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import {useHistory} from 'react-router-dom'

function CompaniesEdit({match},props) {
    const [comp, setcomp] = useState('')
    const [loading, setLoading] = useState(true)
    
    const history = useHistory();
    useEffect(() => {
        Company.GetCompany(match.params.id,localStorage.getItem('token')).then((res)=>{
           setcomp(res.data);
        }).then(setLoading(false))
    }, [])


    const handleSubmit=()=>{
        console.log('updated')
        console.log(comp)
     Company.UpdateCompany(match.params.id,comp,localStorage.getItem('token'))
     let path =`/dashboard`;
     history.push(path);
     window.location.reload(false);
    }

    return (
        <div className="container-fluid">
          {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
             {!loading &&
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="CompanyName">Company Name</label>
                        <input  className="form-control" type="text" name="CompanyName" value={comp.name} onChange={(e) => setcomp({name:e.target.value, age:comp.age}) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">age</label>
                        <input className="form-control" type="text" name="age" value={comp.age} onChange={(e) => setcomp({name:comp.name, age:e.target.value})}></input>
                    </div>
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            } 
        </div>
    )
}

export default CompaniesEdit
