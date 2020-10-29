import React, {useEffect, useState} from "react";
import {Button, Card, Form, Grid, Input} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, showNotification} from "../redux";
import {useHistory} from "react-router";

const AppLoginView = () => {
    const dispatch = useDispatch();
    const history=useHistory();
    //const isLoggingIn = useSelector(state => state.userFxnReducer.isLoggingIn);
    const isLoggedIn=useSelector(state=>state.userFxnReducer.isLoggedIn);
    const hasLoginError = useSelector(state => state.userFxnReducer.loginError);


    useEffect(()=>{
        if(hasLoginError.length>0)
            dispatch(showNotification(hasLoginError, "error"));
    }, [hasLoginError, dispatch]);

    useEffect(()=>{

        if(isLoggedIn){
            history.push("/");
        }
    }, [isLoggedIn, dispatch, history]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();
        if(username.length===0 || password.length===0){
            dispatch(showNotification("Missing username or password", "error"));
        }else{
            dispatch(loginUser(username, password));
        }
    };

    return (
            <Grid centered verticalAlign="middle" columns={1}>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Card.Group centered itemsPerRow={1}>
                        <Card raised color="blue">
                            <Card.Content>
                                <Card.Header>Login</Card.Header>
                                <Card.Description>
                                    <Form>
                                        <Form.Field>
                                            <Input type="text" value={username}
                                                   onChange={(e) => setUsername(e.target.value)} label="Username"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Input type="password" label="Password" value={password}
                                                   onChange={(e) => setPassword(e.target.value)}/>
                                        </Form.Field>
                                    </Form>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button as="button" type="button" primary onClick={handleLogin} onKeyPress={handleLogin}>Login</Button>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            </Grid>
    )
};

export default AppLoginView;