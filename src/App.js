import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
import firebase from "firebase";

let config = {
  apiKey: "AIzaSyBCptsMZftMbTiFjEF5qDFEgcEeSFUzaBQ",
    authDomain: "chidlcareapp.firebaseapp.com",
    databaseURL: "https://chidlcareapp.firebaseio.com",
    projectId: "chidlcareapp",
    storageBucket: "chidlcareapp.appspot.com",
    messagingSenderId: "998871249996",
    appId: "1:998871249996:web:9fb45eda2d0b20db"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
