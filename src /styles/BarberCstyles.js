import { StyleSheet } from 'react-native';


export const styles  = StyleSheet.create({
  container: {
    justifyContent:'center',
    height:'100%',
    flex:1
  },

  subHeader: {
    backgroundColor: '#fff44f',
    height: '10%'
  },

  textStyle: {
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
      padding: 7
    },
    Body:{

      backgroundColor:'white',
      height:'75%'
    },

    Footer:{
      backgroundColor:'black',
      height:'15%'

    },

    FooterText:
    {
      color:'white',
      marginTop:25,
      fontSize: 40,
      textAlign: 'center',
      
    },
  logoText: {
    fontSize: 20,
    fontWeight: "800",

  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
