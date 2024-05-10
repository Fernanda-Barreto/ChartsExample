export const barChart = (data) => {
  const db = data;

  // Array para armazenar todos os tipos de dados conhecidos
  const allKinds = ['leque', 'panfleto', 'cartaz', 'adesivo', 'encarte', 'cartilha', 'outro'];

  // Objeto para armazenar a soma dos valores por kind e suas cores correspondentes
  const kindData = {};
  const colorsMap = {};

  // Gerando uma cor única para cada kind
  const uniqueColors = ['#FF5733', '#33FF57', '#5733FF', '#33FFC7', '#FF33B2', '#FFFF33', '#33FFEC', '#3387FF', '#FF3394', '#33FF9E'];

  // Calculando a soma dos valores por kind e atribuindo cores
  allKinds.forEach((kind, index) => {
    let found = db.find(item => item.kind.toLowerCase() === kind);
    if (found) {
      kindData[kind] = found.quantity;
    } else {
      kindData[kind] = 0; // Definindo o valor como 0 se não houver dados para essa categoria
    }
    colorsMap[kind] = uniqueColors[index % uniqueColors.length]; // Usando cores únicas para cada kind
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
    xaxis: {
      categories: allKinds, // Mostrando todas as categorias no eixo x
      labels: {
        rotate: -45, // Rotacionando os rótulos para melhor visualização
        offsetY: -5,
        style: {
          fontSize: '12px'
        }
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: allKinds, // Usando todas as categorias na legenda
      markers: {
        fillColors: uniqueColors // Usando as cores únicas para os marcadores da legenda
      }
    }
  };

  return { barChartOptions };
};
