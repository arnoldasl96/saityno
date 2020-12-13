import React from 'react'
import Companies from './DashboardComponents/Companies/Companies'
import Planes from './DashboardComponents/Planes/Planes'
import Places from './DashboardComponents/Places/Places'
import Users from './DashboardComponents/users/Users'

function Dashboard() {
    return (
       <div className="container-fluid">
           <div> {<Companies/>}</div>
           <div>  {<Planes/>}</div>
           <div>  {<Places/>}</div>
           <div>  {<Users/>}</div>
      
      
       </div>
    )
}

export default Dashboard
