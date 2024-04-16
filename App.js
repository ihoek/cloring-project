import React from 'react';
import { StyleSheet, Text, View, Button, Alert,TouchableOpacity,ScrollView} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>

      </View>
      <View style={styles.containerTwo}>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
      <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>매크로</Text></TouchableOpacity>
      <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>추천코디</Text></TouchableOpacity>
      <TouchableOpacity style={styles.middleButton03}><Text style={styles.middleButtonText}>날씨정보</Text></TouchableOpacity>
      </ScrollView>
      </View>
      <View style={styles.containerThree}>

      </View>
      <View style={styles.containerFour}>
      <Button 
          style={styles.buttonStyle} 
          title="버튼입니다"
          color="#ffffff" 
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  containerOne: {
    flex:0.7,
    backgroundColor:"red"
  },
  containerTwo:{
    flex:0.5,
    backgroundColor:"yellow"
  },
  containerThree:{
    flex:5,
    backgroundColor:"green"
  },
  containerFour:{
    flex:0.7,
    backgroundColor:"blue"
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:170,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center"
  },
  buttonStyle:{
    color:"#000",
    fontWeight:"700",
    textAlign:"center"
  }
});