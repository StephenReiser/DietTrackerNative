import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList} from 'react-native';

import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import Chart from 'react-native-chartjs';

// const chartConfiguration = {
//     type: 'bar',
//     data: {
//       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//           'rgba(255,99,132,1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       maintainAspectRatio : false,
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
  
// }; 

class FoodChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartConfiguration: ''
        }
        // this.makeChart = this.makeChart.bind(this)
    }

    componentWillMount() {
        const { navigation } = this.props;
        const sickArray = navigation.getParam('sickArray', 'no-data');
        this.makeChart(sickArray)
    }
    makeChart = (sickStringArray) => {
        
        let smallArray = []
        if (sickStringArray.length > 10) {
          smallArray = sickStringArray.slice(sickStringArray.length - 10, sickStringArray.length)

        } else {
          smallArray = sickStringArray
        }
        let labelSet = []
        let dataSet = []
        for (let i = 0; i < smallArray.length; i ++) {
            labelSet.push(smallArray[i][0])
            dataSet.push(smallArray[i][1])
        }
        // console.log("label set: " + labelSet)
        // console.log("dataset: " + dataSet)
        let chartConfiguration = {
          type: 'bar',
          data: {
            labels: labelSet,
            datasets:[{
                label: "Your Top 10 Food Triggers",
                data: dataSet,
                backgroundColor: "#FF3B0033"
            }]
          },
          options: {
            maintainAspectRation: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        };
        this.setState({
          chartConfiguration: chartConfiguration,
        //   renderChart: true
        })

       
      }
    
    render() {
        
        
        // this.makeChart(sickArray)
    // const edit = navigation.getParam('handleEdit', 'edit')
    // // const otherParam = navigation.getParam('otherParam', 'some default value');

    //     const CurrentMeal = {
    //         title: meal.title,
    //         food_name: meal.food_name,
    //         sick: meal.sick,
    //         comments: meal.comments,
    //         sick_type: meal.sick_type,
    //         mealId: meal.id

    //     }
    //     const formOptions = {
    //         fields: {
    //                 mealId: {
    //                   hidden: true
    //                 }
    //             }

    //     }

    
        return(
            <View style={{flex: 1}}>
                {this.state.chartConfiguration ? 
                 <Chart chartConfiguration = {
            this.state.chartConfiguration
          }
       defaultFontSize={20}/>  : null }
            </View>
        )
    }
}

export default withNavigation(FoodChart)