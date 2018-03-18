export default {
  getOpiTable1Title: function () {
    return [
      {
        field: 'hour',
        title: 'Hour',
        width: 50,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true
      }, {
        field: 'hotWaterDemand',
        title: 'Hot Water Demand',
        width: 110,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'electricityPrice',
        title: 'Electricity Price',
        width: 110,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'ambientTemperature',
        title: 'Ambient Temperature',
        width: 110,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'demandResponse',
        title: 'Demand Response',
        width: 110,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'solarGeneration',
        title: 'Solar Generation',
        width: 110,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }
    ]
  },
  getOpiTable2Title: function () {
    return [
      {
        field: 'optimizationType',
        title: 'Optimization Type',
        width: 150,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'parameter1',
        title: 'Parameter 1',
        width: 150,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }, {
        field: 'parameter2',
        title: 'Parameter 2',
        width: 150,
        titleAlign: 'center',
        columnAlign: 'center',
        isEdit: true,
        isResize: true
      }
    ]
  }
}
