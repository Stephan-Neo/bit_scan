<template>
  <Bar :data="chartDataBit" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartDataBit: null
  }),
  props: {
    chartData: {
      type: Object,
      required: true
    },
  },
  watch: {
    chartData: {
      immediate: true,
      deep: true,
      handler() {
        this.chartDataBit = this.chartData
      }
    }
  }
}
</script>