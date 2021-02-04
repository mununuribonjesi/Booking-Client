import React,{Component} from 'react';
import{View,Image,Text,StyleSheet,Animated} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import { LogBox } from 'react-native';

import Logo from '../assets/logo.png';

const switchtoAuth = () => {


}

class splashScreen extends Component
{


    constructor(props) {
        super(props);
    }

    state = {
        LogoAnime: new Animated.Value(0),
        isLoading:false,
    }



    componentDidMount()
    {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        const {LogoAnime} = this.state;

        Animated.parallel([
            Animated.spring(LogoAnime, 
                {
                        toValue:1,
                        tension:10,
                        friction:2,
                        duration:1000,
                    }).start(),
        ]).start(() =>{
            this.setState({isLoading:true});

            setTimeout(()=>this.switchRoute(),2500)

          
        });
    }


    switchRoute()
    {
       this.props.navigation.navigate('LoginScreen');
    }



    render()
    {

        LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        LogBox.ignoreAllLogs();
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        return(
            <View style={styles.container}>
            <Animated.View
            
            style={{
                opacity:this.state.LogoAnime,
                top:this.state.LogoAnime.interpolate({
                    inputRange: [0,1],
                    outputRange: [200,0],
                })
            }}
            > 
            <Image style={styles.Logo} source={Logo} />


            
            </Animated.View>


            
            
            </View>
        )
    }

}

export default splashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff44f',
        justifyContent:'center',
        alignItems:'center'
    },
    Logo:{
        height:500,
        width:500


    }
})