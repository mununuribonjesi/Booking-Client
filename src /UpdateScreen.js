import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class UpdateScreen extends Component
{

    constructor(props) {
        super(props);

        this.state ={
            value:20,
            text:"",
            label:"",
            save:false,
            password:"",
            confirmPassword:""

        }
    }

    async componentDidMount()
    {

        this.setState({text:this.props.navigation.state.params.text,label:this.props.navigation.state.params.label})
    }


    setPassword(text)
    {

        this.setState({password:text,save:true});

    }

    setconfirmPassword(text)
    {

        this.setState({confirmPassword:text});

    }


    setText(text)
    {
        if (text == this.props.navigation.state.params.text)
        {
            return this.setState({text:text,save:false})
        }
        this.setState({text:text,save:true})
        
    }

    render()
    {

        const label =this.props.navigation.state.params.label;
        const text = this.props.navigation.state.params.text;
        const isDelete = this.props.navigation.state.params.delete;
        const isPassword = this.props.navigation.state.params.password;

    return (
        <View style='footer'> 

  

       {(isDelete) ?

        <View style={{marginBottom:20}}>
        <TextInput
        label={this.state.label}
        value={this.state.text}
        disabled={false}
        onChangeText={text => this.setText(text)}
        secureTextEntry={true}
      />
      </View>
      :[ isPassword ?

        <View style={{marginBottom:20}}>
        <TextInput
        label={"New Password"}
        value={this.state.password}
        disabled={false}
        onChangeText={text => this.setPassword(text)}
        secureTextEntry={true}
      />
   

     
      <TextInput
      label={"Confirm New Password"}
      value={this.state.confirmPassword}
      disabled={false}
      onChangeText={text => this.setconfirmPassword(text)}
      secureTextEntry={true}
    />
    </View>

    :   <View style={{marginBottom:20}}>
    <TextInput
    label={this.state.label}
    value={this.state.text}
    disabled={false}
    onChangeText={text => this.setText(text)}
  />
  </View>

      ]

       }


     {this.state.save && !isDelete ?
      <TouchableOpacity
      >
      <View style={styles.saveButton}> 
 

     <Text style={styles.buttonText}>      
  
       <Text style={{paddingLeft:20,marginTop:50}}>Save</Text>          
     </Text>


    </View>
    </TouchableOpacity>
    :[
        isDelete &&
            <TouchableOpacity
            >
            <View style={styles.deleteButton}> 
       
      
           <Text style={styles.buttonText}>      
        
             <Text style={{paddingLeft:20,marginTop:50}}>Delete</Text>          
           </Text>
      
      
          </View>
          </TouchableOpacity>
    
    ]

     }
    </View>


    )
    }



}

export const styles = StyleSheet.create({

    saveButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        height: 60,
        textAlign:'center',
        justifyContent:'center',
        width:'50%',
        alignSelf:'center',
      },

    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        height: 60,
        textAlign:'center',
        justifyContent:'center',
        width:'50%',
        alignSelf:'center',
      },

      buttonText:{
        color:'white',
        fontSize:RFValue(20),
        textAlign:'center',
        fontWeight:'600',
      },


})
export default UpdateScreen
