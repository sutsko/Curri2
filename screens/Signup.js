import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import {Button, Block, Text, Input} from '../components';
import { theme } from '../constants';


export default class Signup extends Component {
    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false
    } 
//HER SKAL IMPLEMENTERES NOGET SP INGEN KAN HAVE DET SAMME TO GANGE. 
    handleSignup(){
        const {navigation} =this.props;
        const {email, username, password} = this.state; 
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading: true});

        //Check with backend API or with some statid data, and the state is loading while it is doing that. REIMPLEMENT WITH FIREBASE
        //Set timeout only for demo of getting data wait period setTimeout(()=> {login code}, 2000)
            if(!email){errors.push('email')}
            if(!username){errors.push('username')}
            if(!password){errors.push('password')}

            this.setState({errors, loading: false})

            if(!errors.length){
                Alert.alert('Succes', 'Your account has been created',
                    [
                        {
                            text: 'Continue', onPress: () => {
                                navigation.navigate('Browse') //Burde måske være tilbage til LogIN
                            } 
                        }
                    ],
                    { cancelable: false }
                )
            } 
    }

    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null; 

        return (
            <KeyboardAvoidingView style={styles.signup} behavior="padding">
                <Block padding={[0, theme.sizes.base *2 ]}>
                <Text h1 bold> Sign Up </Text>
                    <Block middle>
                    
                        <Input 
                        email
                        label="Email"
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email') ]}
                        defaultValue={this.state.email} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        onChangeText = {text => this.setState({email: text})}
                        />

                        <Input 
                        label="Username"
                        error={hasErrors('username')}
                        style={[styles.input, hasErrors('username') ]}
                        defaultValue={this.state.username} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        onChangeText = {text => this.setState({username: text})}
                        />

                        <Input 
                        secure
                        label="Password"
                        error={hasErrors('password')}
                        style={[styles.input, hasErrors('password') ]}
                        defaultValue={this.state.password} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        onChangeText = {text => this.setState({password: text})}
                        />

                        <Button gradient onPress ={() => this.handleSignup()}> 
                            {loading ? <ActivityIndicator size="small" color="white" //Find ud af hvad kolonet nedenfor er til. 
                            /> : 
                            <Text bold white center>Sign Up</Text>    
                        }
                            
                        </Button>  

                        <Button onPress ={() => navigation.navigate('Login')}>
                            <Text  gray caption center style={{textDecorationLine: 'underline'}}>Bck to Login</Text>
                        </Button>

                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    signup: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius:0, 
        borderWidth:0,
        borderBottomColor:theme.colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    }
})
