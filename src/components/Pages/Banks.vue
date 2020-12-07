<template>
  <div>
    <div>
      <vue-headful title="Оценки банков - Эмитенты Беларуси" description="Оценки банков - Эмитенты Беларуси"/>
    </div>
    <div class="container">
      <div class="row justify-content-between mt-3">
        <div class="col-12 col-md-6 order-12 order-md-0">
          <h1 class="main-header font-weight-bold mt-4">Беларусь. Оценки банков</h1>
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
              responsive="sm"
          >
<!--            <template #cell(resume)="data">-->
<!--              <a href="#" :class="'text-dark ' + (data.item.isShowResume ? '' : 'font-weight-bold')" @click="toggleIsShow(data.item.name)">-->
<!--                {{ data.item.isShowResume ? data.item.resume : 'Подробнее...' }}-->
<!--              </a>-->
<!--            </template>-->
          </b-table>
          <div v-if="banks.length <= 0" class="main-header font-weight-bold w-100 text-center text-secondary">
            Банки не найдены
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import FilterBanksModal from "@/components/Parts/FilterBanksModal";

export default {
  name: "Banks",
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
        {key: 'value', label: 'Цена, в млн USD', sortable: true},
        {key: 'rating', label: 'Рейтинг', sortable: true},
        // {key: 'resume', label: '', sortable: false}
      ],
    }
  },
  methods: {
    focusSearch() {
        document.getElementById('searchInput').focus()
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
    toggleIsShow(name) {
      this.$store.commit('changeIsShowResume', name);
    }
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

th[role="columnheader"] {
  text-align: center;
  vertical-align: middle !important;
  width: 20%;
}

th[role="columnheader"]:first-child {
  width: 35%;
}
th[role="columnheader"]:last-child {
  width: 25%;
}
</style>