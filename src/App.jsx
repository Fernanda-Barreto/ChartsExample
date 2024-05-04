import './App.css'
import ReactApexChart from 'react-apexcharts';
import chartOptions from './charts/chartOptions';
import barChartOptions from './charts/barChart';
import { useState, useEffect } from 'react';
import { getMaterials } from './services/material';

// Cria uma instância do Axios com a base URL definida para 'http://localhost'

function App() {
  const [materials, setMaterials] = useState([]);

  const page = 1;
  const ITEMS_PER_PAGE = 10;

  useEffect (() => {
    try{
      const response = getMaterials(page, ITEMS_PER_PAGE);
      setMaterials(response)
    }catch(error){
      console.log(error);
    }
  }, [page, ITEMS_PER_PAGE]);
  console.log(materials);

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