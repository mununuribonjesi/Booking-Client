import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function BsHeader() {
    return (
        <View style={styles.header}>
            
         
            <View>


               <Text style={styles.headerText}></Text>
   
     
                </View>

                <View style={styles.item}>
        
                    
                </View>
                            


        </View>
    )
}


const styles = StyleSheet.create({

    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
    },
    headerText:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
        marginBottom:30
        

    },

    icon:
    {
  
        fontSize:40,
        color:'black',
        height:50


    },

    item:
    {
        left:100,
        marginBottom:30

    }
    ,
    iconWrapper:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40,
        backgroundColor:'#fff',
        borderRadius:100
    
      },
    



})
