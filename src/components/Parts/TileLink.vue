<template>
  <a :href="model.link" class="tile" :style="`width: ${width}`">
    <img :src="`/img/${model.photo}`" :alt="model.title">
    <div class="mt-3">{{ model.title }}</div>
  </a>
</template>

<script>
export default {
  name: "TileLink",
  props: {
    model: {},
    width: {
      default: '30%'
    }
  }
}
</script>

<style scoped>
  .tile {
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 22px 20px -5px rgba(117, 117, 117, 0.25);
  }

  .tile:hover {

    box-shadow: 0px 22px 20px -5px rgba(72, 72, 72, 0.5);
  }

  img {
    height: 100px;
  }

  div {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #000000;
  }

  a:hover {
    color: #000000;
  }
</style>