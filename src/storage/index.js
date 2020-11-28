import Vue from 'vue'
import Vuex from 'vuex'
import banks from './models/banks'
import issuers from './models/issuers'
import terms from './models/terms'
import videos from './models/videos'

Vue.use(Vuex)

new Vuex.Store({
    modules: [
        banks, issuers, terms, videos
    ]
})