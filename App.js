import React from 'react';
import { StyleSheet} from 'react-native';
import firebase from 'firebase';

import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';

import Navigation from './navigation';
import {Block} from './components';

//Vi kan importere alle billederne og cache dem på følgende måde (gemme billederne i et array). Kan vi måske implementere senere?
const images = [
  require('./assets/icons/settings.png'),
];

export default class App extends React.Component{
  state = {
    isLoadingComplete: false,
    user: null,
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDqvLR0596zY_ih_saNlVdNzW_rroFEzKI",
    authDomain: "curriproject.firebaseapp.com",
    databaseURL: "https://curriproject.firebaseio.com",
    projectId: "curriproject",
    storageBucket: "curriproject.appspot.com",
    messagingSenderId: "1012098305029",
    appId: "1:1012098305029:web:f9ae815a25c93820cb606c",
    measurementId: "G-8FKWG6G84L",
    };
    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    // Vi opsætter en event handler som udføres hver gang authentication state ændres,
    // Dvs når en bruger fx logger ind/ud/tilmelder sig
    this.authStateChangeUnsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log('onAuthStateChanged', { U: user });

        this.setState({ user });
      });
  }


  /* I sammenhæng med caching array'et ovenfor skulle følgende handlerecoursesAsync også implementeres: 
   Meningen er at vi definerer en cacheImages konstant som bliver initieret til map() array funktionen - som mapper vores images konstant altså.
   Selve map() af array'et funktionen fungerer ved at iterere gennem hvert eneste billede i array'et og returner dem til at være cached i download.  
   Denne cache bliver så returneret via et "Promise" 
  Lastly, this function returns the cacheImages constant as a Promise. 
  */
  handleresourcesAsync = async () => {
    //We are caching all the images
    //For better performance on the app
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

 render(){
   //So if loading is not complete and you cant skip loading screen: 
   // Get all images and cache them, if there is an error, diplay it. 
   //When the async function finished, set a new state. 
   if(!this.state.isLoadingComplete && !this.props.skipLoadingScreen){
     return (
       <AppLoading 
       startAsync = {this.handleresourcesAsync}
       onError = {error => console.warn(error)}
       onFinish = { () => this.setState({isLoadingComplete:true})}
       />
     )
   }

  return (
    <Block white>
      <Navigation/>
    </Block>
  );
 }
}

const styles = StyleSheet.create({
});

