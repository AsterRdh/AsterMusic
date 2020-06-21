import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, Dimensions, View, StyleSheet} from 'react-native';
let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;
let address='http://192.144.141.198:8080/MyCloudMusic'
export default class RootNavePage extends Component {
    constructor(props) {
        super(props);
        this.state={ad:[],timeCount:5,adImg:""}
    }
    _dismissAdPage=()=>{
        this.props.navigation.navigation.navigate("RootHomePage")
        this.props.closeAd()
    }
    componentDidMount() {
        this.scrollBar();
        fetch(address+"/ad/",{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({ad:responseJson.obj})
            }).catch((error) => {
            console.log(error);})
    }

    scrollBar=()=>{
        this.timer=setInterval(
            ()=>{
                if(this.state.timeCount>0)
                    this.setState({timeCount:this.state.timeCount-1});
                else {
                    clearInterval(this.timer);
                    this._dismissAdPage();
                }
            },1000
        )
    }

    render() {
        return (
            <View style={{position: 'absolute',top:0,left:0,bottom:0,right:0}}>
                <Image source={{uri:"http://192.144.141.198:8080/MyCloudMusic/resource/bab78705-c7ba-4e70-8bc0-6da95147ffd6.png",height:MainHeight,width:MainWidth}}/>
                <View style={{position: 'absolute',top:15,right:15}}>
                    <TouchableOpacity
                        style={styles.PassButtonStyle}
                        onPress={this._dismissAdPage}
                    >
                        <Text
                            style={{color:"#cccccc"}}
                        >跳过 {this.state.timeCount} 秒</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
let styles = StyleSheet.create({
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
