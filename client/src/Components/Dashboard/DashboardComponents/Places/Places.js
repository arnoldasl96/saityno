import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import * as PlacesServices from '../../../../Services/PlacesServices'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

function Places(props) {
    const [placesList, setplaces] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        PlacesServices.GetPlaces().then((res)=>{
           setplaces(res.data);
        }).then(setLoading(false))
    }, [])

    const handleDelete=(id)=>{
        PlacesServices.DeletePlace(id,localStorage.getItem('token')).then(()=>{
            window.location.reload(false);
        })
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
                        <th>Places List <Button href= {`/dashboard/places/create`}  variant="primary">add new place</Button></th>
                    </tr>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>local Code</th>
                    <th>tyoe</th>
                    <th>city</th>
                    <th>country</th>
                    </tr>
                </thead>
                <tbody>
                {placesList.map((place,index) =>
                    <tr key={place._id}>
                        <td>{index}</td>
                        <td>{place.name}</td>
                        <td>{place.loacalCode}</td>
                        <td>{place.type}</td>
                        <td>{place.city}</td>
                        <td>{place.country}</td>
                        <td>
                        <Button href= {`/dashboard/places/${place._id}`} variant="primary">Edit</Button>{'  '}
                        <Button onClick={handleDelete.bind(this,place._id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
            }
        </div>
            
    )
}

export default Places
