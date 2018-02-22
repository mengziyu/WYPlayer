/**
 * 本地音乐
 */

import React, {Component, PureComponent} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    NativeModules,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import BottomPlay from './BottomPlay';
import Home1 from './Home1';
import Constant from '../utils/Constant';
import PlayState from '../utils/PlayState';

let Player = NativeModules.PlayModule;
//音乐列表
let musicData=null;

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    itemClick(index){
        if(musicData){
            Player.play(musicData[index].path);

            //保存播放列表到本地
            AsyncStorage.setItem(Constant.PLAY_LIST_KEY,JSON.stringify(musicData));

            PlayState.currentIndex=index;
            PlayState.musicName=musicData[index].name;
            PlayState.playList=musicData;
            PlayState.isPlay=true;

            DeviceEventEmitter.emit(Constant.REFRESH_LIST_LISTENER);
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={()=>this.itemClick(this.props.index)}
            >
                <View style={styles.container}>
                    <View style={styles.itemContain}>

                        <Icon
                            name={'md-musical-notes'}
                            size={30}
                            style={{color: Common.themeColor, marginLeft: 10}}
                        />

                        <View style={styles.itemName}>
                            <Text style={styles.song}>
                                {this.props.song}
                            </Text>
                            <Text style={styles.singer}>
                                {this.props.singer}
                            </Text>

                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

class LocalMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    handleData(json) {
        let data = JSON.parse(json);
        if(data){
            //保存数量
            AsyncStorage.setItem(Constant.LOCAL_COUNT_KEY,data.length.toString());
            //通知更新数量
            DeviceEventEmitter.emit(Constant.REFRESH_COUNT_LISTENER,Constant.LOCAL_COUNT_KEY);

            this.setState({data: data});
            musicData=data;

        }else {
            ToastAndroid.show('无本地音乐文件');
        }
    }

    componentDidMount() {
        //扫描本地音乐文件
        Player.scanMusic((json) => this.handleData(json));
        //跳转到详情页
        DeviceEventEmitter.addListener(Constant.LOCAL_TO_PLAY_LISTENER,()=>{
            // this.props.navigation.navigate('Play');
        })
    }

    componentWillUnmount(){
        this.props.navigation.state.params.callback();
        console.log('local music page unmount');
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Common.themeColor}

                />

                <FlatList
                    data={this.state.data}
                    renderItem={({item,index}) =>
                        <ListItem song={item.name} singer={item.singer} index={index}/>
                    }
                    keyExtractor={(item, index) => index}
                />

                <BottomPlay id={'local_play'}/>
            </View>
        );
    }
}

module.exports = LocalMusic;

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContain: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
    },
    itemName: {
        marginLeft: 10,
    },

    song: {
        color: '#2d2d2d',
        fontSize: 16,
    },
    singer: {
        marginTop: 3,
        color: '#808080',
        fontSize: 13,
    }
});