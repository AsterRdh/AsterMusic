import {ScrollView, View} from 'react-native';
import React, {Component} from 'react';
import ArtistItem from '../Component/ArtistItem';
let address='http://192.144.141.198:8080/MyCloudMusic'

export default class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state={data:[],itemList:[]}
    }

    componentDidMount() {
        fetch(address+"/artist/all",{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({data:responseJson.obj})
                responseJson.obj.forEach(
                    this._putCollectionToList
                )
            }).catch((error) => {
            console.log(error);})
    }

    _putCollectionToList=(item,index)=>{
        this.state.itemList.push(
            <ArtistItem
                artist={item}
                setArtist={(item)=>this.props.setArtist(item)}
                navigation={this.props.navigation}
            />
        )
        this.setState({})
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
            </View>
        )
    }
}
