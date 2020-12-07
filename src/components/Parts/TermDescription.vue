<template>
  <div :class="term.isFull ? 'show' : 'hide'">
    <div class="header">
      <h2 class="main-text"><strong>{{term.name}}</strong> (англ. {{term.english_name}})</h2>
      <b-link href="#" class="text-dark close mobile-hidden" @click.prevent="togglePopup">×</b-link>
    </div>
    <p>{{ term.desc }}</p>
  </div>
</template>

<script>

export default {
  props: {
    term: {
      default: {}
    },
  },
  name: "TermDescription",
  data(){
    return {
    }
  },
  methods: {
    togglePopup(){
      this.$store.commit('removeFromTermDescription', this.term);
    }
  }
}
</script>

<style scoped>
  .show {
    display: block;
    position: absolute;
    top: 30px;
    width: 55vw;
    height: auto;
    background: #F5F5F5;
    box-shadow: 0 30px 25px -12px rgba(190, 190, 190, 0.35);
    border-radius: 10px;
    z-index: 1000;
    padding: 10px;
  }

  .hide {
    display: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
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
    .show {
      left: 0!important;
      position: inherit;
      width: 100%;
      margin-top: 0;
      top: 10px;
      margin-bottom: 5px;
    }

    .image-social {
      width: 30%;
    }

    .template {
      padding: 0 0 0 3px;
    }

    .close {
      display: none;
    }
  }
</style>