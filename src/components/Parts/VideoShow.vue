<template>
  <div :class="video.isFull ? 'show' : 'hide'">
    <div class="modal">
      <div class="header">
        <b-link href="#" class="text-dark close" @click.prevent="togglePopup">×</b-link>
      </div>
      <iframe width="100%" :src="changeVideoLink(video.link)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    video: {
      default: {}
    },
    id: {}
  },
  mounted() {
    // let YT;
    let link = this.video.link
    if(link.lastIndexOf('watch') !== -1){
      link = link.replaceAll('?v=', '/')
    }
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
    changeVideoLink(link){
      if(link.lastIndexOf('watch') !== -1){
        link = link.replaceAll('?v=', '/')
      }
      return 'https://www.youtube.com/embed/' + link.split('/').reverse()[0]

    }
  }
}
</script>

<style scoped>
  .show {
    display: block;
    position: fixed;
    background: #5d5d5d55;
    z-index: 1000;
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