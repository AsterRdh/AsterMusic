import React, {Component} from 'react';
import {View,TextInput,TouchableOpacity,Image,Dimensions,Text} from 'react-native';

export default class PlayModeButtton extends Component {
    constructor(props) {
        super(props);
        this.state = {states: true}
    }

    render() {
        switch (this.props.mode) {
            case 1:
                return(
                    <TouchableOpacity>
                        <Image
                            source={require("../src/image/loop_icon.png")}
                            style={{height: this.props.Mheight,width:this.props.Mwidth,resizeMode:"contain"}}
                        />
                    </TouchableOpacity>
                    )
            case 2:
                return(
                    <TouchableOpacity>
                        <Image
                            source={require("../src/image/random_icon.png")}
                            style={{height: this.props.Mheight,width:this.props.Mwidth,resizeMode:"contain"}}
                        />
                    </TouchableOpacity>
                )
            default :
                return (<View>

                </View>)

        }
    }
}
