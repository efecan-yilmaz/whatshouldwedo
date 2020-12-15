import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        {/* <Route exact path="/" /> */}
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        );
    }
}

export default App;