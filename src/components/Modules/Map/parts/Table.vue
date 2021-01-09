<template>
  <div>
    <div class="table-desktop">
      <b-table :items="$attrs.dataItems" :fields="fields" responsive sticky-header="calc(100vh - 213px)" striped
               hover borderless :sort-compare="sortData">
        <template v-slot:cell(issuer)={item}>
          <div class="text-left">{{ item.issuer }}</div>
        </template>
        <template v-slot:cell(security)={item}>
          <img src="@/assets/map/houseIcon.svg" v-if="item.security === 'да' || item.security === true" alt="houseIcon">
        </template>
        <template v-slot:cell(bond_yield)={item}>
          <div>

            <span v-if="item.refinancing_rate">
              {{ 'СР' }}
            </span>

            <span v-if="item.refinancing_rate && item.bond_yield">
              {{ ' + ' }}
            </span>

            <span v-if="item.dependence">
              {{ ' **' }}
            </span>
          </div>
        </template>
        <template v-slot:cell(maturity_date)={item}>
          {{
            item.maturity_date[8] + item.maturity_date[9] + '.' + item.maturity_date[5] + item.maturity_date[6] + '.' +
            item.maturity_date[0] + item.maturity_date[1] + item.maturity_date[2] + item.maturity_date[3]
          }}
        </template>
      </b-table>
    </div>


    <div class="table-mobile">
      <b-table :items="$attrs.dataItems" :fields="fieldsMobile" responsive sticky-header="calc(100vh - 230px)" striped
               hover borderless :sort-compare="sortData">
        <template v-slot:cell(issuer)={item}>
          <div class="text-left">{{ item.issuer }}</div>
        </template>
        <template v-slot:cell(security)={item}>
          <img src="@/assets/map/houseIcon.svg" v-if="item.security === 'да' || item.security === true" alt="houseIcon">
        </template>
        <template v-slot:cell(bond_yield)={item}>
          <div>
            <span v-if="item.refinancing_rate">
              {{ 'СР' }}
            </span>

            <span v-if="item.refinancing_rate && item.bond_yield">
              {{ ' + ' }}
            </span>

            <span v-if="item.bond_yield">
              {{ item.bond_yield + '%' }}
            </span>

            <span v-if="item.dependence">
              {{ ' **' }}
            </span>
          </div>
        </template>
        <template v-slot:cell(maturity_date)={item}>
          {{
            item.maturity_date[8] + item.maturity_date[9] + '.' + item.maturity_date[5] + item.maturity_date[6] + '.' +
            item.maturity_date[0] + item.maturity_date[1] + item.maturity_date[2] + item.maturity_date[3]
          }}
        </template>
      </b-table>
    </div>

    <div class="text-table">
      СР - ставка рефинансирования <br>
      ** - Процентный доход определяется в соответсвии с эмиссионными документами
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      fields: [
        {
          key: 'issuer',
          label: 'Наименование',
          sortable: true,
          thStyle: {
            textAlign: 'left',
            verticalAlign: 'middle',
            width: '280px'
          }
        },
        {
          key: 'emission_number',
          label: '№ выпуска',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'security',
          label: 'Обеспечение',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'currency',
          label: 'Валюта',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'nominal',
          label: 'Номинал',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'number_of_year_payments',
          label: 'Выплат/год',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'maturity_date',
          label: 'Дата погашения',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'number_available',
          label: 'Доступно для покупки',
          sortable: true,
          thStyle: {
            minWidth: '150px',
            whiteSpace: 'normal',
            verticalAlign: 'middle'
          }
        },
        {
          key: 'bond_yield',
          label: '%/год',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'rating',
          label: 'Надежность',
          sortable: true,
          thStyle: {
            background: '#243EE9',
            color: '#FFF',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            verticalAlign: 'middle'
          }
        },
        {
          key: 'ib_coef',
          label: 'Коэффициент ЭБ',
          sortable: true,
          thStyle: {
            background: '#243EE9',
            color: '#FFF',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            verticalAlign: 'middle'
          }
        }
      ],

      fieldsMobile: [
        {
          key: 'issuer',
          label: 'Эмитент',
          sortable: true,
          thStyle: {
            textAlign: 'left',
            verticalAlign: 'middle'
          }
        },
        {
          key: 'emission_number',
          label: '№ выпуска',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'security',
          label: 'Обеспечение',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'currency',
          label: 'Валюта',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'nominal',
          label: 'Номинал',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'number_of_year_payments',
          label: 'Выплат/год',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'maturity_date',
          label: 'Погашение',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'number_available',
          label: 'Доступно для покупки',
          sortable: true,
          thStyle: {
            minWidth: '120px',
            whiteSpace: 'normal',
            verticalAlign: 'middle'
          }
        },
        {
          key: 'bond_yield',
          label: '%/год',
          sortable: true,
          thStyle: {
            verticalAlign: 'middle'
          }
        },
        {
          key: 'rating',
          label: 'Оценка надежности',
          sortable: true,
          thStyle: {
            background: '#243EE9',
            color: '#FFF',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            verticalAlign: 'middle'
          }
        },
        {
          key: 'ib_coef',
          label: 'Коэф ЭБ',
          sortable: true,
          thStyle: {
            background: '#243EE9',
            color: '#FFF',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            verticalAlign: 'middle'
          }
        }
      ]
    }
  },
  methods: {
    sortData(a, b, key) {
        if (key === 'security') {
          return (a.security === 'да' || a.security === true) > (b.security === 'да' || b.security === true);
        } else {
          return a > b;
        }
    }
  }
}
</script>

<style>
#app-module .table-desktop {
  display: none;
}

#app-module .table-mobile {
  display: inline;
}

#app-module .b-table tbody {
  font-size: 12px;

}

#app-module .b-table thead {
  font-size: 12px;
}

#app-module .text-table {
  font-size: 12px;
}

#app-module th.table-b-table-default {
  font-size: 0.9vw;
  text-align: center;
}

#app-module [role="rowgroup"]>tr>td {
  font-size: 0.9vw;
}

#app-module .b-table-sticky-header {
  margin-bottom: 10px;
  border-bottom: 1px solid lightgray;
}

#app-module .b-table tbody, .b-table thead, .text-table {
  margin-bottom: 10px;
}

#app-module [role="rowgroup"]>tr>td:not(:first-child){
  text-align: center;
}

#app-module th.table-b-table-default:first-child {
  width: 15%;
}

#app-module .table td, #app-module .table th {
  padding: .55rem;
}
</style>