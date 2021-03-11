import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { connect } from 'react-redux';
import config from '../config';
import moment from 'moment';

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
      const text = this.props.navigation.state.params.text;
      const label =this.props.navigation.state.params.label;
      this.setState({text:text,label:label});
    }


    async updateChanges()
    {
      label = this.state.label.toLowerCase();
      text = this.state.text;

      if(label==="dob")
      {
        text = moment(this.state.text, "DD-MM-YYYY").utc(true);
      }

      const update = {[label]:text};
      const userId = {_id:this.props.user.userId};

        await axios({
          method: 'POST',
          url: config.Authentication_URL+'/api/user',
          data: {

            update:update,
            userId:userId

          }
        }).then(response =>
          { 
            this.props.navigation.navigate("ProfileScreen");
          }).catch (error =>{
            if(error.response)
            {
                this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
            }
        })
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
        if (text === this.props.navigation.state.params.text)
        {
            return this.setState({text:text,save:false})
        }

      
        if(this.state.label.toLowerCase()==='dob')
        {

          var regex = /^[0-9-]*$/;
  
          var dash = /^[-]*$/;
      
          var doubleDash = /^[--]*$/;
      
          var tripleDash = /^[---]*$/;
      
      
          if (text.length===11)
          {
      
            return 
      
          }
      
            if(!regex.test(text))
            {
              return
            }
      
            
            if(!dash.test(text)&&text.length===3&&this.state.text.length===2)
            {
                
                var firstTwo = text.substring(0,2) + '-';
                var thirdOne = text.substring(2,3);
                text = firstTwo + thirdOne;
            }
      
            if(!doubleDash.test(text)&&text.length===6&&this.state.text.length===5)
            {
                
                var firstTwo = text.substring(0,4) + '-';
                var thirdOne = text.substring(2,4);
      
                console.log(thirdOne);
                
                text = firstTwo + thirdOne;
      
                if(tripleDash.test(text))
                {
                  return
                }
                
            }
      
      
            if(!dash.test(text)&&text.length===3&&this.state.text.length===2)
            {
                
                var firstTwo = text.substring(0,2) + '-';
                var thirdOne = text.substring(2,3);
                
                text = firstTwo + thirdOne;
            }
      
        
          if (text.length === 2 && this.state.text.length === 1) {
              text += '-'
          }
      
      
          if (text.length === 5 && this.state.text.length === 4) {
            text += '-'
         }
        }


    this.setState({text:text,save:true})

  }


  getAge(birthDateString) {
    var today = moment().utc(true);
    var birthDate = moment(birthDateString, "DD-MM-YYYY").utc(true);
 
    return today.diff(birthDate,'years');
}

    render()
    {



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
      
      onPress= {
        () => {
          this.updateChanges()
        }
      }
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


const mapStatetoProps = (state) => {

  return {
    user: state.userReducer,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    setUserId: (data) => dispatch(setUserId(data)),
  }
}

  
export default connect(mapStatetoProps, mapDispatchToProps)(UpdateScreen);

  
