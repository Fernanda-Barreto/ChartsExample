export const barChart = (data) => {
  const db = data;
  console.log("aquiiii", db);

  // Objeto para armazenar a soma dos valores por kind e suas cores correspondentes
  const kindData = {};
  const colorsMap = {};

  // Gerando uma cor única para cada kind
  const uniqueColors = ['#FF5733', '#33FF57', '#5733FF', '#33FFC7', '#FF33B2', '#FFFF33', '#33FFEC', '#3387FF', '#FF3394', '#33FF9E'];

  // Tipos conhecidos de kind
  const knownKinds = ['leque', 'panfleto', 'cartaz', 'adesivo', 'encarte', 'cartilha'];

  // Calculando a soma dos valores por kind e atribuindo cores
  db.forEach((item, index) => {
    let kind = knownKinds.includes(item.kind.toLowerCase()) ? item.kind.toLowerCase() : 'outro';

    if (!kindData[kind]) {
      kindData[kind] = item.quantity;
      colorsMap[kind] = uniqueColors[index % uniqueColors.length]; // Usando cores únicas para cada kind
    } else {
      kindData[kind] += item.quantity;
    }
  });

  // Convertendo o objeto de soma para o formato esperado pela biblioteca de gráficos
  const chartData = Object.entries(kindData).map(([kind, quantity]) => ({
    x: kind, // Usando o campo 'kind' no lugar de 'x'
    y: quantity, // Usando a soma dos valores para 'quantity'
    color: colorsMap[kind] // Atribuindo a cor correspondente ao kind
  }));

  const barChartOptions = {
    series: [
      {
        name: 'Atual',
        data: chartData // Usando os dados mapeados
      }
    ],
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        distributed: true // Distribuindo as barras uniformemente em todas as categorias
      }
    },
    colors: uniqueColors, // Usando as cores únicas definidas acima
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: uniqueColors // Usando as cores únicas para os marcadores da legenda
      }
    }
  };

  return { barChartOptions };
};
