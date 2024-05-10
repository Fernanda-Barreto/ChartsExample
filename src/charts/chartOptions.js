export const chartEventOptions = (data) => {
  console.log(data);

  // Objeto para armazenar as somas de quantidade para cada escopo por mês
  const sumsByMonth = {};

  // Nomes dos meses em português
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Loop para calcular a soma das quantidades para cada escopo por mês
  data.forEach(event => {
    const startDate = new Date(event.startDate);
    const month = monthNames[startDate.getMonth()];
    if (!sumsByMonth[month]) {
      sumsByMonth[month] = {
        'Saúde e qualidade de vida': 0,
        'Enfrentamento à violência': 0,
        'Cidadania e autonomia econômica': 0
      };
    }
    sumsByMonth[month][event.scope] += event.spentMaterials.reduce((total, material) => total + material.quantify, 0);
  });

  console.log(sumsByMonth);

  const scopes = Object.keys(sumsByMonth['Janeiro']); // Escopos presentes nos dados

  const seriesData = scopes.map(scope => ({
    name: scope,
    data: Object.values(sumsByMonth).map(monthData => monthData[scope])
  }));
  

  const chartEventsOptions = {
    series: seriesData,
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: Object.keys(sumsByMonth), // Meses no eixo x
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    },
    yaxis: {
      title: {
        text: 'Quantidade (Unidades)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "Quantidade " + val + " (Unidades)"
        }
      },
    }
  };

  return { chartEventsOptions };
};
