<template>
  <div id="app">
    <select v-model="selectedPeriod" @change="fetchData">
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
      <option value="custom">Custom</option>
    </select>
    <input type="date" v-model="startDate" v-if="selectedPeriod === 'custom'" @change="fetchData">
    <input type="date" v-model="endDate" v-if="selectedPeriod === 'custom'" @change="fetchData">
    <div>
      <ChartLineComponent :chartData="dataForLineChart" :chartOptions="yourLineChartOptions" />
    </div>
  </div>
</template>

<script>
import ChartLineComponent from '@/components/ChartLineComponent.vue';
import { format } from 'date-fns/format';

export default {
  name: 'App',
  components: {
    ChartLineComponent,
  },
  data() {
    return {
      selectedPeriod: 'day',
      startDate: null,
      endDate: null,
      bitcoinData: { data: [] },
      dataForLineChart: {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: 'Bitcoin Prices',
            backgroundColor: '#f87979',
            data: [1, 2, 3, 4],
          },
        ],
      },
      yourLineChartOptions: {}, // Ваши параметры для линейного графика
    };
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      const params = { range: this.selectedPeriod };

      if (this.selectedPeriod === 'custom') {
        params.startDate = this.startDate;
        params.endDate = this.endDate;
      }

      const { data, error } = await useFetch('/api/prices', {
        params: {
          range: this.selectedPeriod,
          ...(this.selectedPeriod === 'custom' && {startDate: this.startDate, endDate: this.endDate}),
        },
      });

      this.bitcoinData = data;
      if (Array.isArray(this.bitcoinData.data)) {
        this.dataForLineChart.labels = this.bitcoinData.data.map(item => format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm:ss'));
        this.dataForLineChart.datasets[0].data = this.bitcoinData.data.map(item => Number(item.price.replace(',', '')));
        console.log(this.dataForLineChart)
      } else {
        console.error('this.bitcoinData.data не является массивом!', this.bitcoinData.data);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}
</style>
