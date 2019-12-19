import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import {Button, Block, Text, Input} from '../components';
import { theme } from '../constants';
import firebase from 'firebase';


export default class Signup extends Component {
    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false
    } 

    handleSignup = async () =>{
        const {navigation} = this.props;
        const {email, password} = this.state; 
        const errors = [];

            try{
                Keyboard.dismiss();
                this.setState({ loading: true});
                // Her kalder vi den rette funktion fra firebase auth
                const result = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                console.log(result);

                this.setState({errors, loading: false})
                Alert.alert('Succes', 'Your account has been created',
                    [
                        {
                            text: 'Continue', onPress: () => {
                                navigation.navigate('Login') 
                            } 
                        }
                    ],
                    { cancelable: false }
                )
            

            }catch(error){
                console.log(error);
                this.setState({loading: false});
              }

    }


    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;

         /* Vi har defineret hasErrors til en funktion som skal returnere en fejlværdi, der afhænger af key-værdien fra errors array'et en. Tror ikke helt vi kan nå dette inden */
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null; 

        /*Vi bruger KeyboardAvoidingView som vores såkaldte "parent component". Denne komponent hjælper os til at få dets underkomponenter ind i sig, som altid er
         over keyboardet, når keyboardet bliver triggeret som følge af brugen for inputs. 
         */

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
                        defaultValue={this.state.email} 
                        onChangeText = {text => this.setState({email: text})}
                        />

                        <Input 
                        label="Username"
                        error={hasErrors('username')}
                        style={[styles.input, hasErrors('username') ]}
                        defaultValue={this.state.username} 
                        onChangeText = {text => this.setState({username: text})}
                        />

                        <Input 
                        secure
                        label="Password"
                        error={hasErrors('password')}
                        style={[styles.input, hasErrors('password') ]}
                        defaultValue={this.state.password}
                        onChangeText = {text => this.setState({password: text})}
                        />

                        <Button gradient onPress ={() => this.handleSignup()}> 
                            {loading ? <ActivityIndicator size="small" color="white" //Find ud af hvad kolonet nedenfor er til. 
                            /> : 
                            <Text bold white center>Sign Up</Text>    
                        }
                        </Button>  

                        <Button onPress ={() => navigation.navigate('Login')}>
                            <Text  gray caption center style={{textDecorationLine: 'underline'}}>Back to Login</Text>
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
