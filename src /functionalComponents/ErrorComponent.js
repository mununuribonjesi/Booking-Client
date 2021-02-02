import React, { useState, useEffect } from 'react';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';


const ErrorComponent = (props) => {

    console.log(props.isError)


  const[Error,setError] = useState(props.isError)


  const closeError = () =>
  {
      setError(false);

  }


 return(

    <SCLAlert
    show={Error}
    onRequestClose={closeError}
    theme="danger"
    title="Oops! Something went wrong"
    subtitle={"error fetching\n\n"+props.item+props.errorMessage}
    headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
  >
    <SCLAlertButton theme="danger" onPress={() => closeError}>OK</SCLAlertButton>
  </SCLAlert>
 )
};

export default ErrorComponent;

