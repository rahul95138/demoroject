import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



export default function App() {

  // ScreenOrientation.addOrientationChangeListener()

  const [data, setData] = useState([])

  useEffect(() => {
    const handleOrientationChange = ({ orientationInfo }) => {
      console.log('Orientation changed:', orientationInfo.orientation);
      // Perform actions based on the new orientation
    };

    // Add the orientation change listener
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    // Cleanup: Remove the listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);


  const fetchData = async () =>{
    try{
      const countryData = await axios.get("https://gist.githubusercontent.com/peymano-wmt/32dcb892b06648910ddd40406e37fdab/raw/db25946fd77c5873b0303b858e861ce724e0dcd0/countries.json")
      if(countryData.status === 200){
        const {data} = countryData
        setData([...data])
      }
    }catch(err){
      console.log("err", error)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Capital</Text>
        </View>
        <ScrollView>
        {data.map(({name,region,code, capital}) => (<View style={styles.row}>
          <Text style={styles.cell}>{name} || {region} || {code} </Text>
          <Text style={styles.cell}>{capital}</Text>
        </View>))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    height:"91%"
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    marginTop:70,
    marginHorizontal:30
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});
