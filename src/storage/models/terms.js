import Settings from '@/settings'

export default {
    state: () => ({
        groups:  ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
            'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'],
        terms: [],
        gottenGroups: [],
    }),
    mutations: {
        setGroupTerms(state, terms) {
            state.terms = terms
        },
        addToGottenGroup(state, lastGroupName) {
            state.gottenGroups.push(lastGroupName)
        },
        changeIsFull(state, groupName){
            for (let i = 0; i < state.terms.length; i++) {
                if(state.terms[i].name === groupName){
                    state.terms[i].isFull = !state.terms[i].isFull;
                    break;
                }
            }
        }
    },
    actions: {
        async initGroupTerms(context, payload) {
            let terms = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_TERM_PATH;
            for (const group of context.state.groups) {
                if(context.state.gottenGroups.lastIndexOf(group) !== -1) continue;
                if(group === payload.lastGroupName) break;
                let response = await (await fetch(path + group, {headers: Settings.API_REQUEST_HEADER})).json();
                terms.push({
                    name: group,
                    isFull: false,
                    terms: response.map(function (term){
                        return {english_name: term.term_name_eng, name: term.term_name_ru}
                    }),
                });
                context.commit('addToGottenGroup', group)
            }
            context.commit('setGroupTerms', terms);
        }
    },
    getters: {
        getGroups (state) {
            return state.groups
        },
        getGroupTerms (state){
            return state.terms.map(function (group){
                if(!group.isFull){
                    return {
                        name: group.name,
                        isFull: false,
                        terms: group.terms.slice(0, 12),
                    };
                }
                return group
            });
        },
    },
}