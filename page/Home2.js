/**
 * 首页-网络音乐库
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableNativeFeedback,
    ScrollView,
    ImageBackground,
} from "react-native";
import {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';

let ScrollableTabView = require('react-native-scrollable-tab-view');

class RoundItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback

            >

                <View style={styles.item}>
                    <View style={styles.round}>
                        <Icon
                            name={this.props.icon}
                            size={30}
                            style={{color: Common.themeColor}}
                        />
                    </View>
                    <Text style={styles.roundText}>
                        {this.props.item}
                    </Text>

                </View>

            </TouchableNativeFeedback>
        )
    }
}

class MusicList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listContain}>
                <ImageBackground
                    source={this.props.backImage}
                    style={styles.listBackImg}
                >
                    <Text style={styles.listText}>
                        <Icon
                            name={'md-headset'}
                            size={11}
                        />
                        {this.props.count}万
                    </Text>
                </ImageBackground>
                <Text style={styles.listDesc}>
                    {this.props.desc}
                </Text>
            </View>

        );
    }
}

class Home2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../images/news.jpg')}/>
                    <View style={styles.roundContain}>
                        <RoundItem item='私人FM' icon='md-options'/>
                        <RoundItem item='每日推荐' icon='md-calendar'/>
                        <RoundItem item='歌单' icon='md-musical-notes'/>
                        <RoundItem item='排行榜' icon='md-podium'/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20,}}>
                        <Text style={styles.tuijianList}>
                            推荐歌单
                        </Text>
                        <Icon
                            name={'ios-arrow-forward-outline'}
                            style={{marginLeft: 10, fontSize: 20}}
                        />
                    </View>

                    <View style={styles.listItemContain}>
                        <MusicList count='45' desc='鸟栖鱼不动，月照夜江深' backImage={require('../images/g1.jpg')}/>
                        <MusicList count='120' desc='身外都无事，舟中只有琴' backImage={require('../images/g2.jpg')}/>
                        <MusicList count='24' desc='七弦为益友，两耳是知音' backImage={require('../images/g3.jpg')}/>
                    </View>
                    <View style={styles.listItemContain}>
                        <MusicList count='27' desc='闲坐夜明月，幽人弹素琴' backImage={require('../images/g4.jpg')}/>
                        <MusicList count='100' desc='忽闻悲风调，宛若寒松吟' backImage={require('../images/g5.jpg')}/>
                        <MusicList count='50' desc='钟期久已没，世上无知音' backImage={require('../images/g6.jpg')}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

module.exports = Home2

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: Common.screenWidth,
        height: 160,
        resizeMode: 'cover',
    },

    roundContain: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 0.5,
    },
    round: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: Common.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundText: {
        fontSize: 11,
        marginTop: 3,
    },
    item: {
        height: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContain: {
        height: Common.screenWidth / 3 - 2,
        width: Common.screenWidth / 3 - 2,
    },
    listBackImg: {
        flex: 1,
    },

    listText: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        top: 2,
        right: 2,
    },
    tuijianList: {
        fontSize: 16,
        borderLeftColor: Common.themeColor,
        borderLeftWidth: 2,
        paddingLeft: 10,
        color: '#2d2d2d',
    },
    listItemContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    listDesc: {
        color: '#2d2d2d',
        fontSize: 12,
    }
})