/**
 * 首页-话题
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    ScrollView,
}from 'react-native';
import Common from "../styles/Common";
import Icon from '../node_modules/react-native-vector-icons/Ionicons';

class HTItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ImageBackground
                source={this.props.backImage}
                style={styles.itemBack}
            >
                <Text style={styles.itemText}>{this.props.title}</Text>
            </ImageBackground>
        )
    }
}

class Home3 extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20,}}>
                    <Text style={styles.tuijianList}>
                        热门话题
                    </Text>
                    <Icon
                        name={'ios-arrow-forward-outline'}
                        style={{marginLeft: 10, fontSize: 15}}
                    />
                </View>
                <View>
                    <ScrollView
                        style={{marginTop:10,paddingLeft:10}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >

                        <HTItem backImage={require('../images/f1.jpg')} title='#新年祝福藏进歌里#'/>
                        <HTItem backImage={require('../images/f2.jpg')} title='#回家的诱惑#'/>
                        <HTItem backImage={require('../images/f3.jpg')} title='#怎么说话有味道#'/>
                        <HTItem backImage={require('../images/f4.jpg')} title='#欲语泪先流#'/>
                    </ScrollView>
                </View>

            </View>
        )
    }
}

module.exports=Home3;

let styles=StyleSheet.create({
    container:{
        flex:1,
    },
    tuijianList: {
        fontSize: 13,
        marginLeft: 10,
        color: '#2d2d2d',
    },
    itemBack:{
        width:200,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        marginRight:2,
    },
    itemText:{
        color:'white',
    }

})