import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

const Form = t.form.Form;

const Meal = t.struct({
  title: t.String,
  food_name: t.String,
  comments: t.maybe(t.String),
  sick_type: t.maybe(t.String),
  sick: t.Boolean,

  // password_confirmation: t.String,
  // name: t.maybe(t.String)
  // using t.maybe will make this field optional
  // terms: t.Boolean
});



class Addnew extends Component {
    // handleAdd = () => {
    //     const { navigation } = this.props;
    //     const add = navigation.getParam('add', 'add')
        
    //     const value = this._form.getValue()
    //     handleAdd(value)
    // }
    render() {
        const { navigation } = this.props;
        const handleAdd = navigation.getParam('handleAdd', 'add')
        return(
            <View style={styles.container}>
                 <Form 
            ref={c => this._form = c}
            type={Meal}
            // options = {formOptions} 
            />
            <Button title="Add Meal" onPress = {() => handleAdd(this._form.getValue())} /> 
            </View>
        )
    }
}

export default withNavigation(Addnew)

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    }})