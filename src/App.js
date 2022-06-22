import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/protectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Account} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
