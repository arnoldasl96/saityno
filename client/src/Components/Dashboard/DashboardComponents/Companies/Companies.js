import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import * as Company from '../../../../Services/CompaniesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

function Companies(props) {
    const [CompaniesList, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Company.GetCompanies().then((res)=>{
           setCompanies(res.data);
        }).then(setLoading(false))
    }, [])
    const handleDelete=(id)=>{
        Company.DeleteCompany(id,localStorage.getItem('token')).then(()=>{
   window.location.reload(false);
        }

        )
     
    }
    return (
        
        <div className="container">
            {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
        {!loading && 
        <Table responsive="sm lg md">
                <thead>
                    <tr>
                        <th>Companies List <Button href= {`/dashboard/companies/create`} variant="primary">add new company</Button></th>
                    </tr>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {CompaniesList.map((company,index) =>
                    <tr key={company._id}>
                        <td>{index}</td>
                        <td>{company.name}</td>
                        <td>{company.age}</td>
                        <td>
                        <Button href= {`/dashboard/companies/${company._id}`} variant="primary">Edit</Button>{'  '}
                        <Button onClick={handleDelete.bind(this,company._id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
            }
        </div>
            
    )
}

export default Companies
