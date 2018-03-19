// maintain JSONs upload to the server
export default {
  getInitMscForm: function () {
    return {
      address: null,
      dateStart: null,
      buildingName: null,
      city: null,
      id: null,
      isActive: null,
      zipCode: null,
      storageCapacity: null,
      waterHeaterBrand: null,
      waterHeaterCapacity: null,
      waterHeaterRatedEfficiency: null
    }
  },

  getInitOpiForm: function () {
    return {
      buildingId: null,
      time: null,
      type: null,
      inputVar1: null,
      inputVar2: null,
      hotWater: [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null
      ],
      electricityPrice: [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null
      ],
      ambientTemperature: [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null
      ],
      demandResponse: [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null
      ],
      solarEnergyOutput: [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null
      ]
    }
  }
}
