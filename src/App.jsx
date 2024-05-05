import './App.css'
import ReactApexChart from 'react-apexcharts';
import chartOptions from './charts/chartOptions';
import {barChart} from './charts/barChart';
import { useState, useEffect } from 'react';
import { getMaterials } from './services/material';

// Cria uma instância do Axios com a base URL definida para 'http://localhost'

function App() {
  const [materials, setMaterials] = useState([]);

  const page = 1;
  const ITEMS_PER_PAGE = 10;

  const barChartOptions = barChart(materials);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMaterials(page, ITEMS_PER_PAGE);
        setMaterials(response.page.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, ITEMS_PER_PAGE]);

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
          options={barChartOptions.barChartOptions}
          series={barChartOptions.barChartOptions.series}
          type="bar"
          height={600}
          width={800}
        />
      </div>
    </>
  );
}

export default App;