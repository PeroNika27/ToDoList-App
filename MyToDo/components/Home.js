import React, {Component} from 'react';

import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  TouchableHighlight,
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../images/chair.jpg')}
        style={styles.EmptyImage}>
        <View>
          <Text style={styles.HeaderText}>To-DoList</Text>
          <TouchableHighlight style={styles.homeButton}>
            <Button
              title="My ToDoList"
              onPress={() => this.props.navigation.navigate('main')}
            />
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  HeaderText: {
    color: '#2196f3',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 140,
    justifyContent: 'center',
    fontFamily: 'poppins-bold',
    fontSize: 30,
    fontWeight: 'bold',
  },
  EmptyImage: {
    width: '100%',
    height: '100%',
  },
  homeButton: {
    height: 50,
    width: 190,
    marginTop: 20,
    marginLeft: 110,
    justifyContent: 'center',
  },
});
