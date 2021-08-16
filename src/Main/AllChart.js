import React from 'react';
import Chart from "react-apexcharts";

/**
* @author
* @function AllChart
**/

const AllChart = (props) => {

    const aqiData = props.data.map(val => val.aqi);
    const cityData = props.data.map(val => val.city);

    const series = [{
        data: aqiData
    }];
    const options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        colors:[function({ value, seriesIndex, w }) {
            return (value >= 0 && value <= 50) ? '#078507' : (value >= 51 && value <= 100) ? '#25bb25' : (value >= 101 && value <= 200) ? '#e5f502' : (value >= 201 && value <= 300) ? '#fc8312' : (value >= 301 && value <= 400) ? '#fc4112' : '#b12a08';
          }],
        xaxis: {
          categories: cityData,
        }
    };
      

  return(
    <div style={{marginTop:'120px', marginRight:'50px'}}>
        <Chart
            options={options}
            series={series}
            type="bar"
            width="500"
        />
    </div>
   )

 }

export default AllChart