import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableOpacity,Image,Dimensions,ProgressBarAndroid,Slider } from 'react-native';
import PlayButton from '../Component/PlayButton';
import PlayModeButtton from '../Component/PlayModeButtton';
import Video from 'react-native-video';

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;

export default class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            paused:false,
            source:this.props.getSource()
        }
    }

    componentDidMount(){
        this.setState({paused:this.props.paused,source:this.props.getSource()})
        console.log("componentDidMount")
        console.log(this.state.source)
    }


    getS=()=>{
        console.log("getSource"+this.props.getSource())
    }

    _toPlayListPage=()=>{
        // this.props.rootNavigation.navigate('PlayList')
    }
    testPlayerController=()=>{
        this.props.testPlayerController()
        this.setState({paused:this.props.paused,source:this.props.getSource()})
        this.componentDidMount()
        console.log("getSource"+this.props.getSource())
        console.log("state"+this.state.source)
    }


    render() {
        return (
            <View style={{backgroundColor: "#555555", flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={this.props.rootNavigation.goBack}
                    >
                        <Image
                            source={require("../src/image/back_icon.png")}
                            style={{height: 60, width: 60}}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{color: '#cccccc', fontSize: 25, marginTop: 5}}>歌曲名</Text>
                        <Text style={{color: '#cccccc', fontSize: 15, marginTop: 5}}>歌手名</Text>
                    </View>
                </View>
                <View>

                    <View style={{alignItems: 'center', padding: 1}}>
                        <Image source={require("../src/image/cd.png")} style={{
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
                            onPress={()=>this.testPlayerController()}>
                            <Image source={this.state.source} style={{height: 70,width:70,resizeMode:"contain"}}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
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
