import React, { Component } from "react";
import {View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Right } from 'native-base'
import StarRating from 'react-native-star-rating';

class RecommendedCardItem extends Component {
    render() {
        return (
            <CardItem style = {
                {flex: 1, flexDirection: 'row'}
            }>
            

            <TouchableOpacity onPress={ this.props.onImageClick }>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <Image 
                        style={{ height: 100, width: 100, borderRadius: 100/2, }}
                        source={this.props.imageUri} />
                </View>

            </TouchableOpacity>

                <Right style={{ flex: 3, alignItems: 'flex-start', height: '100%', paddingHorizontal: 20 }}>
                    <Text>{this.props.itemName}</Text>
                    <Text style={{ color: 'grey', fontSize: 11 }}>{this.props.itemCreator}</Text>
                    <Text/>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#c4402f' }}>{this.props.itemPrice}</Text>
                    <Text style={{ color: 'grey', fontWeight: '300', fontSize: 11 }}>
                    {this.props.savings}
                    </Text>

                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.props.rating}
                        starSize={12}
                        fullStarColor='orange'
                        emptyStarColor='orange'


                    />
                </Right>
            </CardItem>
        );
    }
}
export default RecommendedCardItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});