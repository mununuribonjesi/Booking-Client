import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserId} from './store/actions';
import { connect } from 'react-redux';
import config from '../config';
import {Ionicons,MaterialIcons,AntDesign,FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { LogBox } from 'react-native';


class createAccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      firstname: '',
      firsnameerror:'',
      lastname:'',
      lastnameerror:'',
      password: '',
      confirmPassword:'',
      passworderror:'',
      confirmpassworderror:'',
      email:'',
      emailerror:'',
      date:'',
      chosenDate: new Date(),
      isnameError:true,
      issurnameError:true,
      isemailError:true,
      ispasswordError:true,
      isconfirmError:true,
      isAlertError:false
    };

    this.baseState = this.state
  }

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}
  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }


  async Submit()
  {
    if(!this.state.isnameError&&!this.state.issurnameError&&!this.state.isemailError&&!this.state.ispasswordError&&!this.state.isconfirmError)
    {

      const response = await axios({
        method: 'post',
        url: config.Authentication_URL+'/api/register',
        data: {
          'email': this.state.email,
          'password': this.state.password,
          'firstName':this.state.firstname,
          'lastName':this.state.lastname
        }
      });
      
      try {
  
        if (response.status === 200) {

          this.setState(this.baseState);
          this.props.navigation.navigate('verificationScreen',{
            email:response.data
          });
        }
  
      } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      }

    }

    else
    {


      console.log('set is alert');
      this.setState({isAlertError:true});
      console.log(this.state.isAlertError);

    }
}



  firstnameValidation()
  {
    const firstNameRE = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g

    if(this.state.firstname=="")
    {
      this.setState({firsnameerror:"* Forename field cannot be empty",isnameError:true});
    }

    else if(this.state.firstname!=""&&!firstNameRE.test(this.state.firstname))
    {

      this.setState({firsnameerror:"* Please enter valid forename",isnameError:true});
    }

    else
    {
      this.setState({firsnameerror:"",isnameError:false});
    }

  }

  lastnameValidation()
  {

    const lastNameRE = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g

    if(this.state.lastname=="")
    {
      this.setState({lastnameerror:"* Surname field cannot be empty",issurnameError:true});
    }

    else if(this.state.lastname!=""&&!lastNameRE.test(this.state.lastname))
    {
      this.setState({lastnameerror:"* Please enter a valid surname",issurnameError:true});
    }

    else
    {
      this.setState({lastnameerror:"",issurnameError:false});
    }


  }

  emailValidation()
  {

    const emailRE = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if(this.state.email=="")
    {
      this.setState({emailerror:"* email field cannot be empty",isemailError:true});
    }

    else if(this.state.email!=""&&!emailRE.test(this.state.email))
    {
      this.setState({emailerror:"* please enter a valid email",isemailError:true});
    }

    else
    {
      this.setState({emailerror:"",isemailError:false});
    }

  }


  alertClose = () =>
  {

    this.setState({isAlertError:!this.state.isAlertError});
  }


  passwordValidation()
  {
    const passwordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

    if(this.state.password=="")
    {
      this.setState({passworderror:"* password field cannot be empty",ispasswordError:true});
    }

    else if(this.state.password!=""&&!passwordRE.test(this.state.password))
    {
      this.setState({passworderror:"* requires one lower case letter, one upper case letter, one digit, 6-20 length",ispasswordError:true});
    }

    else
    {
      this.setState({passworderror:"",ispasswordError:false});
    }


  }

  confirmPasswordValidation()
  {

    if(this.state.password!=this.state.confirmPassword)
    {
      this.setState({confirmpassworderror:"* passwords do not match",isconfirmError:true});
    }

    else
    {
      this.setState({confirmpassworderror:"",isconfirmError:false});
    }

  }

  render() {

    const alert = this.state.isAlertError;

    return (
    <View style={styles.containerView}> 
    <SCLAlert
    show={this.state.isAlertError}
    onRequestClose={this.alertClose}
    theme="danger"
    title="Invalid Form"
    subtitle="Correct errors before submitting !!!"
    headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
  >
    <SCLAlertButton theme="danger" onPress={this.alertClose}>OK</SCLAlertButton>
  </SCLAlert>
  <View style={styles.top}> 
        </View>
        <View style={styles.middle}> 
          <View style={styles.formArea}>
          <View style={styles.formItems}> 
          <Text style={styles.validation}>{this.state.firsnameerror}</Text>
          <TextInput
          value={this.state.firstname}
          onChangeText={(firstname) => this.setState({ firstname })}
          placeholder={'Forename'}
          placeholderTextColor='black'
          style={styles.loginFormTextInput}
          placeholderColor="#3897f1"
          onBlur={()=> this.firstnameValidation()}
        />
            
        <Text style={styles.validation}>{this.state.lastnameerror}</Text>

        <TextInput
          value={this.state.lastname}
          onChangeText={(lastname) => this.setState({ lastname })}
          placeholder={'Surname'}
          placeholderTextColor='black'
          style={styles.loginFormTextInput}
          placeholderColor="#3897f1"
          onBlur={()=> this.lastnameValidation()}
        />
        <Text style={styles.validation}>{this.state.emailerror}</Text>
              <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email Address'}
                placeholderTextColor='black'
                style={styles.loginFormTextInput}
                placeholderColor="#3897f1"
                onBlur={()=> this.emailValidation()}
              />

   

              <Text style={styles.validation}>{this.state.passworderror}</Text>

              <TextInput
                value={this.state.password}
                placeholderTextColor='black'
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onBlur={()=> this.passwordValidation()}
              />

              <Text style={styles.validation}>{this.state.confirmpassworderror}</Text>

              <TextInput
                value={this.state.confirmPassword}
                placeholderTextColor='black'
                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                placeholder={'Confrim Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onBlur={()=> this.confirmPasswordValidation()}
              />
              </View>



              <TouchableOpacity
              onPress={()=> this.Submit()}

              >

                <View style={styles.loginButton}> 
               <Text style={styles.buttonText}>           
                 Create Account            
               </Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('LoginScreen')}}
              >
              <View style={styles.createButton}> 
              <Text style={styles.signUpButtonText}>           
                Already have an account? 
                {" "}
                <Text style={styles.signUpText}> 
                  Sign In    
                </Text>
              </Text>
           
              </View>
              </TouchableOpacity>
          </View>
          </View>
       
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    position:'relative'
  },

  
    top:{
      position:'relative',
      height:'100%',
      backgroundColor:'#fff44f',
      paddingRight:12.7,
      paddingLeft:12.7,
    },

    middle:
    {
      width:'100%',
      height:'100%',
      flex:1,
      position:'absolute',
      zIndex:2,
      paddingLeft:26.3,
      paddingRight:26.3
      
    },
  

  logoText: {
    fontSize: 85,
    fontWeight: "800",
    textAlign: 'center',
    color:'black'
  },
  formArea: {
    height:'75%',
    alignSelf:'center',
    width:'100%',
    top:"10%",
    backgroundColor:'white',
    borderRadius:20
  },
  loginFormTextInput: {
    height: 70,
    fontSize: 14,
    borderTopColor:'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth :5,
    borderBottomColor: '#000',
    backgroundColor: 'white',
  },

  validation:
  {
    color:'red',
    marginLeft:20,
    marginBottom:0,
    marginTop:5
    
  },

  formItems:
  {
    marginTop:'3%'
  },
  buttonText:{
    color:'white',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600'
    
  },

  signUpButtonText:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600',
    marginTop:'5%'
  },

  loginView:{

    width:'100%'

  },

  signUpText:
  {

    color:'blue'

  },

  createButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'100%',
    alignSelf:'center',
    

  },

  loginButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 60,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'90%',
    alignSelf:'center',
    marginTop:'9%'

  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});





const mapStatetoProps = (state) => {

    return {
      orders: state.orderReducer,
      service:state.orderReducer.service
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
  
    return {
      setUserId: (data) => dispatch(setUserId(data))
    }
  
  }


  
  
  export default connect(mapStatetoProps, mapDispatchToProps)(createAccountScreen);

  
