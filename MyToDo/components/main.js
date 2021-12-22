import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Note from '../components/note';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(noteArray);
      await AsyncStorage.setItem('@todoData', jsonValue);
      console.log('sukses');
    } catch (e) {}
  };

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@todoData');
      const jsonValue = JSON.parse(value);
      console.log(jsonValue);

      if (jsonValue != null) {
        noteArray = jsonValue;
        this.setState({noteArray});
      }
      // const jsonValue = await AsyncStorage.getItem('@dataTodo');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  addTask() {
    if (this.state.noteText) {
      this.state.noteArray.push({
        note: this.state.noteText,
        completed: false,
      });

      this.setState({noteArray: this.state.noteArray});
      this.setState({noteText: this.state.noteText});
      this.storeData();
    }
  }
  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});
  }
  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteNote(key)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MY TODOLIST</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={noteText => this.setState({noteText: noteText})}
            value={this.state.noteText}
            placeholder="Add Todo"
            onSubmitEditing={() => this.addTask()}
            underlineColorAndroid="transparent"></TextInput>
        </View>
        <TouchableOpacity
          onPress={this.addTask.bind(this)}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    elevation: 1,
  },
  headerText: {
    fontSize: 20,
    padding: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 17,
    color: '#ffff',
    borderTopWidth: 2,
    backgroundColor: '#2196f3',
    borderTopColor: '#C0C0C0',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    width: 50,
    height: 50,
    backgroundColor: '#2196f3',
  },
  addButtonText: {
    color: '#FFFF',
    fontSize: 14,
  },
});
