import Settings from '@/settings'
import {getDate, getDateByQuarter} from "@/helpers";

export default {
    state: () => ({
        issuers:  [],
        issuersFiltrateValue: {
            name: '',
            minPoint: '',
            maxPoint: '',
            dateMin: '',
            dateMax: '',
            type: '',

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
                type: '',
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
                    date: getDateByQuarter(response[i].current_rating.quarter) + response[i].current_rating.year,
                    rating: Number.parseFloat(response[i].current_rating.rating),
                    overview: response[i].current_rating.overview,
                    express: response[i].current_rating.express ?? false
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
                let date = getDate(issuer.date);
                let dateMin = getDate(state.issuersFiltrateValue.dateMin),
                    dateMax = getDate(state.issuersFiltrateValue.dateMax)
                if((date < dateMin && dateMin) || (date > dateMax && dateMax)){
                    return false;
                }
                if((issuer.express && state.issuersFiltrateValue.type === "false") || (!issuer.express && state.issuersFiltrateValue.type === "true") || state.type === ""){
                    return false;
                }
                return true;

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