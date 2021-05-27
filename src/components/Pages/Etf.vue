<template>
    <div>
        <div>
            <vue-headful title="ETF - ЭБ Беларусь"
                         description="ETF - ЭБ Беларусь"/>
        </div>
        <div class="container">
            <div class="row justify-content-between mt-3">
                <div class="col-12 col-md-6 order-12 order-md-0">
                    <h1 class="main-header font-weight-bold mt-2">ETF</h1>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-end align-items-center order-0 order-md-12">
                    <b-nav-form class="search-form" form-class="align-end justify-content-between w-100">
                        <b-form-input
                                id="searchInput"
                                size="sm"
                                class="mr-sm-2 search-input"
                                @keypress.enter.prevent
                                v-model="etfFiltrateValue.name"
                                autocomplete="off">
                        </b-form-input>
                        <b-link href="#" class="text-dark" @click.prevent="focusSearch">
                            <img src="@/assets/search.svg" alt="Поиск">
                        </b-link>
                    </b-nav-form>
                    <a href="#" class="text-dark search-close mobile-show" @click.prevent="clearNameFilter">
                        ×
                    </a>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <b-table striped hover
                             :items="etfs"
                             :fields="fields"
                             :sort-by.sync="sortBy"
                             :sort-desc.sync="sortDesc"
                             responsive="sm"
                             table-class="table-fixed"
                             class="table-fixed-container"
                    >
                        <template #cell(links)="data">
                            <a :href="data.item.links" class="text-dark font-weight-bold"
                               target="_blank">
                                Подробнее...
                            </a>
                        </template>
                    </b-table>
                    <div v-if="etfs.length <= 0"
                         class="main-header font-weight-bold w-100 text-center text-secondary">
                        ETF не найдены
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Etf',
  mounted() {
    this.$store.commit('setSearch', false);
    this.$store.dispatch('initEtfs');
  },
  computed: {
    ...mapGetters({
      etfs: 'getEtfs',
      etfFiltrateValue: 'getEtfsFiltrateValue',
    }),
  },
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {key: 'sector', label: 'Сектор', sortable: true},
        {key: 'funds', label: 'Фонды', sortable: true},
        {key: 'links', label: 'Подробнее', sortable: false},
      ],
    };
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
    updateFilter() {
      this.$store.commit('filtrateEtfs', this.etfFiltrateValue);
    },
    clearNameFilter() {
      this.etfFiltrateValue.name = '';
      this.updateFilter();
    },
  },
};
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

td {
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
    width: 33% !important;
}

.table-fixed td:nth-child(2), .table-fixed th:nth-child(2) {
    width: 33% !important;
}

.table-fixed td:nth-child(3), .table-fixed th:nth-child(3) {
    width: 33% !important;
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