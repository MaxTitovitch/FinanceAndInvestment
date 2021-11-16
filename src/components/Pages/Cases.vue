<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div>
      <vue-headful title="Кейсы - ЭБ Инвестиции" description="Кейсы - ЭБ Инвестиции"/>
    </div>
    <div class="body-container">
      Кейсы
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setSearch', false)
  },
  name: "Cases"
}
</script>

<style scoped>
  .body-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .body-container img {
    height: 70%;
  }

  @media screen and (max-device-width: 767px) {
    .body-container img {
      width: 80%;
      height: auto;
    }
  }
</style>
