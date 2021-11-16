<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div>
      <vue-headful title="Обучение - ЭБ Инвестиции" description="Обучение - ЭБ Инвестиции"/>
    </div>
    <div class="body-container">
      Обучение
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setSearch', false)
  },
  name: "Learning"
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
