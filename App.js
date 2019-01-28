import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { 
  createSwitchNavigator, 
  createAppContainer, 
  createDrawerNavigator, 
  createBottomTabNavigator,
  createStackNavigator } from 'react-navigation';


class App extends  Component{
    render(){
      return(
        <AppContainer/>
      )
    }
}
export default App;


class WelcomeScreen extends Component{
  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Login" onPress={()=> this.props.navigation.navigate('Dashboard')} />
        <Button title="Sign up" onPress={()=> alert('button pressed')} />
      </View>
    )
  }
}

class DashboardScreen extends Component{
  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> DashboardScreen</Text>
      </View>
    )
  }
}

class Feed extends Component{
  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title='Go to Detail Screen' onPress={()=> this.props.navigation.navigate('Detail')} />
      </View>
    )
  }
}

class Settings extends Component{
  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Settings </Text>
      </View>
    )
  }
}

class Profile extends Component{
  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Profile </Text>
      </View>
    );
  }
}

const Detail = props => (
  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Detail</Text>
  </View>
);

const FeedStack = createStackNavigator({
  Feed:{
    screen: Feed, 
    navigationOptions: ({navigation}) => {
      return{
        headerTitle:'Feed',
        headerLeft: (
          <Icon style={{paddingLeft: 10 }}
             onPress={()=> navigation.openDrawer()}
             name="md-menu" size={30} />
        )
      }
    }
  }, 
  Detail: {
    screen: Detail
  }
}, {
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
});


const ProfileStack = createStackNavigator({
  Feed:{
    screen: Profile, 
    navigationOptions: ({navigation}) => {
      return{
        headerTitle:'Profile',
        headerLeft: (
          <Icon style={{paddingLeft: 10 }}
             onPress={()=> navigation.openDrawer()}
             name="md-menu" size={30} />
        )
      }
    }
  }
});

const SettingsStack = createStackNavigator({
  Feed:{
    screen: Settings, 
    navigationOptions: ({navigation}) => {
      return{
        headerTitle:'Settings',
        headerLeft: (
          <Icon style={{paddingLeft: 10 }}
             onPress={()=> navigation.openDrawer()}
             name="md-menu" size={30} />
        )
      }
    }
  }
});



const DashboardTabNavigator = createBottomTabNavigator(
  {
  FeedStack,
  ProfileStack,
  SettingsStack
},
{
  navigationOptions:({navigation})=> {
    const {routeName} = navigation.state.routes
    [navigation.state.index];
    return {
      header: null,
      headerTitle: routeName
    };
  }
}

)

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
}, {
    defaultNavigationOptions:({navigation})=>{
      return{
        headerLeft:(
          <Icon style={{paddingLeft: 10 }}
             onPress={()=> navigation.openDrawer()}
             name="md-menu" size={30} />
        )
      }
    }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
})


const AppSwitchNavigator = createSwitchNavigator({
  welcome: {screen: WelcomeScreen}, 
  Dashboard: {screen: AppDrawerNavigator}
})


const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
