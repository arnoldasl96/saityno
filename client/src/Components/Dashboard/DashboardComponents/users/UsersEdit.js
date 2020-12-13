import React,{useState,useEffect} from 'react'
import * as UserService from '../../../../Services/userService'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import {useHistory} from 'react-router-dom'

function UserEdit({match},props) {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    useEffect(() => {
        UserService.GetUser(match.params.id).then((res)=>{
           setUser(res.data);
        }).then(setLoading(false), console.log(user))
        
    }, [])


    const handleSubmit=()=>{
     UserService.UpdateUser(match.params.id,user,localStorage.getItem('token')).then(()=>{

        let path =`/dashboard`;
        history.push(path);
        window.location.reload(false);
     })
    }

    return (
        <div className="container-fluid">
            <div className="container">
            <h1>Edit User information</h1>
          {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
             {!loading &&
                <form   onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="Username">Name</label>
                        <input className="form-control" required type="text" name="Username" value={user.name} 
                        onChange={(e) => setUser({name:e.target.value, email:user.email, type:user.type,password:user.password}) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input className="form-control" required type="email" name="email" value={user.email} 
                        onChange={(e) => setUser({name:user.name, email:e.target.value, type:user.type,password:user.password})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" required type="password" name="password" value={user.password} 
                        onChange={(e) => setUser({name:user.name, email:user.email, type:user.type,password:e.target.value})}></input>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Companies">Role</label>
                        <select className="form-control"  required id="companies"  onChange={(e) => 
                        setUser({name:user.name, email:user.email, type:e.target.value,password:user.password})}
                        value={user.type}>
                           <option value="admin">Admin</option>
                           <option value="user">User</option>
                        </select>
                       
                    </div>
                    <Button type="submit" variant="primary">Update</Button>
                </form>
            } 
            </div>
        </div>
    )
}

export default UserEdit
