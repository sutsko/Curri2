import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import {Button, Block, Text, Input} from '../components';
import { theme } from '../constants';

const VALID_EMAIL = "contact@curri.com";
const VALID_PASSWORD = "Itube";


export default class Login extends Component {
    state={
        email: VALID_EMAIL, //Should be changed to "" later so no value show up. 
        password: VALID_PASSWORD,
        errors:[],
        loading:false,
     }


    handleLogin(){
        const {navigation} =this.props;
        const {email, password} = this.state; 
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading:true});

        //Check with backend API or with some statid data, and the state is loading while it is doing that. REIMPLEMENT WITH FIREBASE
        //Set timeout only for demo of getting data wait period setTimeout(()=> {login code}, 2000)
            if(email !== VALID_EMAIL){
            errors.push('email')
            }
            if(password !== VALID_PASSWORD){
                errors.push('password')
            }
            this.setState({errors, loading: false})

            if(!errors.length){
                navigation.navigate("Browse");
            }
    }
    
    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null; //Den her skal undersøges
        //NOTE MÅSKE DER ER EN LET MÅDE AT TILGÅ FACE UNLOCK PÅ, SÅ MAN IKKE BEHØVER KODE. 
        //"secure" makes dots instead of plain text
        //The behavour ="padding" will make it so when you press the input to type, the screen will shift so the keyboard does not overlap the inputs. 
        // The textdecoration line just underscores it 
        return (
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
                        secure
                        label="Password"
                        error={hasErrors('password')} //This makes the Text red if they type the wrong password
                        style={[styles.input, hasErrors('password')]} //Har det der password måske noget med "key" at gøre i den svære linje langt oppe?
                        defaultValue={this.state.password}
                        onChangeText = {text => this.setState({password: text})}
                        />

                        <Button gradient onPress ={() => this.handleLogin()}> 
                            {loading ? <ActivityIndicator size="small" color="white" //Find ud af hvad kolonet nedenfor er til. 
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
