import React, {Component} from 'react';
import {TouchableOpacity,Image,Text} from 'react-native';

export default class ArtistItem extends Component {
    constructor(props) {
        super(props)
    }
    toArtistInfo(item){
        this.props.navigation.navigate('ArtistInfo')
        this.props.setArtist(item)
    }
    render() {
        return (
            <TouchableOpacity
                style={{marginBottom:20,backgroundColor:'#ffffff00',borderRadius:5,padding:8}}
                onPress={(data)=>this.toArtistInfo(this.props.artist)}
            >
                <Image source={{uri:this.props.artist.artistImg}} style={{width:80,height:80,borderRadius:40}}/>
                <Text style={{fontSize:15,textAlign: 'center',marginTop:5,color:"#cccccc"}}>{this.props.artist.artistName}</Text>
            </TouchableOpacity>
        )
    }
}
