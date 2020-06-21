import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableOpacity,Image,Dimensions,ProgressBarAndroid,Slider,DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';

import HomePage from './HomePage';
import PlayerPage from './PlayerPage';
import PlayButton from '../Component/PlayButton';
import PlayList from '../Component/PlayList';
import CollectionInfo from './CollectionInfo';
import ArtistInfo from './ArtistInfo';
import PlayerBar from '../Component/PlayerBar';
import SearchPage from './SearchPage';

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;

let Stack = createStackNavigator();



let MiniPlayer
export default class MainNavePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            adPage:[],
            sliderValue:0,
            musicList:[],
            navigation:[],
            paused:false,
            collection:[],
            artist:[],
            source: require('../src/image/pause2_icon.png'),
            musicInfo:[],
            progress:0,
        }
    }
    _showHome=({navigation})=>{
        this.setState({navigation:navigation})
        return(<HomePage navigation={navigation} setCollection={this.setCollection} setArtist={this.setArtist}/>)
    }
    _showSearchPage=({navigation})=>{
        return(<SearchPage navigation={navigation}/>)
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

    UNSAFE_componentWillMount() {
        Orientation.lockToPortrait();
    }

    _showPlayList=()=>{
        return(
            <PlayList
                data={this.props.musicList}
            />
            )
    }
    _showCollection=({navigation})=>{
        return(<CollectionInfo navigation={navigation} setCollection={this.setCollection} collection={this.state.collection}/>)
    }

    _showArtistInfo=({navigation})=>{
        return(
            <ArtistInfo
                navigation={navigation}
                setArtist={this.setArtist}
                artist={this.state.artist}
                setCollection={this.setCollection}
            />
            )
    }

    setArtist=(item)=>{
        this.setState({artist:item})
        console.log(this.state.artist)
    }
    _toPlayList=()=>{
        this.state.navigation.navigate('PlayList')
    }
    _toSearchPage=()=>{
        this.state.navigation.navigate('SearchPage')
    }

    setCollection=(item)=>{
        this.setState({collection:item})
        console.log("this.state.collection")
        console.log(this.state.collection)
    }


    refreshPage=(paused)=>{
        console.log("!MainReCalData")
        console.log(paused)
        this.setState({paused:paused})
        console.log("!MainReCal")
        console.log(this.state.paused)

    }

    _toPlayerPage=(navigate)=>{
        this.props.rootNavigation.navigation.navigate('PlayerPage')
    }
    componentDidMount=()=> {
        let self = this;
        this.listener = DeviceEventEmitter.addListener('paused',function(paused){
            console.log("!!Mini")
            self.setState({
                paused:paused
            })
            if(paused){
                self.setState({source: require('../src/image/play2_icon.png')})
            }else {
                self.setState({source: require('../src/image/pause2_icon.png')})
            }
        });
        this.listener = DeviceEventEmitter.addListener('musicPass',function(musicInfo){
            console.log("!!MiniPlayMusic")
            self.setState({musicInfo:musicInfo})
        });
        this.listener = DeviceEventEmitter.addListener('nowTime',function(time){
            console.log("!!MiniPlayMusic")
            self.setState({progress:time/self.state.musicInfo.musicLenth})
        });

    }
    componentWillUnmount(){
        this.listener.remove();
    }



    render() {
        return (
            <View style={{flex:1,backgroundColor:"#555555"}}>
                <View style={{flex:1}}>
                    <NavigationContainer
                        independent={true}
                    >
                        <Stack.Navigator
                        >
                            <Stack.Screen
                                name="Home"
                                options={{headerShown:false}}
                                component={this._showHome}
                            />
                            <Stack.Screen
                                name={"PlayList"}
                                options={{headerShown:false}}
                                component={this._showPlayList}
                            />
                            <Stack.Screen
                                name={"CollectionInfo"}
                                options={{headerShown:false}}
                                component={this._showCollection}
                            />
                            <Stack.Screen
                                name={"ArtistInfo"}
                                options={{headerShown:false}}
                                component={this._showArtistInfo}
                            />
                            <Stack.Screen
                                name={"Search"}
                                options={{headerShown:false}}
                                component={this._showSearchPage}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            height: MainHeight * 0.12,
                            button: 0,
                            width: MainWidth,
                            backgroundColor: "rgba(167,167,167,0.07)"
                        }}
                        onPress={()=>this.props.navigation.navigate('PlayerPage')}
                        >
                        <View style={{flexDirection: 'row', marginBottom: 15, height: MainHeight * 0.12 - 7}}>
                            <Image source={{uri:this.state.musicInfo.musicImg}} style={styles.MusicImageStyle}/>
                            <View style={{marginLeft: 5, marginTop: 5, width: 170}}>
                                <Text style={{fontSize: 25, color: "#cccccc"}}>{this.state.musicInfo.musicName}</Text>
                                <Text style={{fontSize: 20, color: "#cccccc"}}>{this.state.musicInfo.musicArtist}-{this.state.musicInfo.musicCollection}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity
                                    onPress={()=>this.props.testPlayerController()}
                                    style={{width: 70}}
                                >
                                    <Image source={this.state.source} style={{height: 70,width:70,resizeMode:"contain"}}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{marginRight: 5}}
                                    onPress={this._toPlayList}
                                >
                                    <Image source={require("../src/image/play_list_icon.png")}
                                           style={{right: 0, height: 40, width: 40}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ProgressBarAndroid
                            styleAttr={"Horizontal"}
                            progress={this.state.progress}
                            indeterminate={false}
                            color={"#d50845"}
                            style={{position: 'absolute', bottom: -6, left: 0, right: 0,}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}
let styles = StyleSheet.create({
    MainPageStyle:{
        backgroundColor: "#555555"
    },
    MusicImageStyle:{
        resizeMode: 'contain',
        height:MainHeight*0.12-13,
        width:MainHeight*0.12-13,
        margin:5,
        borderColor: "#333333",
        borderWidth: 2
    },
    PassButtonStyle:{
        backgroundColor:"#00000011",
        paddingTop:10,
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:10,
        borderRadius:20,
        borderWidth:1.5,
        borderColor:"#00000033",
    }


})
