<template>
  <div>
    <uploadExcel
      :beforeUpload="beforeUpload"
      :onSuccess="onSuccess"
    ></uploadExcel>
  </div>
</template>

<script>
import { sysuserbatchpost } from '@/api/employees'
export default {
  methods: {
    beforeUpload (file) {
      console.log(file)
      const max2M = file.size / 1024 / 1024 < 2
      if (!max2M) {
        this.$message.error('文件大小不合格')
      }
      return max2M
    },
    async onSuccess ({ header, results }) {
      // username	姓名
      // mobile		手机号
      // formOfEmployment	聘用形式
      // workNumber		工号
      // departmentName		组织名称
      // timeOfEntry		入职时间
      // correctionTime		转正时间
      let obj = {
        入职日期: 'timeOfEntry',
        姓名: 'username',
        工号: 'workNumber',
        手机号: 'mobile',
        转正日期: 'correctionTime'
      }

      let arr = []
      results.forEach(item => {
        let _obj = {}
        Object.keys(item).forEach(item2 => {
          _obj[obj[item2]] = item[item2]
        })
        arr.push(_obj)
      })
      arr.forEach(item => {
        let time = new Date((item.correctionTime - 1) * 24 * 60 * 60 * 1000)
        let timeOf = new Date((item.timeOfEntry - 1) * 24 * 60 * 60 * 1000)
        time.setYear(time.getFullYear() - 70)
        timeOf.setYear(timeOf.getFullYear() - 70)
        console.log(time)
        item.correctionTime = time
        item.timeOfEntry = timeOf
      })
      console.log(arr)
      await sysuserbatchpost(arr)
      this.$router.push('/employees')
    }
  }
}
</script>

<style></style>
