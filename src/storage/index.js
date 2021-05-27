import Vue from 'vue';
import Vuex from 'vuex';
import banks from './models/banks';
import issuers from './models/issuers';
import terms from './models/terms';
import videos from './models/videos';
import etfs from './models/etfs';
import header from "@/storage/models/header";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: [
        banks, issuers, terms, videos, etfs, header
    ]
})