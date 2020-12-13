import React from 'react';
import './App.css';
import NavBar  from './Components/NavBar/NavBar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages';
import Login_Register from './pages/login';
import Companies from './Components/Companies/CarriersList';
import Planes from './Components/Planes/PlanesList';
import Places from './Components/Places/PlacesList';
import Footer from './Components/Footer/Footer';
import notFound from './Components/notFound/notFound';
import {TakeToken} from './TakeToken';
import CompanyView from './Components/view/CompanyView';
import PlaneView from './Components/view/PlaneView';
import Dashboard from './Components/Dashboard/Dashboard';
import CompaniesEdit from './Components/Dashboard/DashboardComponents/Companies/CompaniesEdit';
import CompaniesCreate from './Components/Dashboard/DashboardComponents/Companies/CompaniesCreate';
import PlanesEdit from './Components/Dashboard/DashboardComponents/Planes/PlanesEdit';
import PlanesCreate from './Components/Dashboard/DashboardComponents/Planes/PlanesCreate';
import PlacesEdit from './Components/Dashboard/DashboardComponents/Places/PlacesEdit';
import PlacesCreate from './Components/Dashboard/DashboardComponents/Places/PlacesCreate';
import UsersEdit from './Components/Dashboard/DashboardComponents/users/UsersEdit';
import UsersCreate from './Components/Dashboard/DashboardComponents/users/UsersCreate';
let token = TakeToken();
function App(){
    return (
      
        <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />
          {token && <Route exact path = "/companies/:id/planes/:planeid" component ={PlaneView}/>}
          {token && <Route exact path = "/companies/:id" component ={CompanyView}/>}
          {token && <Route exact path = "/planes/:id" component ={PlaneView}/>}
          {(token && token._type==="admin")&&<Route exact path="/dashboard/companies/create/" component={CompaniesCreate} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/companies/:id" component={CompaniesEdit} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/planes/create/" component={PlanesCreate} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/planes/:id" component={PlanesEdit} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/places/create/" component={PlacesCreate} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/places/:id" component={PlacesEdit} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/users/create/" component={UsersCreate} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard/users/:id" component={UsersEdit} />} 
          {(token && token._type==="admin")&&<Route exact path="/dashboard" component={Dashboard} />}
          {!token && <Route exact path="/login" component={Login_Register}  />} 
          <Route exact path="/Companies" component={Companies} />
          <Route exact path="/Planes" component={Planes} />
          <Route exact path="/Places" exact component={Places} />
          <Route path="/*" component={notFound}/>
          {!token && <Redirect exact to = "/login"/>}
        </Switch>
        <Footer/>
      </Router>
      
    );
  
}

export default App;
