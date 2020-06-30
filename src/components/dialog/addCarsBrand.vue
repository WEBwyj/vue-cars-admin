<template>
  <!-- 弹窗 -->
  <el-dialog title="新增车辆品牌" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" :close-on-click-modal="false">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="车辆品牌">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌型号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="LOGO">
        <div class="upload-img-wrap">
          <div class="upload-img">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
              alt
            />
          </div>
          <ul class="img-list">
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593497983904&di=59588f584088ac92ef1dbd5f7bb269f0&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="可停放车辆">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="禁启用">
        <el-radio-group v-model="form.resource">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    flagVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        parking_name: "",
        area: "",
        type: ""
      }
    };
  },
  methods: {
    close() {
      // 反向修改值
      this.$emit("update:flagVisible", false);
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>