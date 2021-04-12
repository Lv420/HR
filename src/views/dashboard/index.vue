<template>
  <div>
    首页
    <!-- <button @click="huo">点击</button> -->
  </div>
</template>

<script>
// import { treeChange } from '@/utils/index'
export default {
  data () {
    return {
      // arr: [
      //   {
      //     id: 1,
      //     name: 'x1'
      //   },
      //   {
      //     id: 2,
      //     name: 'x2'
      //   },
      //   {
      //     id: 3,
      //     name: 'x3',
      //     parentId: 2
      //   }
      // ],
      imageUrl:
        'https://pic.rmb.bdstatic.com/a389af2faebc81900efcb06012be2a32.jpeg@wm_2,t_55m+5a625Y+3L3poYW/mmKXmooXor7TlqLHkuZA=,fc_ffffff,ff_U2ltSGVp,sz_40,x_25,y_25'
    }
  },
  created () {
    // console.log(this.treeChange(this.arr, 2))
  },
  methods: {
    // treeChange (arr, parentId) {
    //   return arr.filter(item => {
    //     if (item.id === parentId) {
    //       item.children = this.treeChange(arr, item.parentId)
    //       return true
    //     }
    //   })
    // }
  }
}
</script>

<style></style>
