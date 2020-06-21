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
    DeviceEventEmitter,
} from 'react-native';
import MusicItem from './MusicItem';

export default class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state={
            musicList:[]
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
        console.log("this.props.data")
        console.log(this.props.data)
        this.setState({musicList:this.props.data})
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
                <Text
                    style={{
                        color:'#cccccc',
                        fontSize:30
                    }}
                >
                    当前播放 ({this.state.musicList.length})
                </Text>
                <FlatList
                    data={this.state.musicList}
                    renderItem={this._renderItem}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>加载中</Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        )
    }
}
