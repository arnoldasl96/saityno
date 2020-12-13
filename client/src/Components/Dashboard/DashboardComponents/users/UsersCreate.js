import React,{useState} from 'react'
import * as UserService from '../../../../Services/userService'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/esm/Spinner'
import '../forms.css'

function CompaniesCreate() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [type, setType] = useState(null)
    const [repassword, setRepassword] = useState(null)
    const [password, setPassword] = useState(null)
    const history = useHistory();

    const handlechange=(e,names)=>{
        const UserElement = {}
        UserElement[names]= e.target.value
    
        switch (names) {
            case 'name':
              setName(UserElement.name)
              break;
              case 'password':
                setPassword(UserElement.password)
                break;
                case 'repassword':
                    setRepassword(UserElement.repassword)
                    break;
                case 'type':
                        setType(UserElement.type)
                        break;
                case 'email':
                setEmail(UserElement.email)
                break;
            default:
              break;
        }
    }
    const handleSubmit=()=>{
        let path=`/dashboard`;
        
        if(name && email && password && type &&(password===repassword) ){
            console.log({name:name, email:email, password:password,type:type})
            UserService.RegisterUser({name:name, email:email, password:password,type:type}).then(()=>{
                history.push(path);
                window.location.reload(false);
              })
        }else{
            console.log(name, email, password,type, repassword)
        }
      
    }

    return (
        <div className="container-fluid">
       
       <div className="container-md">
           <div><h1> Add User</h1></div>
       <Form  >
              <Form.Row>
              <Form.Label>User's name</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="name" minLength="5" name="PlaneName" onChange={(e)=>handlechange(e,'name') }/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Email</Form.Label>
              <Form.Control size="lg" type="email" required minLength="5" placeholder="model" name="type" onChange={(e) => handlechange(e,'email')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Password</Form.Label>
              <Form.Control size="lg" type="Password" minLength="5" required placeholder="password" name="space" onChange={(e) => handlechange(e,'password')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Re-Password</Form.Label>
              <Form.Control size="lg" type="Password" minLength="5" required placeholder="password" name="space" onChange={(e) => handlechange(e,'repassword')}/>
              </Form.Row>
              <Form.Row>
              <Form.Label>Type of user</Form.Label>{'\n'}
              <br></br>
            <select className="custom-select" required size="lg"  name="type" onChange={(e) => handlechange(e,'type')}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>              
              </Form.Row>
              <br></br>
              <Button variant="primary" onClick={handleSubmit}>Create</Button>
          </Form>
       </div>
  </div>
    )
}

export default CompaniesCreate

