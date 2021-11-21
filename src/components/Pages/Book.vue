<template>
    <main>
        <div>
            <vue-headful title="Книга - ЭБ Инвестиции" description="Книга - ЭБ Инвестиции"/>
        </div>
        <div class="container pt-5 pb-2 mt-3 text-center">
            <h1>Инвестиции с нуля</h1>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 links-row">
                    <div class="links-row-body">
                        <div v-if="!isMobile" class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/book.png`" alt="Book" class="w-50 h-100">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center align-items-center">
                                <img :src="`/img/book.png`" alt="Book" class="w-50 h-100">
                            </div>
                            <div class="book-text">
                                <h2>Описание книги</h2>
                                <p><strong>Время прочтения:</strong> около 2 часов</p>
                                <p><strong>Авторы:</strong> Евгений Левый и Максим Адаскевич</p>
                                <p>
                                    В нашей книге мы собрали все необходимые знания для старта в инвестициях с нуля. В ней вы найдете обзор основных инвестиционных инструментов, рекомендации по выбору портфеля, а также в книге развенчаны основные мифы и заблуждения новичков.
                                </p>
                            </div>
                            <div class="buttons mt-3 mt-md-0">
                                <router-link to="#">Скачать</router-link>
                                <router-link to="#" class="external-button">
                                    <span>Лит</span>Рес
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
  name: 'Book',
  mounted() {
    this.$store.commit('setSearch', false);
  },
  data() {
    return {};
  },
  computed: {
    isMobile() {
      return window.mobileCheck();
    },
  },
};
</script>

<style scoped>

h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 2.9rem;
    line-height: 2.9rem;
}

h2 {
    font-weight: bold;
}


.links-description {
    width: 50%;
    padding-left: 3rem;
}


.links-row {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.links-row-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    padding: 3rem;
}


.buttons {
    margin-top: 10px;
    display: flex;
    align-items: end;
    flex-wrap: nowrap;
}

.buttons a {
    background: #243EE9 !important;
    color: white;
    padding: 10px;
    margin-right: 50px;
    max-width: 65%;
    text-align: center;
    display: block;
    border-radius: 10px;
    width: 200px;
}

.buttons .external-button {
    background: #FF7223 !important;
    color: black;
}

.buttons .external-button:hover {
    background: #c64b09 !important;
}

.buttons .external-button span {
    color: white;
}

.buttons a:hover {
    text-decoration: none;
    background: #0f21a5 !important;
}

a:hover {
    text-decoration: none;
}

@media screen and (max-device-width: 767px) {
    h1, .h1  {
        font-size: 3.4rem;
        line-height: 3.4rem;
    }

    h2 {
        text-align: center;
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 1.3rem;
        margin-top: 2rem;
    }

    main {
        min-height: auto;
    }

    .book-text {
        text-align: center;
    }

    .links-row-body {
        flex-direction: column;
    }

    .links-description {
        width: 100%;
        padding-top: 0!important;
    }

    .links-row {
        margin-top: 0;
    }

    .links-row-body {
        padding: 1rem;
    }

    .buttons {
        justify-content: space-evenly;
    }

    .buttons > a {
        width: 42%;
        max-width: unset!important;
        margin-right: 0;
    }

    main {
        min-height: auto;
    }

    .links-row-body {
        border-radius: 14px;
    }
}

</style>
