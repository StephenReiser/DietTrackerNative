import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Addnew from './Addnew'
import Edit from './Edit'
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import Chart from 'react-native-chartjs';


// const Form = t.form.Form;

// const Meal = t.struct({
//   title: t.String,
//   food_name: t.String,
//   comments: t.String,
//   sick: t.Boolean,
//   sick_type: t.String

//   // password_confirmation: t.String,
//   // name: t.maybe(t.String)
//   // using t.maybe will make this field optional
//   // terms: t.Boolean
// });


const baseURL = 'http://localhost:3000'

const chartConfiguration = {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio : false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

}; 

class MealList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMeals: [],
            sickArray: [],
            toggleAdd: false,
            toggleEdit: false,
            currentMeal: {},
            chartConfiguration: chartConfiguration,
            // renderChart: false
        }
        this.toggleSick = this.toggleSick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        // this.makeChart = this.makeChart.bind(this)
    }
    componentWillMount = () => {
        this.getMeals()
    }
    
    getMeals = () => {
        console.log(baseURL + `/users/${this.props.currentUserId}/meals`)
            // console.log(this.props)
            // console.log(this.context.user)
            
            
            let token = "Bearer " + this.props.token
            fetch(baseURL + `/users/${this.props.currentUserId}/meals`, {
              method: "GET",
              headers: {
            "Authorization": token
          }
            })
            .then(response => response.json()).then((json) =>
             
            {
              console.log(json)
              // this.makeChart(json.stringResult)
                return this.setState({
                userMeals:json.meals,
                sickArray: json.stringResult
                }
                )})
            .catch(error => console.error(error))
      }

      

      toggleSick = (formInputs, user_id) => {
        // event.preventDefault()
        console.log(formInputs)
        formInputs.sick = !formInputs.sick
        console.log(formInputs)
        let token = "Bearer " + this.props.token
        console.log(token)
        fetch(baseURL + `/users/${user_id}/meals/${formInputs.id}`, {
          body: JSON.stringify(formInputs),
          method: 'PUT',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json',
         "Authorization": token
       }
      }).then(response => response.json())
      .then(updatedMeal => {
        console.log(updatedMeal)
        // this.makeChart(updatedMeal.sickString)
       //  this is making the whole thing rerender - need to splice it
       // const editHouses = houses.filter()
       //  this.getMeals()
        const copyMeals = [...this.state.userMeals]
        const findIndex = this.state.userMeals.findIndex(meal => meal.id === formInputs.mealId)
        copyMeals[findIndex] = updatedMeal
        this.setState({
          userMeals: copyMeals,
          sickArray: updatedMeal.sickString
        })
      })
       .catch(error => console.log(error))
      }

      handleDelete (deletedMeal) {
        // event.preventDefault()
        let token = "Bearer " + this.props.token
        fetch(baseURL + `/users/${this.props.currentUserId}/meals/${deletedMeal.id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": token
          }}).then(response => response.json()).
          then(json => {
            console.log(json)
            // this.makeChart(json.sickString)
              this.setState(state => {
                  const userMeals = state.userMeals.filter(meal => meal.id !== deletedMeal.id)
                  return {
                    userMeals,
                    sickArray: json.sickString,
                    
                  }
              })
          }).catch(error => {console.log(error)})
        
        
        }

        toggleAdd = () => {
            this.setState({
                toggleAdd: !this.state.toggleAdd
            })
          }
    

          handleAdd(value) {
            // const value = this._form.getValue()
            // const foodArr = formInputs.food_meal.split(' ')
            // console.log(foodArr)
            // formInputs.food_meal = foodArr
            const token = "Bearer " + this.props.token
            const newMeal = {
                "title": value.title,
                "food_name": value.food_name,
                "sick": value.sick,
                "sick_type": value.sick_type,
                "comments": value.comments,
                "user_id": this.props.currentUserId
            }
            console.log(newMeal)
            console.log(token)
            console.log(baseURL + `/users/${this.props.currentUserId}/meals`)
            fetch(baseURL + `/users/${this.props.currentUserId}/meals`, {
              body: JSON.stringify(newMeal),
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": token
              }
            })
            .then (createdMeal => {
              return createdMeal.json()
            })
            .then (jsonMeal => {
              // console.log(jsonMeal.sickString)
            //   this.makeChart(jsonMeal.sickString)
              return this.setState({
                userMeals: [jsonMeal.meal, ...this.state.userMeals],
                sickArray: jsonMeal.sickString,
                displayAddForm: false,
                toggleAdd: !this.state.toggleAdd
                //  Probably shoudl set state here with the new sickString
              })
            })
            .catch(error => console.log(error))
          }
          toggleEdit = (meal) => {
             this.setState({
                 toggleEdit: !this.state.toggleEdit,
                 currentMeal: meal
             })
          }



          handleEdit = (value) => {
            // console.log(updatedMeal)
            // event.preventDefault()
          // console.log(updatedMeal)
          const updatedMeal = {
            "title": value.title,
            "food_name": value.food_name,
            "sick": value.sick,
            "sick_type": value.sick_type,
            "comments": value.comments,
            "user_id": this.props.currentUserId
        }
          let token = "Bearer " + this.props.token
          console.log(baseURL + `/users/${this.props.currentUserId}/meals/${value.mealId}`)
          console.log(updatedMeal)
          fetch(baseURL + `/users/${this.props.currentUserId}/meals/${value.mealId}`, {
            body: JSON.stringify(updatedMeal),
            method: 'PUT',
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
           "Authorization": token
         }
        })
        .then(response => response.json()).then(updatedMeal => {
          //  this is making the whole thing rerender - need to splice it
          // const editHouses = houses.filter()
          //  this.getMeals()
          console.log(updatedMeal)
          this.props.navigation.navigate('Home')
          // this.makeChart(updatedMeal.sickString)
           const copyMeals = [...this.state.userMeals]
           const findIndex = this.state.userMeals.findIndex(meal => meal.id === value.mealId)
           copyMeals[findIndex] = updatedMeal.meal
           this.setState({
             userMeals: copyMeals,
             sickArray: updatedMeal.sickString
            // foodArr: copyMeals.food_name.split(' ')
          })
         })
         .catch(error => console.log(error))
          }

    render() {
      const { navigation } = this.props;  
      return(

            <View>
            {this.props.loggedIn ? <Button title="Log Meal" onPress = {this.toggleAdd.bind(this)} /> : null }

            
            {/* <Chart chartConfiguration = {
            this.state.chartConfiguration
          }
       defaultFontSize={20}/>   */}

                <Button title='Chart' onPress={() =>
                this.props.navigation.navigate('Chart', {
                sickArray: this.state.sickArray
                })}/>
            
            


            {/* {this.state.toggleEdit ? <Edit meal = {this.state.currentMeal}/> : null} */}
{/* probably need to wrap something in a component */}
            {this.state.toggleAdd ? 
           <Addnew handleAdd = {this.handleAdd}/>
            : 
            <FlatList 
            data={this.state.userMeals}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
                <View style={item.sick ? styles.sad : styles.happy}>
            
                <Text style={styles.name}>{item.title}{"\n"}</Text>
                <Text style={styles.email}>{item.food_name}{"\n"}</Text>
                <Text style={styles.email}>{item.sick ? 'This made you sick' : "this didn't make you sick"}</Text>
            
                <Button title='toggle sick' onPress={() => this.toggleSick(item, this.props.currentUserId)}/>
                <Button title='delete' onPress={() => this.handleDelete(item)}/>
                <Button title='edit' onPress={() =>
                this.props.navigation.navigate('Edit', {
                meal: item, handleEdit: this.handleEdit
                })}/>
                
                </View>
            }
            keyExtractor={item => item.id}
             />}
             </View>
        )
    }
}






export default MealList


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    name: {
      fontFamily: 'Verdana',
      fontSize: 18
    },
    email: {
      color: 'white'
    },
    sad: {
      backgroundColor: 'red',
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
      
    },
    happy: {
      backgroundColor: 'green',
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    }
  });