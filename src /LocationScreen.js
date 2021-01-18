import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import { setOrganisationId, setService, setTotal } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UserAvatar from 'react-native-user-avatar';
import { Avatar } from 'react-native-image-avatars';
import ReactRoundedImage from "react-rounded-image";
import ImgToBase64 from 'react-native-image-base64';
import {Asset} from 'expo-asset';
import ProfilePicture from 'react-native-profile-picture';


import config from '../config';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


class LocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischecked: [],
      total: 0.00,
      services: [],
      data: [],
      isLoading:false,
      city:'',
      ImgToBase64:''
      
    };
  }

  async componentDidMount() {

  }


navigateToScreen()
{

  var isGetByService = this.props.navigation.state.params.isGetByService;

  if(isGetByService)
  {
    this.props.navigation.navigate("ServicesScreen",{
      isGetByService
    })
  }

  else 
  {
    this.props.navigation.navigate("BookScreen",{
      isGetByService
    })
  }

}



  ListHeader = () => {
    return (

      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
          Select Barber
            </Text>
      </View>

    );
  };


  render() {
    return (

      <View style={styles.container}> 

      <View style={styles.searchbar} pointerEvents='box-none'> 
      
      <GooglePlacesAutocomplete
      placeholder='Enter Location'
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      query={{
        key: config.PLACES_KEY,
        language: 'en',
      }}
      onPress={async (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        var city = data.terms[0].value;

        var response = await axios({
          method: 'get',
          url: config.Availability_URL + '/api/organisation',
          params: {
            'city':city
          }
        });

        console.log(city);

        console.log(response.data.organisation);

        


        this.setState({data:response.data.organisation})

      }}
    
      styles={{
        textInputContainer: {
          backgroundColor: 'black',
          zIndex: 0
        },
        
        textInput: {
          height: 60,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    </View>




<View style={styles.shoplist}>
    <FlatList
      data={this.state.data}
      keyExtractor={(x,i) => i.toString()}
      renderItem={({ item, }) => (
        
        <TouchableOpacity
        onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
        >

  
          <ListItem
          
            style={styles.list} key={item._id} bottomDivider>
            <UserAvatar size={100} name="Avishay Bar" src={item.uri} />
        
            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title>{item.companyName}</ListItem.Title>
              </View>
              <View styles={styles.list}>
              <ListItem.Title>{item.addressLine1}</ListItem.Title>
            </View>
            <View styles={styles.list}>
            <ListItem.Title>{item.town}</ListItem.Title>
          </View>
          <View styles={styles.list}>
          <ListItem.Title>{item.postCode}</ListItem.Title>
        </View>
            </ListItem.Content>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
            >
              <Text style={styles.bookText}>Open</Text>
            </TouchableOpacity>
          </ListItem>
        </TouchableOpacity>
      )}
    />
    </View>


    </View>
    )
  }
}

export const styles = StyleSheet.create({

  list: {
  fontSize: 50,
  backgroundColor: 'yellow'

},

searchbar:{
  position:'absolute',
  left:0,
  top:0,
  width:'100%',
  height:'40%',
  zIndex:100,


},

shoplist:{
  position:'absolute',
  width:'100%',
  height:'100%',
  top:0,
  marginTop:60
},

container: {
  justifyContent: 'center',
  height: '100%',
  flex: 1,
  textAlign: 'left',
},

imagewrapper: {
  alignSelf: 'center'
},
textStyle: {
  textAlign: 'center',
  color: 'black',
  fontSize: 40,
  padding: 7
},
headerFooterStyle: {

  backgroundColor: '#fff44f'

},

wrappercontainer: {
  marginTop: 30,

},

button: {
  alignItems: 'center',
  backgroundColor: '#00ff00',
  padding: 10,
},

bookText:{
  color:'black'
},


iconWrapper: {
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 100,
  backgroundColor: '#fff',
  borderRadius: 10

},

wrapper: {
  marginTop: 50,
  paddingLeft: 20,
  width: '50%',
  flexDirection: 'row'

},
item: {
  width: '100%', // is 50% of container width
  paddingLeft: 10,
  height: '100%'

},

itemwrapper: {

},
logoText: {
  fontSize: 20,
  fontWeight: "800",
  marginTop: 20,
  textAlign: 'center',
},
itemtext: {
  textAlign: 'left',
  marginTop: 10,
  fontSize: 20

}
})

const mapStatetoProps = (state) => {
  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setService: (data) => dispatch(setService(data)),
    setTotal: (data) => dispatch(setTotal(data)),
    setOrganisationId: (data) => dispatch(setOrganisationId(data))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LocationScreen);