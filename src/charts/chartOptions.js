export const chartEventOptions = (data) => {
  console.log(data);



  const materialSomaSaude = [];
  const materialSomaViolencia = [];
  const materialSomaCidadania = [];

  // Função para calcular a soma dos materiais gastos em um evento
  const calcularSomaMateriais = (event) => {
    return event.spentMaterials.reduce((total, material) => total + material.quantify, 0);
  };

  // Preencher os arrays de soma do material com os valores correspondentes aos eventos
  data.forEach(event => {
    const somaMateriais = calcularSomaMateriais(event);
    if (event.scope === 'Saúde e qualidade de vida') {
      materialSomaSaude[event.id - 1] = somaMateriais;
    } else if (event.scope === 'Enfrentamento à violência') {
      materialSomaViolencia[event.id - 1] = somaMateriais;
    } else if (event.scope === 'Cidadania e autonomia econômica') {
      materialSomaCidadania[event.id - 1] = somaMateriais;
    }
  });

  // Preencher os valores faltantes com zeros
  const totalEventos = data.length;
  for (let i = 0; i < totalEventos; i++) {
    if (!materialSomaSaude[i]) materialSomaSaude[i] = 0;
    if (!materialSomaViolencia[i]) materialSomaViolencia[i] = 0;
    if (!materialSomaCidadania[i]) materialSomaCidadania[i] = 0;
  }

  console.log(materialSomaSaude);
  console.log(materialSomaViolencia);
  console.log(materialSomaCidadania);



  const dateData = data.map(event => {
    const startDate = new Date(event.startDate);
    return startDate.toLocaleDateString('en-US', { timeZone: 'GMT' }) + ' GMT'; // Formatando para o formato brasileiro
  });

  console.log("dataaaa", dateData);

  const chartEventsOptions = {
    series: [{
      name: 'Saúde e qualidade de vida',
      data: materialSomaSaude
    }, {
      name: 'Enfrentamento à violência',
      data: materialSomaViolencia
    }, {
      name: 'Cidadania e autonomia econômica',
      data: materialSomaCidadania
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '8',
        endingShape: 'rounded',

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
      type: 'datetime',
      categories: dateData,
      labels: {
        format: 'MMMM/yy',
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
  }

  return { chartEventsOptions }
};
