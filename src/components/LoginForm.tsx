import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, Grid, GridColumn, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {loginUser} from '../helpers/AuthFunction';
import {useHistory} from 'react-router-dom';
import SidebarParent from "./SidebarParent";

const LoginForm = () => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const [formErr, setFormErr] = useState('');

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;

        setUserInfo({...userInfo, [name]: value});
    };

    const handleSubmit = (evt: FormEvent<EventTarget>) => {
        const postBody = {
            'email': userInfo.email,
            'password': userInfo.password,
        };
        axios.post(`${process.env.REACT_APP_API_HOST}/api/users/login`, postBody)
            .then(res => {
                if (res.data && res.data.success) {
                    // login sucess
                    console.log('login success');
                    setFormErr('');

                    loginUser(res.data.token);
                    // redirect to wordlist
                    history.push('../wordlist');
                } else {
                    // login failed
                    setFormErr('Incorrect email or password');
                }

            })
            .catch(err => {
                const res = err.response;
                if (res.data.err) {
                    console.log(res.data.err);
                    setFormErr(res.data.err);
                    return;
                }
            });
    };

    return (
        <SidebarParent>
            <Grid textAlign='center' style={{minHeight: '100vh'}} verticalAlign='middle'>
                <GridColumn style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size="large" onSubmit={handleSubmit} error={formErr !== ''}>
                        <Segment stacked>
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email'
                                        name='email' onChange={handleInputChange}/>
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder={'Password'} type={'password'}
                                        name='password' onChange={handleInputChange}/>
                            <Message
                                error
                                header='Login failed'
                                content={formErr}
                            />
                            <Button color={'teal'} fluid size={'large'}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        <a href={'/register'}>Sign up for JPDict</a>
                    </Message>
                </GridColumn>
            </Grid>
        </SidebarParent>
    );
};


export default LoginForm;