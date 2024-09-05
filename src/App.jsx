import React from 'react'
import { Route, Router } from 'wouter'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { Layout } from './Layout/Layout'

export default function App() {
  return (

    <Router>
      <Route path={'/'} component={Login} />
      <Layout>
        <Route path={'/dashboard/:subpage?'} component={Dashboard}/>
      </Layout>
    </Router>

  )
}
