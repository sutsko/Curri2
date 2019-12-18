import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import {Button, Block, Text, Input} from '../components';
import { theme } from '../constants';

const VALID_EMAIL = "eksempel@eksempel.dk";

export default class Forgot extends Component {
    state = {
        email: VALID_EMAIL,
        errors: [],
        loading: false
    } 

    handleForgot(){
        const {navigation} =this.props;
        const {email} = this.state; 
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading:true});

        //Check with backend API or with some statid data, and the state is loading while it is doing that. REIMPLEMENT WITH FIREBASE
        //Set timeout only for demo of getting data wait period setTimeout(()=> {login code}, 2000)
            if(email !== VALID_EMAIL){
            errors.push('email')
            }

            this.setState({errors, loading: false})

            if(!errors.length){
                Alert.alert('Password sent!', 'Please check your email',
                    [
                        {
                            text: 'OK', onPress: () => {
                                navigation.navigate('Login')
                            } 
                        }
                    ],
                    { cancelable: false }
                )
            } else {
                Alert.alert('Error', 'Please check your email address',
                    [
                        {
                            text: 'Try again',
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
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[0, theme.sizes.base *2 ]}>
                <Text h1 bold> Forgot </Text>
                    <Block middle>
                    
                        <Input 
                        label="Email"
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email') ]}
                        defaultValue={this.state.email} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        onChangeText = {text => this.setState({email: text})}
                        />

                        <Button gradient onPress ={() => this.handleForgot()}> 
                            {loading ? <ActivityIndicator size="small" color="white" //Find ud af hvad kolonet nedenfor er til. 
                            /> : 
                            <Text bold white center>Forgot</Text>    
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
    forgot: {
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
