/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

let baseURL = 'https://thawing-sierra-68164.herokuapp.com'
// let baseURL = ''

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3000'
// } else {
//   baseURL = 'https://thawing-sierra-68164.herokuapp.com'
// }

import React from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import MealList from './components/MealList'
import HomeScreen from './components/Home'
import EditMeal from './components/Edit'
import FoodChart from './components/FoodChart'
import SignUpPage from './components/SignUp'
import Addnew from './components/Addnew'
import { createStackNavigator, createAppContainer } from "react-navigation";


// const Form = t.form.Form;

// const User = t.struct({
//   email: t.String,
//   password: t.String,
//   // password_confirmation: t.String,
//   // name: t.maybe(t.String)
//   // using t.maybe will make this field optional
//   // terms: t.Boolean
// });
// const formOptions = {
//   fields: {
//     email: {
//       error: 'Without an email address how are you going to reset your password when you forget it?'
//     },
//     password: {
//       error: 'Choose something you use on a dozen other sites or something you won\'t remember'
//     },
//     name: {
//       label: 'Edited Name Option'
//     }
//   }
// }

// // We can pass in field options above, using label - this will update the label.  Using error, will give error handling

// // const instructions = Platform.select({
// //   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
// //   android:
// //     'Double tap R on your keyboard to reload,\n' +
// //     'Shake or press menu button for dev menu',
// // });

// type Props = {};
// // export default class App extends Component<Props> {
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.welcome}>hello world!</Text>
// //         <Text style={styles.instructions}>you suck</Text>
// //         <Text style={styles.instructions}>{instructions}</Text>
// //       </View>
// //     );
// //   }
// // }

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       greeting: 'hello',
//       loginEmail: '',
//       loginPassword: '',
//       currentUser: '',
//       currentUserId: '',
//       loggedIn: false,
//       loginObj: '',
//       token: '',
//       meals: ''
//     }
//     // this.handleSubmit = this.handleSubmit.bind(this)
//     // this.login = this.login.bind(this)
//     this.getUser = this.getUser.bind(this)
//   }
  


//   getUser (jwtToken) {
//     let token = "Bearer " + jwtToken.jwt
//       console.log(token)
//       const email = this.state.email
//       fetch(baseURL + '/users', {
//         method: "GET",
//         headers: {
//       "Authorization": token
//     }
//       })
//       .then(response => response.json()).then((json) => {
//           // return this.setState({
//           // userMeals:json
//           // const user = json.filter(user => user.email === this.state.loginEmail)
//           // return console.log(user)
//           // // }
//           // )
//           // console.log(this.state.loginEmail)
//           console.log(json)
//           const user = json.filter(user => {
//            return  user.email === email
//           })
//           console.log(user)
//           return this.setState({
//             currentUserId: user[0].id,
//             loggedIn: true,
//             currentUser: this.state.email
//           })
//         })
//       .catch(error => console.error(error))
      

//   }
//   // logOut (event) {
//   //   event.preventDefault()
//   //   localStorage.clear()
//   //   this.setState({
//   //     currentUser: '',
//   //     currentUserId: '',
//   //     loggedIn: false,
//   //     password_confirmation: '',
//   //     loginEmail: '',
//   //     loginPassword: '',
//   //     updatedPassword: false
//   //   })
    
//   // }
//   login = () => {
//       const value = this._form.getValue(); // use that ref to get the form value
//     // console.log('value: ', value);
//       const email = value.email
//       const password = value.password
//       const request = {"auth": {"email": email, "password": password}}
//       fetch(baseURL + "/user_token", {
//             body: JSON.stringify(request),
//             method: "POST",
//             headers: {
//               'Accept': 'application/json, text/plain, */*',
//               'Content-Type': 'application/json'}
//           })
//           .then(response => response.json())
//           .then((result) => {
//             // console.dir(result)
//             // don't need to see the result
//             this.setState({
//               token: result.jwt,
//               email: email
//             })
//             this.getUser(result)
//             // localStorage.setItem("jwt", result.jwt)
//             // return result.jwt
            
//             // const jwtToken = result.jwt
//             // this.getUser(jwtToken)
            
            
//           })
    
    
    
    
    
//       // Alert.alert(request)



//   }

  
//   logOut = () => {
//     this.setState({
//       loginEmail: '',
//       loginPassword: '',
//       currentUser: '',
//       currentUserId: '',
//       loggedIn: false,
//       loginObj: '',
//       token: '',
//       meals: '',
//       userMeals: []
//     })
//   }

  


//   render() {
//     return(
//       <View style={styles.container}>
//         {/* <Text style={styles.welcome}> {this.state.greeting} world!</Text>
//         <Text style={styles.instructions}>you suck</Text>
//         <Text style={styles.instructions}>{instructions}</Text> */}
//         {this.state.loggedIn ? null :
//         <Form 
//         ref={c => this._form = c}
//         type={User}
//         options = {formOptions} />
//         }
//         {this.state.loggedIn ? <Button title="Logout" onPress = {this.logOut.bind(this)} /> :   
//         <Button title="Login" onPress = {this.login.bind(this)} />}
        
//         {/* <Text>{this.state.token}</Text> */}
//         {/* <Button title='getMeals' onPress = {this.getMeals.bind(this)}/> */}
//         {/* <Text>{this.state.meals}
//         {this.state.currentUserId}
//           {this.state.loggedIn}
//             {this.state.currentUser}</Text> */}
//             {this.state.loggedIn ? <MealList token = {this.state.token} currentUserId = {this.state.currentUserId} loggedIn = {this.state.loggedIn}/> : null }
            
//       </View>
//     )
//   }
// }

// export default App


// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Edit: {
    screen: EditMeal
  },
  Chart: {
    screen: FoodChart
  },
  SignUp: {
    screen: SignUpPage
  },
  AddMeal: {
    screen: Addnew
  }
});

export default createAppContainer(AppNavigator);
