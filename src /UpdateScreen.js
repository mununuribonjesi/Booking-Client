import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { connect } from 'react-redux';
import config from '../config';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUpdate } from './store/actions';

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
            confirmPassword:"",
            isInputError:false,
            inputError:"",
            passwordError:""
        }
    }



    passwordValidation(text)
    {
      const passwordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  
      if(text=="")
      {
        this.setState({passwordError:"",save:false});
      }
  
      if(text!=""&&!passwordRE.test(text))
      {
        this.setState({passwordError:"* requires one lower case letter, one upper case letter, one digit, 6-20 length",save:false});
      }
  
    }


    confirmPasswordValidation(text)
    {
      const passwordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  
      if(this.state.password!=text)
      {
        this.setState({passwordError:"* passwords have to match",isconfirmError:false});
      }


      else if(this.state.password!=""&&!passwordRE.test(this.state.password))
      {
        this.setState({passwordError:"* requires one lower case letter, one upper case letter, one digit, 6-20 length",save:false});
      }
  
      else
      {
        this.setState({text:text,passwordError:"",save:true});
      }
  
    }


    inputValidation(text)
    {
      label = this.state.label.toLowerCase();

      if(text === this.state.text)
      {
        this.setState({save:false});
      }

      if(label==="firstname"||label==="lastname")
      {

        {
          const textRE = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
      
          if(text=="")
          {
            this.setState({inputError:"* Forename field cannot be empty",save:false});
          }
      
          else if(text!=""&&!textRE.test(text))
          {
      
            this.setState({inputError:"* Please enter valid forename",save:false});
          }
      
          else
          {
            this.setState({inputError:"",save:true});
          }
      
        }
      }

      if(label==="email")
      {

        const textRE = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        if(text=="")
        {
          this.setState({inputError:"* email field cannot be empty",save:false});
        }
    
        else if(text!=""&&!textRE.test(text))
        {
          this.setState({inputError:"* please enter a valid email",save:false});
        }
    
        else
        {
          this.setState({inputError:"",save:true});
        }

      }

      if(label==="dob")
      {
        var validDateRange = /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/


        if(text=="")
        {
    
          this.setState({inputError:"* Dob field cannot be empty",save:false});
    
        }
    
        else if(text!=""&&!validDateRange.test(text))
        {
    
          this.setState({inputError:"* please enter a valid date dd-mm-yyyy",save:false});
    
        }
    
        else if(text!=""&&validDateRange.test(text)&&this.getAge(text)<13)
        {
    
          
            this.setState({inputError:"*you have to be 13 years old to sign up",save:false});
          
        }
    
    
        else
        {
          this.setState({inputError:"",save:true});
    
        }

      }

    }
    async componentDidMount()
    {
      const text = this.props.navigation.state.params.text;
      const label =this.props.navigation.state.params.label;
      this.setState({text:text,label:label});
    }


    async deleteAccount()
    {

      label = "password";
      text = this.state.text;

      const update = {[label]:text};
      const userId = {_id:this.props.order.userId};

      await axios({
        method: 'DELETE',
        url: config.Authentication_URL+'/api/removeAccount',
        data: {

          update:update,
          userId:userId

        }
      }).then((response) =>
        { 
           AsyncStorage.removeItem('token')
           this.props.navigation.navigate("LoginScreen");

        }).catch (error =>{
          if(error.response)
          {
              this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
          }
      })
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
      const userId = {_id:this.props.order.userId};

        await axios({
          method: 'POST',
          url: config.Authentication_URL+'/api/user',
          data: {

            update:update,
            userId:userId

          }
        }).then((response) =>
          { 
             AsyncStorage.removeItem('user');
             AsyncStorage.setItem('user', JSON.stringify(response.data.update));
             this.props.setUpdate(true);
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
      this.setState({password:text});
      this.passwordValidation(text);
    }

    setconfirmPassword(text)
    {
      this.setState({confirmPassword:text});
      this.confirmPasswordValidation(text);

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
        this.inputValidation(text);

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
    <Text style={styles.validation}>{this.state.passwordError}</Text>
    </View>

    :   <View style={{marginBottom:20}}>

    <TextInput
    label={this.state.label}
    value={this.state.text}
    disabled={false}
    onChangeText={text => this.setText(text)}
    onBlur={()=> this.inputValidation()}
  />
  <Text style={styles.validation}>{this.state.inputError}</Text>
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

            onPress= {
              () => {
                this.deleteAccount()
              }
            }

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

      validation:
      {
        color:'red',
        marginLeft:20,
        marginBottom:0,
        marginTop:5
        
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
    order: state.orderReducer
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    setUserId: (data) => dispatch(setUserId(data)),
    setUpdate: (update) => dispatch(setUpdate(update))
  }
}

  
export default connect(mapStatetoProps, mapDispatchToProps)(UpdateScreen);

  
