import './App.css'
import ReactApexChart from 'react-apexcharts';
import {barChart} from './charts/barChart';
import { chartEventOptions } from './charts/chartOptions';
import { useState, useEffect } from 'react';
import { getMaterials } from './services/material';
import { getEvents } from './services/event';
import { fakeData } from './charts/data/fakedata';

// Cria uma instância do Axios com a base URL definida para 'http://localhost'

function App() {
  const [materials, setMaterials] = useState([]);
  const [eventData, setEventData] = useState(null); 

  const page = 1;
  const ITEMS_PER_PAGE = 10;

  const barChartOptions = barChart(materials);
  const barChartEvent = chartEventOptions(fakeData);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents(1, 1000); // Chama a função para obter os eventos
        setEventData(events.page.content); // Define os dados dos eventos no estado

        console.log("Dados dos eventos:", events.content); 
      } catch (error) {
        console.error("Erro ao obter os eventos:", error); 
      } 
    };

    fetchEvents(); // Chama a função para buscar os eventos ao montar o componente
  }, []); 
  console.log(eventData);

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={barChartEvent.chartEventsOptions}
          series={barChartEvent.chartEventsOptions.series}
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