<template>
  <div class="uploadimg">
    <el-upload
      class="avatar-uploader"
      action="#"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
      :show-file-list="false"
    >
      <img
        @click.stop.prevent="isShow = true"
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div v-show="imageUrl" class="del" @click.stop.prevent="del">X</div>
    </el-upload>
    <el-progress
      v-if="progressShow"
      :percentage="percentage"
      color="deepskyblue"
    ></el-progress>
    <el-dialog title="图片预览" :visible.sync="isShow">
      <img class="imgstyle" :src="imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID7KJ4asS51i8JbfksIUPFxiGXYGjB9xoO', // 身份识别 ID
  SecretKey: 'TfX96vymO2RjnbMbssfBGuIYaMr8BC0X' // 身份密钥
})
export default {
  name: 'uploadimg',
  props: ['imageUrl'],
  model: {
    prop: 'imageUrl',
    event: 'input'
  },
  data () {
    return {
      isShow: false,
      percentage: 0,
      progressShow: false
    }
  },
  methods: {
    // 关闭图片
    del () {
      this.$emit('input', '')
    },
    // 文件上传成功
    handleAvatarSuccess () {},
    // 文件上传前
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('图片必须为JPG、PNG、GIF格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB!')
      }
      return isJPG && isLt2M
    },
    // 自定义上传
    httpRequest (file) {
      console.log(file)
      this.progressShow = true
      cos.putObject(
        {
          Bucket: 'lv-1305553131' /* 必须 */,
          Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
          Key: file.file.name, //'上传文件的名字' /* 必须 */
          StorageClass: 'STANDARD',
          Body: file.file, // 上传文件对象
          onProgress: progressData => {
            //    progressData:上传过程中的实时进度对象
            console.log(JSON.stringify(progressData))
            this.percentage = progressData.percent * 100
            setTimeout(() => {
              this.progressShow = false
            }, 2000)
          }
        },
        (err, data) => {
          //   data:上传成功后的返回值
          //   err:上传出错的错误信息
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.$emit('input', `http://${data.Location}`)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadimg {
  width: 150px;
  height: 150px;
  position: relative;
  .imgstyle {
    width: 100%;
    height: 100%;
  }
  .del {
    position: absolute;
    top: 0;
    right: 3px;
    display: none;
    font-size: 20px;
  }
  .avatar-uploader {
    .avatar-uploader-icon {
      font-size: 28px;
      line-height: 150px;
    }
    &:hover .del {
      display: block;
    }
  }
  ::v-deep .avatar-uploader .el-upload {
    width: 150px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
}
</style>
