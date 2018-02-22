/**
 * 播放页面
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    StatusBar,
    ImageBackground,
    ART,
} from 'react-native';

const {
    Surface,
    Group,
    Shape,
    Path,
    Transform
} = ART;
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';


class Play extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Common.themeColor}
                />
                <ImageBackground
                    source={require('../images/login_bg.jpg')}
                    style={[styles.container]}
                >
                    <View style={styles.circleContain}>
                        <Surface width={300} height={300} style={{backgroundColor:'grey'}}>
                            <Shape
                                d={path}
                                stroke="#000000"
                                strokeWidth={1}
                            />
                        </Surface>
                    </View>
                    <View style={styles.bottom}>
                        <Text>
                            aaa
                        </Text>
                    </View>

                </ImageBackground>
            </View>
        );
    }
}

module.exports = Play;

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circleContain: {
        flex:8,
        justifyContent:'center',
        alignItems:'center',

    },
    bottom: {
        flex:2,
        width:Common.screenWidth,
        backgroundColor:'blue',
    }
});