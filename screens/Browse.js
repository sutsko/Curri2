import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import {Card, Button, Block, Text} from '../components';
import { theme, mocks } from '../constants';

class Browse extends Component {

    state={
        active: 'Semesters',
        categories: [],
    }

    componentDidMount(){
        this.setState({categories: this.props.categories});
    }

    handleTab = tab =>{
        const {categories} = this.props;
        const filtered = categories.filter(
            category => category.tags.includes(tab.toLowerCase()) //tolowercase since that is how we have set up our categories
        );

        this.setState({active: tab, categories: filtered});
    }

    renderTab(tab){
    const {active} =this.state;
    const isActive = active === tab;

    //secondary is a style that is set for the isactive tab
    return (
        <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={(
            styles.tab,
            isActive ? styles.active : null //undersøg hvad det her er for en syntax
        )}
        >
            <Text title medium gray={!isActive} secondary={isActive}> {tab} </Text> 
        </TouchableOpacity>
    )
    }


    render() {
        const{navigation} = this.props;
        const{categories} = this.state;
        const tabs = ['Semesters', 'Your Courses', 'Favorites'] //Det her skal være vores kategorier. Alle produkter, dine kurser, køb kurser. Skal ændres inde i "kategorier"
//Find ud af hvad der sker i touchable opacity funktionen
//Find ud af hvad der sker categories.map
//Indholdet i hvert card findes ligesom ved class.getname i java ish. 
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold> Curri(ous)? </Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                     <Image
                     source={require("../assets/icons/settings.png")} //Reffering to the props
                     style={styles.avatar}
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
    profile: mocks.profile,
    categories: mocks.categories,
}
export default Browse;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2 
    },
    avatar: {
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
        //This should be dynamic based on screen width 
        width: 150,
        height: 150,
    },
})
