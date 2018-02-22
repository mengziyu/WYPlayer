import React, {Component} from 'react';

import {StackNavigator} from "react-navigation";
import {
    View
} from 'react-native'

import Common from '../styles/Common';
import Main from "./Main";
import Welcome from './Welcome';
import MyMessage from './MyMessage';
import LocalMusic from './LocalMusic';
import NetMusic from './NetMusic';
import Play from './Play';


//导航路由
const RouteConfigs = {
    // Welcome: {
    //     screen: Welcome,
    //     navigationOptions: ({navigation}) => ({
    //         header: NoneTitle
    //     })
    // },
    Main: {
        screen: Main,
        navigationOptions: ({navigation}) => ({
            header: (<View/>)
        })
    },
    MyMessage: {
        screen: MyMessage,
        navigationOptions: ({navigation}) => ({
            title: '我的消息',
            headerStyle: {
                backgroundColor: Common.themeColor,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 18,
            },
            headerTintColor:'white',

        })
    },
    LocalMusic:{
        screen:LocalMusic,
        navigationOptions: ({navigation}) => ({
            title: '本地音乐',
            headerStyle: {
                backgroundColor: Common.themeColor,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 18,
            },
            headerTintColor:'white',
        })
    },
    NetMusic:{
        screen:NetMusic,
        navigationOptions: ({navigation}) => ({
            title: '网络音乐',
            headerStyle: {
                backgroundColor: Common.themeColor,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 18,
            },
            headerTintColor:'white',
        })
    },
    Play:{
        screen:Play,
        navigationOptions: ({navigation}) => ({
            header: (<View/>)
        })
    },

}

const StackNavigatorConfig = {
    initialRouteName: 'Main',
}

const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);


class NavPage extends Component {
    render() {
        return (
            <Navigator/>
        )
    }
}

module.exports = NavPage;