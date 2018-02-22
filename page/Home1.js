/**
 * 首页-音乐播放管理
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    AsyncStorage,
} from 'react-native';
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import Constant from "../utils/Constant";


class PlayItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (

            <TouchableNativeFeedback
                onPress={()=>{
                    DeviceEventEmitter.emit(Constant.HOME_LISTENER,this.props.id);
                }}
            >
                <View style={styles.itemContain}>
                    <View style={styles.iconContain}>
                        <Icon
                            name={this.props.icon}
                            size={30}
                            style={{color: Common.themeColor, marginLeft: 15, marginRight: 15}}
                        />
                    </View>

                    <View style={styles.textContain}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.itemText}>
                                {this.props.item}
                            </Text>

                            <Text style={styles.count}>
                                {`(${this.props.count?this.props.count:0})`}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

class Home1 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            localCount:0,
            netCount:0,
        };
    }

    refreshCount(key){
        AsyncStorage.getItem(key).then((value) => {
            let data=key===Constant.LOCAL_COUNT_KEY?{localCount:value}:{netCount:value};
            this.setState(data);
        })

    }

    componentDidMount() {
        this.listener=DeviceEventEmitter.addListener(Constant.REFRESH_COUNT_LISTENER,(key)=>this.refreshCount(key));
        this.refreshCount(Constant.LOCAL_COUNT_KEY);
        this.refreshCount(Constant.NET_COUNT_KEY);
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    render() {

        return (
            <View>
                <PlayItem id='local' icon='ios-albums-outline' item='本地音乐' count={this.state.localCount}/>
                <PlayItem id='network' icon='ios-cloud-done-outline' item='网络音乐' count={this.state.netCount}/>
            </View>
        )
    }
}

module.exports = Home1;

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContain: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white'
    },
    iconContain: {
        justifyContent: 'center',
    },
    itemText: {
        color: '#2d2d2d',
        fontSize: 16,
    },
    textContain: {
        flex: 1,
        justifyContent: 'center',
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 0.5
    },
    count: {
        color: '#808080',
        fontSize: 10,
        marginLeft: 3
    }
});


