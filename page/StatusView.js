import React, { Component } from 'react';
import {
    View,
    StyleSheet
}from 'react-native'

import Common from '../styles/Common'

class StatusView extends Component{
    render(){
        return(
            <View style={{height:Common.statusHeight,backgroundColor:Common.themeColor}}/>
        )
    }
}

module.exports=StatusView;

