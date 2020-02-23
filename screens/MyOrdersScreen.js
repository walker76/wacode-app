import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import {AsyncStorage, Platform} from 'react-native';

export default class MyOrdersScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      orders: []
    }
    this._loadOrders = this._loadOrders.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps.route.params);
    if(nextProps.route.params !== undefined && nextProps.route.params.refresh !== undefined){
      console.log('refresh');
      this._loadOrders();
      return nextProps.route.params.refresh;
    }
    return true;
  }

  componentDidMount(){
      this._loadOrders();
  }

  _loadOrders(){
    axios.get('https://wacode-2020.herokuapp.com/orders/findByDeviceId/' + 12345)
    .then(response => {
      console.log(response.data);
      if(response.data !== undefined && response.data !== null){
        console.log('setting state');
        this.setState({
          orders: response.data,
        });
      }
    })
.catch(err => {
  console.error(err);
});
  }

  render(){
    const list = this.state.orders;
    if(list.length <= 0){
      return(
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text>You don't have any orders yet</Text>
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.optionSubheadingText}>My Orders</Text>
        {
          list.map((item, i) => (
            <OptionButton
              key={i}
              icon="md-pizza"
              title={item.title + " - " + item.status}
              id={item.id}
              onPress={() => {
                  null
                }
              }
            />
          ))
        }
      </ScrollView>
    );
  }
}

function OptionButton({ icon, label, onPress, isLastOption, title, id }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <LabelForInput customLabel={title} />
          <LabelForInput customLabel={'Order #' + id} />
        </View>
      </View>
    </RectButton>
  );
}

function LabelForInput({customLabel}){
  return (
    <Text style={styles.optionSmallHeadingText}>
      {customLabel}
    </Text>)
    ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  optionButton: {
    fontSize: 12,
    marginTop: 1,
  },
  optionSubheadingText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 15,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  optionMultipleButtons: {
    flexDirection: "row",  
    justifyContent: 'space-evenly',
    paddingLeft: 25,
    paddingRight: 25,
  },
  optionMultipleInputs: {
    flexDirection: "row",  
    justifyContent: 'space-evenly',
  },
  containerInput: {
    paddingTop: 8,
    paddingBottom: 1,
    paddingHorizontal: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerMultipleInput: {
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: 180,
    justifyContent: "center",
  },
  optionSmallHeadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    fontStyle: 'italic'
  },
  messageText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  containerStacked: {
    flex: 1,
    paddingTop: 20,
  },
});