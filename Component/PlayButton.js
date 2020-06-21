import React, {Component} from 'react';
import {View,TextInput,TouchableOpacity,Image,Dimensions,Text} from 'react-native';

export default class PlayButton extends Component {
    constructor(props) {
        super(props);
        this.state={paused:this.props.paused,source:require('../src/image/pause2_icon.png')}
    }

    testPlayerController=()=>{
        this.props.testPlayerController()
    }

    reRender=()=>{
        console.log("ReRender")
        this.setState()
        console.log(this.props.source)
    }
    render() {
        return (
            <TouchableOpacity onPress={()=>this.testPlayerController()}>
                <Image source={this.props.source} style={{height: this.props.Mheight,width:this.props.Mwidth,resizeMode:"contain"}}/>
            </TouchableOpacity>
        )
    }
}
