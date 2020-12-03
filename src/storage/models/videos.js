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
        filtrateVideos(state, filtrateValue){
            state.filtrateValue = filtrateValue;
        },
        setShowTerm (state, entity){
            for (let i = 0; i < state.videos.length; i++) {
                for (let j = 0; j < state.videos[i].videos.length; j++) {
                    if(state.videos[i].videos[j].name === entity.name) {
                        state.videos[i].videos[j].isShow = entity.isShow;
                        break;
                    }
                }
            }
        },
        setFullVideo (state, name){
            for (let i = 0; i < state.videos.length; i++) {
                for (let j = 0; j < state.videos[i].videos.length; j++) {
                    if(state.videos[i].videos[j].name === name) {
                        state.videos[i].videos[j].isFull = !state.videos[i].videos[j].isFull;
                        break;
                    }
                }
            }
        },
    },
    actions: {
        async initGroupVideos(context) {
            let videos = [], path = Settings.API_HOST + Settings.API_VERSION + Settings.API_VIDEOS_PATH;
            let lookedVideos = JSON.parse(localStorage.getItem("lookedVideos") || '[]');
            let response = await (await fetch(path, {headers: Settings.API_REQUEST_HEADER})).json();
            for (let i = 0; i < response.length; i++) {
                let videosPath = Settings.API_HOST + Settings.API_VERSION + Settings.API_VIDEOS_DESC_PATH;
                let videoResponse = await (await fetch(videosPath + response[i], {headers: Settings.API_REQUEST_HEADER})).json();
                videos.push({
                    name: response[i],
                    videos: videoResponse.map(function (video){
                        video.showType = lookedVideos.find(function (searched){
                            return video.name === searched.name ? searched.type : false;
                        }) || 'NOSHOW';
                        video.isFull = false;
                        return video;
                    })
                })
            }
            context.commit('addGroupVideos', videos);
        },
        showVideo() {

        }
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