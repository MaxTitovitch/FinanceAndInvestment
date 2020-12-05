<template>
  <div v-scroll="handleScroll" id="terms">
    <div>
      <vue-headful title="Термины - Эмитеты Беларуси" description="Термины - Эмитеты Беларуси"/>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-5">
          <b-nav-form class="search-form w-100" form-class="align-end justify-content-between w-100">
            <b-form-input
                id="searchInput"
                size="sm"
                class="mr-sm-2 search-input"
                @input="filtrateData"
                v-model="searchQuery"
                autocomplete="off">
            </b-form-input>
            <b-link href="#" class="text-dark" @click.prevent="focusSearch">
              <img src="@/assets/search.svg" alt="Поиск">
            </b-link>
          </b-nav-form>
          <div class="item-list" v-if="searchQuery && isHaveElements !== searchQuery">
            <div class="item-list-body">
              <div v-for="(group, index) in groups" :key="index">
                <h3 class="group-name-small" v-if="group.terms.length > 0">
                  {{ group.name }}
                </h3>
                <div class="container-fluid">
                  <div class="row">
                    <div v-for="(term, id) in group.terms" :key="id" class="col-12 p-1">
                      <a href="#" class="term-name" @click.prevent="findTerm(term.name)">
                        {{ term.name }}
                        <img src="@/assets/eye.svg" alt="Просмотрено" class="eye" v-if="term.isShow">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isHaveElements === 0">Ничего не найдено</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div v-for="(group, index) in groups" :key="index" class="mb-3" v-show="group.terms.length > 0">
            <h2 class="group-name" >
              {{ group.name }}
            </h2>
            <div class="container-fluid">
              <div class="row">
                <div v-for="(term, id) in group.terms" :key="id" class="col-12 col-md-3 p-1">
                  <a href="#" class="term-name" @click.prevent="showTerm(term.name)">
                    {{ term.name }}
                    <img src="@/assets/eye.svg" alt="Просмотрено" class="eye" v-if="term.isShow">
                  </a>
                  <TermDescription :term="term" :styleType="getStyleById(id)"/>
                </div>
              </div>
              <div class="row justify-content-end mt-2" v-if="group.terms.length >= 12">
                <a href="#" :data-group="group.name" class="term-all col-12 col-md-3 px-0 py-1"
                   @click.prevent="changeIsFull(group.name)">
                  {{ !group.isFull ? 'Показать' : 'Свернуть' }} все термины на букву
                  <span class="font-weight-bold">{{ group.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="isLoad">
        <div class="col-12 text-center my-2">
          <b-spinner variant="secondary" label="Spinning"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import TermDescription from "@/components/Parts/TermDescription";

export default {
  name: "Terms",
  components: {TermDescription},
  mounted() {
    this.$store.dispatch('initGroupTerms', {lastGroupName: this.groupGroups.shift()});
  },
  computed: {
    ...mapGetters({
      groups: 'getGroupTerms',
      isLoad: 'getIsLoad',
    }),
    isHaveElements() {
      let count = 0, term;
      for (let i = 0; i < this.groups?.length; i++) {
        for (let j = 0; j < this.groups[i].terms?.length; j++) {
          if (count === 0) {
            count++;
            term = this.groups[i].terms[j].name;
          } else {
            return count;
          }
        }
      }
      return count === 0 ? 0 : term;
    }
  },
  data() {
    return {
      searchQuery: '',
      groupGroups: ['З', 'К', 'О', 'Т', 'Ц', 'Я']
    }
  },
  methods: {
    focusSearch() {
      setTimeout(() => {
        document.getElementById('searchInput').focus()
      }, 200)
    },
    changeIsFull(groupName) {
      this.$store.commit('changeIsFull', groupName)
    },
    filtrateData() {
      this.$store.commit('filtrateTerms', this.searchQuery)
      this.$store.dispatch('initGroupTerms', {lastGroupName: this.groupGroups.reverse()[0]});
      this.groupGroups = [];
    },
    showTerm(name) {
      this.$store.dispatch('addDescription', {name});
    },
    getStyleById(id) {
      switch (id % 4) {
        case 0:
          return {left: '0'};
        case 1:
          return {left: '-10vw'};
        case 2:
          return {left: '-20vw'};
        case 3:
          return {left: '-30vw'};
      }
    },
    handleScroll: function () {
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 100
          && this.groupGroups.length > 0 && !this.isLoad) {
        this.$store.dispatch('initGroupTerms', {lastGroupName: this.groupGroups.shift()})
      }
      return true
    },
    findTerm(name) {
      this.searchQuery = name;
      this.filtrateData();
    },
  },
}
</script>

<style scoped>
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

.search-input {
  width: 30px;
  height: 30px;
  padding: 5px;
}

.group-name {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #243EE9;
}

.group-name-small {
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #243EE9;
}

.item-list {
  position: absolute;
  z-index: 1000;
  left: 0;
  width: 100%;
  padding: 0 15px;
}

.item-list-body {
  border: 1px solid #949090;
  padding: 5px;
  background: white;
  border-radius: 10px;
  max-height: 60vh;
  overflow-y: scroll;
}

.term-name {
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.term-all {
  font-size: 12px;
  line-height: 14px;

  color: #243EE9;
}
</style>