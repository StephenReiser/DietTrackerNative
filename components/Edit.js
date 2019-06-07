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
    mealId: t.Number
  
    // password_confirmation: t.String,
    // name: t.maybe(t.String)
    // using t.maybe will make this field optional
    // terms: t.Boolean
  });



class Edit extends Component {
    handleEdit = () => {
        
        const value = this._form.getValue()
        this.props.navigation.handleEdit(value)
    }
    render() {
        const { navigation } = this.props;
    const meal = navigation.getParam('meal', 'no-meal');
    const edit = navigation.getParam('handleEdit', 'edit')
    // const otherParam = navigation.getParam('otherParam', 'some default value');

        const CurrentMeal = {
            title: meal.title,
            food_name: meal.food_name,
            sick: meal.sick,
            comments: meal.comments,
            sick_type: meal.sick_type,
            mealId: meal.id

        }
        const formOptions = {
            fields: {
                    mealId: {
                      hidden: true
                    }
                }

        }
        return(
            <View>
                 <Form 
            ref={c => this._form = c}
            type={Meal}
            value={CurrentMeal}
            options = {formOptions} 
            />
            <Button title="Edit Meal" onPress = {() => edit(this._form.getValue())} /> 
            </View>
        )
    }
}

export default withNavigation(Edit)