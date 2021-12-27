import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';

import Note from '../components/note';

let today = new Date().toISOString().slice(0, 10);

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
    } catch (e) {}
  };

  addTask() {
    if (this.state.noteText) {
      this.state.noteArray.push({
        key: Math.random(),
        note: this.state.noteText,
      });

      this.setState({noteArray: this.state.noteArray});
      this.setState({noteText: ''});
      this.storeData();
    } else {
      Alert.alert('Error', 'Please, input Todo'); //menampilkan alert error ketika todo kosong
    }
  }
  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray}); // menghapus todo berdasarkan key
  }
  render() {
    let notes = this.state.noteArray.map((val, key) => {
      //maping data list
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
        <View style={styles.Subheader}>
          <Text style={styles.SubheaderText}>Today's Tasks ({today})</Text>
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
        {/* <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('Home')}
        /> */}
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
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  Subheader: {
    marginLeft: 10,
  },
  SubheaderText: {
    fontSize: 17,
    padding: 15,
    color: '#2196f3',
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
    padding: 13,
    color: '#ffff',
    borderTopWidth: 2,
    backgroundColor: '#2196f3',
    borderTopColor: '#C0C0C0',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 17,
    bottom: 60,
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
