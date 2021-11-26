<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div>
      <vue-headful title="Страница не найдена - Binvesting" description="Страница не найдена - Binvesting"/>
    </div>
    <div class="body-container">
      <img src="@/assets/404.svg" alt="404 - Binvesting">
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setSearch', false)
  },
  name: "Error404"
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
