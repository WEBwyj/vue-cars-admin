<template>
  <div>
    <div class="filter-form">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
            <el-form-item label="车辆品牌:">
              <el-select v-model="form.type" placeholder="选择品牌">
                <el-option label="福特" value="shanghai"></el-option>
                <el-option label="红旗" value="beijing"></el-option>
                <el-option label="奔驰" value="shanghai"></el-option>
                <el-option label="宝马" value="shanghai"></el-option>
                <el-option label="林肯" value="shanghai"></el-option>
                <el-option label="五菱宏光" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌型号:">
              <el-input v-model="form.parking_name" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="pull-right">
            <el-button type="danger" @click="dialog_show=true">新增车辆品牌</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="name" label="LOGO" width="180"></el-table-column>
      <el-table-column prop="type" label="车辆品牌" width="180"></el-table-column>
      <el-table-column prop="area" label="品牌型号"></el-table-column>
      <el-table-column prop="disabled" label="禁启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small">编辑</el-button>
          <el-button type size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗组件 -->
    <!-- 父组件往子组件传值时 是单向数据流 sync修饰符 -->
    <AddCarsBrand :flagVisible.sync="dialog_show" />
  </div>
</template>

<script>
import AddCarsBrand from "@c/dialog/addCarsBrand";
export default {
  name: "Parking",
  components: {
    AddCarsBrand
  },
  data() {
    return {
      //弹窗标记
      dialog_show: false,
      form: {
        parking_name: "",
        area: "",
        type: ""
      },
      options: [
        {
          value: 1111,
          label: "广东省",
          children: [
            {
              value: 1111,
              label: "深圳市"
            },
            {
              value: 1111,
              label: "广州市"
            }
          ]
        },
        {
          value: 1111,
          label: "广西省",
          children: [
            {
              value: 1111,
              label: "南宁市"
            }
          ]
        }
      ],
      tableData: [
        {
          name: "南山停车场",
          type: "室外",
          area: "广东省 深圳市",
          carsNumber: 20,
          disabled: 0,
          address: "213213"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>