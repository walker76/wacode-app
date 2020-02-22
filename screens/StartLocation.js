import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StartLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
  }

  componentWillMount(){
    axios.put('https://wacode-2020.herokuapp.com/device/register')
    .then(response => {
      console.log(response.data);
      if(response.data !== undefined){
        console.log('response', response.data);
        AsyncStorage.setItem('@Store:id', response.data.id)
        .catch(err => {
          console.error(err);
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Text style={styles.optionsTitleText}>Welcome To Universal Pizza</Text>
            <Text style={styles.optionSubheadingText}>A Location-Based Pizza Provider</Text>
            <LabelForInput customLabel='Please Enter Your Current Zip Code' />
            <InputTextWPaTCT plchldrTxt='11111' txtCT='postalCode' />
            <View>
                {this.state.completed && 
                  <Text>Location Saved!</Text>
                }
            </View>
            
            <View style={styles.containerStacked}>
              <Button
                type="outline"
                icon={
                  <Icon
                  name='arrow-right'
                  size={18}
                  color='green'
                  />
                }
                onPress={() => this.props.navigation.navigate('Root')}
                iconRight
                title='Get Started        '
                style={styles.optionButton}
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

function InputTextWPlaceholder({plchldrTxt}) {
  return (
    <Input
      labelStyle={styles.optionText}
      placeholder={plchldrTxt}
      containerStyle={styles.containerInput}
    />
  );
}

function InputTextWPaTCT({plchldrTxt, txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      placeholder={plchldrTxt}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
      keyboardType='number-pad'
      autoCompleteType="postal-code"
      maxLength={5}
      returnKeyType='go'
    />
  );
}

function InputTextWTCT({txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
      keyboardType='numeric'
    />
  );
}

function CheckboxWTaCaOP({name,ischecked,uponpress}) {
  return (
    <CheckBox
      center
      textStyle={styles.optionButton}
      title={name}
      checked={ischecked}
      onPress={uponpress}
    />
  );
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

function SubmitOrSaveButton(state){
  if(readyToSubmit(state) == true){
      return (
        <ButtonWTitleAnIconAColor
          name='Submit Survey    '
          iname='check'
          clr='green'
          uponpress={() => null}
        />
      );
    } else {
      return (
        <ButtonWTitleAnIconAColor
          name='Save Progress    '
          iname='save'
          clr='red'
          uponpress={() => null}
        />
      );
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
    marginTop: 10,
    marginBottom: 50,
    fontStyle: 'italic',
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
    paddingLeft: 10,
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