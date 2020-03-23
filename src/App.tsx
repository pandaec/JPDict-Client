import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';
import {WordPage} from './components/WordPage';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import setAuthToken from "./helpers/setAuthToken";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import WordList from "./components/protected/WordList";
import {logoutUser} from "./helpers/AuthFunction";

dotenv.config();

if (localStorage.jwtToken) {
    // set auth token header
    const token = localStorage.jwtToken;
    setAuthToken(token);

    try{

        const decoded : any = jwt_decode(token);
        console.log(decoded);

        const currentTime = Date.now() / 1000;
        if(decoded.exp < currentTime){
            //logout user


        }
    }catch(err){
        console.error(err);
        console.log('invalid jwt token');
        logoutUser();

        // window.location.href = './login';
    }



}


function App() {
    return (
        <Router>
            <div className={'minFullHeight'}>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/w/:word">
                        <WordPage/>
                    </Route>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <Route path={'/register'}>
                        <RegisterForm/>
                    </Route>
                    <ProtectedRoute component={WordList} isAuth={localStorage.getItem('jwtToken')} path={'/wordlist'}/>
                </Switch>

            </div>


        </Router>


        // <div className="App">
        //   <Home></Home>
        // </div>
    );
}

export default App;
