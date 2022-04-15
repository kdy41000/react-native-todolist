import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions } from "react-native";
import styled,{ ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';     // expo install @react-native-async-storage/async-storage
import AppLoading from 'expo-app-loading';  //expo install expo-app-loading

//SafeAreaView : 기본적으로 padding이 들어있는 View컴포넌트(상단 카메라 등에 화면이 가려지는 문제 해결)
const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme})=> theme.main};
  width: 100%;
  align-items: flex-end;
  padding: 0 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;
  const tempData = {
    '1': {id: '1', text: 'React Native', completed: false},
    '2': {id: '2', text: 'Expo', completed: true},
    '3': {id: '3', text: 'React', completed: false},
  }

  const [tasks, setTask] = useState(tempData);
  
  const storeData = async tasks => {
    try {
      await AsyncStorage.setItem('tasks',JSON.stringify(tasks));  //localStorage와 비슷한 기능(기기에 저장함)
      setTask(tasks);
    } catch (e) {
      //
    }
  }

  const getData = async () => {
    try {
      console.log("============call===============");
      const loadedData = await AsyncStorage.getItem('tasks');
      setTask(JSON.parse(loadedData || '{}'));
    } catch (e) {
      //
    }
  }

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if(newTask.length < 1) {
      return;
    }
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID] : {id: ID, text: newTask, completed: false}
    }
    setNewTask('');
    storeData({...tasks, ...newTaskObject});
  }

  const deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    storeData(currentTasks);
  }

  const toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    storeData(currentTasks)
  }

  const updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    storeData(currentTasks);
  }

  const [isReady, setIsReady] = useState(false);

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar 
          style="auto"
          barStyle="light-content"background={theme.background}   
        />
        <Title>TODO LIST</Title>
        <Input placeholder="Add a Task" 
               value={newTask} 
               onChangeText={text => setNewTask(text)} 
               onSubmitEditing={addTask}
               onBlur={() => setNewTask('')}
        />
        <List width={width}>
          {Object.values(tasks).reverse().map(item => (
                                              <Task key={item.id} item={item} deleteTask={deleteTask} toggleTask={toggleTask} updateTask={updateTask} />
                                              ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={getData}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
    />
  );
}