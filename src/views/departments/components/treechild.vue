<template>
  <div class="top">
    <div class="left">{{ nodeData.name }}</div>
    <div class="right">
      <span class="manager">{{ nodeData.manager }}</span>
      <span class="operation">
        <el-dropdown @command="command">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="add">新增</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="isShow"
                >修改</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="isShow"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
import { companyDepartmentdel } from '@/api/departments'
export default {
  props: {
    nodeData: {
      type: Object
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      formlist: []
    }
  },

  methods: {
    // 下拉操作
    command (value) {
      if (value === 'add') {
        console.log('这是新增')
        this.$bus.$emit('isShowEvent', [this.nodeData, 'add'])
      } else if (value === 'edit') {
        console.log('这是修改')

        this.$bus.$emit('isMode', [this.nodeData, 'edit'])
      } else {
        console.log('这是删除')
        this.$confirm('请确认删除', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await companyDepartmentdel(this.nodeData.id)
            this.$message.success('部门已删除')
            // 普通方法
            // this.$emit('getcompanyDepartment')
            this.$store.dispatch('departments/gettreeDepts')
          })
          .catch(() => {
            this.$message.error('取消删除')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;

  .left {
    flex: 1;
  }
  .right {
    .operation {
      margin-left: 40px;
    }
  }
}
.tree {
  .top {
    display: flex;
    width: 100%;
    .left {
      flex: 1;
    }
    .right {
      .operation {
        margin-left: 40px;
      }
    }
  }
}
</style>
