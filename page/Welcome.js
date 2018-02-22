/**
 * 欢迎页
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    StatusBar
} from 'react-native';


import Common from '../styles/Common'

class Welcome extends Component {

    constructor(props) {
        super(props)

    }

    //在render之后执行
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('Main');
        }, 2 * 1000)
    }

    componentWillUnmount() {
        // clearTimer(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Image
                    style={[styles.imageStyle]}
                    source={require('../images/welcome.png')}
                />
            </View>

        )
    }

}

module.exports = Welcome;


let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    imageStyle: {
        resizeMode: 'stretch',
        width:Common.screenWidth,
        height:Common.screenHeight
    }
})



