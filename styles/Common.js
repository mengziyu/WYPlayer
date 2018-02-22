/**
 * 常用工具
 */
import React, {Component} from 'react';
import {
    StatusBar,
    findNodeHandle,
    UIManager
} from 'react-native';


let dimensions = require('Dimensions');
let screenWidth = dimensions.get('window').width;
let screenHeight = dimensions.get('window').height;
let statusHeight = StatusBar.currentHeight;

let Common = {
    // layout(ref) {
    //     const handle = findNodeHandle(ref);
    //     return new Promise((resolve) => {
    //         UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
    //             resolve({
    //                 x,
    //                 y,
    //                 width,
    //                 height,
    //                 pageX,
    //                 pageY
    //             });
    //         });
    //     });
    // },
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    themeColor: '#009e9e',
    statusHeight: statusHeight,
    pageBackColor: '#ebebeb',
}


module.exports = Common;