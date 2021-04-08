<template>
  <div class="pagetools">
    <el-card>
      <div class="flex">
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageTools'
}
</script>

<style lang="scss" scoped>
.pagetools {
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      padding: 10px;
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
    }
  }
}
</style>
