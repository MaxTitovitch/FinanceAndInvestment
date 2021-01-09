<template>
  <div id="app-module">
    <div class="content">
      <Header class="header-element"
              :showTable="showTable"
              :bynCurrency="bynCurrency"
              :usdCurrency="usdCurrency"
              :filtersProps="filtersProps"
              v-on:graphClick="onGraphClick"
              v-on:tableClick="onTableClick"
              v-on:bynClick="onBynClick"
              v-on:eurClick="onEurClick"
              v-on:clearFiltersClick="onClearFiltersClick"
              v-on:searchFiltersClick="onSearchFiltersClick"
              v-on:searchKeyClick="onSearchKeyClick"
      />
      <div class="text-center my-5" v-if="!loaded">
        <b-spinner variant="secondary" label="Загрузка" ></b-spinner>
      </div>
      <Table class="table-element"
             :dataItems="itemsUSD"
             v-if="showTable && !bynCurrency && usdCurrency && loaded"
      />
      <Table class="table-element"
             :dataItems="itemsBYN"
             v-if="showTable && bynCurrency && !usdCurrency && loaded"
      />
      <Table class="table-element"
             :dataItems="allItems"
             v-if="showTable && bynCurrency && usdCurrency && loaded"
      />
      <div v-if="loaded">
        <Chart class="chart-element"
               :dataItems="itemsUSD"
               :seriesData="seriesUSD"
               v-show="!showTable && !bynCurrency && usdCurrency"
        />
        <Chart class="chart-element"
               :dataItems="itemsBYN"
               :seriesData="seriesBYN"
               v-show="!showTable && bynCurrency && !usdCurrency"
        />
      </div>
    </div>
<!--    <Footer class="footer-element"/>-->
  </div>
</template>

<script>
import Header from './parts/Header.vue'
import Table from './parts/Table.vue'
import Chart from './parts/Chart.vue'
// import Footer from "./parts/Footer.vue";

export default {
  name: 'App',
  components: {
    Header,
    Table,
    Chart
  },
  data() {
    return {
      dataItems: [],
      formattedDataItems: [],
      itemsUSD: [],
      itemsBYN: [],
      seriesUSD: [],
      seriesBYN: [],
      filtersProps: [
        {from: "", to: ""},
        {from: "", to: ""},
        {from: "", to: ""},
        {from: "", to: ""},
        {from: "", to: ""},
        {key: ""}
      ],
      bynCurrency: true,
      usdCurrency: true,
      showTable: true,
      loaded: false
    }
  },
  computed: {
    allItems: function () {
      return [...this.itemsBYN, ...this.itemsUSD]
    }
  },
  mounted: function () {
    fetch('https://xw8ummkxkf.execute-api.eu-central-1.amazonaws.com/dev/api/list_sd&k3LasDL?format=json', {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      this.formattedDataItems = this.dataItems = jsonData;
      this.splitFormattedData();
      this.formSeriesArrays();
      this.loaded = true
    });
  },
  methods: {
    formSeriesArrays() {
      this.seriesUSD = [];
      this.seriesBYN = [];
      this.formSeriesArraysChange(this.itemsUSD, this.seriesUSD);
      this.formSeriesArraysChange(this.itemsBYN, this.seriesBYN);
    },
    formSeriesArraysChange(items, series) {
      for (let i = 0; i < items.length; i++) {
        let tmp = items[i]
        if (tmp.rating === null || tmp.bond_yield === null) {
          continue
        }
        tmp.lacerta = tmp.lacerta === true ? "да" : "нет";
        tmp.security = tmp.security === true ? "да" : "нет";

        if (series.length === 0) {
          series.push({name: [tmp], data: [[tmp.bond_yield, tmp.rating]]})
        } else {
          for (let j = 0; j < series.length; j++) {
            if (series[j].data[0][0] === tmp.bond_yield && series[j].data[0][1] === tmp.rating) {
              series[j].name.push(tmp); break;
            }
            if (j === series.length - 1) {
              series.push({name: [tmp], data: [[tmp.bond_yield, tmp.rating]]}); break;
            }
          }
        }
      }
    },
    splitFormattedData() {
      this.itemsUSD = [];
      this.itemsBYN = [];
      this.formattedDataItems.forEach((element) => {
        if ((element.currency !== "BYN") && (this.itemsUSD.indexOf(element) === -1)) {
          this.itemsUSD.push(element);
        }
        if ((element.currency === "BYN") && (this.itemsBYN.indexOf(element) === -1)) {
          this.itemsBYN.push(element);
        }
      })
    },

    onGraphClick() {
      this.showTable = false;
      this.bynCurrency = false;
      this.usdCurrency = true;
    },

    onTableClick() {
      this.showTable = true;
      this.bynCurrency = true;
      this.usdCurrency = true;
    },

    onBynClick() {
      if (this.showTable === true) {
        if (this.bynCurrency) {
          this.bynCurrency = false;
          this.usdCurrency = true;
        } else {
          this.bynCurrency = true;
        }
      } else {
        this.bynCurrency = !this.bynCurrency;
        this.usdCurrency = !this.usdCurrency;
      }
    },

    onEurClick() {
      if (this.showTable === true) {
        if (this.usdCurrency) {
          this.usdCurrency = false;
          this.bynCurrency = true;
        } else {
          this.usdCurrency = true;
        }
      } else {
        this.bynCurrency = !this.bynCurrency;
        this.usdCurrency = !this.usdCurrency;
      }
    },

    onClearFiltersClick() {
      this.filtersProps.forEach((element) => {
        element.from = "";
        element.to = "";
      })
      this.splitFormattedData();
      this.formSeriesArrays();
    },

    onSearchFiltersClick() {
      this.splitFormattedData();
      this.formSeriesArrays();

      let tmpFrom = this.filtersProps[2].from[6] + this.filtersProps[2].from[7] + this.filtersProps[2].from[8] +
          this.filtersProps[2].from[9] + '-' + this.filtersProps[2].from[3] + this.filtersProps[2].from[4] + '-' +
          this.filtersProps[2].from[0] + this.filtersProps[2].from[1]
      let tmpTo = this.filtersProps[2].to[6] + this.filtersProps[2].to[7] + this.filtersProps[2].to[8] +
          this.filtersProps[2].to[9] + '-' + this.filtersProps[2].to[3] + this.filtersProps[2].to[4] + '-' +
          this.filtersProps[2].to[0] + this.filtersProps[2].to[1]


      this.searchOneItem(this.itemsUSD, tmpFrom, tmpTo);
      this.searchOneItem(this.itemsBYN, tmpFrom, tmpTo);
      this.formSeriesArrays();
    },
    searchOneItem(items, tmpFrom, tmpTo){
      for (let i = 0; i < items.length; i++) {
        if (this.filtersProps[0].from !== "" && this.filtersProps[0].from > items[i].rating ||
            this.filtersProps[0].to !== "" && this.filtersProps[0].to < items[i].rating) {
          items.splice(i, 1)
          i--
        } else if (this.filtersProps[1].from !== "" && this.filtersProps[1].from > items[i].ib_coef ||
            this.filtersProps[1].to !== "" && this.filtersProps[1].to < items[i].ib_coef) {
          items.splice(i, 1)
          i--
        } else if (this.filtersProps[2].from !== "" && tmpFrom > items[i].maturity_date ||
            this.filtersProps[2].to !== "" && tmpTo < items[i].maturity_date) {
          items.splice(i, 1)
          i--
        } else if (this.filtersProps[3].from !== "" && this.filtersProps[3].from > items[i].nominal ||
            this.filtersProps[3].to !== "" && this.filtersProps[3].to < items[i].nominal) {
          items.splice(i, 1)
          i--
        } else if (this.filtersProps[4].from !== "" && this.filtersProps[4].from > items[i].bond_yield ||
            this.filtersProps[4].to !== "" && this.filtersProps[4].to < items[i].bond_yield) {
          items.splice(i, 1)
          i--
        }
      }
    },

    onSearchKeyClick() {
      this.formattedDataItems = [...this.dataItems];
      this.splitFormattedData();
      this.formSeriesArrays();
      if (this.filtersProps[5].key !== "") {
        for (let i = 0; i < this.formattedDataItems.length; i++) {
          if (!this.formattedDataItems[i].issuer.includes(this.filtersProps[5].key)) {
            this.formattedDataItems.splice(i, 1);
            i--
          }
        }
        this.splitFormattedData();
        this.formSeriesArrays();
      }
    }
  }
}
</script>

<style>

#app-module {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  -webkit-appearance: none;
  position: relative !important;
  padding: 0;
  margin: 0;
}

#app-module .content {
  min-height: calc(100vh - 170px);
}

#app-module .header-element {
  z-index: 12;
  width: 100%;
  height: 118px;

}

#app-module .table-element {
  z-index: 0;
  width: auto;
  margin: 30px 34px 0;
}

.chart-element {
  z-index: 1;
  width: 96%;
  margin: 30px 34px 20px;
}

#app-module .footer-element {
  width: 100%;
  height: 170px;
}

#app-module th:focus {
  outline: none;
}

@media only screen and (max-width: 1290px) {
  #app-module .content {
    min-height: calc(100vh - 100px);
  }

  #app-module .header-element {
    z-index: 5;
    width: 100%;
    height: 100px;
  }

  #app-module .table-element {
    z-index: 0;
    width: auto;
    margin: 30px 5px 0;
  }

  #app-module .footer-element {
    width: 100%;
    height: 100px;
  }
}
</style>
