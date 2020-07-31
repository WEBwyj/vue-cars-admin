//高德地图覆盖物
let marker = null;
export function amapSetMarker(lnglat,map){
    if(marker){
        map.remove(marker);
        marker=null;
    }
    marker = new AMap.Marker({
        position:[lnglat.lng,lnglat.lat]
    })
    map.add(marker);
}