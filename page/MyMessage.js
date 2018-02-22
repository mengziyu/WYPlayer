/**
 * 我的消息
 */
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    StatusBar,
    Text,
}from 'react-native';
import {
    DefaultTabBar,
}from 'react-native-scrollable-tab-view';
import Common from '../styles/Common';
let ScrollableTabView = require('react-native-scrollable-tab-view');

class Content extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.msgContain1}>
                <View style={styles.msgContain2}>
                    <Text style={{color:'#808080'}}>
                        暂无消息
                    </Text>
                </View>
            </View>
        )
    }
}

class MyMessage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Common.themeColor}

                />

                <ScrollableTabView
                    renderTabBar={() =>
                        <DefaultTabBar
                            backgroundColor={'white'}
                            style={{height:40,borderWidth:0}}
                            tabStyle={{paddingBottom:0}}
                        />
                    }
                    tabBarUnderlineStyle={styles.underline}
                    tabBarActiveTextColor={Common.themeColor}
                    tabBarInActiveTextColor='#808080'

                >
                    <Content tabLabel='私信'/>
                    <Content tabLabel='评论'/>
                    <Content tabLabel='@我'/>
                    <Content tabLabel='通知'/>
                </ScrollableTabView>


            </View>
        )
    }

}

module.exports=MyMessage;

let styles=StyleSheet.create({
    container:{
        flex:1,
    },

    underline:{
        backgroundColor:Common.themeColor,
        height:2,
    },
    msgContain1:{
        flex:1,
    },
    msgContain2:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
    }
})