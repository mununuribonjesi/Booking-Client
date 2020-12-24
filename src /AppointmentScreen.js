import React, { Component } from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import Tab from './functionalComponents/AppointmentComponent';
import {ListItem} from 'react-native-elements';
import Moment from 'moment';

class AppointmentScreen extends Component
{

    constructor(props) {
        super(props);

        this.state = {
          username: '',
          password: '',
          stickyHeaderIndices: [],
          ischecked:[],
          total:0.00,
          services:[],
          data:[]
        };
      }



  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


    upcomingAppointments =[{
          skill:"haircut",startTime:"9:00",endTime:"10:00",barber:"callum",date:"2020-12-25",total:20
      },{
      skill:"Dreads",startTime:"9:00",endTime:"10:00",barber:"John",date:"2020-12-26",total:50
  }]

    recentAppointments =[{
        skill:"haircut",startTime:"9:00",endTime:"10:00",barber:"james",date:"2020-12-24",total:50
    }]



    FirstRoute = () => (
      <FlatList style={styles.FlatList}
        data={Object.values(this.upcomingAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        ListFooterComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)
    
    
    
    SecondRoute = () => (<FlatList style={styles.FlatList}
        data={Object.values(this.recentAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        ListFooterComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)



    renderAppointment = ({ item }) => {

        return (
          <View>
            <ListItem style={styles}>
              <ListItem.Title style={styles.leftText}>Barber:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>{item.barber}
              </Text>
            </ListItem>
            <ListItem >
              <ListItem.Title style={styles.leftText}>Date:</ListItem.Title>
              <ListItem.Content >
              </ListItem.Content>
              <Text style={styles.rightText}>
                {Moment(new Date(item.date)).format("ddd DD MMM YYYY")}
              </Text>
            </ListItem>
            <ListItem>
              <ListItem.Title style={styles.leftText}>Slot:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>
                {item.startTime} - {item.endTime}
              </Text>
            </ListItem>
            
            <ListItem>
              <ListItem.Title style={styles.leftText}>Total:</ListItem.Title>
              <ListItem.Content>
    
              </ListItem.Content>
              <Text style={styles.rightText}>
    
                £{item.total.toFixed(2)}
    
              </Text>
            </ListItem>
    
    
          </View>)
      }


    render()
    {


        const firstRoute = this.FirstRoute;
        const secondRoute = this.SecondRoute;
     
    return (

        <View styles={styles.container}>

        <View style={styles.subHeader}>
                  <Text style={styles.textStyle}>
                    Appointments
                    </Text>
                </View>
        
                <View style={styles.Body}>
                 <Tab 

                 FirstRoute =  {firstRoute}
                 SecondRoute = {secondRoute}          
                 
                 /> 
                  <Text style={styles.textStyle}>

                  </Text>
        
                </View>
          
                <View style={styles.Footer}>
                  <TouchableOpacity
                     onPress={() =>
                        this.props.navigation.navigate("BookScreen",{
                          isGetByService:false
                        })}
                  >
        
                  <Text style={styles.FooterText}>
                    Book Now 
                  </Text>
                  </TouchableOpacity>

                </View>
            
           </View>

    )
    }

    
}




const styles = StyleSheet.create({
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
  })

export default AppointmentScreen
