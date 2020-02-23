import * as React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {

  console.log('home');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/universal-pizza-logo.png')
                : require('../assets/images/universal-pizza-logo.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <WelcomeText />
        </View>
        <InstructionsText />
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

//Welcome text above image icon
function WelcomeText() {
  return (
    <Text style={styles.welcomeTxt}>
      Welcome To Universal Pizza, your one-stop-shop service for ordering local pizza!
    </Text>
  );
}

//Instruction text for homepage
function InstructionsText(){
  return (
    <Text style={styles.InstructionsText}>
      Click the 'Make Order' tab below to place an order.{"\n\n"}
      <Text style={styles.orText}>OR</Text> {"\n\n"}
      Click the 'My Orders' tab to receive information on current and past orders.
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gallery: {
    alignItems: 'center',
    height: 0.5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 130,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  InstructionsText: {
    margin: 40,
    color: 'green',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  welcomeTxt: {
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: 25,
    color: 'black',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  orText: {
    margin: 40,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
});
