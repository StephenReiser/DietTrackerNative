import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9

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
    handleAdd = () => {
        const value = this._form.getValue()
        this.props.handleAdd(value)
    }
    render() {
        return(
            <View>
                 <Form 
            ref={c => this._form = c}
            type={Meal}
            // options = {formOptions} 
            />
            <Button title="Add Meal" onPress = {this.handleAdd} /> 
            </View>
        )
    }
}

export default Addnew