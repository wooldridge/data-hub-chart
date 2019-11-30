document.addEventListener('DOMContentLoaded', function () {

    let type = 'bar';
    let url = new URL(window.location.href);
    let urlType = url.searchParams.get("type");
    if (urlType) {
        type = urlType;
    }
    config[type]['data'](config[type]['config']);
    
});