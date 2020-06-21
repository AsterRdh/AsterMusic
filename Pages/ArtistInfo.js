import {FlatList, Image, TouchableOpacity, Text, View,ScrollView} from 'react-native';
import React, {Component} from 'react';
import MusicItem from '../Component/MusicItem';
import CollectionItem from '../Component/CollectionItem';
let address='http://192.144.141.198:8080/MyCloudMusic'

export default class ArtistInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [],collection:[]}
    }
    componentDidMount() {
        fetch(address+"/collection/artist?artistName="+this.props.artist.artistName,{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({collection:responseJson.obj})
            }).catch((error) => {
            console.log(error);})

        fetch(address+"/music/artist?name="+this.props.artist.artistName,{method:'GET'})
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
    setCollection(){
        return 0
    }
    _renderItem2=({item,index})=>{
        console.log("_renderItem2")
        console.log(item)
        return (
            <CollectionItem
                navigation={this.props.navigation}
                setCollection={(item)=>this.props.setCollection(item)}
                collection={item}
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
                        source={{uri:this.props.artist.artistImg}}
                        style={{height:100,width:100}}
                    />
                    <View style={{marginLeft:15}}>
                        <Text style={{fontSize:35,color:"#cccccc"}}>{this.props.artist.artistName}</Text>
                        <Text style={{fontSize:20,color:"#cccccc"}}>国籍：{this.props.artist.artistContory}</Text>
                        <Text style={{fontSize:20,color:"#cccccc"}}>{this.props.artist.artistTyep}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:20,color:"#cccccc",marginBottom:5}}>专辑</Text>
                        <FlatList
                            style={{
                                paddingLeft:15
                            }}
                            horizontal={true}
                            data={this.state.collection}
                            renderItem={this._renderItem2}
                            keyExtractor={(item)=>item.id}
                            ListEmptyComponent={<Text>你的订单不存在</Text>}
                            ItemSeparatorComponent={this._ItemSeparatorComponent}
                        />
                    </View>

                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:20,color:"#cccccc"}}>热门单曲</Text>
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
                </ScrollView>

            </View>
        )
    }
}
