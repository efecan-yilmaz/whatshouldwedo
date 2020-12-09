import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Firebase from './util/firebase';

class App extends Component {
    componentDidMount() {
        const firebase = new Firebase();
        firebase.initialize();
    }

    render () {
        return (
            <BrowserRouter>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
            </BrowserRouter>
        );
    }
}

export default App;