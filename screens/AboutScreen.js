import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import GallerySwiper from 'react-native-gallery-swiper';

export default class StartLocationScreen extends React.Component {
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
            <LabelForInput customLabel='Address' />
            <Text style={styles.option}>1712 S 12th St. Waco, TX 76706</Text>
            <LabelForInput customLabel='Phone Number' />
            <Text style={styles.option}>(254) 235-2646</Text>
            <LabelForInput customLabel='Operating Hours' />
            <Text style={styles.option}>Sun.-Sat. 11AM-11PM</Text>
            <View style={styles.containerGallery}>
              <GallerySwiper
                  images={[
                    { source: require("../assets/images/shorty-in-front.jpg"),
                      dimensions: { width: 550, height: 366 } },
                    { source: require("../assets/images/shorty-wife.jpg"),
                      width: 760,
                      height: 540 },

                  ]}
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
    paddingTop: 20,
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
    marginTop: 20,
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
  containerGallery: {
    padding: 20,
    justifyContent: 'space-evenly',
    height: 400,
    width: 400,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});