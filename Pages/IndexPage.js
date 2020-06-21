import React, {Component} from 'react';
import {View,Text,TextInput,FlatList, StyleSheet,TouchableOpacity,Slider,Dimensions,Image } from 'react-native';

import MusicItem from '../Component/MusicItem';

let address='http://192.144.141.198:8080/MyCloudMusic'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state={data:[]}
    }

    componentDidMount() {
        fetch(address+"/music/top",{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({data:responseJson.obj})
            }).catch((error) => {
            console.log(error);})
    }
    _ItemSeparatorComponent=()=>{
        return <View style={{flex:1,backgroundColor:'#555555'}}></View>
    }

    _renderItem=({item,index})=>{
        return (
            <MusicItem
                itemInfo={item}
                delItem={()=>this._delete(item)}
                setMusicPlay={(data)=>this.getMusicInfo(data)}
            />
        )
    }

    render() {
        console.log(this.state.data)
        return (
            <View style={{backgroundColor:"#333333",flex:1}}>
                <View style={{marginTop:15,flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',marginBottom:10}}>
                    <Text style={{color:'#cccccc',fontSize:20}}>单曲排行Top10</Text>
                    <TouchableOpacity>
                        <Text style={{color:'#cccccc'}}> 全部歌曲 </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>加载中</Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        )
    }
}
