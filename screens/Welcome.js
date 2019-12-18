import React, {Component} from 'react';
import {Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView} from 'react-native'; //Look into MODAL

import {Button, Block, Text} from '../components';
import { theme } from '../constants';
import { WebView } from 'react-native-webview';


const {width, height} = Dimensions.get('window');

class Welcome extends Component{
    static navigationOptions = {
        header: null
    }

    //Den her skal undersøges
    scrollX = new Animated.Value(0);

    state = {
        showTerms: false,
    }

    renderTermsService(){
        return(
            //Undersøg den her formatterign: padding={[theme.sizes.padding * 1.5 , theme.sizes.padding]}
         /* visible ={this.state.showTerms}: This will slide up the terms. What is to be displayed comes from the state. If state showterms is false, no terms are displayed */
            <Modal animationType="slide" visible ={this.state.showTerms}> 
                <Block padding={[theme.sizes.padding * 2 , theme.sizes.padding]} space="between">
                 <Text h2 light>TERMS OF SERVICE</Text>  
                 <ScrollView style={{paddingVertical: theme.sizes.padding}}>
                    <Text caption gray height={18}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum molestiae illo quos quisquam, voluptas beatae, sint quidem nulla a aspernatur eaque eos tempore. Blanditiis nam quos voluptatibus, sint distinctio iusto? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                    <Text caption gray height={18}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis iure nostrum magnam perspiciatis hic fugit ab amet sunt, blanditiis id autem iusto corporis nesciunt vero culpa voluptate reiciendis nulla! Pariatur? </Text>
                 </ScrollView> 
                 
                 <Button gradient onPress={() => this.setState({ showTerms:false})}>
                    <Text center white>I undershtand</Text>  
                 </Button>
                </Block>
            </Modal>
        )
    }
/* THIS SHOULD BE IMPLEMENTED LATER. FOR NOW SEE INLINE FUNCTION AT LOGINBUTTON
    handleLogin() {
        //auth with 3rd party service This is where we use firebase
        navigation.navigate('Login')
    }
    */

    renderIllustrations(){
        const {illustrations} = this.props;

        return(
           /*We have used inspiration from documentation: https://facebook.github.io/react-native/docs/flatlist */
           <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment ="center"
                data={illustrations}
                extraData={this.state} 
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({item}) => (
                    <Image 
                        source={item.source} 
                        resizeMode="contain"
                        style={{width, height:height/2, overflow: 'visible' }}
                    />
                )}
                //This makes it so that when you scroll, the dots will fade correspondingly. 
                onScroll={
                    Animated.event([{
                      nativeEvent: { contentOffset: { x: this.scrollX } }
                    }])
                  }
           />
        ) 
    }

    renderSteps() {
        const { illustrations } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width);
        return (
          <Block row center middle style={styles.stepsContainer}>
            {illustrations.map((item, index) => {
              const opacity = stepPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
    
              return (
                <Block
                  animated
                  flex={false}
                  key={`step-${index}`}
                  color="gray"
                  style={[styles.steps, { opacity }]} //Tuborgklammerne om opacity gør at de fader lidt ud. 
                />
              )
            })}
          </Block>
        )
      }


    render(){
        const {navigation} = this.props;
        /*{this.renderTermsservice}: This will display the terms using the render terms service function from above */
        /* {this.renderIllustrations and renderSteps}: These functions will render the picture and steps to log in. References functions above   */
        /*Handlelogin is defined above. Should be implemented instead of this inline function*/
        /* navigation.navigate ('SignUp'): This will take you to the signuppage. Navigation is imported from navigation compontent */
        /* this.setState({showTerms: true}): This will show all of the terms, from the renderTerms*/
        
        return(
         <Block>
                <Block center bottom flex={0.4} >
                    <Text h1 center bold>
                        Your Study.
                        <Text h1 secondary> Easier.</Text>
                    </Text>
                    <Text h3 gray2 style={{marginTop:theme.sizes.padding/2}}>Enjoy your curri(osity). </Text>
                </Block>
                
                <Block center middle style={{marginTop:theme.sizes.padding}}> 
                {this.renderIllustrations()}
                {this.renderSteps()}
            </Block>

          <Block middle flex={0.5} margin={[0, theme.sizes.padding*2]}>
              <Button gradient onPress={() => navigation.navigate('Login')}> 
                  <Text center semibold white>Login</Text>
              </Button>
              <Button shadow onPress={() => navigation.navigate('Signup')}> 
                  <Text center semibold>Sign Up</Text>
              </Button>
              <Button onPress={() => this.setState({showTerms: true})}> 
                  <Text center caption gray>Terms of use</Text>
              </Button>          
          </Block>
          
            {this.renderTermsService()} 
            
            
        </Block>
        )
    }
}

Welcome.defaultProps = {
    illustrations: [
        { id: 1, source: require('../assets/curri_done/illustrationer_curri/illustration_3.png')},
        { id: 2, source: require('../assets/curri_done/illustrationer_curri/illustration_5.png')},
        { id: 3, source: require('../assets/curri_done/illustrationer_curri/illustration_1.png')},
        
        
    ]
}

export default Welcome; 

const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base*2,
        right: 0,
        left: 0.
    },

    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal:2.5, 

    }
})