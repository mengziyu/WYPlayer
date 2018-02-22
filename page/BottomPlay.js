/**
 * 底部播放布局：负责显示当前播放的歌曲，上一曲，下一曲，播放暂停
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    AsyncStorage,
    NativeModules,
} from 'react-native';
import Common from '../styles/Common';
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import Constant from "../utils/Constant";
import PlayState from '../utils/PlayState';

let Player = NativeModules.PlayModule;

class PlayButton extends Component {

    constructor(props) {
        super(props)
    }

    preClick(){
        PlayState.currentIndex=PlayState.currentIndex-1;
        if(PlayState.currentIndex<0){
            PlayState.currentIndex=0;
        }
        Player.play(PlayState.playList[PlayState.currentIndex].path);

        PlayState.musicName=PlayState.playList[PlayState.currentIndex].name;
        PlayState.isPlay=true;
        this.props.buttonClick();
    }

    playClick(){

        //若当前存在播放的歌曲，则暂停/播放
        if(PlayState.musicName !==''){
            Player.pause();
            PlayState.isPlay=!PlayState.isPlay;
            //没有则播放第一首
        }else {
            PlayState.currentIndex=0;
            Player.play(PlayState.playList[PlayState.currentIndex].path);
            PlayState.isPlay=true;
        }

        PlayState.musicName=PlayState.playList[PlayState.currentIndex].name;
        this.props.buttonClick();
    }

    nextClick(){
        PlayState.currentIndex=PlayState.currentIndex+1;
        if(PlayState.currentIndex>PlayState.playList.length-1){
            PlayState.currentIndex=PlayState.playList.length-1;
        }
        Player.play(PlayState.playList[PlayState.currentIndex].path);

        PlayState.musicName=PlayState.playList[PlayState.currentIndex].name;
        PlayState.isPlay=true;
        this.props.buttonClick();
    }

    playButtonClick(id) {
        if(!PlayState.playList||PlayState.playList.length===0){
            return;
        }
        switch (id) {
            case 'pre':
                this.preClick();
                break;
            case 'play':
                this.playClick()
                break;
            case 'next':
                this.nextClick();
                break;
        }
    }


    render() {
        return (
            <TouchableNativeFeedback
                onPress={()=>this.playButtonClick(this.props.id)}
            >
                <View style={styles.iconView}>
                    <Icon
                        name={this.props.icon}
                        size={30}
                        style={{color: Common.themeColor}}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }
}

class BottomPlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            musicName: '',
            isPlaying:false,
        }
    }

    refreshList(){
        this.setState({musicName:PlayState.musicName,isPlaying:PlayState.isPlay})
    }

    //接收点击回调
    buttonClick(){
        this.refreshList();
    }

    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener(Constant.REFRESH_LIST_LISTENER,()=>this.refreshList());
        this.refreshList();
        console.log('bottom play view did mount');
    }

    componentWillUnmount() {
        this.listener.remove();
        console.log('bottom play view unmount');
    }

    bottomClick(id){
        switch (id){
            case 'home_play':
                DeviceEventEmitter.emit(Constant.HOME_LISTENER,'bottomPlay');
                break;
            case 'local_play':
                DeviceEventEmitter.emit(Constant.LOCAL_TO_PLAY_LISTENER);
                break;
            case 'net_play':
                break;
            default:
                break;
        }
    }

    render() {
        return (

            <TouchableNativeFeedback
                onPress={()=>this.bottomClick(this.props.id)}
            >
                <View style={styles.bottomPlay}>
                    <View style={styles.iconView}>
                        <Icon
                            name={'md-stats'}
                            size={30}
                            style={{color: Common.themeColor}}
                        />
                    </View>

                    <Text style={styles.name}>{this.state.musicName}</Text>

                    <View style={styles.playView}>
                        <PlayButton id={'pre'} icon={'md-skip-backward'} buttonClick={()=>this.buttonClick()}/>
                        <PlayButton id={'play'} icon={this.state.isPlaying?'md-pause':'md-play'} buttonClick={()=>this.buttonClick()}/>
                        <PlayButton id={'next'} icon={'md-skip-forward'} buttonClick={()=>this.buttonClick()}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

module.exports = BottomPlay;

let styles = StyleSheet.create({
    bottomPlay: {
        position: 'relative',
        height: 50,
        backgroundColor: 'white',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconView: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    playView: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
    },

    name: {

    },

});