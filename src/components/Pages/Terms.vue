<template>
    <div v-scroll="handleScroll" id="terms">
        <div>
            <vue-headful title="Термины - Binvesting" description="Термины - Binvesting"/>
        </div>
        <div class="container">
            <div class="row justify-content-center mt-3">
                <div class="col-12 col-md-5 search-row">
                    <div class="w-100 form-container">
                        <b-nav-form class="search-form" form-class="align-end justify-content-between w-100">
                            <b-form-input
                                    id="searchInput"
                                    size="sm"
                                    class="mr-sm-2 search-input"
                                    @keypress.enter.prevent
                                    @input="filtrateData"
                                    v-model="searchQuery"
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
                    <div class="item-list" v-if="searchQuery && isHaveElements !== searchQuery && isShowSearch">
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
                                                <img src="@/assets/eye.svg" alt="Просмотрено" class="eye"
                                                     v-if="term.isShow">
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
                        <h2 class="group-name">
                            {{ group.name }}
                        </h2>
                        <div>
                            <div class="d-block term py-1">
                                <div v-for="(term, id) in group.terms" :key="id">
                                    <a href="#" class="term-name d-inline-block"
                                       @click.prevent="showTerm(term, $event)">
                                        {{ term.name }}
                                        <!--                    <img src="@/assets/eye.svg" alt="Просмотрено" class="eye p-1" v-if="term.isShow">-->
                                    </a>
                                    <TermDescription :term="term"/>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-2" v-if="group.terms.length >= 12">
                                <a href="#" :data-group="group.name" class="term-all col-12 col-md-3 py-1"
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
import TermDescription from '@/components/Parts/TermDescription';

export default {
  name: 'Terms',
  components: {TermDescription},
  mounted() {
    this.$store.commit('setSearch', false);
    let isFromSearch = this.$store.getters.getFromSearch;
    if (!isFromSearch) {
      this.$store.commit('filtrateTerms', '');
    }
    this.$store.commit('setFromSearch', false);
    this.$store.dispatch('initGroupTerms', {});
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
    },
  },
  data() {
    return {
      searchQuery: '',
      scrollTop: 0,
      groupGroups: ['З', 'К', 'О', 'Т', 'Ц', 'Я', '!'],
      isShowSearch: false,
    };
  },
  beforeUpdate() {
    this.scrollTop = document.documentElement.scrollTop;
  },
  updated() {
    document.documentElement.scrollTop = this.scrollTop;
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
    changeIsFull(groupName) {
      this.$store.commit('changeIsFull', groupName);
    },
    filtrateData() {
      this.$store.commit('filtrateTerms', this.searchQuery);
      this.$store.dispatch('initGroupTerms', {lastGroupName: this.groupGroups.reverse()[0]});
      this.groupGroups = [];
      this.isShowSearch = this.searchQuery !== '';
    },
    showTerm(term, event) {
      this.$store.commit('hideTerms');
      if (window.mobileCheck() && term.isFull) return;
      let containerWidth = event.target.closest('.container').offsetWidth;
      let offset = (document.body.offsetWidth - containerWidth) / 2, left, right;
      if (event.clientX - offset > (containerWidth / 4) * 3) {
        right = '0';
      } else if (event.clientX - offset > (containerWidth / 4) * 2) {
        right = '10vw';
      } else if (event.clientX - offset > containerWidth / 4) {
        left = '10vw';
      } else if (event.clientX - offset < containerWidth / 4) {
        left = '0';
      }
      event.target.parentNode.querySelector('.hide,.show').style.left = left ?? '';
      event.target.parentNode.querySelector('.hide,.show').style.right = right ?? '';
      event.target.parentNode.querySelector('.hide,.show').style.top = `${event.layerY + 20}px`;
      this.$store.dispatch('addDescription', {name: term.name});
    },
    handleScroll: function() {
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 100
          && this.groupGroups.length > 0 && !this.isLoad) {
        this.$store.dispatch('initGroupTerms', {lastGroupName: this.groupGroups.shift()});
      }
      return true;
    },
    findTerm(name) {
      this.searchQuery = name;
      this.filtrateData();
    },
    clearNameFilter() {
      this.findTerm('');
    },
  },
  created() {
    document.addEventListener('click', e => {
      if(!e.target.closest('.search-row')) {
        this.isShowSearch = false;
      }
    });
  },
};
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

.term {
    columns: 4;
    position: relative;
    column-gap: 5px;
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
    overflow-y: auto;
}

.term-name {
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    padding: 0 8px;
}

.term-all {
    padding-left: 5px;
    padding-right: 0;
    font-size: 12px;
    line-height: 14px;

    color: #243EE9;
}

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

.form-container {

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

@media screen and (max-device-width: 767px) {
    .term {
        columns: 1;
    }
}
</style>

<style>
.search-form {
    width: 90%;
}
</style>