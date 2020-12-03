<template>
  <div :class="containerClass + ' template'">
    <p class="font-weight-bold" :style="{fontSize: headerSize}">Социальные сети:</p>
    <a :href="Settings.LINK_TELEGRAM" target="_blank">
      <img class="image-social" src="@/assets/telegram.svg" alt="Эмитеты Беларуси - YouTube">
    </a>
    <a :href="Settings.LINK_YOUTUBE" target="_blank">
      <img class="image-social" src="@/assets/youtube.svg" alt="Эмитеты Беларуси - Телеграмм">
    </a>
  </div>
</template>

<script>
import Settings from '@/settings'

export default {
  props: {
    containerClass: {},
    headerSize: {
      default: '.8em'
    }
  },
  name: "SocialMedia",
  data(){
    return {
      Settings
    }
  },
}
</script>

<style scoped>

  .image-social {
    width: 40%;
    height: auto;
    margin: 5%;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-bottom: 2px;
    font-size: .8em;
  }

  .template {
    padding: 0 1rem;
  }

  @media screen and (max-device-width: 767px) {
    .image-social {
      width: 30%;
    }

    .template {
      padding: 0 0 0 3px;
    }
  }
</style>