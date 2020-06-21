import {FlatList, Image, TouchableOpacity, Text, View} from 'react-native';
import React, {Component} from 'react';
import MusicItem from '../Component/MusicItem';
let address='http://192.144.141.198:8080/MyCloudMusic'

export default class CollectionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }
    componentDidMount() {
        fetch(address+"/music/collection?name="+this.props.collection.collectionName,{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({data:responseJson.obj})
            }).catch((error) => {
            console.log(error);})

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
            <View style={{backgroundColor:"#333333",flex:1,paddingTop:15}}>
                <TouchableOpacity
                    onPress={this.props.navigation.goBack}
                    style={{
                        marginBottom:10
                    }}
                >
                    <Image
                        source={require("../src/image/back_icon.png")}
                        style={{height: 40, width: 40}}
                    />
                </TouchableOpacity>
                <View style={{flexDirection: 'row',marginBottom:5,paddingRight:15,paddingLeft:15}}>
                    <Image
                        source={{uri:this.props.collection.collectionImg}}
                        style={{height:100,width:100}}
                    />
                    <View style={{marginLeft:15}}>
                        <Text style={{fontSize:35,color:"#cccccc"}}>{this.props.collection.collectionName}</Text>
                        <Text style={{fontSize:20,color:"#cccccc"}}>发行商：{this.props.collection.collectionPublisher}</Text>
                        <Text style={{fontSize:20,color:"#cccccc"}}>语言：{this.props.collection.collectionLanguage}</Text>
                    </View>
                </View>
                <FlatList
                    style={{
                        paddingLeft:15
                    }}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>你的订单不存在</Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        )
    }
}
