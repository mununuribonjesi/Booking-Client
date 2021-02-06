import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard,Image, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserId} from './store/actions';
import { connect } from 'react-redux';
import {FontAwesome5 } from '@expo/vector-icons';
import { LogBox } from 'react-native';
import config from '../config';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';
import { Constants } from 'react-native-unimodules';



import Logo from '../assets/MuniBook.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
      isFailed: false,
      isError:false,
      errorMessage:''
    };
  }


  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    console.log(Constants.systemFonts);
}

  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }




isError = () =>
{
  this.setState({isError:!this.state.isError});
}


  async onLogin() {
    await axios({
      method: 'post',
      url: config.Authentication_URL+'/api/login',
      data: {
        'email': this.state.username,
        'password': this.state.password
      }
    }).then(response =>
      {
        this.Login(response);
      }).catch (error =>{
        if(error.response)
        {
            this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
        }
    })
  }

  

Login(response)
{
  const token = response.data.token;
  if (response.status === 200 && token) {
    this.setState({ isAuthenticated: true });
    this.setToken(token);
    var user = response.data.user;
    var userId = user._id;
    this.props.setUserId(userId);
    this.props.navigation.navigate('HomeScreen');
    //const value = await AsyncStorage.getItem('token')
  }
}
    
  


  render() {

    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    return (


      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.containerView}> 
    <SCLAlert
    style={styles.modal}
    show={this.state.isError}
    onRequestClose={this,this.isError}
    theme="danger"
    title="Attempt failed"
    subtitle={this.state.errorMessage}
    headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
  >
    <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
  </SCLAlert>

        <View style={styles.top}> 
        <Image style={styles.Logo} source={Logo} />
        </View>

        <View style={styles.middle}> 

          <View style={styles.formArea}>
          <Text style={styles.signInText}>Sign In</Text>
           <View style={styles.formItems}> 

              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                placeholderTextColor='black'
                style={styles.loginFormTextInput}
                placeholderColor="#3897f1"
                underlineColorAndroid='transparent'
              />
              <TextInput
                value={this.state.password}
                placeholderTextColor='black'
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TouchableOpacity
                onPress={this.onLogin.bind(this)}
              >

                <View style={styles.loginButton}> 
               <Text style={styles.buttonText}>           
                 Login            
               </Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={() => { this.props.navigation.navigate('createAccountScreen')}}
              >
              <View style={styles.createButton}> 
              <Text style={styles.signUpButtonText}>           
                Dont have an account? 
                {" "}
                <Text style={styles.signUpText}> 
                  Sign up    
                </Text>
              </Text>
              </View>
              </TouchableOpacity>
          </View>
          </View>
          </View>
          <View style={styles.footer}> 
          </View>
      </View>
      </TouchableWithoutFeedback>

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
  signInText:{

    justifyContent:'center',
    alignSelf:'center',
    marginTop:'5%',
    fontSize:50


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
    height:'50%',
    alignSelf:'center',
    width:'100%',
    top:"20%",
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
    marginBottom: 15,
    borderBottomWidth :5,
    borderBottomColor: '#000',
    backgroundColor: 'white',
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


  signUpText:
  {

    color:'blue'

  },

  Logo:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:'17%'

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


  
  
  export default connect(mapStatetoProps, mapDispatchToProps)(LoginScreen);

  
