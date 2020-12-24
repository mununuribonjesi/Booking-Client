import * as React from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';


const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'Recent' },
  ]);



  const renderScene = SceneMap({
    first: props.FirstRoute,
    second:props.SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});