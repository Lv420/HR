<template>
  <div>
    首页
    <!-- <button @click="huo">点击</button> -->
    <el-tree :data="list" :props="{ label: 'resName' }"> </el-tree>
  </div>
</template>

<script>
// import { treeChange } from '@/utils/index'
export default {
  data () {
    return {
      list: [],
      arr: [
        {
          id: 4,
          resName: '删除角色',
          parentId: 2
        },
        {
          id: 3,
          resName: '编辑角色',
          parentId: ''
        },
        {
          id: 2,
          resName: '设置权限',
          parentId: ''
        },
        {
          id: 5,
          resName: '添加用户',
          parentId: 4
        },
        {
          id: 6,
          resName: '更新用户',
          parentId: 4
        },
        {
          id: 7,
          resName: '删除用户',
          parentId: 6
        },
        {
          id: 8,
          resName: '重置密码',
          parentId: 3
        },
        {
          id: 9,
          resName: '添加地区',
          parentId: 5
        },
        {
          id: 10,
          resName: '编辑地区',
          parentId: 6
        }
      ]
      //   imageUrl:
      //     'https://pic.rmb.bdstatic.com/a389af2faebc81900efcb06012be2a32.jpeg@wm_2,t_55m+5a625Y+3L3poYW/mmKXmooXor7TlqLHkuZA=,fc_ffffff,ff_U2ltSGVp,sz_40,x_25,y_25'
    }
  },
  created () {
    // console.log(this.$router)
    this.$store.dispatch('permission/getUserRoutes')
    // console.log(this.treeChange(this.arr, 2))
    const res = this.getData(this.arr, '')
    this.list = res
  },
  methods: {
    getData (arr, pid) {
      return arr.filter(item => {
        if (item.parentId === pid) {
          item.children = this.getData(this.arr, item.id)
          return true
        }
      })
    }
  }
}
</script>

<style></style>
