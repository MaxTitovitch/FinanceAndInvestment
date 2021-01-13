
export function getYouTubeVideoId(link){
    if(link.lastIndexOf('watch') !== -1){
        link = link.replace('?v=', '/')
    }
    return link.split('/').reverse()[0];
}

export function getDateByQuarter(quarter){
    switch (quarter){
        case 'Q1': return '31.03.';
        case 'Q2': return '30.06.';
        case 'Q3': return '30.09.';
        case 'Q4': return '31.12.';
    }
}

export function getDate (stringDate) {
    let dateParts = stringDate.split('.');
    return new Date(`${dateParts[1]}.${dateParts[0]}.${dateParts[2]}`);
}