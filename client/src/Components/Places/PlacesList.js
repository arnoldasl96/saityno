import React, { Component } from 'react'
import Place from './Place'
import Spinner from 'react-bootstrap/Spinner'
import './Places.css'

export default class PlacesList extends Component {
    state = {
        loading : true,
        Places: null,
    };

    async componentDidMount(){
        document.body.className = 'PlacesPage';
        const url = "/places"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({Places: data, loading: false})
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
      if(!this.state.Places){
        return <div>nothing found...</div>
    }
    return (
        <div className="container-fluid">
            <div  className="PlacesList">
           {this.state.Places.map(
               i =>
               <Place id ={i._id}
                key={i._id}
                type={i.type}
                city={i.city}
                country={i.country}
                name={i.name}
                age={i.age}
               />

           )}
        </div>

        </div>
        
    )
  } 
}