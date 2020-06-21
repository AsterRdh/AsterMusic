import {View, ScrollView, Image, Text, FlatList,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import CollectionItem from '../Component/CollectionItem';
import { createStackNavigator } from '@react-navigation/stack';
import ListItemBase from '../Component/MusicItem';
let Stack = createStackNavigator();

let address='http://192.144.141.198:8080/MyCloudMusic'
export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state={data:[],itemList:[],collectionInfo:[],musicList:[],infoView:[]}
    }

    componentDidMount() {
        fetch(address+"/collection/all",{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({data:responseJson.obj})
                responseJson.obj.forEach(
                    this._putCollectionToList
                )
            }).catch((error) => {
            console.log(error);})
    }

    getMusicInfo(data){
        this.props.setMusicPlay(data)
    }


    _putCollectionToList=(item,index)=>{
        this.state.itemList.push(
                <CollectionItem
                    collection={item}
                    setCollection={(item)=>this.props.setCollection(item)}
                    navigation={this.props.navigation}
                />
            )
        this.setState({infoView:[]})
    }


    render() {
        return (
            <View style={{flex: 1,backgroundColor:"#333333"}}>
                <ScrollView>
                    <View
                        style={{flexDirection: 'row', flexWrap:"wrap",justifyContent:'space-between',padding:15}}
                        ref={(ref) => this.ItemListView = ref}
                    >
                        {this.state.itemList}
                    </View>
                </ScrollView>

                {this.state.infoView}
            </View>
        )
    }
}
