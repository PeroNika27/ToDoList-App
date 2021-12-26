import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Note extends Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.note}</Text>
        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.delete}>
          <Text style={styles.noteDeleteText}>delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#C0C0C0',
    paddingRight: 100,
    elevation: 1,
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#90caf9',
  },
  delete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e65100',
    borderRadius: 5,
    top: 15,
    padding: 5,
    bottom: 10,
    right: 10,
  },
  noteDeleteText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
});
