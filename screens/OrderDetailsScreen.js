import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class OrderDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Text style={styles.optionsTitleText}>Local Pizza Provider Information</Text>
            <Text style={styles.optionSubheadingText}>Shorty's Pizza Shack</Text>
            <LabelForInput customLabel='Order #' />
            <Text style={styles.option}>000066</Text>
            <LabelForInput customLabel='Status' />
            <Text style={styles.option}>PENDING</Text>
            <LabelForInput customLabel='Address' />
            <Text style={styles.option}>Cashion Academic Center Waco, TX 76706</Text>
            <View style={styles.optionTextContainer}>
                <Button
                    type="outline"
                    icon={
                    <Icon
                    name='arrow-left'
                    size={15}
                    color='blue'
                    />
                    }
                    onPress={() => this.props.navigation.navigate('MyOrders')}
                    iconLeft
                    title='   Back To Orders'
                />
            </View>
          </ScrollView>
      </View>
    );
  }
}

function LabelForInput({customLabel}){
  return (
    <Text style={styles.optionSmallHeadingText}>
      {customLabel}
    </Text>)
    ;
}

function ButtonWTitleAnIconAColor({name,iname,clr,uponpress}) {
  return (
    <Button
      type="outline"
      icon={
        <Icon
        name={iname}
        size={15}
        color={clr}
        />
      }
      onPress={uponpress}
      iconRight
      title={name}
    />
  );
}

function readyToSubmit(state){
  if(state.foname && state.focity && 
    state.focountry && state.fotypeofarea &&
    state.foeventname && state.fonatureofimpact){
      return true;
    } else {
      return false;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  optionsTitleText: {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 60,
    marginBottom: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
    textAlign: 'center',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionButton: {
    fontSize: 12,
    marginTop: 1,
    paddingLeft: 150,
    paddingRight: 150,
  },
  optionSubheadingText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
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
    paddingTop: 10,
    paddingBottom: 1,
    paddingHorizontal: 1,
    paddingLeft: 180,
    paddingRight: 180,
    justifyContent: 'center',
  },
  containerMultipleInput: {
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: 180,
    
  },
  optionSmallHeadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  containerStacked: {
    flex: 1,
    paddingTop: 20,
  },
});