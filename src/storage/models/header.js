
export default {
    state: () => ({
        showSearch: false,
        isFromSearch: false,
    }),
    mutations: {
        toggleSearch(state) {
            state.showSearch = !state.showSearch
        },
        setSearch(state, showSearch) {
            state.showSearch = showSearch
        },
        setFromSearch(state, isFromSearch) {
            state.isFromSearch = isFromSearch
        },
    },
    actions: {},
    getters: {
        getSearch(state) {
            return state.showSearch;
        },
        getFromSearch(state) {
            return state.isFromSearch;
        },
    }
}