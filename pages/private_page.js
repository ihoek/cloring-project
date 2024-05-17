import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

// 사용자 프로필 사진 가져오기
const userProfileImage = require('../assets/top1.png');

export default function MyPage({ onClose }) {
  const [username, setUsername] = useState("사용자");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const handleNameChange = () => {
    setEditingName(true);
  };

  const handleNameSubmit = () => {
    setUsername(newName);
    setEditingName(false);
    setNewName("");
  };

  const handleStyleSelect = () => {
    setSelectedStyle("편안함, 얇은 소재, 반팔티");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={userProfileImage} style={styles.profileImage} />
          <View style={styles.userInfoText}>
            {!editingName ? (
              <>
                <Text style={styles.title}>사용자 이름: {username}</Text>
                <TouchableOpacity style={styles.button} onPress={handleNameChange}>
                  <Text>이름 변경</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.editNameContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="새 이름을 입력하세요"
                  value={newName}
                  onChangeText={(text) => setNewName(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleNameSubmit}>
                  <Text>확인</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.title}>신체 사이즈</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="신장"
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="체중"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.title}>선호 스타일</Text>
      <TouchableOpacity style={styles.button} onPress={handleStyleSelect}>
        <Text>선호 스타일 선택</Text>
      </TouchableOpacity>
      {selectedStyle !== "" && (
        <Text style={styles.selectedStyle}>{selectedStyle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', // 상단 정렬로 변경
      alignItems: 'flex-start', // 왼쪽 정렬로 변경
      paddingTop: 30, // 상단 여백 추가
      paddingLeft: 20, // 왼쪽 여백 추가
    },
    header: {
      marginBottom: 15, // 아래쪽 여백 추가
    },
    title: {
      fontSize: 20, // 글꼴 크기 10 줄임
      fontWeight: 'bold',
      marginTop: 20, // 두 칸씩 내리기
      marginBottom: 10, // 한 칸씩 내리기
    },
    button: {
      backgroundColor: 'white', // 배경색 흰색으로 변경
      padding: 10,
      marginLeft: 10, // 왼쪽 여백 추가
      marginTop: 20, // 두 칸씩 내리기
    },
    inputContainer: {
      flexDirection: 'row',
    },
    input: {
      height: 40, // 입력 필드 높이 40으로 변경
      width: 150,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      marginRight: 10,
      textAlign: 'center',
    },
    editNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButton: {
      backgroundColor: '#FF6B6B', // 잘 어울리는 색상으로 변경
      padding: 30,
      marginTop: 40,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    profileImage: {
      width: 80, // 이미지 크기 조정
      height: 80, // 이미지 크기 조정
      borderRadius: 40, // 테두리를 원 모양으로 설정
    },
    myClothesButton: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    userInfo: {
      flexDirection: 'row', // 가로 방향으로 아이템 배치
      alignItems: 'center', // 아이템을 수직 중앙에 정렬
      marginTop: 40, // 세 칸씩 내리기
    },
    userInfoText: {
      marginLeft: 10, // 왼쪽 여백 추가
    },
    selectedStyle: {
      marginTop: 60, // 세 칸씩 내리기
    },
  });
