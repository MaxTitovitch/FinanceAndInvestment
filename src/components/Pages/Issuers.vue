<template>
    <div>
        <div>
            <vue-headful title="Оценки эмитентов - Binvesting"
                         description="Оценки эмитентов - Binvesting"/>
        </div>
        <div class="container">
            <div class="row justify-content-between mt-3">
                <div class="col-12 col-md-6 order-12 order-md-0">
                    <h1 class="main-header font-weight-bold mt-md-2 mt-4">Беларусь. Оценки эмитентов</h1>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-between align-items-center order-0 order-md-12">
                    <b-nav-form class="search-form" form-class="align-end justify-content-between w-100">
                        <b-form-input
                                id="searchInput"
                                size="sm"
                                class="mr-sm-2 search-input"
                                @keypress.enter.prevent
                                v-model="issuersFiltrateValue.name"
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
                        <img v-if="isShowFilter || isIssuersFiltrate" src="@/assets/filter-active.svg" alt="Фильтрация">
                        <img v-if="!isShowFilter && !isIssuersFiltrate" src="@/assets/filter.svg" alt="Фильтрация">
                    </b-link>
                    <FilterIssuersModal v-show="isShowFilter" :issuersFiltrateValue="issuersFiltrateValue"/>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <b-table striped hover
                             :items="issuers"
                             :fields="fields"
                             :sort-by.sync="sortBy"
                             :sort-desc.sync="sortDesc"
                             :sort-compare="sortCompare"
                             responsive="sm"
                             table-class="table-fixed"
                             class="table-fixed-container mobile-hidden"
                    >
                        <template #cell(overview)="data">
                            <a v-if="!data.item.express && data.item.overview" :href="data.item.overview" class="text-dark font-weight-bold"
                               target="_blank">
                                Подробнее...
                            </a>
                        </template>
                        <template #cell(express)="data">
                            {{ data.item.express ? 'Экспресс' : 'Стандартная' }}
                        </template>
                    </b-table>
                    <div class="mobile-show">
                        <div class="bank-card container-fluid" v-for="(issuer, i) in issuers" :key="i">
                            <div class="row">
                                <h2 class="w-100 mb-4 text-center">
                                    {{ issuer.name }}
                                </h2>
                            </div>
                            <div class="row">
                                <div class="col-5 text-center">
                                    <p>Оценка <br> надежности</p>
                                    <p class="bank-big">
                                        {{ issuer.rating }}
                                    </p>
                                </div>
                                <div class="col-7 text-left">
                                    <div>
                                        <p><strong>Дата оценки:</strong> {{ issuer.date }}</p>
                                        <p class="mt-2"><strong>Модель:</strong> {{ issuer.express ? 'Экспресс' : 'Стандартная' }}</p>
                                        <p v-if="!issuer.express && issuer.overview" class="buttons">
                                            <a class="mt-1 w-75 btn-sm" :href="issuer.overview" target="_blank">
                                                Подробнее
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="issuers.length <= 0"
                         class="main-header font-weight-bold w-100 text-center text-secondary">
                        Эмитенты не найдены
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FilterIssuersModal from '@/components/Parts/FilterIssuersModal';
import {getDate} from '@/helpers';

export default {
  name: 'Issuers',
  components: {FilterIssuersModal},
  mounted() {
    this.$store.commit('setSearch', false);
    this.$store.dispatch('initIssuers');
  },
  computed: {
    ...mapGetters({
      issuers: 'getIssuers',
      issuersFiltrateValue: 'getIssuersFiltrateValue',
      isShowFilter: 'getIsShowIssuersFilter',
      isIssuersFiltrate: 'isIssuersFiltrate',
    }),
  },
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {key: 'name', label: 'Название', sortable: true},
        {key: 'date', label: 'Дата оценки', sortable: true},
        {key: 'rating', label: 'Оценка', sortable: true},
        {key: 'express', label: 'Модель оценки', sortable: true},
        {key: 'overview', label: 'Подробнее', sortable: false},
      ],
    };
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
    toggleFilter() {
      this.$store.commit('toggleIsShowIssuersFilter');
    },
    updateFilter() {
      this.$store.commit('filtrateIssuers', this.issuersFiltrateValue);
    },
    clearNameFilter() {
      this.issuersFiltrateValue.name = '';
      this.updateFilter();
    },
    sortCompare(aRow, bRow, key) {
      const aValue = !['date'].includes(key) ? aRow[key] : new Date(getDate(aRow[key]));
      const bValue = !['date'].includes(key) ? bRow[key] : new Date(getDate(bRow[key]));

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
    font-size: 45px;
    font-weight: bold;
    font-family: RubikBold, serif;
}

.bank-card p {
    margin-bottom: 0;
    font-size: 0.8rem;
}
.buttons {
    margin-top: 10px;
    display: flex;
    align-items: end;
    flex-wrap: nowrap;
}

.buttons a {
    background: #243EE9 !important;
    color: white;
    padding: 5px 10px;
    margin-right: 50px;
    max-width: 65%;
    text-align: center;
    display: block;
    border-radius: 7px;
    width: 200px;
}

.buttons a:hover {
    text-decoration: none;
    background: #0f21a5 !important;
}

a:hover {
    text-decoration: none;
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
        font-size: 22px;
    }

    h2 {
        font-size: 20px !important;
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

.table-fixed {
    min-width: 750px;
}

.table-fixed, .table-fixed tbody, .table-fixed thead, .table-fixed tr {
    width: 100%;
    display: block;
}

.table-fixed td, .table-fixed th {
    display: inline-block;
}

.table-fixed thead {

    padding-right: 12px;
    border-top: 2px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
}

.table-fixed thead tr {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
}

.table-fixed thead tr th {
    border: none;
}

.table-fixed td {
    word-break: break-word;
}

.table-fixed td:first-child, .table-fixed th:first-child {
    width: 40% !important;
}

.table-fixed td:nth-child(2), .table-fixed th:nth-child(2) {
    width: 15% !important;
}

.table-fixed td:nth-child(3), .table-fixed th:nth-child(3) {
    width: 10% !important;
}

.table-fixed td:nth-child(4), .table-fixed th:nth-child(4) {
    width: 15% !important;
}

.table-fixed td:last-child, .table-fixed th:last-child {
    width: 20% !important;
}

.table-fixed tbody {
    overflow-y: auto;
    height: 70vh;
}

.table-fixed tbody tr {
    display: flex;
    align-items: center;

}

.table-fixed tbody tr td {
    border: none;
}

.table-fixed td:focus, .table-fixed th:focus {
    outline: none;
}

</style>