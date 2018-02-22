/**
 * 网络音乐
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
    ActivityIndicator,
} from 'react-native';
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import BottomPlay from './BottomPlay';
import Home1 from './Home1';
import Constant from '../utils/Constant';
import PlayState from '../utils/PlayState';

let Player = NativeModules.PlayModule;
//音乐列表
let musicData = [];
let songIds = ['569695775', '573313333', '572596274', '571050458', '569080829'];
let requireCount = 0;
let dataIndex = 0;

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    itemClick(index) {
        if (musicData.length > 0) {
            Player.play(musicData[index].path);

            //保存播放列表到本地
            AsyncStorage.setItem(Constant.PLAY_LIST_KEY, JSON.stringify(musicData));

            PlayState.currentIndex = index;
            PlayState.musicName = musicData[index].name;
            PlayState.playList = musicData;
            PlayState.isPlay = true;

            DeviceEventEmitter.emit(Constant.REFRESH_LIST_LISTENER);
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.itemClick(this.props.index)}
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

                        <TouchableNativeFeedback>
                            <View style={styles.right}>
                                <Icon
                                    name={'md-more'}
                                    size={25}
                                />
                            </View>
                        </TouchableNativeFeedback>

                    </View>

                </View>

            </TouchableOpacity>

        );
    }
}

class NetMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            load: false,
        }
    }

    handleData(json) {
        //解析json
        let list = json.data.songList;
        //保存每条数据
        musicData[dataIndex++] = {name: list[0].songName, singer: list[0].artistName, path: list[0].songLink};
        //请求完毕后处理数据
        if (++requireCount >= songIds.length) {

            if (musicData.length > 0) {
                //保存数量
                AsyncStorage.setItem(Constant.NET_COUNT_KEY, musicData.length.toString());
                //通知更新数量
                DeviceEventEmitter.emit(Constant.REFRESH_COUNT_LISTENER, Constant.NET_COUNT_KEY);
                this.setState({data: musicData, load: false});
            } else {
                ToastAndroid.show('无音乐数据');
            }

            console.log('require finish count=' + requireCount);
            console.log('musicData------------>' + JSON.stringify(musicData));
            requireCount = 0;
            dataIndex=0;
        }

    }

    componentDidMount() {
        this.setState({load: true});
        //更具歌曲id循环请求数据
        for (let i = 0; i < songIds.length; i++) {

            fetch(`http://music.baidu.com/data/music/fmlink?songIds=${songIds[i]}&type=1`)
                .then((response) => response.json())
                .then((resJson) => this.handleData(resJson))
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('获取数据失败');
                })
        }
    }

    componentWillUnmount() {
        this.props.navigation.state.params.callback();
        console.log('net music page unmount');
    }

    render() {
        return (
            this.state.load ?
                (
                    <View style={styles.loadView}>
                        <StatusBar
                            translucent={false}
                            backgroundColor={Common.themeColor}
                        />
                        <ActivityIndicator
                            size={'large'}
                            color={Common.themeColor}
                        />
                    </View>

                ) : (<View style={styles.container}>
                        <StatusBar
                            translucent={false}
                            backgroundColor={Common.themeColor}
                        />

                        <FlatList
                            data={this.state.data}
                            renderItem={({item, index}) =>
                                <ListItem song={item.name} singer={item.singer} index={index}/>
                            }
                            keyExtractor={(item, index) => index}
                        />

                        <BottomPlay id={'net_play'}/>

                    </View>
                )
        );
    }
}

module.exports = NetMusic;

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
        marginLeft: 15,
    },

    song: {
        color: '#2d2d2d',
        fontSize: 16,
    },
    singer: {
        marginTop: 2,
        color: '#808080',
        fontSize: 13,
    },
    right: {
        height: 50,
        width: 50,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});