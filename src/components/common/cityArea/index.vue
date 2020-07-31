<template>
  <el-cascader
    v-model="value"
    :options="cascader_options"
    :props="cascader_props"
    @change="changeValue"
  ></el-cascader>
</template>

<script>
import { GetCity } from "@/api/common";
export default {
  data() {
    const _this = this;
    return {
      address: [],
      addressData: {},
      value: "",
      cascader_options: [],
      cascader_props: {
        // value: "PROVINCE_CODE",
        // label: "PROVINCE_NAME",
        lazy: true,
        lazyLoad(node, resolve) {
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          const level = node.level;
          // console.log(node)
          // 请求参数
          const requestData = {};
          //省份
          // if (level === 0) {
          //   requestData.type = "province";
          // }
          // // 城市
          // if (level === 1) {
          //   requestData.type = "city";
          //   requestData.province_code = node.value;
          // }
          // //区县
          // if (level === 2) {
          //   requestData.type = "area";
          //   requestData.city_code = node.value;
          // }
          const jsonType = {
            0: { type: "province" },
            1: { type: "city", code: "province" },
            2: { type: "area", code: "city" }
          };
          if (jsonType[level].code) {
            requestData[`${jsonType[level].code}_code`] = node.value;
          }
          requestData.type = jsonType[level].type;

          //省市区接口
          GetCity(requestData).then(response => {
            const data = response.data.data;
            const type = jsonType[level].type.toUpperCase();
            data.forEach(item => {
              item.value = item[`${type}_CODE`];
              item.label = item[`${type}_NAME`];
              //停止第三级联选择
              if (level === 2) {
                item.leaf = level >= 2;
              }
            });
            // if (level === 0) {
            //   data.forEach(item => {
            //     item.value = item.PROVINCE_CODE;
            //     item.label = item.PROVINCE_NAME;
            //   });
            // }
            // if (level === 1) {
            //   data.forEach(item => {
            //     item.value = item.CITY_CODE;
            //     item.label = item.CITY_NAME;
            //   });
            // }
            // if (level === 2) {
            //   data.forEach(item => {
            //     item.value = item.AREA_CODE;
            //     item.label = item.AREA_NAME;
            //     item.leaf = level >= 2; //停止级联选择
            //   });
            // }
            //存储省市区数据
            _this.addressData[jsonType[level].type] = data;
            //返回节点数据
            resolve(data);
          });
          //获取address
          if (node.level !== 0) {
            _this.getAddress(node);
          }
        }
      }
    };
  },
  methods: {
    changeValue(value) {
      this.$emit("update:cityAreaValue", value.join());
      //匹配最后一项,区县
      const lastCode = value[value.length - 1];
      const area = this.addressData.area.filter(
        item => item.value == lastCode
      )[0];
      this.address[2] = area.label;
      this.getAddress();
    },
    //获取中文地址
    getAddress(node) {
      if (node) {
        const index = node.level - 1;
        this.address[index] = node.label;
      }
      //为true时 执行地图交互
      if (this.mapLocation) {
        this.$emit("callback", {
          function: "setMapCenter",
          data: {
            address: this.address.join("")
          }
        });
      }
    }
  },
  props: {
    cityAreaValue: {
      type: String,
      default: ""
    },
    mapLocation: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
<!--
组件传入的属性用 props 接收
this.$emit("update")返向修改 结合组件属性 .sync
-->