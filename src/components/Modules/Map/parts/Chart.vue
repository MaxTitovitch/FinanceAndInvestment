<template>
  <div>
    <apexchart class="main-chart" type="scatter" width="98%" height="500px" :options="formatedOptions()"
               :series="$attrs.seriesData"></apexchart>
    <div class="text-chart">
      СР - ставка рефинансирования <br>
      ** - Процентный доход определяется в соответсвии с эмиссионными документами
    </div>
  </div>

</template>

<script>


export default {
  name: "Chart",
  data() {
    return {
      options: {
        legend: {
          show: false
        },
        chart: {
          width: '98%',
          height: '500px',
          type: 'scatter',
          zoom: {
            enabled: true,
            type: "xy"
          },
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'lighten',
              value: 0.15,
            }
          },
          active: {
            // allowMultipleDataPointsSelection: false,
            filter: {
              type: 'none',
              value: 0,
            }
          },
        },
        fill: {
          colors: ['#494949']
        },
        xaxis: {
          tickAmount: 20,
          type: 'numeric',
          title: {
            text: 'Процентная ставка',
            offsetX: 0,
            offsetY: 13,
            style: {
              color: undefined,
              fontSize: '15px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          },
          labels: {
            formatter: function (value) {
              return Math.round((value) * 100) / 100 + "%";
            }
          }
        },
        yaxis: {
          tickAmount: 10,
          type: 'numeric',
          title: {
            text: 'Оценка надежности',
            offsetX: -8,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '15px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          },
        },
        responsive: [{
          options: {
            xaxis: {
              tickAmount: 5,
            },
            yaxis: {
              tickAmount: 5
            }
          }
        }],
        tooltip: {
          followCursor: true,
          custom: function ({seriesIndex, w}) {
            let result = '<div class="containerCh">'
            for (let i = 0; i < w.globals.seriesNames[seriesIndex].length; i++) {
              result += '<div class="childCh">' +
                  '<div class="bluePanelCh"></div>' +
                  '<header class="tooltipHeader">\n' +
                  w.globals.seriesNames[seriesIndex][i].issuer +
                  '</header>' +

                  '<div class="leftCh">' +
                  'Номер выпуска<br>' +
                  'Обеспечение<br>' +
                  'Валюта<br>' +
                  'Номинал<br>' +
                  'Выплат в год<br>' +
                  'Дата погашения<br>' +
                  'Доступно для покупки<br>' +
                  'Процентная ставка<br>' +
                  '<span style="color: white">Надежность<br>' +
                  'Коэффициент ЭБ<br>' +
                  '</div>' +

                  '<div class="rightCh">' +
                  w.globals.seriesNames[seriesIndex][i].emission_number + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].security + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].currency + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].nominal + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].number_of_year_payments + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[8] +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[9] + '.' +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[5] +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[6] + '.' +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[0] +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[1] +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[2] +
                  w.globals.seriesNames[seriesIndex][i].maturity_date[3] + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].number_available + '<br>'

              if (w.globals.seriesNames[seriesIndex][i].refinancing_rate &&
                  !w.globals.seriesNames[seriesIndex][i].indexed) {
                result += 'СР+' + w.globals.seriesNames[seriesIndex][i].bond_yield + '%' + '<br>'
              } else if (!w.globals.seriesNames[seriesIndex][i].refinancing_rate &&
                  w.globals.seriesNames[seriesIndex][i].indexed) {
                result += w.globals.seriesNames[seriesIndex][i].bond_yield + '%**' + '<br>'
              } else {
                result += w.globals.seriesNames[seriesIndex][i].bond_yield + '%' + '<br>'
              }

              result += '<span style="color: white">' +
                  w.globals.seriesNames[seriesIndex][i].rating + '<br>' +
                  w.globals.seriesNames[seriesIndex][i].ib_coef + '<br>' +
                  '</span>' +
                  '</div>' +
                  i+'</div>'
            }
            result += "</div>"
            return result
          }
        }
      }

    }
  },
  methods: {
    formatedOptions() {
      if(this.$attrs.seriesData.length > 0) {
        let optionsAxis = this.getOptions();
        this.options.xaxis.min = optionsAxis.xaxis.min;
        this.options.xaxis.max = optionsAxis.xaxis.max;
        this.options.yaxis.min = optionsAxis.yaxis.min;
        this.options.yaxis.max = optionsAxis.yaxis.max;
      }
      return this.options;
    },
    getOptions: function () {
      return {
        xaxis: {
          min: this.$attrs.seriesData.reduceRight(function (previousValue, currentValue ) {
            return currentValue.data[0][0] < previousValue.data[0][0] ? currentValue : previousValue;
          }).data[0][0] - 0.5,
          max: this.$attrs.seriesData.reduceRight(function (previousValue, currentValue ) {
            return currentValue.data[0][0] > previousValue.data[0][0] ? currentValue : previousValue;
          }).data[0][0] + 0.5
        },
        yaxis: {
          min: this.$attrs.seriesData.reduceRight(function (previousValue, currentValue ) {
            return currentValue.data[0][1] < previousValue.data[0][1] ? currentValue : previousValue;
          }).data[0][1] - 0.5,
          max: this.$attrs.seriesData.reduceRight(function (previousValue, currentValue ) {
            return currentValue.data[0][1] > previousValue.data[0][1] ? currentValue : previousValue;
          }).data[0][1] + 0.5
        }
      };
    },
  }
}
</script>

<style>
#app-module .main-chart {
  text-align: center;
}

#app-module .containerCh {
  overflow: hidden;
  background: none;
}

#app-module .childCh {

  border: 1px solid #e3e3e3;
  background: rgba(255, 255, 255, 0.96);
  margin: 5px;
  background: #F5F5F5!important;

  float: right;
  width: 250px;
  height: 287px;
  /*position: relative;*/
  /*top: 140px;*/

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  line-height: 24px;
}

#app-module .bluePanelCh {
  position: relative;
  width: 235px;
  height: 48px;
  left: 7px;
  top: 231px;

  background: #243EE9;
  border-radius: 5px;
}

#app-module div.apexcharts-tooltip.apexcharts-theme-light {
  background: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: none;
}

#app-module .tooltipHeader {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  position: relative;
  bottom: 13%;
}


#app-module .leftCh {
  position: relative;
  height: 100%;
  width: 60%;
  left: 7%;
  top: -10%;
  text-align: left;
}

#app-module .rightCh {
  position: relative;
  width: 40%;
  left: 58%;
  bottom: 110%;
}

#app-module .text-chart {
  font-size: 13px;
}

@media not all and (min-resolution: .001dpcm) {
  @media {
    #app-module .bluePanelCh {
      position: relative;
      width: 235px;
      height: 51px;
      left: 7px;
      top: 231px;

      background: #243EE9;
      border-radius: 5px;
    }
  }
}

@media only screen and (max-width: 1290px) {
  #app-module .containerCh {
    width: 220px;
  }

  #app-module .childCh {
    width: 220px;
    height: 245px;
    font-size: 12px;
    background: #F5F5F5;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    line-height: 20px;
  }

  #app-module .bluePanelCh {
    position: relative;
    width: 206px;
    height: 42px;
    left: 7px;
    top: 196px;

    background: #243EE9;
    border-radius: 5px;
  }

  #app-module .tooltipHeader {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    position: relative;
    bottom: 13%;
  }


  #app-module .leftCh {
    position: relative;
    height: 100%;
    width: 60%;
    left: 7%;
    top: -10%;
    text-align: left;
  }

  #app-module .rightCh {
    position: relative;
    width: 40%;
    left: 58%;
    bottom: 110%;
  }

  #app-module .text-chart {
    font-size: 12px;
  }
}

</style>