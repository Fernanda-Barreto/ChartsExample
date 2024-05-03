import './App.css'
import ReactApexChart from 'react-apexcharts';
import chartOptions from './charts/chartOptions';
import barChartOptions from './charts/barChart';


function App() {
  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={chartOptions} 
          series={chartOptions.series} 
          type="bar" 
          height={600} 
          width={800}
        />
      </div>
      <div id="bar">
        <ReactApexChart
          options={barChartOptions} 
          series={barChartOptions.series} 
          type="bar" 
          height={600} 
          width={800}
        />
      </div>
    </>
  );
}

export default App;