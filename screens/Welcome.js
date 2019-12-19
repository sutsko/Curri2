import React, {Component} from 'react';
import {Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView} from 'react-native'; 

import {Button, Block, Text} from '../components';
import { theme } from '../constants';
import { WebView } from 'react-native-webview';

/*Dimensions har vi importeret fra react-native. Den tillader os at få højden og bredden på app-skærmen. 
Dette er nyttigt da vi så kan konfigurere styling ved at bruge disse variabler. */
const {width, height} = Dimensions.get('window');

class Welcome extends Component{
    static navigationOptions = {
        header: null
    }

   /* For at få animationen med at scrolle og skifte dots fungerer bruger vi igen Animated komponenten, hvortil en variable scrollX er initieret. Denne variable
    gemmer vores animeringsværdi for den horizontale animation.  */ 
    scrollX = new Animated.Value(0);

    /*Vi definerer en statevariable vi kalder showTerms, da den skal håndtere indtog og aftog af vores TOS Modal komponent. */
    state = {
        showTerms: false,
    }

    renderTermsService(){
        return(
            /*
            Modal er en komponent der kan vise noget, oven på en anden komponent. 
            visible ={this.state.showTerms}: This will slide up the terms. What is to be displayed comes from the state. If state showterms is false, no terms are displayed
            Vi har konfigureret MOdal komponenten med nogle props: 
            - animationType, der er sat til slide, gør at Modal "slider" op når man trykker på Terms of Service knappen, og ligeså slider ned når den lukkes.
            - visible, håndtere hvorvidt Modal skal vises eller ej på baggrund af showTerms state værdien (falsk eller sand)
            - onRequestClose bruges til når en user bruger en tilbageknap på den fysiske telefon.

            ScrollView gør det scrollable. 

            Ved at trykke på knappen, sættes stateværdien til falsk, da man så gerne vil lukke TOS-siden ned igen.  
            */
            <Modal animationType="slide" visible ={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}> 
                <Block padding={[theme.sizes.padding * 2 , theme.sizes.padding]} space="between">
                 <Text h2 light>TERMS OF SERVICE</Text>  
                 <ScrollView style={{paddingVertical: theme.sizes.padding}}>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis. . </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>2. Support for Curri services is only available in English, via e-mail. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>3. You understand that Curri uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Curri, or any other Curri service.. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>5. You may use the Curri Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not uCurri Pages in violation of Curri's trademark or other rights or in violation of applicable law. Curri reserves the right at all times to reclaim any Curri subdomain without liability to you. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>6. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Curri. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>7. We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>8. Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Curri customer, employee, member, or officer will result in immediate account termination. </Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>9. You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</Text>
                    <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>10. You must not upload, post, host, or transmit unsolicited e-mail, SMSs, or "spam" messages.</Text>
                </ScrollView> 
                 
                 <Button gradient onPress={() => this.setState({ showTerms:false})}>
                    <Text center white>I understand</Text>  
                 </Button>
                </Block>
            </Modal>
        )
    }

/*
renderIllustration() skal danne vores horisonterbart scrollene billeder. Vores FlatList som bruges til det her, konfigurerer vi med forskellige elementer: 
- pagingEnabled, som er sat til true: Dette betyder, at når man scroller sidelens, at scrollet stoppper ved hvert billede. Er den false, kan man stoppe hvorend i hele scrollviewet. 
- scrollEnabled, som er default til true: hvilket lader scroll fungerer via touch interaktion. 
- showsHorizontalScrollIndicator, som er sat til false: Dette gør, at scroll baren ikke vises i bunden, når man scroller.
- Vi har også brugt en keyExtractor som bruges til at identificere hver item i listen af billeder. Derefter bruges renderItem proppen til at returnere, hvad jeg kunne læse mig frem til, 
  et slags template af hver eneste item i listen. Hvilket i dette tilfælde er hver eneste Image component fra "illustrations" arrayet.
- Vi bruger width og height som vi importerede tidligere til at definere billedernes styling 
*/
    renderIllustrations(){
        const {illustrations} = this.props;

        return(
           /*Inspiration fra: https://facebook.github.io/react-native/docs/flatlist */
           <FlatList
                horizontal
                pagingEnabled={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                data={illustrations}
                extraData={this.state} 
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item}) => (
                    <Image 
                        source={item.source} 
                        resizeMode="contain"
                        style={{width, height:height/2, overflow: 'visible' }}
                    />
                )}

                /*Den her del gør, at når man scroller igennem billederne, at dots'ene fader ud i forhold til det. 
                Dette gøres ved at konfigurere scrollX værdien ind i onScroll eventet hos FlatList komponenten heri renderIllustrations().
                Det er lidt svært at forklare, men såvidt jeg forstår gør vi brug af Animated komponentens event funktion, der så tager nativeEvent som parameter. 
                Dertil har vi defineret contentOffset værdien i forhold til scrollX variablen i nativeEvent konfigurationen.*/ 
                onScroll={
                    Animated.event([{
                      nativeEvent: { contentOffset: { x: this.scrollX } }
                    }])
                  }
           />
        ) 
    }

    /*renderSteps() vil skabe vores scroll dots, som er lig med antallet at illustrationer.
    Vi bruger igen illustationerne som properties for denne funktion. 
    For at få den rette dot per illustration(er) vist, bruger vi map() funktionen på arrayet af illustrationer. 
    Dette vil iterere over hvert item i illustrationsarrayet og returnere templated for hvert item - i dette tilfælde at sætte mængden af dots lig med antallet 
    af illustrationer.
    
    Vi vil som sagt gerne have animationen af scroll dots'ene til at afhænge af onScroll eventet i Flatlisten med billederne i renderIllustrations().
    For dette initierer vi først hver "stepPosition" vi er i, ved at gøre brug af divide funktionen hos der er i Animation komponenten 
    Divide funktionen skaber en ny animeringsværdi, der kommer af at dividere den første animerede værdi med den anden animerede værdi, så vidt jeg forstår.*/

    renderSteps() {
        const { illustrations } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width);

        /* Følgende laver vi nogle konfigurationer for at tilføje animationen til vores scroll dots: 
           Først definerer vi en konstant kaldet opacity (Gennemsigtighed), som bliver initieret gennem interpolate() funktionen af stepPosition konstanten, defineret ovenfor,
           der aftedskommer af Animated.divide. Funktionen interpolate() tager vores inputRange, outputRange en extrapolate-værdi som parametre. Denne funktion tillader at mappe 
           vores input ranges til forskellige output ranges (altså flere billeder, giver flere dots og animationer, så vidt jeg forstår).
           Opacity konstanten bruges bare til at style komponenten.    
         */

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

/* Vi laver et array som komponentens default prop, som indeholder billeder med et ID.  */
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