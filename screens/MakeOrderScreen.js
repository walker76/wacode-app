import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Permissions, Location} from 'expo-permissions';
import axios from 'axios';


export default class MakeOrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this._getLocationAsync();
        this.state = {
            submitted: false,
            apartment: false,
            residential: false,
            office: false,
            school: false,
            church: false,
            buffalo: false,
            pepperoni: false,
            cheese: false,
            margherita: false,
            bbq: false,
            custom: false,
            meat: false,
            bbqsauce: false,
            tomatosauce: false,
            buffalosauce: false,
            pepperonimeat: false,
            sausagemeat: false,
            chickenmeat: false,
            jalapenos: false,
            pineapple: false,
            olives: false,
            location: { coords: {
                    latitude: 31.5497,
                    longitude: -97.1143,}},


        };
        this.onSubmit = this.onSubmit.bind(this);

    }

    _getLocationAsync = async () => {
      if(Permissions != null){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if( status !== 'granted') {
            this.setState({
                locationResult: 'Location permission was denied!', location, });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({locationResult: JSON.stringify(location), location, });
      }
    };

    onSubmit(){

      AsyncStorage.getItem('@Store:id')
      .then(res => {
        if(res !== undefined && res !== null){
          let jobRequest = {
              title: this.state.title,
              description: this.state.description,
              deviceId: res, // THIS NEEDS TO BE FROM LOCAL STORAGE
              lat: this.state.location.coords.latitude,
              lang: this.state.location.coords.longitude,
          };
          console.log(jobRequest);
    
          fetch('https://wacode-2020.herokuapp.com/orders/makeOrder', {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(jobRequest),
          })
          
          this.props.navigation.navigate('PostConfirmation');
        }
      })
      .catch(err => {
        console.error(err);
      });
    }

    render() {
    return (
      <View>
        <KeyboardAwareScrollView enableOnAndroid={true}>
            <Text style={styles.optionsTitleText}>Place An Order</Text>
            <Text style={styles.optionSubheadingText}>Location Information</Text>
            <LabelForInput customLabel='Full Name' />
            <InputTextWPlaceholder plchldrTxt='Joseph Smith' />
            <LabelForInput customLabel='Location' />
            <InputTextWPaTCT plchldrTxt='Street' txtCT='fullStreetAddress' />
            <InputTextWPaTCT plchldrTxt='City' txtCT='addressCity' />
            <InputTextWPaTCT plchldrTxt='Country' txtCT='countryName' />
            <LabelForInput customLabel='Type of Area' />
            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                name='Apartment'
                ischecked={this.state.apartment}
                uponpress={() => {
                    this.setState({
                        residential: false,
                        office: false,
                        school: false,
                        church: false,
                        apartment: !this.state.apartment,
                    })
                }
                }
              />
              <CheckboxWTaCaOP
                name='Office Building'
                ischecked={this.state.office}
                uponpress={() => this.setState({
                    apartment: false,
                    residential: false,
                    school: false,
                    church: false,
                    office: !this.state.office,
                })
                }
              />
            </View>
            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                  name='Residential'
                  ischecked={this.state.residential}
                  uponpress={() => this.setState({
                      apartment: false,
                      office: false,
                      school: false,
                      church: false,
                      residential: !this.state.residential,
                  })
                  }
              />

            <CheckboxWTaCaOP
                    name='School'
                    ischecked={this.state.school}
                    uponpress={() => this.setState({
                        apartment: false,
                        residential: false,
                        office: false,
                        church: false,
                        school: !this.state.school,
                    })
                    }
              />
              <CheckboxWTaCaOP
                    name='Church'
                    ischecked={this.state.church}
                    uponpress={() => this.setState({
                        apartment: false,
                        residential: false,
                        office: false,
                        school: false,
                        church: !this.state.church,
                    })
                    }
              />
            </View>
            <Text style={styles.optionSubheadingText}>My Order</Text>

            <LabelForInput customLabel='Favorites' />
            <View style={styles.optionMultipleButtons}>
                <CheckboxWTaCaOP
                    name='Buffalo Chicken'
                    ischecked={this.state.buffalo}
                    uponpress={() => {
                        this.setState({
                            pepperoni: false,
                            cheese: false,
                            margherita: false,
                            bbq: false,
                            custom: false,
                            buffalo: !this.state.buffalo,
                            meat: false,

                        })
                    }
                    }
                />

                <CheckboxWTaCaOP
                    name='Pepperoni '
                    ischecked={this.state.pepperoni}
                    uponpress={() => this.setState({
                        cheese: false,
                        margherita: false,
                        bbq: false,
                        custom: false,
                        buffalo: false,
                        pepperoni: !this.state.pepperoni,
                        meat: false,

                    })
                    }
                />
            </View>
                <View style={styles.optionMultipleButtons}>
                    <CheckboxWTaCaOP
                        name='Cheese'
                        ischecked={this.state.cheese}
                        uponpress={() => {
                            this.setState({
                                pepperoni: false,
                                cheese: !this.state.cheese,
                                margherita: false,
                                bbq: false,
                                custom: false,
                                buffalo: false,
                                meat: false,

                            })
                        }
                        }
                    />
                    <CheckboxWTaCaOP
                    name='Margherita'
                    ischecked={this.state.margherita}
                    uponpress={() => this.setState({
                        pepperoni: false,
                        cheese: false,
                        margherita: !this.state.margherita,
                        bbq: false,
                        custom: false,
                        buffalo: false,
                        meat: false,

                    })
                    }
                />
                </View>
            <View style={styles.optionMultipleButtons}>
            <CheckboxWTaCaOP
                        name='BBQ Chicken'
                        ischecked={this.state.bbq}
                        uponpress={() => this.setState({
                            pepperoni: false,
                            cheese: false,
                            margherita: false,
                            bbq: !this.state.bbq,
                            custom: false,
                            buffalo: false,
                            meat: false,

                        })
                        }
                    />
                    <CheckboxWTaCaOP
                        name='Meat Lovers'
                        ischecked={this.state.meat}
                        uponpress={() => this.setState({
                            pepperoni: false,
                            cheese: false,
                            margherita: false,
                            bbq: !this.state.bbq,
                            custom: false,
                            buffalo: false,
                            meat: !this.state.meat,
                        })
                        }
                    />
            </View>
            <View style={styles.optionMultipleButtons}>

            <CheckboxWTaCaOP
                        name='Custom'
                        ischecked={this.state.custom}
                        uponpress={() => this.setState({
                            pepperoni: false,
                            cheese: false,
                            margherita: false,
                            bbq: false,
                            custom: !this.state.custom,
                            buffalo: false,
                            meat: false,
                        })
                        }
                    />
                </View>

            {this.state.custom &&
            <View>
            <View style={styles.optionMultipleButtons}>
                <CheckboxWTaCaOP
                    name='Buffalo'
                    ischecked={this.state.buffalosauce}
                    uponpress={() => this.setState({
                        buffalosauce: !this.state.buffalosauce,
                        tomatosauce: false,
                        bbqsauce: false,
                    })
                    }
                />
                <CheckboxWTaCaOP
                    name='Classic Marinara'
                    ischecked={this.state.tomatosauce}
                    uponpress={() => this.setState({
                        buffalosauce: false,
                        tomatosauce: !this.state.tomatosauce,
                        bbqsauce: false,
                    })
                    }
                />
                <CheckboxWTaCaOP
                    name='BBQ'
                    ischecked={this.state.bbqsauce}
                    uponpress={() => this.setState({
                        buffalosauce: false,
                        tomatosauce: false,
                        bbqsauce: !this.state.bbqsauce,
                    })
                    }
                />
            </View>
                <View style={styles.optionMultipleButtons}>
                    <CheckboxWTaCaOP
                        name='Pepperoni'
                        ischecked={this.state.pepperonimeat}
                        uponpress={() => this.setState({
                            pepperonimeat: !this.state.pepperonimeat,
                        })
                        }
                    />
                    <CheckboxWTaCaOP
                        name='Sausage'
                        ischecked={this.state.sausagemeat}
                        uponpress={() => this.setState({
                            sausagemeat: !this.state.sausagemeat
                        })
                        }
                    />
                    <CheckboxWTaCaOP
                        name='Chicken'
                        ischecked={this.state.chickenmeat}
                        uponpress={() => this.setState({
                            chickenmeat: !this.state.chickenmeat
                        })
                        }
                    />
                </View>
                <View style={styles.optionMultipleButtons}>
                    <CheckboxWTaCaOP
                        name='Jalapeno'
                        ischecked={this.state.jalapeno}
                        uponpress={() => this.setState({
                            jalapeno: !this.state.jalapeno,
                        })
                        }
                    />
                    <CheckboxWTaCaOP
                        name='Pineapple'
                        ischecked={this.state.pineapple}
                        uponpress={() => this.setState({
                            pineapple: !this.state.pineapple
                        })
                        }
                    />
                    <CheckboxWTaCaOP
                        name='Olives'
                        ischecked={this.state.olives}
                        uponpress={() => this.setState({
                            olives: !this.state.olives
                        })
                        }
                    />
                </View>
            </View>

            }

            <View style={styles.containerStacked}>
                <SubmitOrSaveButton state={this.state} onClick={this.onSubmit}/>
                {this.state.submitted &&
                  <Text style={styles.messageText}>Your Order Has Been Placed!</Text>
                }
            </View>

          </KeyboardAwareScrollView>
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
    />
  );
}

function InputTextWTCT({txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
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
          name='Place Order'
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
    paddingTop: 50,
  },
  optionsTitleText: {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 60,
    marginBottom: 12,
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