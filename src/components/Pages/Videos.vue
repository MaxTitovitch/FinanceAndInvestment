<template>
  <div id="videos">
    <div>
      <vue-headful title="Видео - ЭБ Инвестиции" description="Видео - ЭБ Инвестиции"/>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-5">
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
          <div class="item-list" v-if="searchQuery && isHaveElements !== searchQuery">
            <div class="item-list-body">
              <div v-for="(group, index) in groups" :key="index">
                <h3 class="group-name-small" v-if="group.videos.length > 0">
                  {{ group.name }}
                </h3>
                <div class="container-fluid">
                  <div class="row">
                    <div v-for="(video, id) in group.videos" :key="id" class="col-12 p-1">
                      <a href="#" class="video-name" @click.prevent="findVideo(video.name)">
                        <img src="@/assets/noshow.svg" alt="Не просмотрено" class="eye"
                             v-if="video.showType === 'NOSHOW'">
                        <img src="@/assets/show.svg" alt="Просмотрено" class="eye" v-if="video.showType === 'SHOW'">
                        <img src="@/assets/fullshow.svg" alt="Просмотрено полностью" class="eye"
                             v-if="video.showType === 'FULLSHOW'">
                        <span>{{ video.name }}</span>
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
          <div v-for="(group, index) in groups" :key="index" class="mb-4" v-show="group.videos.length > 0">
            <h2 class="group-name">
              {{ group.name }}
            </h2>
            <div class="container-fluid">
              <div class="row">
                <div v-for="(video, id) in group.videos" :key="id" class="col-12 col-md-4 p-1 mt-3">
                  <a href="#" class="video-name" @click.prevent="showVideo(video.name)">
                    <img src="@/assets/noshow.svg" alt="Не просмотрено" class="eye" v-if="video.showType === 'NOSHOW'">
                    <img src="@/assets/show.svg" alt="Просмотрено" class="eye" v-if="video.showType === 'SHOW'">
                    <img src="@/assets/fullshow.svg" alt="Просмотрено полностью" class="eye"
                         v-if="video.showType === 'FULLSHOW'">
                    <span>{{ video.name }}</span>
                  </a>
                  <VideoShow :video="video" :id="index + '-' + id"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import VideoShow from "@/components/Parts/VideoShow";

export default {
  name: "Videos",
  components: {VideoShow},
  mounted() {
    this.$store.commit('setSearch', false)
    let isFromSearch = this.$store.getters.getFromSearch;
    if (!isFromSearch) {
      this.$store.commit('filtrateVideos', '');
    }
    this.$store.commit('setFromSearch', false);
    this.$store.dispatch('initGroupVideos');
  },
  computed: {
    ...mapGetters({
      groups: 'getGroupVideo'
    }),
    isHaveElements() {
      let count = 0, video;
      for (let i = 0; i < this.groups?.length; i++) {
        for (let j = 0; j < this.groups[i].videos?.length; j++) {
          if (count === 0) {
            count++;
            video = this.groups[i].videos[j].name;
          } else {
            return count;
          }
        }
      }
      return count === 0 ? 0 : video;
    }
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    focusSearch() {
      document.getElementById('searchInput').focus()
    },
    filtrateData() {
      this.$store.dispatch('playPlayer');
      this.$store.commit('filtrateVideos', this.searchQuery)
    },
    showVideo(name) {
      this.$store.commit('setFullVideo', name);
    },
    findVideo(name) {
      this.searchQuery = name;
      this.$store.commit('filtrateVideos', this.searchQuery)
    },
    clearNameFilter() {
      this.findVideo('');
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
  overflow-y: auto;
}

.video-name {
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

.video-name > * {
  padding-right: 8px;
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

</style>

<style>
.search-form {
  width: 90%;
}
</style>