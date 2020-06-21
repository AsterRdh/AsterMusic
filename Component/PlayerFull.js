import {DeviceEventEmitter, Image, Slider, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import PlayModeButtton from './PlayModeButtton';
export default class MainNavePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            source: require('../src/image/pause2_icon.png'),
            progress:0,
        }
        console.log("constructor:"+this.props.paused)
        if(this.props.paused){
            this.state.source=require('../src/image/pause2_icon.png')
        }else {
            this.state.source=require('../src/image/play2_icon.png')
        }

    }
    componentWillUnmount(){
        this.listener.remove();
    }

    componentDidMount=()=> {
        console.log("componentDidMount:"+this.props.paused)
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
        this.listener = DeviceEventEmitter.addListener('nowTime',function(time){
            console.log("!!FullPlayMusic")
            self.setState({progress:time/self.props.music.musicLenth})
        });
    }

    nextMusic=()=>{
        console.log("next")
        console.log(this.props.musicList)
    }

    render() {
        return (
            <View style={{backgroundColor: "#555555", flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={this.props.navigation.goBack}
                    >
                        <Image
                            source={require("../src/image/back_icon.png")}
                            style={{height: 60, width: 60}}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{color: '#cccccc', fontSize: 25, marginTop: 5}}>{this.props.music.musicName}</Text>
                        <Text style={{color: '#cccccc', fontSize: 15, marginTop: 5}}>{this.props.music.musicArtist}</Text>
                    </View>
                </View>
                <View>
                    <View style={{alignItems: 'center', padding: 1}}>
                        <Image source={{uri:this.props.music.musicImg}} style={{
                            width: 250,
                            height: 250,
                            borderWidth: 2,
                            borderColor: "#333333",
                            marginBottom: 50,
                            marginTop: 30
                        }}/>
                    </View>
                    <Slider
                        minimumTrackTintColor={"#a0a0a0"}
                        maximumTrackTintColor={"#7b7b7b"}
                        thumbTintColor={"#d5d5d5"}
                        value={this.state.progress}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: 100,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginTop: 20
                    }}>
                        <PlayModeButtton mode={1} Mheight={40} Mwidth={40}/>
                        <TouchableOpacity>
                            <Image
                                source={require("../src/image/last_icon.png")}
                                style={{height: 50, width: 50}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.props.testPlayerController()}>
                            <Image source={this.state.source} style={{height: 70,width:70,resizeMode:"contain"}}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.nextMusic}
                        >
                            <Image
                                source={require("../src/image/next_icon.png")}
                                style={{height: 50, width: 50}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.getS}
                        >
                            <Image
                                source={require("../src/image/play_list_icon.png")}
                                style={{height: 40, width: 40}}
                            />
                        </TouchableOpacity>
                    </View>

                </View>





            </View>
        )
    }
}
