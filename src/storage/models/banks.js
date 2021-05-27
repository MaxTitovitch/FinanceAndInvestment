import Settings from '@/settings'

export default {
    state: () => ({
        banks:  [],
        banksFiltrateValue: {
            name: '',
            minPoint: '',
            maxPoint: '',
            valueMin: '',
            valueMax: '',

        },
        isShowBanksFilter: false,
    }),
    mutations: {
        setBanks(state, banks) {
            state.banks = banks
        },
        filtrateBanks(state, banksFiltrateValue){
            state.banksFiltrateValue = banksFiltrateValue;
        },
        toggleIsShowBanksFilter(state){
            state.isShowBanksFilter = !state.isShowBanksFilter;
        },
        clearIsShowBanksFilter(state){
            state.isShowBanksFilter = false;
            state.banksFiltrateValue = {
                name: '',
                minPoint: '',
                maxPoint: '',
                valueMin: '',
                valueMax: '',
            };
        }
    },
    actions: {
        async initBanks(context) {
            let banks = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_BANKS_PATH;
            let response = await (await fetch(path, {headers: Settings.API_REQUEST_HEADER})).json();
            for (let i = 0; i < response.length; i++) {
                banks.push({
                    name: response[i].name,
                    value: Number.parseFloat(response[i].value),
                    date_price: new Date(response[i].date_price).toLocaleDateString(),
                    rating: Number.parseFloat(response[i].rating),
                    date_rating: new Date(response[i].date_rating).toLocaleDateString(),
                })
            }
            context.commit('setBanks', banks);
        },
    },
    getters: {
        getBanks(state) {
            return state.banks.filter(function (bank) {
                if(bank.name.toLocaleLowerCase().lastIndexOf(state.banksFiltrateValue.name.toLocaleLowerCase()) === -1 && state.banksFiltrateValue.name){
                    return false;
                }
                let minPoint = Number.parseFloat(state.banksFiltrateValue.minPoint),
                    maxPoint = Number.parseFloat(state.banksFiltrateValue.maxPoint);
                if((bank.rating < minPoint && minPoint) || (bank.rating > maxPoint && maxPoint)){
                    return false;
                }
                let minValue = Number.parseFloat(state.banksFiltrateValue.valueMin),
                    maxValue = Number.parseFloat(state.banksFiltrateValue.valueMax);
                if((bank.value < minValue && minValue) || (bank.value > maxValue && maxValue)){
                    return false;
                }
                return true;
            });
        },
        getBanksFiltrateValue(state){
            return state.banksFiltrateValue;
        },
        getIsShowBanksFilter(state){
            return state.isShowBanksFilter;
        },
        isBanksFiltrate(state) {
            return state.banksFiltrateValue.minPoint !== '' || state.banksFiltrateValue.maxPoint !== ''
                || state.banksFiltrateValue.valueMin !== '' || state.banksFiltrateValue.valueMax !== '';
        }
    }
}