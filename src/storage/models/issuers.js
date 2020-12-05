import Settings from '@/settings'

export default {
    state: () => ({
        issuers:  [],
        issuersFiltrateValue: {
            name: '',
            minPoint: '',
            maxPoint: '',
            dateMin: '',
            dateMax: '',

        },
        isShowIssuersFilter: false,
    }),
    mutations: {
        setIssuers(state, issuers) {
            state.issuers = issuers
        },
        filtrateIssuers(state, issuersFiltrateValue){
            state.issuersFiltrateValue = issuersFiltrateValue;
        },
        changeIsShowResume(state, name) {
            for (let i = 0; i < state.issuers.length; i++) {
                if(state.issuers[i].name === name){
                    state.issuers[i].isShowResume = !state.issuers[i].isShowResume;
                    break;
                }
            }
        },
        toggleIsShowIssuersFilter(state){
            state.isShowIssuersFilter = !state.isShowIssuersFilter;
        },
        clearIsShowIssuersFilter(state){
            state.isShowIssuersFilter = false;
            state.issuersFiltrateValue = {
                name: '',
                minPoint: '',
                maxPoint: '',
                dateMin: '',
                dateMax: '',
            };
        }
    },
    actions: {
        async initIssuers(context) {
            let issuers = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_ISSUERS_PATH;
            let response = await (await fetch(path, {headers: Settings.API_REQUEST_HEADER})).json();
            for (let i = 0; i < response.length; i++) {
                issuers.push({
                    name: response[i].issuer_type + ' ' + response[i].issuer_name,
                    date: response[i].current_rating.year + ' ' + response[i].current_rating.quarter,
                    rating: Number.parseFloat(response[i].current_rating.rating),
                    resume: response[i].current_rating.resume,
                    isShowResume: false
                })
            }
            context.commit('setIssuers', issuers);
        },
    },
    getters: {
        getIssuers(state) {
            return state.issuers.filter(function (issuer) {
                if(issuer.name.toLocaleLowerCase().lastIndexOf(state.issuersFiltrateValue.name.toLocaleLowerCase()) === -1 && state.issuersFiltrateValue.name){
                    return false;
                }
                let minPoint = Number.parseFloat(state.issuersFiltrateValue.minPoint),
                    maxPoint = Number.parseFloat(state.issuersFiltrateValue.maxPoint);
                if((issuer.rating < minPoint && minPoint) || (issuer.rating > maxPoint && maxPoint)){
                    return false;
                }
                let year = Number.parseInt(issuer.date.split(' ')[0]), quarter = issuer.date.split(' ')[1].replace('Q', '');
                let minYear = Number.parseInt(state.issuersFiltrateValue.dateMin.split(' ')[0]),
                    maxYear = Number.parseInt(state.issuersFiltrateValue.dateMax.split(' ')[0])
                if((year < minYear && minYear) || (year > maxYear && maxYear)){
                    return false;
                }
                return !((quarter < state.issuersFiltrateValue.dateMin.split(' ')[1]?.replace('Q', '') && state.issuersFiltrateValue.dateMin && year === minYear)
                    || (quarter > state.issuersFiltrateValue.dateMax.split(' ')[1]?.replace('Q', '') && state.issuersFiltrateValue.dateMax && year === maxYear));

            });
        },
        getIssuersFiltrateValue(state){
            return state.issuersFiltrateValue;
        },
        getIsShowIssuersFilter(state){
            return state.isShowIssuersFilter;
        },
        isIssuersFiltrate(state) {
            return state.issuersFiltrateValue.minPoint !== '' || state.issuersFiltrateValue.maxPoint !== ''
                || state.issuersFiltrateValue.dateMin !== '' || state.issuersFiltrateValue.dateMax !== '';
        }
    }
}