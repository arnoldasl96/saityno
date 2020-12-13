import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import * as Plane from '../../../../Services/PlanesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

function Planes(props) {
    const [PlanesList, setPlanes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Plane.GetPlanes().then((res)=>{
           setPlanes(res.data);
        }).then(setLoading(false))
    }, [])

    const handleDelete=(id)=>{
        Plane.DeletePlane(id,localStorage.getItem('token')).then(()=>{
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
                        <th>Planes List <Button href= {`/dashboard/Planes/create`}  variant="primary">add new plane</Button></th>
                    </tr>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Type</th>
                    <th>Space</th>
                    <th>owner</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {PlanesList.map((plane,index) =>
                    <tr key={plane._id}>
                        <td>{index}</td>
                        <td>{plane.name}</td>
                        <td>{plane.age}</td>
                        <td>{plane.type}</td>
                        <td>{plane.space}</td>
                        <td>{plane.owner}</td>
                        <td>
                        <Button href= {`/dashboard/Planes/${plane._id}`} variant="primary">Edit</Button>{'  '}
                        <Button onClick={handleDelete.bind(this,plane._id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
            }
        </div>
            
    )
}

export default Planes
