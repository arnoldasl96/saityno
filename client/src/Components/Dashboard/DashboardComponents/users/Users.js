import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import * as UserService from '../../../../Services/userService'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

function Users(props) {
    const [UsersList, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        UserService.GetUsers().then((res)=>{
           setUsers(res.data);
        }).then(setLoading(false))
    }, [])

    const handleDelete=(id)=>{UserService.DeleteUser(id).then(()=>{ window.location.reload(false);})}
    return (
        
        <div className="container">
            {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
        {!loading && 
        <Table responsive="sm lg md">
                <thead>
                    <tr>
                        <th>Users List <Button href= {`/dashboard/Users/create`}  variant="primary">add new user</Button></th>
                    </tr>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>email</th>
                    </tr>
                </thead>
                <tbody>
                 {UsersList.map((user,index) =>
                    <tr key={user._id}>
                        <td>{index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                        <Button href= {`/dashboard/users/${user._id}`} variant="primary">Edit</Button>{'  '}
                        <Button onClick={handleDelete.bind(this,user._id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                    )} 
                </tbody>
            </Table>
            }
        </div>
            
    )
}

export default Users
