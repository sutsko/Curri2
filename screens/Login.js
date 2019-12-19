import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import {Button, Block, Text, Input} from '../components';
// 
import { theme } from '../constants';
import firebase from 'firebase';

// Her definerer vi 2 konstanter, email og password værdier
const VALID_EMAIL = "test@test.dk";
const VALID_PASSWORD = "topgear123";

// Her sætter vi email og password konstanterne til en state
// "Error" gemmer fejl ved at logge ind i et array
// Loading state vil vise en button style for at vise loggin i loader
export default class Login extends Component {
    state={
        email: VALID_EMAIL, //Should be changed to "" later so no value show up. 
        password: VALID_PASSWORD,
        errors:[],
        loading:false,
     }

     // Denne metode er tilknyttet firebase og tjekker informaioner for login
    handleLogin = async () => {
        const {navigation} =this.props;
        const {email, password} = this.state; 
        // const errors = []; fejlhåndtering må implementeres senere. 
        // Denne metode fjerner keyboard når der er trykket på login knappen
        Keyboard.dismiss();

        try {
            this.setState({ loading:true});
            // Her kalder vi den rette funktion i firebase auth
            const result = await firebase
              .auth()
              .signInWithEmailAndPassword(email, password);
      
            console.log(result);
            this.setState({loading: false, email:"", password:""})
            navigation.navigate("Browse");

          } catch (error) {
            console.log(error);

            this.setState({loading: false})

          }
    }
    
    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null; //Den her skal undersøges

         
        // Her har vi en Block component der wrapper componenterne text og input. Disse bliver konfigureret led label, style og default value props
        // Vi tager input værdi og ændrer vores state variabler ved at bruge onChangeText
        return (
            // Her bruger vi KeyboardAvoidingView component der sikre at vores pop-up tastatur ikke står i vejen for vores felter
            // Vi bruger padding for at give en afstand fra tastatur til felter
            // Vi laver buttons i til "login" eller "forgot your password"
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base *2 ]}>
                    <Text h1 bold> Login </Text>
                    <Block middle>
                    
                        <Input 
                        label="Email"
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email') ]}
                        defaultValue={this.state.email} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        onChangeText = {text => this.setState({email: text})}
                        />

                        <Input 
                        //"secure" laver prikker i stedet for text
                        secure
                        label="Password"
                        // Dette gør teksten rød hvis bruger har indtastet forkert kodeord
                        error={hasErrors('password')}
                        style={[styles.input, hasErrors('password')]} 
                        defaultValue={this.state.password}
                        onChangeText = {text => this.setState({password: text})}
                        />
                        
                        <Button gradient onPress ={() => this.handleLogin()}> 
                            {loading ? <ActivityIndicator size="small" color="white"  
                            /> : 
                            <Text bold white center>Login</Text>    
                        }
                            
                        </Button>  

                        <Button onPress ={() => navigation.navigate('Forgot')}>
                            <Text  gray caption center style={{textDecorationLine: 'underline'}}>Forgot your password?</Text>
                        </Button>

                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}
// Her sætter vi styling på vores login component ved at fortælle den skal være centreret
const styles = StyleSheet.create({
    login:{
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
