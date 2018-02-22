import React, {Component} from 'react';

import {
    AsyncStorage,
    DeviceEventEmitter,
    NativeModules,
    ToastAndroid,
    BackHandler,
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import DrawHome from './DrawHome';
import DrawLeft from './DrawLeft';
import Constant from "../utils/Constant";
import PlayState from "../utils/PlayState";


//主页内容
const DrawerRouteConfigs = {
    Home: {
        screen: DrawHome,
    }
}

//自定义侧滑菜单
const DrawerNavigatorConfigs = {
    contentComponent: (DrawLeft)
};
const Drawer = DrawerNavigator(DrawerRouteConfigs, DrawerNavigatorConfigs);
let Player = NativeModules.PlayModule;

class Main extends Component {
    constructor(props) {
        super(props)
    }

    //接收侧滑菜单的id，并作出跳转
    leftCallBack(id){
        console.log("left click==>id:"+id);
        switch (id){
            case 'my_message':
                this.props.navigation.navigate('MyMessage');
                break;
            case 'exit':
                BackHandler.exitApp();
                break;
            default:
                break;
        }
    }

    //接收主页的回调
    homeCallBack(id){
        console.log("home click==>id:"+id);
        switch (id){
            case 'local':
                this.props.navigation.navigate('LocalMusic',{callback:()=>this.refreshBottomPlay()});
                break;
            case 'network':
                this.props.navigation.navigate('NetMusic',{callback:()=>this.refreshBottomPlay()});
                break;
            case 'bottomPlay':
                //跳转到详情页
                // this.props.navigation.navigate('Play');
                break;
            default:
                break;
        }
    }

    //接收回调并通知刷新底部播放view
    refreshBottomPlay(){
        DeviceEventEmitter.emit(Constant.REFRESH_LIST_LISTENER);
    }

    componentDidMount() {
        this.listener=DeviceEventEmitter.addListener(Constant.HOME_LISTENER,(id)=>this.homeCallBack(id))
        this.listener=DeviceEventEmitter.addListener(Constant.LEFT_LISTENER,(id)=>this.leftCallBack(id))
        //绑定播放服务
        Player.bindService();

        //初始化播放状态
        AsyncStorage.getItem(Constant.PLAY_LIST_KEY).then((value)=>{
            PlayState.playList=JSON.parse(value);
        });
        PlayState.musicName='';
        PlayState.currentIndex=0;
        PlayState.isPlay=false;
        this.refreshBottomPlay();
    }

    componentWillUnmount() {
        Player.unbindService();
        this.listener.remove();
    }

    render() {
        return (
            <Drawer/>
        )
    }

}

module.exports = Main;