import React, { Component} from 'react';
import { FlatList, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import {setSlot} from './store/actions';
import {connect} from  'react-redux';

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
      selectedSlot: []
    };

  }

  apiSlots = [
    { key: 1, startTime: "9:00", isCheck: false, endtime: "9:30", date: "2020-11-28" },
    { key: 2, startTime: "9:30", isCheck: false, endtime: "10:00", date: "2020-11-28" },
    { key: 3, startTime: "10:00", isCheck: false, endtime: "10:30", date: "2020-11-29" },
    { key: 4, startTime: "10:30", isCheck: false, endtime: "11:00", date: "2020-11-29" },
    { key: 5, startTime: "9:00", isCheck: false, endtime: "9:30", date: "2020-11-29" },
    { key: 6, startTime: "9:30", isCheck: false, endtime: "10:00", date: "2020-11-29" },
    { key: 7, startTime: "9:00", isCheck: false, endtime: "9:30", date: "2020-11-30" },
    { key: 8, startTime: "9:30", isCheck: false, endtime: "10:00", date: "2020-11-30" },
  ]


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

    console.log(timeSlots[index])

    timeSlots.forEach(element => {
                 
          slots.push(element.isCheck);  
    });

    slots[index] = !slots[index]; 
    this.setState({ischecked:slots,selectedSlot:timeSlots[index]});
  }


  async componentDidMount() {
    this.onChangeDate(this.state.date)
  }


  onChangeDate(date) {

    var selectedDate = Moment(new Date(date)).format("YYYY-MM-DD");

    var timeSlots = [];

    this.apiSlots.forEach(element => {

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
            // We use Moment.js to give the minimum and maximum dates.
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
                  {item.startTime + " - " + item.endtime}

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

  console.log(state);

  return {
    orders: state.orderReducer
  }
}

const mapDispatchToProps = (dispatch) =>
{ 
  return {
  setSlot: (data) => dispatch(setSlot(data))

  }

}


export default connect(mapStatetoProps,mapDispatchToProps) (SlotScreen);
