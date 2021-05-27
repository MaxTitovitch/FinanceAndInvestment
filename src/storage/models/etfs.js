import Settings from '@/settings'

export default {
    state: () => ({
        etfs:  [],
        etfsFiltrateValue: {
            name: '',
        },
        isShowEtfsFilter: false,
    }),
    mutations: {
        setEtfs(state, etfs) {
            state.etfs = etfs
        },
        filtrateEtfs(state, etfsFiltrateValue){
            state.etfsFiltrateValue = etfsFiltrateValue;
        },
        clearIsShowEtfsFilter(state){
            state.isShowEtfsFilter = false;
            state.etfsFiltrateValue = {
                name: '',
            };
        }
    },
    actions: {
        async initEtfs(context) {
            let etfs = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_ETFS_PATH;
            let response = await (await fetch(path, {headers: Settings.API_REQUEST_HEADER})).json();
            for (let i = 0; i < response.length; i++) {
                etfs.push({
                    sector: response[i].sector,
                    funds: response[i].funds,
                    links: response[i].links,
                })
            }
            context.commit('setEtfs', etfs);
        },
    },
    getters: {
        getEtfs(state) {
            return state.etfs.filter(function (etf) {
                if((etf.sector.toLocaleLowerCase().lastIndexOf(state.etfsFiltrateValue.name.toLocaleLowerCase()) === -1
                    && etf.funds.toLocaleLowerCase().lastIndexOf(state.etfsFiltrateValue.name.toLocaleLowerCase()) === -1 )
                    && state.etfsFiltrateValue.name){
                    return false;
                }

                return true;

            });
        },
        getEtfsFiltrateValue(state){
            return state.etfsFiltrateValue;
        },
    }
}