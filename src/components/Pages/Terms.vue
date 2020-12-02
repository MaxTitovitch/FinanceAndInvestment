<template>
  <div>
    <div>
      <vue-headful title="Термины - Эмитеты Беларуси" description="Термины - Эмитеты Беларуси"/>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-6">
          <b-nav-form class="search-form w-100" form-class="align-end justify-content-between w-100">
            <b-form-input id="searchInput" size="sm" class="mr-sm-2 search-input"></b-form-input>
            <b-link href="#" class="text-dark" @click.prevent="focusSearch">
              <img src="@/assets/search.svg" alt="Поиск">
            </b-link>
          </b-nav-form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div v-for="(group, index) in groups" :key="index">
            <h2 class="group-name">
              {{ group.name }}
            </h2>
            <div class="container-fluid">
              <div class="row">
                <a href="#" :data-id="term.id" v-for="(term, id) in group.terms" :key="id" class="term-name col-6 col-md-3 px-0 py-1">
                  {{ term.name }}
                  <img src="@/assets/eye.svg" alt="Просмотрено" class="eye" v-if="term.isShow">
                </a>
              </div>
              <div class="row justify-content-end" v-if="!group.isFull">
                <a href="#" :data-group="group.name" class="term-all col-6 col-md-3 px-0 py-1">
                  Показать все термины на букву
                  <span class="font-weight-bold">{{ group.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Terms",
  data() {
    return {
      groups: [
        {
          name: 'А',
          isFull: false,
          terms: [
            {
              id: '1',
              name: 'Акции',
              isShow: false
            },
            {
              id: '2',
              name: 'Акционерство',
              isShow: true
            },
            {
              id: '2',
              name: 'Аблабла',
              isShow: true
            },
            {
              id: '1',
              name: 'Акции',
              isShow: false
            },
            {
              id: '2',
              name: 'Акционерство',
              isShow: true
            },
            {
              id: '2',
              name: 'Аблабла',
              isShow: true
            },
          ]
        },
      ],
    }
  },
  methods: {
    focusSearch() {
      setTimeout(() => {
        document.getElementById('searchInput').focus()
      }, 200)
    }
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