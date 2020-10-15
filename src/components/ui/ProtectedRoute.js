import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'
import * as PropTypes from 'prop-types';

const ProtectedRoute = (props) => {
    const isLoggedIn = useSelector(state => (state.userFxnReducer.isLoggedIn && state.userFxnReducer.loginToken.length>0));
    const Component = props.component;

    return isLoggedIn ? (Component) : (<Redirect to={{pathname: "/login"}}/>)
};

ProtectedRoute.propTypes = {
    component: PropTypes.any.isRequired
};

export default ProtectedRoute;