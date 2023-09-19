import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {color} from '../../../utils';

export default function DropGameAlert({isVisible, onCancel, onConfirm}: any) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor={color['#212835']}
      backdropOpacity={0.7}
      style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.header}>Leave a Match?</Text>
        <Text style={styles.description}>
          Match progress will be saved, and you can join using the same Room Id
          later. Are you sure you want to exit?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: '#212835',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    color: color['#ADADAD'],
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    color: color['#ADADAD'],
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginRight: 20,
  },
  confirmButton: {
    backgroundColor: color['#2475C5'],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: color['#ADADAD'],
    fontSize: 16,
  },
});
