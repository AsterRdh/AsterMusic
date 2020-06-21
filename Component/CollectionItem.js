import React, {Component} from 'react';
import {TouchableOpacity,Image,Text} from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    _showCollection(item){
        this.props.navigation.navigate('CollectionInfo')
        this.props.setCollection(item)
    }

    render() {
        return (
            <TouchableOpacity
                style={{marginBottom:20,backgroundColor:'#55555577',borderRadius:5,padding:8}}
                onPress={(data)=>this._showCollection(this.props.collection)}
            >
                <Image source={{uri:this.props.collection.collectionImg}} style={{width:80,height:80}}/>
                <Text style={{fontSize:15,textAlign: 'center',marginTop:5,color:"#cccccc"}}>{this.props.collection.collectionName}</Text>
            </TouchableOpacity>
        )
    }
}
