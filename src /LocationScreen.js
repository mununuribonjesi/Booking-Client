import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {ListItem } from 'react-native-elements';
import { setOrganisationId, setService, setTotal } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';
import Geocoder from 'react-native-geocoding';
import config from '../config';
import { relative } from 'path';
import { ScrollView } from 'react-native-gesture-handler';

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
      ImgToBase64:'',
      errorMessage:'',
      isError:false
      
    };
  }

  async componentDidMount() {


    await AsyncStorage.setItem('token', config.token)

    Geocoder.init(config.PLACES_KEY);


  }

  isError = () =>
  {
    this.setState({isError:!this.state.isError});
    this.props.navigation.navigate('HomeScreen');
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


setOrganisation(response)
{
  this.setState({data:response.data.organisation})
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
      <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching Locations \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>

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

        var location = details.geometry.location;
        var lat = location.lat;
        var long = location.lng;


         await axios({
          method: 'get',
          url: config.Availability_URL + '/api/organisation',
          params: {
            'lat':lat,
            'long':long
          }
        }).then(response => 
          {
            this.setOrganisation(response)

          }).catch(error => {
            if(error.response)
            {
              this.setState({errorMessage:JSON.stringify(error.response.status),isError:true});
            }
          })
      }}
    
      styles={{
        textInputContainer: {
          backgroundColor: 'black',
          zIndex: 0
        },
        
        textInput: {
          height: 40,
          color: '#black',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    </View>


<ScrollView

style={styles.flatlist}
>


    <FlatList
      data={this.state.data}
      keyExtractor={(x,i) => i.toString()}
      renderItem={({ item, }) => (     
        <TouchableOpacity
        onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
        >

          <ListItem      
            style={styles.list} key={item._id} bottomDivider>
            <UserAvatar size={80} name="Avishay Bar" src={item.uri} />  
            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title><Text style={styles.listText}>{item.companyName}</Text></ListItem.Title>
              </View>
              <View styles={styles.list}>
              <ListItem.Title><Text style={styles.listText}>{item.addressLine1}</Text></ListItem.Title>
            </View>
            <View styles={styles.list}>
            <ListItem.Title><Text style={styles.listText}>{item.town}</Text></ListItem.Title>
          </View>
          <View styles={styles.list}>
          <ListItem.Title><Text style={styles.listText}>{item.postCode}</Text></ListItem.Title>
        </View>
            </ListItem.Content>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
            >
              <Text style={styles.bookText}>Book Now</Text>
            </TouchableOpacity>
          </ListItem>
        </TouchableOpacity>
      )}
    />
    </ScrollView>
    </View>
    
    )
  }
}

export const styles = StyleSheet.create({

  list: {
  fontSize: RFValue(20),



},

listText:{
  fontSize: RFValue(12)

},

flatlist:{
  top:40,
  marginBottom:40
},

searchbar:{
  position:'absolute',
  left:0,
  top:0,
  width:'100%',
  height:'40%',
  zIndex:100,
},


container: {
  justifyContent: 'center',
  height: '100%',
  flex: 1,
  textAlign: 'left'
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