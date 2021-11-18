<template>
    <main>
        <div>
            <vue-headful title="Книга - ЭБ Инвестиции" description="Книга - ЭБ Инвестиции"/>
        </div>
        <div class="container py-2 mt-3 text-center">
            <h1>Инвестиции с нуля</h1>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 links-row">
                    <div class="links-row-body">
                        <div class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/book.svg`" alt="Book" class="w-75 h-100">
                        </div>
                        <div class="d-flex flex-column justify-content-between w-50 p-3 pl-5">
                            <div>
                                <h2>Описание книги</h2>
                                <p><strong>Время прочтения:</strong> около 2 часов</p>
                                <p><strong>Авторы:</strong> Евгений Левый и Максим Адаскевич</p>
                                <p>
                                    В нашей книге мы собрали все необходимые знания для старта в инвестициях с нуля. В ней вы найдете обзор основных инвестиционных инструментов, рекомендации по выбору портфеля, а также в книге развенчаны основные мифы и заблуждения новичков.
                                </p>
                            </div>
                            <div class="buttons d-flex align-items-end justify-content-start flex-nowrap mobile-hidden">
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
};
</script>

<style scoped>

h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 3rem;
    line-height: 3rem;
}

h2 {
    font-weight: bold;
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
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    border-radius: 45px;
    padding: 3rem;
}

.buttons {
    margin-top: 10px;
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
    box-shadow: 0 22px 20px -12px rgba(36, 62, 233, 0.35);
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
    h1 {
        font-size: 30px;
        line-height: 30px;
    }


    main {
        min-height: auto;
    }
}

</style>
