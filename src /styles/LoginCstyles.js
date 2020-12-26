import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: '#fff44f',
      height:'100%',
    },
  
    logoView:{
  
      height:'30%',
      marginTop:50
  
    },
  
    logoText: {
      fontSize: 85,
      fontWeight: "800",
      marginBottom: 50,
      textAlign: 'center',
      color:'black'
    },
    loginFormView: {
      height:'100%',
    },
    loginFormTextInput: {
      height: 43,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
  
    },
  
    buttonText:{
      color:'white',
      fontSize:20,
      textAlign:'center',
      fontWeight:'600'
    },
  
    loginView:{
  
      width:'100%'
  
    },
  
    loginButton: {
      backgroundColor: 'black',
      borderRadius: 5,
      height: 45,
      marginTop: 10,
      textAlign:'center',
      justifyContent:'center',
      width:'50%',
      alignSelf:'center'
  
    },
    fbLoginButton: {
      height: 45,
      marginTop: 10,
      backgroundColor: 'transparent',
    },
  });
  