import React, {Component} from 'react';
import {View,Text,TextInput, StyleSheet,TouchableOpacity,Slider,Dimensions,Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IndexPage from './IndexPage';
import CollectionPage from './CollectionPage';
import ArtistPage from './ArtistPage';

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    _showIndexPage(){
        return(<IndexPage/>)
    }
    _showArtistPagePage=()=>{
        return(<ArtistPage
            navigation={this.props.navigation}
            setArtist={this.props.setArtist}/>)
    }
    _showCollectionPage=()=>{
        return(<CollectionPage navigation={this.props.navigation} setCollection={this.props.setCollection}/>)
    }

    toSearch=()=>{
        this.props.navigation.navigate('Search')
    }

    render() {
        return (
                <View
                    style={styles.MainPageStyle}
                >
                    <TouchableOpacity
                        onPress={this.toSearch}
                        style={styles.SearchInputStyle}
                    >
                        <TextInput
                            style={{flex: 0.9,marginLeft: 15,color:"#cccccc",marginRight: 3}}
                            editable={false}
                        />
                        <TouchableOpacity
                            style={{flex: 0.1,justifyContent:'center',marginRight:15}}
                            // onPress={()=>this._test()}
                        >
                            <Image source={require("../src/image/search_icon.png")} style={{resizeMode: 'contain',height:30,width:30}} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginLeft:10,
                            marginRight: 10,
                            flex: 1
                        }}
                    >
                        <Tab.Navigator
                            tabBarOptions ={{
                                inactiveTintColor: '#aaaaaa',
                                activeTintColor: '#cccccc',
                                style:{
                                    backgroundColor:'#444444',
                                    borderRadius:5

                                },
                            }}
                            backBehavior={'none'}
                        >
                            <Tab.Screen name="推荐" component={this._showIndexPage} />
                            <Tab.Screen name="专辑" component={this._showCollectionPage} />
                            <Tab.Screen name="歌手" component={this._showArtistPagePage} />

                        </Tab.Navigator>
                    </View>

                </View>
            )
        }
}
let styles = StyleSheet.create({
    MainPageStyle:{
        backgroundColor: "#333333",
        flex:1
    },
    SearchInputStyle:{
        backgroundColor:"rgba(167,167,167,0.07)",
        paddingTop:0,
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:0,
        borderRadius:30,
        borderWidth:1.5,
        borderColor:"#00000033",
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        marginBottom:15,
        flexDirection: 'row'
    }
})
