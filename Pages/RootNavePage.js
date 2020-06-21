import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableOpacity,Image,Dimensions,ProgressBarAndroid,Slider,DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video'

import AdPage from './AdPage';
import MainNavePage from './MainNavePage';
import PlayerPage from './PlayerPage';
import PlayModeButtton from '../Component/PlayModeButtton';
import PlayerBar from '../Component/PlayerBar';
import PlayerFull from '../Component/PlayerFull';

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;
let RootStack = createStackNavigator();

let PlayButton

export default class RootNavePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: [],
            paused: true,
            music: [],
            musicIndex: 0,
            sliderValue: 0,
            currentTime: 0,
            musicList: [],
            ad: true,
            source: require('../src/image/pause2_icon.png'),
            key: 1,
        }
    }



    rootHomePage=({navigation})=>{
        this.setState({navigation:navigation})
        return(
            <MainNavePage
                navigation={navigation}
                testPlayerController={this.changePlay}
                musicList={this.state.musicList}
            />
            )
    }

    _closeAd=()=>{
        this.setState({ad:false})
    }

    playerPage=({navigation})=>{
        return(
            <PlayerFull
                navigation={navigation}
                testPlayerController={this.changePlay}
                paused={this.state.paused}
                musicList={this.state.musicList}
                music={this.state.music}
            />
            )
    }


    changePlay=()=>{
        if(this.state.paused){

            this.setState({paused:false,source:require('../src/image/pause2_icon.png')})
            DeviceEventEmitter.emit('paused',true)

        }else{
            this.setState({paused:true,source:require('../src/image/play2_icon.png')})
            DeviceEventEmitter.emit('paused',false);
        }
    }



    showAdPage=(navigation)=>{
        return(
            <AdPage navigation={navigation} closeAd={this._closeAd}/>
        )
    }


    coverMusicList=(musicList)=>{
        this.setState({musicList:musicList})
    }


    customerOnprogress(e){
        let time = e.currentTime;   // 获取播放视频的秒数
        this.setState({
            currentTime: time,
            sliderValue: time
        })
        DeviceEventEmitter.emit('nowTime',time);

    }

    buffer(){
        console.log("loading")
    }

    setPaused=(paused)=>{
        this.setState({paused: paused})

    }

    componentDidMount=()=> {
        let self=this;
        this.listener = DeviceEventEmitter.addListener('musicPass',function(musicInfo){
            self.setState({music:musicInfo,musicIndex:self.state.musicList.length+1})
        });

        this.listener = DeviceEventEmitter.addListener('pushMusic',function(musicInfo){
            self.state.musicList.push(musicInfo)
            console.log("pushMusic")
            console.log(self.state.musicList)
            self.setState({musicList:self.state.musicList})
        });

    }
    onEnd=()=>{
        console.log('state.musicList.length' + this.state.musicList.length);
        if(this.state.musicIndex==this.state.musicList.length){
            console.log("==l"+this.state.musicIndex)
            this.setState({musicIndex:1})
        }else {
            if(this.state.musicIndex<this.state.musicList.length) {
                console.log('!=l' + this.state.musicIndex);
                this.setState({musicIndex: this.state.musicIndex + 1});
            }
        }
        console.log("musicIndex:"+this.state.musicIndex-1)
        this.setState({music:this.state.musicList[this.state.musicIndex-1]})
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#555555"}}>
                <NavigationContainer>
                    <RootStack.Navigator>
                        {this.state.ad ? (
                            <>
                                <RootStack.Screen name={'AdPage'} options={{headerShown:false}} component={this.showAdPage}/>
                                <RootStack.Screen name={'RootHomePage'} options={{headerShown:false}} component={this.rootHomePage}/>
                            </>

                        ):(
                            <>
                                <RootStack.Screen name={'RootHomePage'} options={{headerShown:false}} component={this.rootHomePage}/>
                                <RootStack.Screen name={'PlayerPage'} options={{headerShown:false}} component={this.playerPage}/>
                            </>
                        )}

                    </RootStack.Navigator>
                </NavigationContainer>


                <Video
                    source={{uri: this.state.music.localAddress}}
                    ref={(ref) => {this.player = ref}}
                    onBuffer={this.onBuffer}
                    playInBackground={true}
                    audioOnly={true}
                    paused={this.state.paused}
                    onBuffer={this.buffer}
                    onLoad={this.buffer}
                    onProgress={(e) => this.customerOnprogress(e)}
                />
            </View>
        )
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
