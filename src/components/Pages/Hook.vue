<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div>
      <vue-headful title="Уже скоро - Binvesting" description="Уже скоро - Binvesting"/>
    </div>
    <div class="body-container">
      <h1>
        Уже скоро
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setSearch', false)
  },
  name: "Hook"
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
