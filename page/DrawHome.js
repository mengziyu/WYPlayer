/**
 * 首页
 */

import React, {Component} from 'react';

import {
    StatusBar, StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TouchableNativeFeedback,
    ViewPagerAndroid,
} from 'react-native';

import StatusView from './StatusView';
import Common from '../styles/Common';
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import BottomPlay from './BottomPlay';


let TitleHeight = 50;
let navigation;

class TitleItem extends Component {
    constructor(props) {
        super(props);
    }

    onItemClick() {
        //标题栏中间三个item点击回调
        if(this.props.setPageListener){
            this.props.setPageListener(this.props.pos);
        }

        if(this.props.id){
            //侧滑菜单item
            if(this.props.id==='menu'){
                navigation.navigate('DrawerOpen');
            }

            //搜索
            if(this.props.id==='search'){

            }
        }

    }

    render() {
        return (
            <TouchableNativeFeedback
                //波纹不超过view范围
                background={TouchableNativeFeedback.SelectableBackgroundBorderless(true)}
                onPress={()=>this.onItemClick()}
            >
                <View style={styles.titleItem}>
                    <View style={styles.titleItem2}>
                        <Icon
                            name={this.props.icon}
                            size={30}
                            style={{color:this.props.curposition===this.props.pos?'white':'#D5D5D5'}}
                        />
                    </View>

                </View>
            </TouchableNativeFeedback>
        )
    }
}

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0
        }
        navigation=this.props.navigation;
    }

    setPageListener(clickPos){
        console.log('click pos is '+clickPos);
        this.ViewPager.setPage(clickPos);
        this.setState({position: clickPos});
    }

    componentDidMount(){
        // console.log('draw home did mount');
    }

    componentWillUnmount(){
        // console.log('draw home unmount');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    translucent={true}
                    backgroundColor={'transparent'}
                />
                <StatusView/>

                <View style={styles.titleContain1}>
                    <TitleItem id='menu' icon='ios-menu-outline'/>
                    {/*中间3个item*/}
                    <View style={styles.titleMidContain}>
                        <TitleItem setPageListener={(p)=>this.setPageListener(p)} pos={0} curposition={this.state.position}
                                   icon='ios-musical-notes-outline'/>
                        <TitleItem setPageListener={(p)=>this.setPageListener(p)} pos={1} curposition={this.state.position}
                                   icon='ios-headset-outline'/>
                        <TitleItem setPageListener={(p)=>this.setPageListener(p)} pos={2} curposition={this.state.position}
                                   icon='ios-people-outline'/>
                    </View>
                    <TitleItem id='search' icon='ios-search-outline'/>
                </View>

                <ViewPagerAndroid
                    style={styles.container}
                    initialPage={0}
                    onPageSelected={(e) => {
                        this.setState({position: e.nativeEvent.position})
                    }}
                    ref={(ref)=>this.ViewPager=ref}
                >
                    <View>
                        <Home1/>
                    </View>
                    <View>
                        <Home2/>
                    </View>
                    <View>
                        <Home3/>
                    </View>

                </ViewPagerAndroid>

                <BottomPlay id={'home_play'}/>

            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContain1: {
        height: TitleHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Common.themeColor,
    },
    titleMidContain: {
        flexDirection: 'row',
    },
    titleItem: {
        width: TitleHeight,
        height: TitleHeight,
        borderRadius: TitleHeight / 2,
        justifyContent: 'center',
    },
    titleItem2: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

module.exports = HomeContent;