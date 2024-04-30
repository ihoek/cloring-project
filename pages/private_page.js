import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function MyPage({ onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 이름</Text>
      <TouchableOpacity style={styles.button}><Text>이름 변경</Text></TouchableOpacity>
      <Text style={styles.title}>신체 사이즈</Text>
      <TextInput style={styles.input} placeholder="신체 사이즈를 입력하세요" />
      <Text style={styles.title}>선호 스타일</Text>
      <TouchableOpacity style={styles.button}><Text>선호 스타일 선택</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text>나의 옷</Text></TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}><Text style={styles.closeButtonText}>닫기</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});