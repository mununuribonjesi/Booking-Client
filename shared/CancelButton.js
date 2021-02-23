import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import { AntDesign,Ionicons } from '@expo/vector-icons'; 


export default function CancelButton() {
    return (
        <View style={styles.navBarLeftButton}>
        <Text style={styles.text}>Cancel</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    text:{

        color:'white',
        fontSize:15
  
        


    },
    navBarLeftButton:{
        paddingLeft: 8,
        width: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }

})