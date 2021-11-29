<template>
    <div>
        <div>
            <vue-headful title="Оценки банков - Binvesting" description="Оценки банков - Binvesting"/>
        </div>
        <div class="container">
            <div class="row justify-content-between mt-3">
                <div class="col-12 col-md-6 order-12 order-md-0">
                    <h1 class="main-header font-weight-bold mt-md-2 mt-4">Беларусь. Оценки банков</h1>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-between align-items-center order-0 order-md-12">
                    <b-nav-form class="search-form" form-class="align-end justify-content-between w-100">
                        <b-form-input
                                id="searchInput"
                                size="sm"
                                class="mr-sm-2 search-input"
                                @keypress.enter.prevent
                                v-model="banksFiltrateValue.name"
                                autocomplete="off">
                        </b-form-input>
                        <b-link href="#" class="text-dark" @click.prevent="focusSearch">
                            <img src="@/assets/search.svg" alt="Поиск">
                        </b-link>
                    </b-nav-form>
                    <a href="#" class="text-dark search-close mobile-show" @click.prevent="clearNameFilter">
                        ×
                    </a>
                    <b-link href="#" class="text-dark" @click.prevent="toggleFilter">
                        <img v-if="isShowFilter || isBanksFiltrate" src="@/assets/filter-active.svg" alt="Фильтрация">
                        <img v-if="!isShowFilter && !isBanksFiltrate" src="@/assets/filter.svg" alt="Фильтрация">
                    </b-link>
                    <FilterBanksModal v-show="isShowFilter" :banksFiltrateValue="banksFiltrateValue"/>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <b-table striped hover
                             :items="banks"
                             :fields="fields"
                             :sort-by.sync="sortBy"
                             :sort-desc.sync="sortDesc"
                             :sort-compare="sortCompare"
                             responsive="sm"
                             table-class="table-fixed-bank"
                             class="table-fixed-container mobile-hidden"
                    >
                    </b-table>
                    <div class="mobile-show">
                        <div class="bank-card container-fluid" v-for="(bank, i) in banks" :key="i">
                            <div class="row">
                                <h2 class="w-100 mb-4 text-center">
                                    {{ bank.name }}
                                </h2>
                            </div>
                            <div class="row">
                                <div class="col-6 text-center">
                                    <p>Оценка стоимости <br> на {{ bank.date_price }}</p>
                                    <p class="bank-big">
                                        {{ bank.value }}
                                    </p>
                                    <p>млн USD</p>
                                </div>
                                <div class="col-6 text-center">
                                    <p>ТОП надежности <br> на {{ bank.date_rating }}</p>
                                    <p class="bank-big">
                                        {{ bank.rating }}
                                    </p>
                                    <p>место</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="banks.length <= 0" class="main-header font-weight-bold w-100 text-center text-secondary">
                        Банки не найдены
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import {mapGetters} from 'vuex';
import FilterBanksModal from '@/components/Parts/FilterBanksModal';
import {getDate} from '@/helpers';

export default {
  name: 'Banks',
  components: {FilterBanksModal},
  mounted() {
    this.$store.commit('setSearch', false);
    this.$store.dispatch('initBanks');
  },
  computed: {
    ...mapGetters({
      banks: 'getBanks',
      banksFiltrateValue: 'getBanksFiltrateValue',
      isShowFilter: 'getIsShowBanksFilter',
      isBanksFiltrate: 'isBanksFiltrate',
    }),
  },
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {key: 'name', label: 'Название', sortable: true},
        {key: 'value', label: 'Оценка стоимости, млн USD', sortable: true},
        {key: 'date_price', label: 'Дата оценки', sortable: true},
        {key: 'rating', label: 'Место в рейтинге надежности', sortable: true},
        {key: 'date_rating', label: 'Дата оценки', sortable: true},
      ],
    };
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
    toggleFilter() {
      this.$store.commit('toggleIsShowBanksFilter');
    },
    updateFilter() {
      this.$store.commit('filtrateBanks', this.banksFiltrateValue);
    },
    clearNameFilter() {
      this.banksFiltrateValue.name = '';
      this.updateFilter();
    },
    sortCompare(aRow, bRow, key) {
      const aValue = !['date_price', 'date_rating'].includes(key) ? aRow[key] : new Date(getDate(aRow[key]));
      const bValue = !['date_price', 'date_rating'].includes(key) ? bRow[key] : new Date(getDate(bRow[key]));

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    },
  },
};
</script>

<style scoped>

.bank-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    margin-top: 25px;
    padding: 20px;
}

.bank-card .bank-big {
    font-size: 40px;
    font-weight: bold;
    font-family: RubikBold, serif;
}

.bank-card p {
    margin-bottom: 0;
    font-size: 0.8rem;
}

.search-close {
    padding-left: 3px;
    width: 6%;
    text-align: center;
    line-height: 100%;
    color: black !important;
    font-size: 2rem;
    font-weight: 500;
    padding-bottom: 2px;
}

.search-close:hover {
    text-decoration: none;
}

.search-form {
    width: 80%;
}

form {
    border: 1px solid;
    border-radius: 10px;
    padding: 2px;
}

input {
    border: none;
    flex: 2;
    background: none;
}

input:focus, input:active {
    outline: none;
    border: none;
    box-shadow: none;
    background: none;
}

.main-header {
    font-size: 24px;
}

.search-input {
    width: 30px;
    height: 30px;
    padding: 5px;
}

@media screen and (max-device-width: 767px) {
    .main-header {
        font-size: 24px;
    }

    h2 {
        font-size: 20px!important;
    }

    .search-close {
        font-size: 1.9rem;
        padding-left: 0;
        width: 10%;
        line-height: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-form {
        width: 75%;
    }

    a img {
        width: 28px;
    }
}
</style>

<style>

td:first-child {
    text-align: left;
}

td:not(:first-child) {
    text-align: center;
}

th[role="columnheader"] {
    text-align: center;
    vertical-align: middle !important;

}

.table-fixed-container {
    width: 100%;
    overflow-x: auto;
}

.table-fixed-bank {
    min-width: 650px;
}

.table-fixed-bank, .table-fixed-bank tbody, .table-fixed-bank thead, .table-fixed-bank tr {
    width: 100%;
    display: block;
}

.table-fixed-bank td, .table-fixed-bank th {
    display: inline-block;
}

.table-fixed-bank thead {

    padding-right: 12px;
    border-top: 2px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
}

.table-fixed-bank thead tr {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
}

.table-fixed-bank thead tr th {
    border: none;
}

.table-fixed-bank td:first-child, .table-fixed-bank th:first-child {
    width: 40%;
}

.table-fixed-bank td, .table-fixed-bank th {
    width: 30%;
}

.table-fixed-bank tbody {
    overflow-y: auto;
    max-height: 70vh;
}

.table-fixed-bank tbody tr {
    display: flex;
    align-items: center;

}

.table-fixed-bank tbody tr td {
    border: none;
}

.table-fixed-bank td:focus, .table-fixed-bank th:focus {
    outline: none;
}

</style>