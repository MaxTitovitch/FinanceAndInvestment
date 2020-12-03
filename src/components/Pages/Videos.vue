<template>
  <div id="terms">
    <div>
      <vue-headful title="Видео - Эмитеты Беларуси" description="Видео - Эмитеты Беларуси"/>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-5">
          <b-nav-form class="search-form w-100" form-class="align-end justify-content-between w-100">
            <b-form-input id="searchInput" size="sm" class="mr-sm-2 search-input" @input="filtrateData" v-model="searchQuery"></b-form-input>
            <b-link href="#" class="text-dark" @click.prevent="focusSearch">
              <img src="@/assets/search.svg" alt="Поиск">
            </b-link>
          </b-nav-form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div v-for="(group, index) in groups" :key="index" class="mb-3">
            <h2 class="group-name" v-if="group.videos.length > 0">
              {{ group.name }}
            </h2>
            <div class="container-fluid">
              <div class="row">
                <div v-for="(video, id) in group.videos" :key="id" class="col-12 col-md-3 p-1">
                  <a href="#" class="video-name" @click.prevent="showVideo(video.name)">
                    <img src="@/assets/noshow.svg" alt="Не просмотрено" class="eye" v-if="video.showType === 'NOSHOW'">
                    <img src="@/assets/show.svg" alt="Просмотрено" class="eye" v-if="video.showType === 'SHOW'">
                    <img src="@/assets/fullshow.svg" alt="Просмотрено полностью" class="eye" v-if="video.showType === 'FULLSHOW'">
                    {{ video.name }}
                  </a>
<!--                  <VideoShow :video="video" />-->
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
import { mapGetters } from 'vuex';
// import VideoShow from "@/components/Parts/VideoShow";

export default {
  name: "Videos",
  // components: {VideoShow},
  mounted() {
    this.$store.dispatch('initGroupVideos');
  },
  computed: {
    ...mapGetters({
      groups: 'getGroupVideo'
    })
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    focusSearch() {
      setTimeout(() => {
        document.getElementById('searchInput').focus()
      }, 200)
    },
    filtrateData (){
      this.$store.commit('filtrateTerms', this.searchQuery)
    },
    showTerm (name){
      this.$store.dispatch('showVido', {name});
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