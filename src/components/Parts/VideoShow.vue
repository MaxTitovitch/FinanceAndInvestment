<template>
  <div :class="video.isFull ? 'show' : 'hide'">
    <div class="modal">
      <div class="header">
        <b-link href="#" class="text-dark close" @click.prevent="togglePopup">×</b-link>
      </div>
<!--      <iframe width="100%" :src="changeVideoLink(video.link)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
      <div class="player" :id="'player' + id" :data-url="getVideoId(video.link)"></div>
    </div>
  </div>
</template>

<script>

import {getYouTubeVideoId} from "@/helpers";

export default {
  props: {
    video: {
      default: {}
    },
    id: {}
  },
  name: "VideoShow",
  data(){
    return {
    }
  },
  methods: {
    togglePopup(){
      this.$store.commit('setFullVideo', this.video.name);
    },
    getVideoId(link){
      return getYouTubeVideoId(link);
    }
  }
}
</script>

<style scoped>
  .show {
    display: block;
    position: fixed;
    background: #5d5d5d55;
    z-index: 1002;
    width: 100vw;
    left: 0;
    height: 100vh;
    top: 0;
  }

  .modal {
    box-shadow: 0 30px 25px -12px rgba(190, 190, 190, 0.35);
    border-radius: 10px;
    background: #F5F5F5;
    display: block;

    position: absolute;
    width: 90%;
    left: 5%;
    height: 90%;
    top: 5%;
  }

  iframe {
    height: 95%;
  }

  .hide {
    display: none;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    /*height: 5%;*/
  }

  .main-text {
    font-size: 20px;
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

  @media screen and (max-device-width: 767px) {
    .modal {
      width: 100%;
      height: 33%;
      left: 0;
      top: 10%;
    }

    .template {
      padding: 0 0 0 3px;
    }

    iframe {
      height: 90%;
    }
  }
</style>