import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import Slider from 'react-native-slider';

import {Divider, Button, Block, Text, Switch} from '../components';
import { theme, mocks } from '../constants';

// Her implementeres prædefinerede variabler som standard , så man har noget at ændre udfra når man åbner app'en.
class Settings extends Component {
    state={
        budget: 850,
        monthly: 1700,
        notifications: true, 
        newsletter: false,
        editing: null,
        profile: {},
    }
    // Vi initierer profil state variabel til profil prop data. Dette er defineret nede i default props. 
    componentDidMount(){
        this.setState({profile: this.props.profile});
    }
    // Denne funktion tager navnet på brugeren og tekst værdi fra input component for at kunne ændre og gemme i input felterne. Derefter sættes state til det nye navn.
    handleEdit(name, text) {
        const{profile} = this.state;
        profile[name] = text;

        this.setState({profile});
    }
    // Denne funktioner gør det muligt for os at ændre i informationer ved at klikke på "edit" knappen.
    toggleEdit (name) {
        const {editing} = this.state
        // Vi ændrer "editing" state på baggrund af den værdi fra edit, til enten navn eller null ***
        this.setState({editing: !editing ? name : null}) 
    }
    // Denne funktion retunerer enten TextInput eller Text componenten baseret på værdien fra editing state værdien som er sat af toogleEdit
    renderEdit (name) {
        const {profile, editing} = this.state;

        if(editing === name){
            return(
                <TextInput 
                    defaultValue={profile[name]}
                    onChangeText={text => this.handleEdit([name], text)}
                />
            )
        }
        return <Text bold> {profile[name]}</Text>
    }

    // Dette er implementeringen af vores header funktion med tilhørende text og settings icon
    // Linje: 65. Dette viser billede af den brugte profil 
    // Linje 73. Her implementeres to Block components der holder template for lokation og email inputs. De har fået InputRow som style navn
    // Linje 96. Her implmenteres sliders som efterfølgende får forskellige props, som eks. maks/min værdi, længde mm.
    // Linje 133. Her implmenteres to Block med hhv notification og newsletter. Denne Block wrapper en swtich som gør 
    // vi kan skifte state gennem onValueChange
    render() {
        const {profile, editing} = this.state;
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Settings</Text>
                    <Button >
                        <Image
                        source={profile.avatar} 
                        style={styles.avatar}
                        />
                    </Button>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[10,0]} styles={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>Username</Text>
                                {this.renderEdit('username')}
                            </Block>
                            <Text medium secondary onPress={() => this.toggleEdit('username')}>
                                {editing ==='username' ? 'Save' : 'Edit'}
                            </Text>
                        </Block>
                        <Block row space="between" margin={[10,0]} styles={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>Location</Text>
                                {this.renderEdit('location')}
                            </Block>
                            <Text medium secondary onPress={() => this.toggleEdit('location')}>
                                {editing ==='location' ? 'Save' : 'Edit'}
                            </Text>
                        </Block>
                        <Block row space="between" margin={[10,0]} styles={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>E-mail</Text>
                                <Text bold>{profile.email}</Text>
                            </Block>
                        </Block>
                    </Block>
                    <Divider margin={[theme.sizes.base, theme.sizes.base*2 ]}/>

                    <Block style={styles.sliders}>
                        <Block margin={[10, 0]}>
                            <Text gray2 style={{marginBottom: 10}}>Budget</Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={1000}
                                style={{height:19}}
                                thumbStyle={styles.thumb}
                                trackStyle={{height: 6, borderRadius: 6}}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor="rgba(157,163,180,0.10)"
                                value={this.state.budget}
                                onValueChange={value => this.setState({budget:value})}
                            />
                            <Text caption gray right>DKK 1000</Text>
                        </Block>

                        <Block margin={[10, 0]}>
                            <Text gray2 style={{marginBottom: 10}}>Monthly Cap</Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={5000}
                                style={{height:19}}
                                thumbStyle={styles.thumb}
                                trackStyle={{height: 6, borderRadius: 6}}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor="rgba(157,163,180,0.10)"
                                value={this.state.monthly}
                                onValueChange={value => this.setState({monthly: value})}
                            />
                            <Text caption gray right>DKK {this.state.monthly.toFixed(0)}</Text>
                        </Block>
                    </Block>

                    <Divider/>

                    <Block style={styles.toggles}>
                        <Block row center space="between" style={{marginBottom: theme.sizes.base*2}}>
                            <Text  gray2>Notification</Text>
                            <Switch
                                value={this.state.notifications}
                                onValueChange = {value => this.setState({notifications: value})}
                            />
                        </Block>

                        <Block row center space="between" style={{marginBottom: theme.sizes.base*2}}>
                            <Text  gray2>Newsletter</Text>
                            <Switch
                                value={this.state.newsletter}
                                onValueChange = {value => this.setState({newsletter: value})}
                             />
                        </Block>
                    </Block>

                </ScrollView>
            </Block>
        )
    }
}

Settings.defaultProps = {
    profile: mocks.profile,
}

export default Settings;

// Her styles forskellige elementer i størrelser og positioner
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2 
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
        borderRadius: theme.sizes.base * 2.2/2,
    }, 
    // Her designes vores input 
    inputs:{
        marginTop:theme.sizes.base*0.7,
        paddingHorizontal: theme.sizes.base*2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop:theme.sizes.base*0.7,
        paddingHorizontal: theme.sizes.base*2,
    },
    thumb:{
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white', 
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base*2, 
    }
})
