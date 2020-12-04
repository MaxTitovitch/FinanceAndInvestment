
export function getYouTubeVideoId(link){
    if(link.lastIndexOf('watch') !== -1){
        link = link.replaceAll('?v=', '/')
    }
    return link.split('/').reverse()[0];
}