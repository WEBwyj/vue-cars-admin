<template>
    <div class="amap-wrap">
        <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
    </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
//方法
import {getLngLat} from './common'
import {addressSetMapCenter} from './location'
import {amapSetMarker} from './marker'

export default {
    name: "Amap",
    data(){
        return {
            //经纬度
            lnglat:{},
            map: null,
            zoom: 18,
            events: {}
        }
    },
    mounted(){
        lazyAMapApiLoaderInstance.load().then(() => {
            // your code ...
            this.map = new AMap.Map('amapContainer', {
                center: [116.404765, 39.918052],
                zoom: this.zoom, //初始化地图层级
            });

            this.map.on("click", (e) => {
                const lnglat = getLngLat(e);
                //更新经纬度
                this.lnglat = lnglat;
                //回调父组件方法
                this.$emit("callback",{
                    function:"getLngLat",
                    data:{
                        lnglat
                    }
                });
                //设置点覆盖物
                this.setMarker();
            })

        });
    },
    methods: {
        setMapCenter(value){
            addressSetMapCenter(value,this.map);
        },
        setMarker(){
            amapSetMarker(this.lnglat,this.map)
        },
    }
}
</script>
<style lang="scss">
.amap-wrap { height: 100%; }
</style>