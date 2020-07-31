<template>
  <div class="parking-add">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input v-model="form.parkingName"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <CityArea
          :mapLocation="true"
          :cityAreaValue.sync="form.area"
          @callback="callbackComponent"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="item in type" :label="item.label" :value="item.value" :key="item.value"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in status" :label="item.label" :value="item.value" :key="item.value"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="address-map">
          <AMap ref="amap" @callback="callbackComponent" />
        </div>
      </el-form-item>
      <el-form-item label="经纬度" prop="lnglat">
        <el-input v-model="form.lnglat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//Amap
import AMap from "../amap/index";
//cityarea组件
import CityArea from "@c/common/cityArea";
export default {
  name: "ParkingAdd",
  data() {
    return {
      status:[
        { label:"禁用",value:1},
        { label:"启用",value:2}
      ],
      type:[
        { label:"室内",value:1},
        { label:"室外",value:2}
      ],
      form: {
        parkingName: "",
        area: "",
        type: "",
        carsNumber: "",
        status: "",
        lnglat: "",
        content: ""
      },
      //表单验证规则
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        carsNumber: [
          { required: true, message: "数量不能为空", trigger: "change" },
          { type: "number", message: "请输入数字" }
        ],
        area: [{ required: true, message: "请选择省市区", trigger: "change" }],
        lnglat: [
          { required: true, message: "经纬度不能为空", trigger: "change" }
        ]
      }
    };
  },
  components: {
    AMap,
    CityArea
  },
  methods: {
    callbackComponent(params) {
      if (params.function) {
        this[params.function](params.data);
      }
    },
    setMapCenter(data) {
      // this.form.lonlag = data.value;
      this.$refs.amap.setMapCenter(data.address);
    },
    //获取经纬度
    getLngLat(data) {
      this.form.lnglat = data.lnglat.value;
    },
    //form表单验证
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.address-map {
  width: 100%;
  height: 500px;
  // border: 1px solid #ccc;
}
</style>