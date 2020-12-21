<template>
  <div>
    <div>
      <vue-headful title="Оценки эмитентов - Эмитенты Беларуси" description="Оценки эмитентов - Эмитенты Беларуси"/>
    </div>
    <div class="container">
      <div class="row justify-content-between mt-3">
        <div class="col-12 col-md-6 order-12 order-md-0">
          <h1 class="main-header font-weight-bold mt-4">Беларусь. Оценки эмитентов</h1>
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
                   responsive="sm"
                   table-class="table-fixed"
                   class="table-fixed-container"
          >
            <template #cell(overview)="data">
              <a :href="data.item.overview" class="text-dark font-weight-bold" target="_blank">
                Подробнее...
              </a>
            </template>
            <template #cell(express)="data">
              {{ data.item.express ? 'Экспресс' : 'Стандартная' }}
            </template>
          </b-table>
          <div v-if="issuers.length <= 0" class="main-header font-weight-bold w-100 text-center text-secondary">
            Эмитенты не найдены
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FilterIssuersModal from "@/components/Parts/FilterIssuersModal";

export default {
  name: "Issuers",
  components: {FilterIssuersModal},
  mounted() {
    this.$store.commit('setSearch', false)
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
        {key: 'name', label: 'Наименование', sortable: true},
        {key: 'date', label: 'Дата оценки', sortable: true},
        {key: 'rating', label: 'Оценка', sortable: true},
        {key: 'express', label: 'Модель оценки', sortable: true},
        {key: 'overview', label: 'Подробнее', sortable: false},
      ],
    }
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus()
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
  }
}
</script>

<style scoped>
.search-close {
  padding-left: 3px;
  width: 6%;
  text-align: center;
  line-height: 100%;
  color: black !important;
  font-size: 2rem;
  font-weight: 500;
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
}
</style>

<style>

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

.table-fixed td:first-child, .table-fixed th:first-child {
  width: 33%;
}

.table-fixed td:nth-child(2), .table-fixed th:nth-child(2) {
  width: 13%;
}

.table-fixed td:nth-child(3), .table-fixed th:nth-child(3) {
  width: 10%;
}

.table-fixed td:nth-child(4), .table-fixed th:nth-child(4) {
  width: 19%;
}

.table-fixed td:last-child , .table-fixed th:last-child  {
  width: 25%;
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