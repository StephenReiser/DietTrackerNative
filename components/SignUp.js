let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://thawing-sierra-68164.herokuapp.com'
}

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9

import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';


const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
  password_confirmation: t.String
  // password_confirmation: t.String,
  // name: t.maybe(t.String)
  // using t.maybe will make this field optional
  // terms: t.Boolean
});
const formOptions = {
  fields: {
    email: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    password_confirmation: {
      error: "Please re-enter password"
    }
  }
}

class SignUp extends Component {
    something = (value) => {
        console.log(value)
    }
    render() {
        const { navigation } = this.props;
        const add = navigation.getParam('add', 'add')
        return(
            <View>
            <Form 
            ref={c => this._form = c}
            type={User}
            // value={CurrentMeal}
            options = {formOptions} 
            />
            <Button title="Sign Up" onPress = {() => add(this._form.getValue())} /> 
            </View>
        )
    }
}
export default withNavigation(SignUp)

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginTop: 50,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   flatview: {
//     justifyContent: 'center',
//     paddingTop: 30,
//     borderRadius: 2,
//   },
//   name: {
//     fontFamily: 'Verdana',
//     fontSize: 18
//   },
//   email: {
//     color: 'white'
//   },
//   sad: {
//     backgroundColor: 'red',
    
//   },
//   happy: {
//     backgroundColor: 'green',
    
//   }
// });