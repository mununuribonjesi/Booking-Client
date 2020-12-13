import React, { Component} from 'react';
import { FlatList, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment, { duration } from 'moment';
import {setSlot} from './store/actions';
import {connect} from  'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';

class SlotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      stickyHeaderIndices: [],
      date: new Date(),
      ischecked: [],
      availableTimeSlots: [],
      selectedSlot: [],
      data:[],
      duration:'60'
    };

  }


  async componentDidMount()
  {     

    
      const token = await AsyncStorage.getItem('token');

      const response = await axios({
        method: 'get',
        url: 'https://21c9547db6d8.ngrok.io/api/timeSlots',
        params: {
          'barberId': this.props.barberId,
        },
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      
      try {

  
        if (response.status === 200) {
         
          var data = response.data.availability.sort((a,b) => (a.startTime > b.startTime )?1:-1);          ;

          var availability = [];

          var excludeSt = [];

          data.forEach(av=> {


           var time = Moment(av.startTime,'HH:mm');
           var newTime = Moment(time).add(60,'m').format('HH:mm');
           var checkst = Moment(time).add(30,'m').format('HH:mm');


           var timeException = [];
           var newdata = [];
 

           timeException = data.filter(function(x)
           {
             return x.startTime === checkst.toString() && x.date === av.date;
           });

           if(Object.keys(timeException).length !== 0 )
           {
              excludeSt.push({_id:timeException[0]._id,startTime:timeException[0].startTime});
           }
          
          
           newdata = data.filter(function(x)
           {
             return x.endTime === newTime.toString() && x.date === av.date;
           });


          const fst = excludeSt.filter(function(x)
          {
            return x._id === av._id && x.startTime === av.startTime;

          });

          console.log(fst);






            if(Object.keys(newdata).length !== 0 )
            {

              var et = newdata[0].endTime;
              

              if(fst.startTime !== av.startTime)
              {

                  availability.push({key:av._id,startTime:av.startTime,endTime:et,date:av.date,isCheck:false})
         
              }
          
          }
    
          });

          this.setState({data:availability});

        }


      this.onChangeDate(this.state.date)

  
      } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      } 
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


  isCheckBox(index) {

    var timeSlots = [...this.state.availableTimeSlots];
    
    var slots = [];

    timeSlots.forEach(element => {
                 
          slots.push(element.isCheck);  
    });

    slots[index] = !slots[index]; 
    this.setState({ischecked:slots,selectedSlot:timeSlots[index]});
  }


  onChangeDate(date) {

    var selectedDate = Moment(new Date(date)).format("YYYY-MM-DD");

    var timeSlots = [];

    this.state.data.forEach(element => {

      if (element.date === selectedDate) {
        timeSlots.push(element);
      }

    })
     
    this.setState({ date: date, availableTimeSlots: timeSlots,ischecked:[] });

  }

  render() {
    return (


      <View styles={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Schedule
            </Text>
        </View>

        <View style={styles.Calendar}>
          <Calendar
            onChange={(date) => this.onChangeDate(date)}
            selected={this.state.date}
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(10, 'years').startOf('day')}
          />
        </View>

        <View style={styles.slotHeader}>
          <Text style={styles.textStyle}>
            Available Slots
            </Text>
        </View>

        <View style={styles.slots}>
          <FlatList

            data={this.state.availableTimeSlots}
            keyExtractor={(item,index)=> index.toString()}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListFooterComponent={this.FlatListItemSeparator}
            renderItem={({ item, index }) => (

              <TouchableOpacity
                onPress={() => this.isCheckBox(index)}

                style={[
                  { backgroundColor: this.state.ischecked[index] ? '#00ff00' : '#FFFFFF' }
                ]}
              >
                <Text style={styles.logoText}>
                  {item.startTime + " - " + item.endTime}

                </Text>

              </TouchableOpacity>


            )}
          />
        </View>
        <View style={styles.Footer}>


          <TouchableOpacity
            onPress={() =>{ this.props.navigation.navigate('CheckoutScreen'),this.props.setSlot(this.state.selectedSlot)}}
          >

            <Text style={styles.FooterText}>
              Confirm
          </Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    padding: 7
  },
  subHeader: {

    backgroundColor: '#fff44f',
    height: '10%'
  },

  Calendar: {
    height: '40%'

  },

  Footer: {
    backgroundColor: 'black',
    height: '15%'

  },

  slotHeader: {
    backgroundColor: '#fff44f',
    height: '10%'

  },

  slots: {
    backgroundColor: 'white',
    height: '25%',
    justifyContent: 'center'

  },

  FooterText:
  {
    color: 'white',
    marginTop: 25,
    fontSize: 40,
    textAlign: 'center',

  },
  logoText: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 44


  },
})


const mapStatetoProps  = (state) =>
{

  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString()
  }
}

const mapDispatchToProps = (dispatch) =>
{ 
  return {
  setSlot: (data) => dispatch(setSlot(data))

  }

}


export default connect(mapStatetoProps,mapDispatchToProps) (SlotScreen);
