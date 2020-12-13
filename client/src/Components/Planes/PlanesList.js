import React, { Component } from 'react'
import Plane from './Plane'
import Spinner from 'react-bootstrap/Spinner'
export default class PlanesList extends Component {
    state = {
        loading : true,
        Planes: null,
    };

    async componentDidMount(){
        document.body.className = 'PlanesPage';
        const url = "/Planes"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({Planes: data, loading: false})
    }
    componentWillUnmount(){
        document.body.className = '';
    }
  render(){
      if(this.state.loading){
          return <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      if(!this.state.Planes){
        return <div>nothing found...</div>
    }
    return (
        <div className="container-fluid">
        <div  className="PlanesList">
           {this.state.Planes.map(
               i =>
                    <Plane id ={i._id}
                key={i._id}
                name={i.name}
                age={i.age}
                type={i.type}
                space={i.space}
                owner={i.ownerID}
                to = {`companies/${i.ownerID}/planes/${i._id}`}
               />
               
              
               
           )}
        </div>
        </div>
    )
  } 
}