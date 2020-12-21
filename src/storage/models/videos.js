import Settings from '@/settings'
import {getYouTubeVideoId} from "@/helpers";

export default {
    state: () => ({
        videos:  [],
        filtrateValue: '',
        isFirst: true,
        players: []
    }),
    mutations: {
        setGroupVideos(state, videos) {
            state.videos = videos
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
            state.players.forEach(function (player) {
                if(player.stopVideo) player.stopVideo();
            })
        },
        updateStorage(state, data) {
            for (let i = 0; i < state.videos.length; i++) {
                for (let j = 0; j < state.videos[i].videos.length; j++) {
                    let isShow = state.videos[i].videos[j].showType;
                    let link = getYouTubeVideoId(state.videos[i].videos[j].link);
                    if((isShow === 'NOSHOW' || (isShow === 'SHOW' && data.status === 'FULLSHOW')) && link === data.link) {
                        let lookedVideos = JSON.parse(localStorage.getItem("lookedVideos") || '[]'), id = 0;
                        for (let k = 0; k < lookedVideos.length; k++) {
                            if(lookedVideos[i].link === link){
                                id++;
                                lookedVideos[i].type = data.status;
                            }
                        }
                        if(id === 0) lookedVideos.push({link, type: data.status})
                        localStorage.setItem("lookedVideos", JSON.stringify(lookedVideos));
                        state.videos[i].videos[j].showType = data.status;
                        break;
                    }
                }
            }
        },
        setPlayers(state, players){
            state.players = [...state.players, ...players];
        }
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
                            return getYouTubeVideoId(video.link) === searched.link ? searched.type : false;
                        })?.type || 'NOSHOW';
                        video.isFull = false;
                        return video;
                    })
                })
            }
            context.commit('setGroupVideos', videos);
            context.dispatch('playPlayer');
        },
        playPlayer(context) {
            function onYouTubeIframeAPIReady() {
                let players = document.getElementsByClassName('player'), youtubePlayers = [];
                for (let i = 0; i < players.length; i++) {
                    let url = players[i].dataset.url;
                    youtubePlayers.push(new window.YT.Player(players[i].id, {
                        height: '95%',
                        width: '100%',
                        videoId: players[i].dataset.url,
                        events: {
                            'onStateChange': function (event){
                                if(event.data === 1) {
                                    context.commit('updateStorage', {status: 'SHOW', link: url});
                                } else if(event.data === 0) {
                                    context.commit('updateStorage',  {status: 'FULLSHOW', link: url});
                                }
                            }
                        }
                    }));
                }
                context.commit('setPlayers', youtubePlayers);
            }
            setTimeout(onYouTubeIframeAPIReady, 1000);
        }
    },
    getters: {
        getGroupVideo(state) {
            // return state.videos;
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
        getIsFirst(state) {
            return state.isFirst;
        }
    }
}