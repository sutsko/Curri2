import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

