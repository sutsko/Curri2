import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import {Card, Button, Block, Text} from '../components';
import { theme, mocks } from '../constants';

class Browse extends Component {
    //Her sætter vi "Semesters" som predefineret aktiv når appen åbnes. Denne initieres inde i renderTab() funktionen, hvori der er en konstant kaldet "isActive"
    //som afhænger af denne state-værdi
    state={
        active: 'Semesters',
        categories: [],
    }

    componentDidMount(){
        this.setState({categories: this.props.categories});
    }
    // Denne funktion filtrere hvilke semesters der er under hvilke over kategorier
    handleTab = tab =>{
        const {categories} = this.props;
        const filtered = categories.filter(
            category => category.tags.includes(tab.toLowerCase()) //tolowercase since that is how we have set up our categories
        );

        this.setState({active: tab, categories: filtered});
    }

    /* 
    Denne funktion returnerer et template for tab-sektionerne. 
    Her bruger vi TouchableOpacity komponenten som "parent component" hvilket vi endvidere har konfigureret med forskellige props: 
    - key, bruges til at identificere hvilken tab der er i brug prop
    - derudover har vi også nogle styling properties på både TouchableOpacity og Text der afhænger af hvad værdien af isActive state-værdien er.
     */

    renderTab(tab){
    const {active} =this.state;
    const isActive = active === tab;
    return (
        // Denne funktion viser designet af den pågældende tab man har trykket på. Altså om dens state er akitv og derfor får en anden style
        /* onPress eventet i TouchableOpacity komponenten gør, at state af isActive state variablen ændrer sig på baggrund af hvad der klikkes på */
        <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={(
            styles.tab,
            isActive ? styles.active : null
        )}
        >
            <Text title medium gray={!isActive} secondary={isActive}> {tab} </Text> 
        </TouchableOpacity>
    )
    }

    //Dette er vores kategorier
    render() {
        const{navigation} = this.props;
        const{categories} = this.state;
        /*Vi definer et array af tabs, med date svarende til vores tab titler */
        const tabs = ['Semesters', 'Your Courses', 'Favorites'] 

        //Dette er implementeringen af vores header funktion med tilhørende text og settings icon samt "onPress" skal føres os videre til settings siden.
        //under dette laver vi vores array af tabs.
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold> Curri(ous)? </Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                     <Image
                     source={require("../assets/icons/settings.png")} 
                     style={styles.settingsbutton}
                     />
                    </Button>
                </Block>
                
                <Block flex={false} space="around" row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView showsHorizontalScrollIndicator={false} style={{paddingVertical:theme.sizes.base*2}}
                >
                    <Block flex={false} row space="between" style={styles.categories}> 
                    {categories.map(category => (
                    /* ^^ I forhold til ovenstpende map-funktion: Siden kategori-prop'en er i arrayformat, itererer vi gennemm hver eneste af dem ved bruge map() 
                    funktionen. Sådan får vi kategori-kortet for hver sektion. Derfor får TouchableOpacity komponenten nu key-prop'en for hver kategori og identificerer dem.
                     
                    
                    Her laves funktionen der gør vi kan trykke på et semester og blive viderstillet til Explore screen samt designet på disse kategorier.
                    Vi bruger ScrollView som hovedkomponent, hvor vi har brugt showsVerticalScrollIndicator til at fjerne scroll-baren. TouchableOpacity komponenten
                    bruger et onPress event til at navigere til den rigtige Explore/katorgi skærm. Vi har ikke differentieret på det endnu, og sender alt til samme side. 
                    */
                     <TouchableOpacity 
                     key = {category.name}
                     onPress={() => navigation.navigate('Explore', {category})}>
                        <Card center middle shadow style={styles.category}>

                                <Image source={category.image} ></Image> 
                            
                            <Text medium height={20}>{category.name} </Text>
                            <Text gray caption>{category.count} videos </Text>
                        </Card>
                    </TouchableOpacity>   
                    ))}
                    </Block>
                </ScrollView>
                
            </Block>
        )
    }
}

//Jeg tror at de props, er det samme som at sende en class med fra java. Her sender vi bare et element fra den anden side med. a
Browse.defaultProps = {
    categories: mocks.categories,
}
export default Browse;

//Her bliver alt vores indhold designet
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2 
    },
    settingsbutton: {
        height: theme.sizes.base * 1.9,
        width: theme.sizes.base * 1.9,
        borderRadius: (theme.sizes.base * 2.2)/2
    },
    tabs:{
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base*2,
    },
    tab: { 
        marginRight: theme.sizes.base*2,
        paddingBottom: theme.sizes.base,
    },
    active:{
        borderBottomColor: theme.colors.secondary, 
        borderBottomWidth: 3, 
    },
    categories:{
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base*2,
        marginBottom: theme.sizes.base*3.5,
    },
    category:{
        width: 150,
        height: 150,
    },
})
