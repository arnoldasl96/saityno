import React, { Component } from 'react'
import Carrier from './Carrier'
import Spinner from 'react-bootstrap/Spinner'

 class CarriersList extends Component {
    state = {
        loading : true,
        Carriers: null,
    };

    async componentDidMount(){
        document.body.className = 'carrierspage';
        const url = "/Carriers"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({Carriers: data, loading: false})
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
      if(!this.state.Carriers){
        return <div>nothing found...</div>
    }
    return (
        
        <div className="container-fluid">            
            <div  className="CarrierList">
           {this.state.Carriers.map(
               i =>
               <Carrier id ={i._id}
                key={i._id}
                name={i.name}
                age={i.age}
                to = {`companies/${i._id}`}
               />

           )}
        </div>
        </div>
        
    )
  } 
}
export default CarriersList;