import React, { Component } from 'react';
import {Dimensions, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import {Button, Divider, Block, Text, Panel} from '../components';
import { theme, mocks } from '../constants';

import * as Icon from 'react-native-vector-icons';
import { WebView } from 'react-native-webview';




const{width, height} = Dimensions.get('window');
 

 class Product extends Component {
    static navigationOptions= ({navigation}) => {
        return {
            headerRight: (
                <Button onPress={() => {}}>
                    <Icon.Entypo name="dots-three-horizontal" color={theme.colors.gray} />
                </Button>
            )
        }
    }

    //Undersøg hvordan en flatlist bare kan være lukket sådan der
renderGallery(){
    const {product } = this.props;
    return (
        <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={true}
            snapToAlignment="center"
            data={product.images}
            keyExtractor={(item, index) => `${item}`}
            renderItem={({item}) => (
                <Image 
                source={item}
                resizeMode="contain"
                style={{width, height: height / 2.8}}
                />
            )}
        />
    );
}

    render() {
        const {product} = this.props;
        //find ud af hvad product.images.slice betyder. 
        return (
        

            <ScrollView showsVerticalScrollIndicator={false}>
                <Block style={{width, height: height / 2.8 }}>
                    
                        <WebView
                            source={{
                                html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/1UxA6JzoT-4?playsinline=1"></iframe>'
                            }}
                            useWebKit={true}
                            originWhitelist={['*']}
                            allowsInlineMediaPlayback={true}
                           />
                </Block>
                
                <Block style={styles.product}>
                    <Text h2 bold>{product.name}</Text>
                    <Block flex={false} row margin={[theme.sizes.base, 0]}>
                        {product.tags.map(tag => (
                            <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                            {tag}
                            </Text>
                        ))}
                    </Block>
                    <Text  gray light height={22} >{product.description}</Text>

                    <Divider margin={[theme.sizes.padding * 0.9, 0]}/>

                    <Block>
                        <Text semibold>Modeller</Text>
                        <Block row margin={[theme.sizes.padding * 0.9, 0]}>
                            {product.images.slice(1, 3).map(
                                (image, index) => (
                                    <Image 
                                    key={`gallery-${index}`}
                                    source={image} 
                                    style={styles.image} 
                                    />
                                )
                            )}
                            <Block 
                            flex={false} 
                            card 
                            center 
                            middle 
                            color="rgba(197,204,214,0.20)"
                            style={styles.more}
                            >
                                <Text gray>+{product.images.slice(3).length}</Text>
                            </Block>
                        </Block>

                        <Divider margin={[theme.sizes.padding * 0.9, 0]}/>

                    </Block>
                    
                </Block>
                    <Panel />
                
                    
            </ScrollView>
           
           
            
        )
    }
}

Product.defaultProps ={
    product: mocks.products[0], //det her kan man nok ændre på, så det ikke kun er produkt index 0, som er det eneste den referer til
}

export default Product;

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: theme.sizes.base*2,
        paddingTop: theme.sizes.padding,
        
    },
    tag: {
        borderColor: theme.colors.gray2,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.sizes.base,
        paddingHorizontal: theme.sizes.base ,
        paddingVertical: theme.sizes.base / 2.5,
        marginRight: theme.sizes.base * 0.625,

    },
    image: {
        width: width /3.26,
        height: width / 3.26,
        marginRight: theme.sizes.base
    },
    more:{
        width:55,
        height:55
    },
    container: {
        flex: 1,
        borderColor: theme.colors.gray,
        
      },

})
