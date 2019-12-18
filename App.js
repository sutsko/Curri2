import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';

import Navigation from './navigation';
import {Block} from './components';

//import all used images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/avatar.png'),
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

