import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Icon,
  Modal,
  TouchableOpacity,
  Button,
} from 'react-native';

let data = [
  {id: 0, task: 'Daily scrum', completed: false},
  {id: 1, task: 'Learn ReactNative', completed: false},
  {id: 2, task: 'Doing Laundry', completed: false},
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  storeData = async () => {
    try {
      await AsyncStorage.setItem('@todoData', JSON.stringify(data));
    } catch (e) {}
  };

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@todoData');
      const jsonValue = JSON.parse(value);
      if (jsonValue != null) {
        data = jsonValue;
        this.setState({});
      }
    } catch (e) {}
  };

  addNewTodo = () => {
    data.push({
      task: this.state.newTodo,
      completed: false,
    });
    this.setState({newTodo: ''});
    this.storeData();
  };
  // delete = () => {
  //   data.splice(index, 1);
  //   this.setState({});
  //   this.storeData();
  // };
  deleteItemById = id => {
    const filteredData = this.data.filter(item => item.id !== id);
    this.setState({data: filteredData});
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
            <TouchableOpacity
              style={styles.listodo}
              onLongPress={() =>
                this.setState({openModal: true, index: index})
              }>
              <Text>{item.task}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.task}
        />

        <TextInput
          style={styles.input}
          placeholder="Add Todo"
          value={this.state.newTodo}
          onChangeText={text => this.setState({newTodo: text})}
          onSubmitEditing={() => this.addNewTodo()}
        />
        {/* <Modal isVisible={this.state.openModal}>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => this.delete(this.state.index)}>
            <Text style={styles.textdelete}>Delete</Text>
          </TouchableOpacity>
        </Modal> */}
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
    width: 350,
  },
  // wrap: {
  //   backgroundColor: '#2196f3',
  //   paddingVertical: 10,
  // },
  // textdelete: {
  //   textAlign: 'center',
  //   fontSize: 10,
  //   fontWeight: 'bold',
  // },
});
