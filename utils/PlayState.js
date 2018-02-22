
import React, {Component} from 'react';

let PlayState = {
    currentIndex:0,
    musicName:'',
    //当前播放列表，有本地列表和网络列表
    playList:null,
    isPlay:false,
}

module.exports = PlayState;