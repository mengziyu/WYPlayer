
/**
 * 侧滑菜单
 */

import React, {Component} from 'react';

import {
    Image,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableNativeFeedback,
    DeviceEventEmitter,
} from 'react-native'
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import Common from '../styles/Common';
import Constant from "../utils/Constant";

const ItemHeight = 45;
let navigation;

class MenuItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback

                onPress={()=>{
                    navigation.navigate('DrawerClose');
                    DeviceEventEmitter.emit(Constant.LEFT_LISTENER,this.props.id)
                }}
            >
                <View style={styles.itemContain}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon
                            name={this.props.icon}
                            size={23}
                            style={[styles.itemIcon,{color:this.props.id==='my_message'?Common.themeColor:'#808080'}]}
                        />
                        <Text style={[styles.itemText,{color:this.props.id==='my_message'?Common.themeColor:'#2d2d2d'}]}>
                            {this.props.item}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

//灰色的线条
class GreyLine extends Component {
    render() {
        return (
            <View style={styles.greyLine}/>
        )
    }
}

class BottomItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={()=>{
                    navigation.navigate('DrawerClose');
                    DeviceEventEmitter.emit(Constant.LEFT_LISTENER,this.props.id)
                }}
            >
                <View style={[styles.itemContain, {flex: 1}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            name={this.props.icon}
                            size={23}
                            style={[styles.bottomIcon,{color:this.props.id==='exit'?Common.themeColor:'#808080'}]}
                        />
                        <Text style={[styles.itemText,{color:this.props.id==='exit'?Common.themeColor:'#2d2d2d'}]}>
                            {this.props.item}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

class DrawLeft extends Component {
    constructor(props) {
        super(props);
        this.state={
            qiandao:false
        }
        navigation=this.props.navigation;
    }

    doQiandao(){
        this.setState({qiandao:!this.state.qiandao});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>

                        <ImageBackground
                            style={[styles.topImage]}
                            source={require('../images/mn.jpg')}
                        >
                            <Image
                                style={styles.touXiang}
                                source={require('../images/head.png')}
                            />
                            <View style={styles.userNameContain}>
                                <Text style={styles.userNameText}>
                                    夜梦随风
                                </Text>
                                <View
                                    style={styles.qiandaoContain}
                                >
                                    {
                                        this.state.qiandao?(null):(
                                            <Icon
                                                name={'md-happy'}
                                                size={15}
                                                color={Common.themeColor}
                                                style={{marginRight: 3, marginTop: 1}}
                                            />
                                        )
                                    }
                                    <Text
                                        style={styles.qiandaoText}
                                        onPress={()=>this.doQiandao()}
                                    >
                                        {this.state.qiandao?'已签到':'签到'}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>

                        <MenuItem id='my_message' icon='ios-mail-outline' item='我的消息'/>
                        <MenuItem id='vip' icon='ios-flame-outline' item='VIP会员'/>
                        <MenuItem id='shop' icon='ios-cart-outline' item='商城'/>
                        <MenuItem id='free_online' icon='ios-cloud-outline' item='在线听歌免流量'/>
                        <GreyLine/>
                        <MenuItem id='my_friend' icon='ios-person-outline' item='我的好友'/>
                        <MenuItem id='around' icon='ios-pin-outline' item='附近的人'/>
                        <GreyLine/>
                        <MenuItem id='theme' icon='ios-color-palette-outline' item='个性皮肤'/>
                        <MenuItem id='tinggeshiqu' icon='ios-microphone-outline' item='听歌识曲'/>
                        <MenuItem id='stop' icon='ios-play-outline' item='定时停止播放'/>
                        <MenuItem id='scanner' icon='ios-qr-scanner-outline' item='扫一扫'/>
                        <MenuItem id='alarm' icon='ios-alarm-outline' item='音乐闹钟'/>
                        <MenuItem id='drive_model' icon='ios-car-outline' item='驾驶模式'/>
                        <MenuItem id='cloud' icon='ios-cloud-done-outline' item='音乐云盘'/>
                    </View>
                </ScrollView>
                <View style={styles.bottomContain}>
                    <BottomItem id='night' icon='ios-moon-outline' item='夜间模式'/>
                    <BottomItem id='setting' icon='ios-settings-outline' item='设置'/>
                    <BottomItem id='exit' icon='ios-exit-outline' item='退出'/>
                </View>
            </View>
        )
    }
}

module.exports = DrawLeft;

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //top
    topImage: {
        height: 180,
        justifyContent: 'flex-end',
    },
    userNameContain: {
        flexDirection: 'row',
    },
    touXiang: {
        position: 'relative',
        left: 10,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover',
    },
    userNameText: {
        color: 'white',
        position: 'relative',
        left: 10,
        bottom: 10,
        fontSize: 16,
    },
    qiandaoContain: {
        flexDirection: 'row',
        borderColor: Common.themeColor,
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    qiandaoText: {
        color:Common.themeColor,
        fontSize: 13,
    },

    //item
    itemContain: {
        height: ItemHeight,
        justifyContent: 'center',
    },
    itemIcon: {
        marginLeft: 10,
        color: '#808080',
    },
    itemText: {
        marginLeft: 10,
        color: '#2d2d2d',
    },
    greyLine: {
        height: 5,
        backgroundColor: Common.pageBackColor,
    },

    //bottom
    bottomContain: {
        flexDirection: 'row',
        height: 50,
        position: 'relative',
        bottom: 0,
        borderColor: '#ebebeb',
        borderTopWidth: 1,
    },
    bottomIcon: {
        color: '#808080',
    }
})