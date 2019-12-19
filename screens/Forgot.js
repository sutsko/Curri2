import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import {Button, Block, Text, Input} from '../components';
import { theme } from '../constants';

// Vi definerer den gyldige email adresse som en konstant
const VALID_EMAIL = "eksempel@eksempel.dk";

// Her sætter vi email og password konstanterne til en state
// "Error" gemmer fejl ved at logge ind i et array
// Loading state vil vise en button style for at vise login i loader
export default class Forgot extends Component {
    state = {
        email: VALID_EMAIL,
        errors: [],
        loading: false
    } 

    // Denne funktion styrer processen når en bruger indtaster en email adresse og trykker på "forgot" knappen
    // Der er implementeret en keyboard.dismiss funktioner der fjerner keyboard ved at trykke på forgot.
    // Hvis email stemmer overens vores konstanter eller med firebase (som ikke er implmenteret her) sender den besked med "Password sent .... ""
    // Hvis feltet er tomt eller der er skrevet forkert modtager bruger "Error, please check...."
    handleForgot(){
        const {navigation} =this.props;
        const {email} = this.state; 
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading:true});

        
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

        // Her har vi en Block component der wrapper componenterne text og en child Block. Child Block wrapper input component for vores email felt.
        // Vi tager input værdi og ændrer vores state variabler ved at bruge onChangeText
        return (
            // Her bruger vi KeyboardAvoidingView component der sikre at vores pop-up tastatur ikke står i vejen for vores felter
            // Vi bruger padding for at give en afstand fra tastatur til felter
             // Vi laver buttons i til "forgot" eller "back to login"
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[0, theme.sizes.base *2 ]}>
                <Text h1 bold> Forgot </Text>
                    <Block middle>
                    
                        <Input 
                        label="Email"
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email') ]}
                        defaultValue={this.state.email}
                        onChangeText = {text => this.setState({email: text})}
                        />

                        <Button gradient onPress ={() => this.handleForgot()}> 
                            {loading ? <ActivityIndicator size="small" color="white"  
                            /> : 
                            <Text bold white center>Forgot</Text>    
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

// Her styles input felt og errors
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
