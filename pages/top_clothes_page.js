import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, ScrollView, Image } from 'react-native';

const TopClothesPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/*cards*/}
            <ScrollView>
                {/*first cards*/}
                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/top1.png')} />
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>면소재</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>손세탁을 권한합니다</Text>
                            <Text>고온에서의 세탁 및 삶은 세탁은 피해야 합니다</Text>
                            <Text>중성세제와 표백제의 사용은 탈색의 원인이 됩니다</Text>
                            <Text>세탁 시 제품을 뒤집어서 세탁하시기를 권장합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>직사광선에 들지않고 통풍이 잘되는 곳에 보관하세요</Text>
                            <Text>직사광선에 오래 노출 시 섬유가 손상될 수 있습니다</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/top1.png')} />
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>가디건</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>손 세탁 및 단독 세탁 시 중성세제 사용을 권장합니다</Text>
                            <Text>미지근한 물에 단추를 모두 잠근 후 손 세탁을 권장합니다</Text>
                            <Text>세탁기 이용시 니트를 뒤집어 세탁망에 넣어 약한</Text>
                            <Text>코스를 이용합니다</Text>
                            <Text>건조기 사용은 권장하지 않습니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>단추를 모두 잠근 후 접어서 보관합니다</Text>
                        </View>
                        
                    </View>
                </View>

            </ScrollView>
            

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card : {
        width : 380,
        height: 200,
        backgroundColor : "#fff",
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iamgecard:{
        height: 100,
        width: 100,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentcard:{
        
    },
    texttitle : {
        fontWeight: '700',
        
    },
    textsub:{
        margin : 5
    }
    
});

export default TopClothesPage;
