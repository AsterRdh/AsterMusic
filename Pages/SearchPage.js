import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    ProgressBarAndroid,
    Slider,
    DeviceEventEmitter, TextInput,
} from 'react-native';
import MusicItem from '../Component/MusicItem';
let address='http://192.144.141.198:8080/MyCloudMusic'
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            searchName:[]
        }
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

    componentDidMount=()=> {
    }

    searchMusic=()=>{
        fetch(address+"/music/search?name="+this.state.searchName,{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({data:responseJson.obj})
                console.log(responseJson)
            }).catch((error) => {
            console.log(error);})
    }
    onChangeText=(text)=>{
        this.setState({searchName:text})
    }

    render() {
        return (
            <View
                style={{
                    flex:1,
                    backgroundColor:"#333333",
                    paddingTop:20,
                    paddingLeft:20,
                    paddingRight:20
                }}
            >
                <View
                    onPress={this.toSearch}
                    style={styles.SearchInputStyle}
                >
                    <TextInput
                        style={{flex: 0.9,marginLeft: 15,color:"#cccccc",marginRight: 3}}
                        onChangeText={(text) => this.onChangeText(text)}
                    />
                    <TouchableOpacity
                        style={{flex: 0.1,justifyContent:'center',marginRight:15}}
                        onPress={()=>this.searchMusic()}
                    >
                        <Image source={require("../src/image/search_icon.png")} style={{resizeMode: 'contain',height:30,width:30}} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15,flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',marginBottom:10}}>
                    <Text style={{color:'#cccccc',fontSize:20}}>搜索</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text style={{color:'#cccccc'}}></Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        )
    }
}
let styles = StyleSheet.create({
    MainPageStyle:{
        backgroundColor: "#333333",
        flex:1
    },
    SearchInputStyle:{
        backgroundColor:"rgba(167,167,167,0.07)",
        paddingTop:0,
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:0,
        borderRadius:30,
        borderWidth:1.5,
        borderColor:"#00000033",
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        marginBottom:15,
        flexDirection: 'row'
    }
})
