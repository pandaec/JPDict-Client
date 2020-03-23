import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
    isAuth: string | null;

}

const ProtectedRoute : React.FC<ProtectedRouteProps> = props => {
    let redirectPath = '';
    if(!props.isAuth){
        redirectPath = '/login';
    }

    if(redirectPath){
        const renderComponent = () => <Redirect to={{pathname: redirectPath}} />;
        return <Route {...props} component={renderComponent} render={undefined}/>;
    }else{
        return <Route {...props}/>;
    }
};

export default ProtectedRoute;