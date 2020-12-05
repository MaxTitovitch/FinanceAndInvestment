import Settings from '@/settings'

export default {
    state: () => ({
        groups:  ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
            'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я', '!'],
        gottenGroups: [],
        filtrateValue: '',
        terms: [],
        termDescriptions: [],
        isLoad: false,
    }),
    mutations: {
        changeIsLoad(state) {
            state.isLoad = !state.isLoad
        },
        addGroupTerms(state, terms) {
            state.terms = [...state.terms, ...terms]
        },
        addToGottenGroup(state, lastGroupName) {
            state.gottenGroups.push(lastGroupName);
        },
        changeIsFull(state, groupName){
            for (let i = 0; i < state.terms.length; i++) {
                if(state.terms[i].name === groupName){
                    state.terms[i].isFull = !state.terms[i].isFull;
                    break;
                }
            }
        },
        filtrateTerms(state, filtrateValue){
            state.filtrateValue = filtrateValue;
        },
        addToTermDescription(state, newTermDescription) {
            for (let i = 0; i < state.terms.length; i++) {
                for (let j = 0; j < state.terms[i].terms.length; j++) {
                    if(state.terms[i].terms[j].english_name === newTermDescription.term_name_eng) {
                        state.terms[i].terms[j].desc = newTermDescription.term_explanation_ru;
                        state.terms[i].terms[j].isFull = !state.terms[i].terms[j].isFull;
                        break;
                    }
                }
            }
        },
        removeFromTermDescription(state, termDescription) {
            for (let i = 0; i < state.terms.length; i++) {
                for (let j = 0; j < state.terms[i].terms.length; j++) {
                    if(state.terms[i].terms[j].english_name === termDescription.english_name) {
                        state.terms[i].terms[j].isFull = false;
                        break;
                    }
                }
            }
        },
        setShowTerm (state, name){
            for (let i = 0; i < state.terms.length; i++) {
                for (let j = 0; j < state.terms[i].terms.length; j++) {
                    if(state.terms[i].terms[j].name === name) {
                        state.terms[i].terms[j].isShow = true;
                        break;
                    }
                }
            }
        }
    },
    actions: {
        async initGroupTerms(context, payload) {
            context.commit('changeIsLoad');
            let terms = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_TERM_PATH;
            let lookedTerms = JSON.parse(localStorage.getItem("lookedTerms") || '[]');
            for (const group of context.state.groups) {
                if(context.state.gottenGroups.lastIndexOf(group) !== -1) continue;
                if(group === payload.lastGroupName) break;
                context.commit('addToGottenGroup', group)
                let response = await (await fetch(path + group, {headers: Settings.API_REQUEST_HEADER})).json();
                terms.push({
                    name: group,
                    isFull: false,
                    terms: response.map(function (term){
                        return {
                            english_name: term.term_name_eng,
                            name: term.term_name_ru,
                            isShow: lookedTerms.lastIndexOf(term.term_name_ru) !== -1,
                            isFull: false, desc: ''
                        }
                    }),
                });
            }
            context.commit('addGroupTerms', terms);
            context.commit('changeIsLoad');
        },

        async addDescription(context, payload) {
            let lookedTerms = JSON.parse(localStorage.getItem("lookedTerms") || '[]');
            lookedTerms.push(payload.name);
            localStorage.setItem('lookedTerms', JSON.stringify(lookedTerms));
            context.commit('setShowTerm', payload.name);

            let path = Settings.API_HOST + Settings.API_VERSION + Settings.API_TERM_DESC_PATH;
            let response = await (await fetch(path + payload.name, {headers: Settings.API_REQUEST_HEADER})).json();
            context.commit('addToTermDescription', response[0]);
        }
    },
    getters: {
        getGroups (state) {
            return state.groups
        },
        getGroupTerms (state){
            return state.terms.map(function (group){
                let terms = group.terms;
                if(state.filtrateValue){
                    terms = terms.filter(function (term){
                        return term.name.toLocaleLowerCase().lastIndexOf(state.filtrateValue.toLocaleLowerCase()) !== -1
                    })
                }
                return {
                    name: group.name,
                    isFull:  group.isFull,
                    terms: group.isFull ? terms : terms.slice(0, 12),
                };
            }).sort(function(first, second){
                if(first.name < second.name) { return -1; }
                if(first.name > second.name) { return 1; }
                return 0;
            });
        },
        getTermDescriptions(state){
            return state.termDescriptions;
        },
        getIsLoad(state){
            return state.isLoad;
        }
    },
}