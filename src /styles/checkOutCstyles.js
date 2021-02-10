import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
 

export const styles  = StyleSheet.create({
  container: {
    justifyContent:'center',
    flex:1,
    flexDirection:'row'

  },

  subHeader: {
    backgroundColor: '#fff44f',
    height: '10%'
  },

  textStyle: {
      textAlign: 'center',
      color: 'black',
      fontSize: RFValue(35),
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
      fontSize: RFValue(35),
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
