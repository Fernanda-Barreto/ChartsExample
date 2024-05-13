import './App.css'
import ReactApexChart from 'react-apexcharts';
import { barChart } from './charts/barChart';
import { chartEventOptions } from './charts/chartOptions';
import { useState, useEffect } from 'react';
import { getMaterials } from './services/material';
import { getEvents } from './services/event';
import { fakeData } from './charts/data/fakedata';

function App() {
  const [materials, setMaterials] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);

  const page = 1;
  const ITEMS_PER_PAGE = 10;

  const barChartOptions = barChart(materials);
  const barChartEvent = chartEventOptions(fakeData, selectedYear);

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
        const events = await getEvents(1, 1000);
        setEventData(events.page.content);

        const uniqueYears = [...new Set(events.page.content.map(event => {
          const year = new Date(event.startDate).getFullYear();
          console.log("Evento:", event.name, "Data:", event.startDate, "Ano:", year);
          return year;
        }))];
        console.log("Anos disponíveis:", uniqueYears);
        setAvailableYears(uniqueYears);
      } catch (error) {
        console.error("Erro ao obter os eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <>
      <div>
        <select value={selectedYear} onChange={handleYearChange}>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
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
