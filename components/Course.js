import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import Block from './Block';
import { mocks, theme } from '../constants'

export default class Course extends Component {
    render() {
        return (
            <Block row>
                <Block>
                    <Image style={styles.avatar} source={mocks.profile.avatar}/>
                </Block>
                <Block>
                    <Text>Title</Text>
                    <Text>by author</Text>
                    <Block 
                            flex={false} 
                            card 
                            center 
                            middle 
                            color="rgba(197,204,214,0.20)"
                            style={styles.more}
                            >
                                <Text gray>billede af hjerte + course likes</Text>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    more:{
        width:55,
        height:55
    },
    avatar: {
        height: theme.sizes.base * 5,
        width: theme.sizes.base * 5,
    },
})
