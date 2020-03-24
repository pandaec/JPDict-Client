import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, Grid, GridColumn, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import SidebarParent from "./SidebarParent";


const RegisterForm = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const history = useHistory();
    const [formErr, setFormErr] = useState('');

    //TODO form validation
    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;

        setUserInfo({...userInfo, [name]: value});
    };

    const handleSubmit = (evt: FormEvent<EventTarget>) => {
        // validation
        if (userInfo.password !== userInfo.confirmPassword) {
            console.log('password does not match confirm password');
            return;
        }

        const postBody = {
            'username': userInfo.username,
            'email': userInfo.email,
            'password': userInfo.password,
        };
        axios.post(`${process.env.REACT_APP_API_HOST}/api/users/register`, postBody)
            .then(res => {
                console.log(res.data);

                history.push('/login');
            })
            .catch(err => {
                const res = err.response;
                if (res.data.err) {
                    setFormErr(res.data.err);
                    return;
                }
            });
    };

    return (
        <SidebarParent>
            <Grid textAlign='center' verticalAlign='middle' style={{ minHeight: '100vh'}}>
                <GridColumn style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Sign up a new account
                    </Header>
                    <Form size="large" error={formErr !== ''} onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Input label={'Username'} fluid icon='user' iconPosition='left'
                                        placeholder={'Username'}
                                        name='username' onChange={handleInputChange}/>
                            <Form.Input label={'Email Address'} fluid icon='mail' iconPosition='left'
                                        placeholder={'Email'}
                                        name='email' onChange={handleInputChange}/>

                            <Form.Input label={'Password'} fluid icon='lock' iconPosition='left'
                                        placeholder={'Password'}
                                        type={'password'}
                                        name='password' onChange={handleInputChange}/>
                            <Form.Input label={'Confirm Password'} fluid icon='lock' iconPosition='left'
                                        placeholder={'Confirm Password'} type={'password'}
                                        name='confirmPassword' onChange={handleInputChange}/>
                            <Message
                                error
                                header='Sign up failed'
                                content={formErr}
                            />
                            <Button color={'green'} fluid size={'large'}>
                                Sign Up
                            </Button>
                        </Segment>

                    </Form>
                    <Message>
                        Already have an account? <a href={'/login'}>Login Here</a>
                    </Message>
                </GridColumn>
            </Grid>
        </SidebarParent>
    );
};


export default RegisterForm;