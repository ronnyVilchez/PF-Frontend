import React from 'react'
import { Route, Router, Switch } from 'wouter'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { Layout } from './Layout/Layout'
import Rediriguir from './components/Reediriguir'
import { ProtectRouter } from './components/ProtectRouter'

export default function App() {
  return (

    <Router>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/'} component={Rediriguir} />
        <ProtectRouter >
          <Layout>
            <Route path={'/dashboard/:subpage?'} component={Dashboard} />
          </Layout>
        </ProtectRouter>
      </Switch>
    </Router>

  )
}
