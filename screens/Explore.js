import React, { Component } from 'react'
import {Animated, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {Card, CardItem } from 'native-base';
import * as Icon from 'react-native-vector-icons';
import {Button, Input, Block, Text, Course, RecommendedCardItem, Divider} from '../components';
import {LinearGradient} from 'expo-linear-gradient';
import { theme, mocks } from '../constants';


const{width, height} = Dimensions.get('window');
 
class Explore extends Component {
    // VI har flyttet kurser til state, så søge funktionen kan søge i state
        state = {
            searchFocus: new Animated.Value(0.6),
            searchString: null,
            courses: [
                {
                    itemName: "HA(it.): Introduction to Informations Systems and Informations Systems Development",
                    itemCreator: "Instructor: Oliver Hillersborg (Grade: 12)",
                    itemPrice: "Kr. 100",
                    savings: "12 hours content, 7 exercises, 300 students",
                    imageUri: require("../assets/images/Oliver.png"),
                    rating: 5,
                },
                { 
                    itemName:"HA(it.): Introduction to Informations Systems and Informations Systems Development ",
                    itemCreator:"Instructor: Casper Overlade Rasmussen (Grade: 10)",
                    itemPrice:"Kr. 70",
                    savings:"10 hours content, 6 exercises, 200 students",
                    imageUri: require("../assets/images/Casper.png"),
                    rating:5,
                },
                {
                    itemName:"HA(it.): Introduction to Informations Systems and Informations Systems Development ",
                    itemCreator:"Instructor: Sebastian Fagerstrand (Grade: 7)",
                    itemPrice:"Kr. 50",
                    savings:"9 hours content, 6 exercises, 220 students",
                    imageUri:require("../assets/images/Sebastian.png"),
                    rating:4,
                },
                {
                    itemName:"HA(it.): Introduction to Informations Systems and Informations Systems Development ",
                    itemCreator:"Instructor: Thomas Rune Bengtsen (Grade: 04)",
                    itemPrice:"Kr. 20",
                    savings:"6 hours content, 5 exercises, 150 students",
                    imageUri: require("../assets/images/TRB.png"),
                    rating:3
                },
                {
                    itemName:"HA(it.): Inføring i organisationers opbygning og funktion ",
                    itemCreator:"Instructor: Oliver Hillsborg (Grade: 12)",
                    itemPrice:"Kr. 100",
                    savings:"12 hours content, 7 exercises, 300 students",
                    imageUri:require("../assets/images/Oliver.png"),
                    rating:5,
                },
                {
                    itemName:"HA(it.): Inføring i organisationers opbygning og funktion ",
                    itemCreator:"Instructor: Sebastian Fagerstrand (Grade: 10)",
                    itemPrice:"Kr. 70",
                    savings:"11 hours content, 6 exercises, 270 students",
                    imageUri:require("../assets/images/Sebastian.png"),
                    rating:5
                },
                {
                    itemName:"HA(it.): Inføring i organisationers opbygning og funktion ",
                    itemCreator:"Instructor: Thomas Bengtsen (Grade: 7)",
                    itemPrice:"Kr. 50",
                    savings:"8 hours content, 5 exercises, 200 students",
                    imageUri:require("../assets/images/TRB.png"),
                    rating:4   
                },
                {
                    itemName:"HA(it.): Inføring i organisationers opbygning og funktion ",
                    itemCreator:"Instructor: Casper Overlade Ramussen (Grade: 04)",
                    itemPrice:"Kr. 20",
                    savings:"4 hours content, 4 exercises, 100 students",
                    imageUri:require("../assets/images/Casper.png"),
                    rating:3
                },
                {
                    itemName:"HA(it.): Virksomhedens beslutningssituationer (VØS1) ",
                    itemCreator:"Instructor: Oliver Hillsborg (Grade: 12)",
                    itemPrice:"Kr. 100",
                    savings:"12 hours content, 7 exercises, 300 students",
                    imageUri:require("../assets/images/Oliver.png"),
                    rating:5
                },
                {
                    itemName:"HA(it.): Virksomhedens beslutningssituationer (VØS1) ",
                    itemCreator:"Instructor: Casper Overlade Ramussen (Grade: 10)",
                    itemPrice:"Kr. 70",
                    savings:"10 hours content, 6 exercises, 205 students",
                    imageUri:require("../assets/images/Casper.png"),
                    rating:5 
                },
                {
                    itemName:"HA(it.): Virksomhedens beslutningssituationer (VØS1) ",
                    itemCreator:"Instructor: Sebastian Fagerstrand (Grade: 7)",
                    itemPrice:"Kr. 50",
                    savings:"6 hours content, 4 exercises, 120 students",
                    imageUri:require("../assets/images/Sebastian.png"),
                    rating:4 
                },
                {
                    itemName:"HA(it.): Virksomhedens beslutningssituationer (VØS1) ",
                    itemCreator:"Instructor: Thomas Rune Bengtsen (Grade: 04)",
                    itemPrice:"Kr. 20",
                    savings:"4 hours content, 3 exercises, 100 students",
                    imageUri:require("../assets/images/TRB.png"),
                    rating:4 
                },
                {
                    itemName:"HA(it.): Programmering og udvikling af små systemer og databaser ",
                    itemCreator:"Instructor: Oliver Hillsborg (Grade: 12)",
                    itemPrice:"Kr. 100",
                    savings:"12 hours content, 7 exercises, 300 students",
                    imageUri:require("../assets/images/Oliver.png"),
                    rating:5 
                },
                {
                    itemName:"HA(it.): Programmering og udvikling af små systemer og databaser ",
                    itemCreator:"Instructor: Sebastian Fagerstrand (Grade: 10)",
                    itemPrice:"Kr. 100",
                    savings:"10 hours content, 6 exercises, 250 students",
                    imageUri:require("../assets/images/Sebastian.png"),
                    rating:5
                },
                {
                    itemName:"HA(it.): Programmering og udvikling af små systemer og databaser ",
                    itemCreator:"Instructor: Thomas Rune Bengtsen (Grade: 7)",
                    itemPrice:"Kr. 50",
                    savings:"8 hours content, 5 exercises, 150 students",
                    imageUri:require("../assets/images/TRB.png"),
                    rating:4 
                },
                {
                    itemName:"HA(it.): Programmering og udvikling af små systemer og databaser ",
                    itemCreator:"Instructor: Casper Overlade Rasmussen (Grade: 7)",
                    itemPrice:"Kr. 50",
                    savings:"8 hours content, 5 exercises, 160 students",
                    imageUri:require("../assets/images/Casper.png"),
                    rating:5 
                }
            ]
        }

    handleSearchFocus(status){
        Animated.timing(
            this.state.searchFocus,
            {
                toValue: status ? 0.8 : 0.6, // Status === true, increase flex size
                duration: 150, // ms
            }
        ).start()
    }
    
    renderSearch(){
        const {searchString, searchFocus} = this.state;
        const isEditing = searchFocus && searchString;

        //find ud af hvad onrightpress funktionens syntax

        return(
            <Block animated middle flex={searchFocus} style={styles.search}>
                <Input 
                    placeholder="Search"
                    placeholderTextColor={theme.colors.gray2}
                    style={styles.searchInput}
                    onFocus={() => this.handleSearchFocus(true)}
                    onBlur={() => this.handleSearchFocus(false)}
                    onChangeText={text => this.setState({searchString: text})}
                    value={searchString}
                    onRightPress={() => isEditing ? this.setState({searchString: null}) : null}
                    rightStyle={styles.searchRight}
                    rightLabel={
                        <Icon.FontAwesome
                            name={isEditing ? "close" : "search"}
                            size={theme.sizes.base/1.6}
                            color={theme.colors.gray2}
                            style={styles.searchIcon}
                        />}
                />
            </Block>
        )
    }

    //tjek hvordan man bruger den der key i touchable opacity
    renderImage(img, index) {
        const { navigation } = this.props;
        const sizes = Image.resolveAssetSource(img);
        const fullWidth = width - (theme.sizes.padding * 2.5);
        const resize = (sizes.width * 100) / fullWidth;
        const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;
    
        return (
          <TouchableOpacity
            key={`img-${index}`}
            onPress={() => navigation.navigate('Product')}
          >
            <Image
              source={img}
              style={[
                styles.image,
                { minWidth: imgWidth, maxWidth: imgWidth }
              ]}
            />
          </TouchableOpacity>
        )
      }
    
      //Should be deleted at some point
      renderExplore() {
        const { images, navigation } = this.props;
        const mainImage = images[0];
    
        return (
          <Block style={{ marginBottom: height / 3 }}>
            <TouchableOpacity
              style={[ styles.image, styles.mainImage ]}
              onPress={() => navigation.navigate('Product')}
            >
              <Image source={mainImage} style={[styles.image, styles.mainImage]} />
            </TouchableOpacity>
            <Block row space="between" wrap>
              {
                images.slice(1).map((img, index) => this.renderImage(img, index))
              }
            </Block>
          </Block>
        )
      }

      renderCourseList(){
        const { images, navigation } = this.props;
        // Vi finder på baggrund af indtastet søgning/data, om bogstavet ingår i vores kusus tekst. Kan evt laves om til hvad kurset starter med.
        const searchBasedCourses = this.state.courses.filter(course => {
            const { searchString } = this.state;
            
            if (!searchString) {
                return true;
            } else {
                return course.itemName.includes(searchString);
            }
        });

        return(
        <Card style={{ borderColor:"transparent" }}>

{
                searchBasedCourses.map(course => (
                    <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                        <RecommendedCardItem
                            itemName={ course.itemName }
                            itemCreator={ course.itemCreator }
                            itemPrice={ course.itemPrice }
                            savings={ course.savings }
                            imageUri={ course.imageUri }
                            rating={ course.rating }
                            onImageClick={ () => navigation.navigate("Profile") }
                        />
                    </TouchableOpacity>
                ))
            }
            


        </Card>
        )
      }

    renderFooter(){
        return(
            <LinearGradient 
            locations={[0.5, 1]}
            style={styles.footer}
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
            >
                <Button gradient style={{width: width/2.678}}>
                    <Text bold white center>Filter</Text>
                </Button>
            </LinearGradient>
            
            )
    }

    render() {
   
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold> Courses </Text>
                    {this.renderSearch()}
                </Block>
                
                <ScrollView showsVerticalScrollIndicator={false}  >
                    {this.renderCourseList()}
                </ScrollView>
                

                {this.renderFooter()}
            </Block>
        )
    }
}

Explore.defaultProps= {
    images: mocks.explore
};

export default Explore; 

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base*2,
        borderBottomColor:theme.colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomStartRadius: theme.sizes.base * 1.2,
        borderBottomEndRadius: theme.sizes.base * 1.2
    },
    search: {
        height: theme.sizes.base*2,
        width: width - theme.sizes.base*2,
        
    },
    searchInput: {
       fontSize: theme.sizes.caption,
       height: theme.sizes.base*2,
       backgroundColor: 'rgba(142, 142, 147, 0.06)',
       borderColor: 'rgba(142, 142, 147, 0.06)',
       paddingLeft: theme.sizes.base /1.33,
       paddingRight: theme.sizes.base * 1.5,

    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent'
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6,
    },
    explore: {
        marginHorizontal: theme.sizes.padding*0.6,
    },
    image:{
        minHeight: 100,
        maxHeight: 130,
        maxWidth: width - (theme.sizes.padding * 2.5),
        marginBottom: theme.sizes.base,
        borderRadius: 4,
    },
    mainImage:{
        minWidth: width - (theme.sizes.padding * 2.5) ,
        minHeight: width - (theme.sizes.padding * 2.5),

    },
    footer: {
        position: 'absolute',
        bottom: 0, 
        right: 0,
        left:0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height *0.1,
        width, 
        paddingBottom: theme.sizes.base*4,
    }
})
