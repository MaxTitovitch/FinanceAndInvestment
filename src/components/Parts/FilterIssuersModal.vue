<template>
  <div class="show">
    <div class="header">
      <h2 class="main-text font-weight-bold">Фильтрация</h2>
      <b-link href="#" class="text-dark close" @click.prevent="togglePopup">×</b-link>
    </div>
    <p>
      <b-form inline @submit.prevent="()=>{}">
        <label class="w-33" :for="'date-min' + id">Дата оценки</label>
        <b-form-input
            :id="'date-min' + id"
            class="w-33"
            placeholder="От"
            v-model="filtrateValue.dateMin"
            autocomplete="off"
        ></b-form-input>

        <b-form-input
            :id="'date-max' + id"
            class="w-33"
            placeholder="до"
            v-model="filtrateValue.dateMax"
            autocomplete="off"
        ></b-form-input>

        <label class="w-33 mt-2" :for="'rating-min' + id">Оценка</label>
        <b-form-input
            :id="'rating-min' + id"
            class="w-33 mt-2"
            placeholder="От"
            v-model="filtrateValue.minPoint"
            autocomplete="off"
        ></b-form-input>

        <b-form-input
            :id="'rating-max' + id"
            class="w-33 mt-2"
            placeholder="до"
            v-model="filtrateValue.maxPoint"
            autocomplete="off"
        ></b-form-input>


        <b-form-group class="w-100 mt-2" v-slot="{ ariaDescribedby }">
          <b-form-radio-group>
            <b-form-radio v-model="filtrateValue.type" :aria-describedby="ariaDescribedby" value="false">Стандартная</b-form-radio>
            <b-form-radio v-model="filtrateValue.type" :aria-describedby="ariaDescribedby" value="true">Экспресс</b-form-radio>
            <b-form-radio v-model="filtrateValue.type" :aria-describedby="ariaDescribedby" value="">Любая</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-button class="mt-3 buttons w-50 btn-sm" @click="updateFilter">Применить</b-button>
        <b-button class="mt-3 buttons w-50 btn-sm" @click="clearFilter">Очистить</b-button>
      </b-form>
    </p>
  </div>
</template>

<script>

export default {

  props: {
    issuersFiltrateValue: {},
    isShowFilter: {},
    id: {
      default: 1
    }
  },
  mounted() {
    this.filtrateValue = {
      name: this.issuersFiltrateValue.name,
      minPoint: this.issuersFiltrateValue.minPoint,
      maxPoint: this.issuersFiltrateValue.maxPoint,
      dateMin: this.issuersFiltrateValue.dateMin,
      dateMax: this.issuersFiltrateValue.dateMax,
      type: this.issuersFiltrateValue.type,
    }
  },
  name: "FilterIssuersModal",
  data() {
    return {
      filtrateValue: {}
    }
  },
  methods: {
    togglePopup() {
      this.$store.commit('toggleIsShowIssuersFilter');
    },
    updateFilter() {
      this.$store.commit('filtrateIssuers', {...this.filtrateValue});
    },
    clearFilter() {
      this.filtrateValue = {
        name: '',
        minPoint: '',
        maxPoint: '',
        dateMin: '',
        dateMax: '',
        type: '',
      };
      this.$store.commit('clearIsShowIssuersFilter');
    }
  }
}
</script>

<style scoped>

.show {
  display: block;
  position: absolute;
  right: 15px;
  width: calc(100% - 30px);
  top: 52px;
  height: auto;
  background: #F5F5F5;
  box-shadow: 0 30px 25px -12px rgba(190, 190, 190, 0.35);
  border-radius: 10px;
  z-index: 1000;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.main-text {
  font-size: 18px;
}

.close {
  font-size: 25px;
  line-height: 25px;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-bottom: 2px;
  font-size: .8em;
}

.buttons {
  background: #243EE9 !important;
  color: white;
  padding: 10px;
  max-width: 65%;
  text-align: center;
  display: block;
  border-radius: 10px;
  width: 205px;
}

.buttons:hover {
  text-decoration: none;
  background: #0f21a5 !important;
}
</style>

<style>

fieldset {

  display: flex;
  justify-content: center;
}
</style>