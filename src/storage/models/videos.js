import Settings from '@/settings'

export default {
    state: () => ({
        videos:  [],
        filtrateValue: '',
    }),
    mutations: {
        addGroupVideos(state, videos) {
            state.videos = [...state.videos, ...videos]
        },
        filtrateTerms(state, filtrateValue){
            state.filtrateValue = filtrateValue;
        },
        setShowTerm (state, entity){
            for (let i = 0; i < state.terms.length; i++) {
                for (let j = 0; j < state.terms[i].terms.length; j++) {
                    if(state.terms[i].terms[j].name === entity.name) {
                        state.terms[i].terms[j].isShow = entity.isShow;
                        break;
                    }
                }
            }
        }
    },
    actions: {
        async initGroupVideos(context) {
            let videos = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_TERM_PATH;
            // let lookedVideos = JSON.parse(localStorage.getItem("lookedVideos") || '[]');
            let response = await (await fetch(path, {headers: Settings.API_REQUEST_HEADER})).json();
            console.log(response)
            for (let i = 0; i < response.length; i++) {
                let videosPath = Settings.API_HOST + Settings.API_VERSION + Settings.API_VIDEOS_DESC_PATH;
                let videoResponse = await (await fetch(videosPath + response[i], {headers: Settings.API_REQUEST_HEADER})).json();
                videos.push({
                    name: response[i],
                    videos: videoResponse
                })
            }
            console.log(videos)
            context.commit('addGroupVideos', videos);
        },

    },
    getters: {
        getGroupVideo(state) {
            return state.videos.map(function (group) {
                let videos = group.videos;
                if (state.filtrateValue) {
                    videos = videos.filter(function (video) {
                        return video.name.toLocaleLowerCase().lastIndexOf(state.filtrateValue.toLocaleLowerCase()) !== -1
                    })
                }
                return {
                    name: group.name,
                    videos: videos,
                };
            });
        },
    }
}