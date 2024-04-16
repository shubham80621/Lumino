import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image,  TouchableOpacity, Vibration } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function Form() {
   const [userIndex, setUserIndex] = useState('');
   const [isUseIndexLimitChecked, setUserIndexLimitChecked]=useState(false);
   const [email, setEmail]=useState('');
   const [firstName, setFirstName]=useState('');
   const [lastName, setLastName]=useState('');
   const [avatarIcon, setAvatarIcon]=useState('');

  const getAllUsers=async()=>{
    try{

        if(userIndex >12)
        {
            alert("No user found")
            Vibration.vibrate()
            return
        }else if(isUseIndexLimitChecked && userIndex >10){
            alert("enter user index 10 or less")
            Vibration.vibrate()
            return
        }

        let response = await fetch(`https://reqres.in/api/users/${userIndex}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            let x = res.json()
           return x
        })
        
         if(response.data){
            setEmail(response.data.email)
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setAvatarIcon(response.data.avatar)
         }

    }
    catch(err){
      console.log("Error from getAllUsers() "+ err)
    }
  }

  const handleUserIndex=(value)=>{
        if(isUseIndexLimitChecked && value>10)
        {
            //alert to be modified
            alert('Enter user index 10 or less then 10')
        }
    setUserIndex(value)
  }

  return (
    <View style={styles.container} >
          <View style={styles.searchContainer}>
            <TextInput style={{...styles.inputBox, height:'100%', width: '90%'}} placeholder="Search user" onChangeText={handleUserIndex}/>
            <TouchableOpacity style={styles.searchImageContainer} onPress={getAllUsers}>
              <Image source={require('../../assets/search.png')} style={{height:20, width:20}}/>
            </TouchableOpacity>
       </View>
       <View style={{display:'flex', flexDirection:'row', gap:5}}>
         <CheckBox value={isUseIndexLimitChecked} 
         onValueChange={(e)=>setUserIndexLimitChecked(!isUseIndexLimitChecked)}/>
         <Text>1-10 only</Text>
       </View>
       <TextInput style={styles.inputBox} placeholder="Email*" value={email}/>
       <TextInput style={styles.inputBox} placeholder="First Name*" value={firstName}/>
       <TextInput style={styles.inputBox} placeholder="Last Name*" value={lastName}/>
       <View style={{height:'30%', display:'flex', justifyContent:'center', alignItems:'center'}}>
         <Image source={avatarIcon? {
          uri: avatarIcon,
        }: require('../../assets/user.png')} style={{width:100, height:100, backgroundColor:'yellow'}}/>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-around',
      padding: 20, 
      width:'100%'
    },
    searchContainer: {
      flexDirection: 'row',
      height: '10%', 
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10, 
      marginBottom: 10, 
      gap:10
    },
    searchImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50, 
      borderWidth: 1,
      borderColor: 'grey', 
      height: '100%',
      borderRadius: 5,
    },
    inputBox: {
      borderWidth: 1,
      borderRadius: 5,
      width: '100%', 
      height: '10%', 
      paddingLeft: 10, 
    },
  });