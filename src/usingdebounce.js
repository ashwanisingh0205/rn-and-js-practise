import { StyleSheet, Text, View ,FlatList ,Image,TextInput,} from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { BallIndicator } from 'react-native-indicators'
import { debounce } from 'lodash'
const Home=()=>{
  const [value,setValue]=useState('')
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)

  const handle=async (text)=>{
    
    if(!text){
      setData([]);
      return;
    }
    setLoading(true)
    try{
      const response=await axios.get(`https://jsonplaceholder.typicode.com/users?name_like=${text}`);
    setData(response.data)
    }
    catch(err){
      console.log('yes');
      
    }finally{
      setLoading(false)
    }
   

  }
  const debounced=useMemo(()=>debounce(handle),[])
 
  const onhandle=useCallback( async(text)=>{
    setValue(text)
    debounced(text)

  },[debounced])
  const renderitem=({item})=>{
  return(
   
    <Text style={{marginTop:10,padding:10,borderBottomWidth:1,borderBottomColor:'black'}}>{item.name}</Text>

  )
    
  }
  return(
    <SafeAreaView style={{flex:1}}>
      <TextInput
      placeholder='type here'
      value={value}
      onChangeText={onhandle}
      style={styles.txt}
      />
      {loading && <BallIndicator style={{marginTop:-180}} />}
        <FlatList
        data={data}
        renderItem={renderitem}
        // key={()=>item}
        keyExtractor={(item)=>item.id.toString()}/>
      
       
    
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  txt:{
    borderColor:'black',
    borderWidth:1,
    padding:12,
  }

})

export default Home;