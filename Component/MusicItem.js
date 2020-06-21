import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableOpacity,Slider,Image,DeviceEventEmitter } from 'react-native';

export default class MusicItem extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    playMusic=()=>{
        let music=this.props.itemInfo
        DeviceEventEmitter.emit('musicPass',music)
        DeviceEventEmitter.emit('pushMusic',music)
        console.log(music)
    }

    pushToMusicList=()=>{
        let music=this.props.itemInfo
        DeviceEventEmitter.emit('pushMusic',music)
    }

    render() {
        return (
            <TouchableOpacity style={itemStyles.container} onPress={()=>this.playMusic()}>
                <View style={itemStyles.itemInfoViewStyle}>
                    <Image
                        style={itemStyles.infoImageStyle}
                        source={{uri:this.props.itemInfo.musicImg}}/>
                    <View style={{flex:1}}>
                        <Text style={itemStyles.infoTextStyle} ellipsizeMode={'tail'} numberOfLines={1}>{this.props.itemInfo.musicName}</Text>
                        <Text style={itemStyles.singerTextStyle}  ellipsizeMode={'tail'} numberOfLines={2}>{this.props.itemInfo.musicArtist}-{this.props.itemInfo.musicCollection}</Text>
                    </View>
                </View>
                <View style={itemStyles.ButtonViewStyle}>
                    <TouchableOpacity style={itemStyles.buttonStyle} onPress={()=>this.pushToMusicList()}>
                        <Image source={require('../src/image/add_music_list.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

}
let itemStyles = StyleSheet.create({
    container: {
        margin:2,
        borderRadius:5,
        flexDirection: 'row',
        height: 60,

    },
    itemInfoViewStyle:{
        flexDirection: 'row',
        flex:0.8,
    },
    ButtonViewStyle:{
        flex: 0.2,
    },
    buttonStyle:{
        borderRadius:5,
        flex:1,
        marginTop:5,
        marginBottom:5,
        marginEnd:5,
        justifyContent:'center',
        alignItems:'center',
    },
    button2Style:{
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        flex:1,
        marginTop:1,
        marginBottom:5,
        marginEnd:5,
        backgroundColor:'#923922',
    },
    buttonTextStyle:{
        textAlign: 'center',
        fontSize:30,
        color:'#ffffff',
    },
    infoTextStyle:{
        textAlign: 'left',
        fontSize:18,
        color:'#cccccc'
    },
    singerTextStyle:{
        textAlign: 'left',
        fontSize:14,
        color:'#cccccc'
    },
    infoImageStyle:{
        borderRadius:5,
        margin: 5,
        height: 50,
        width:50,
        resizeMode: 'contain',
    }
});
