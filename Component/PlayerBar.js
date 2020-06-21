import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableOpacity,Image,Dimensions,ProgressBarAndroid,Slider } from 'react-native';
import PlayButton from '../Component/PlayButton';

import Video from 'react-native-video';

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;

export default class PlayerBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            source: this.props.getSource()
        }
    }
    componentDidMount(){
        this.setState({source:this.props.getSource()})
        console.log("componentDidMount")
    }





    _toPlayerPage=()=>{
        this.props.rootNavigation.navigate('PlayerPage')
    }
    getS=()=>{
        console.log("getSource"+this.props.getSource())
    }

    _toPlayListPage=()=>{
        // this.props.rootNavigation.navigate('PlayList')
    }

    testPlayerController=()=>{
        this.setState({paused:this.props.testPlayerController(),source:this.props.getSource()})
        console.log("getSource"+this.props.getSource())
        console.log("state"+this.state.source)
    }


    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        height: MainHeight * 0.12,
                        button: 0,
                        width: MainWidth,
                        backgroundColor: "rgba(167,167,167,0.07)"
                    }}
                    onPress={() => this._toPlayerPage()}
                >
                    <View style={{flexDirection: 'row', marginBottom: 15, height: MainHeight * 0.12 - 7}}>
                        <Image source={require("../src/image/cd.png")} style={styles.MusicImageStyle}/>
                        <View style={{marginLeft: 5, marginTop: 5, width: 170}}>
                            <Text style={{fontSize: 25, color: "#cccccc"}}>歌曲名</Text>
                            <Text style={{fontSize: 20, color: "#cccccc"}}>歌手-专辑</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={()=>this.testPlayerController()}>
                                <Image source={this.state.source} style={{height: 60,width:60,resizeMode:"contain"}}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginRight: 5}}
                                onPress={this._toPlayListPage}
                            >
                                <Image source={require("../src/image/play_list_icon.png")}
                                       style={{right: 0, height: 40, width: 40}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ProgressBarAndroid
                        styleAttr={"Horizontal"}
                        progress={0.2}
                        indeterminate={false}
                        color={"#d50845"}
                        style={{position: 'absolute', bottom: -6, left: 0, right: 0,}}
                    />
                </TouchableOpacity>
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
