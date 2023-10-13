import { StyleSheet, Text, View , Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ImageBackground } from 'react-native'
import { Pedometer } from 'expo-sensors'
import { useState , useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
const Screen = () => {
    const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
    const [StepCount, updateStepCount] = useState(0);
    var WindowHeight = Dimensions.get("window").height;
    var Dist = StepCount / 1300;
   
        var DistanceCovered = Dist.toFixed(4);
       
        var cal = DistanceCovered * 60;
       
        var caloriesBurnt = cal.toFixed(4);
    useEffect(()=>{
        subcribe();
    },[])
    const subcribe = ()=>{
        const subscription = Pedometer.watchStepCount((result)=>{
            updateStepCount(result.steps);
        })
        
        Pedometer.isAvailableAsync().then(
            (result)=> {
                SetPedomaterAvailability(String(result));
            },
            
            (error)=>{
                SetPedomaterAvailability(error)
            }
        )
        console.log('update', StepCount)
       
    }
   
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      
      <ImageBackground
       style={{
        flex:1,
       }}
       resizeMethod='cover'
       source={(require("./assets/running.jpg"))}
      >
        <View style={{flex:1 , justifyContent:'center'}}>
            <Text  style={styles.headingDesign}>Is pedometer available on the device:{PedomaterAvailability} </Text>
            {/* <Text style={{fontWeight:'bold' , fontSize:30 , textAlign:'center' , color:'white'}}>{StepCount}</Text> */}
        </View>
        <View style={{flex:1}}>
                <CircularProgress
                        value={StepCount}
                         maxValue={6500}
                         radius={210}
                         textColor={"#ecf0f1"}
                         activeStrokeColor={"#f39c12"}
                         inActiveStrokeColor={"#9b59b6"}
                         inActiveStrokeOpacity={0.5}
                         inActiveStrokeWidth={40}
                         activeStrokeWidth={40}
                         title={"Step Count"}
                         titleColor={"#ecf0f1"}
                         titleStyle={{ fontWeight: "bold" }}
                />
            </View>
            <View style={{ flex: 1, justifyContent: "center" , marginTop:250 , marginLeft:10 }}>
                    <View style={{ flex: 1 }}>
                        <Text
                        style={[
                            styles.textDesign,
                            { paddingLeft: 20, marginLeft: '23%' },
                        ]}
                        >
                        Target : 6500 steps(5kms)
                        </Text>
                    </View>
                    
                    <View style={{ flex: 1 }}>
                        <Text
                        style={[
                            styles.textDesign,
                            { width: "93%", paddingLeft: 20, marginLeft: '-3.5%' },
                        ]}
                        >
                        Distance Covered : {DistanceCovered} km
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={[
                            styles.textDesign,
                            {  paddingLeft: 10, marginLeft: '23%' },
                            ]}
                        >
                        Calories Burnt : {caloriesBurnt}
                        </Text>
                    </View>
            </View>
      </ImageBackground>
      <Text>Hii</Text>
    </View>
     </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: "#fff",
    },
    headingDesign: {
        backgroundColor: "rgba(155, 89, 182,0.5)",
        alignSelf: "center",
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Papyrus",
    },
    textDesign: {
        backgroundColor: "rgba(155, 89, 182,0.5)",
        height: 50,
        width : '85%',
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        overflow: "hidden",
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Papyrus",
     
   },
               
})