import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

let data = [
  {task: 'Daily scrum', status: false},
  {task: 'Learn ReactNative', status: false},
  {task: 'Doing Laundry', status: false},
];

export default class App extends Component {
  addNewTodo = () => {
    data.push({
      task: this.state.newTodo,
      status: false,
    });
    this.setState({newTodo: ''});
  };
  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="#1976d2" barStyle="light-content" />
          <View style={styles.barstatus}>
            <Text style={styles.title}>MY TODOLIST</Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.listodo}>
              <Text>{item.task}</Text>
            </View>
          )}
          keyExtractor={item => item.task}
        />
        <TextInput style={styles.input} placeholder="Add Todo" />
        <TouchableOpacity>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  background: {flex: 1, backgroundColor: '#F0F8FF'},
  barstatus: {
    backgroundColor: '#2196f3',
    paddingVertical: 15,
    elevation: 1,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  listodo: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    padding: 17,
    elevation: 1,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#C0C0C0',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#C0C0C0',
    borderRadius: 30,
    marginHorizontal: 20,
    width: 270,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    marginLeft: 5,
  },
});
