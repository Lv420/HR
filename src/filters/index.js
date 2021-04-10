// 全局过滤器
import employees from '@/api/constant/employees'
import moment from 'moment'
export default {
  // 员工聘用方式过滤
  formatterOf (cellValue) {
    // console.log(cellValue)
    // findIndex判断数组是否有这个值 item是遍历出来的数据
    let _index = employees.hireType.findIndex(item => {
      return item.id === cellValue
    })
    if (_index !== -1) {
      return employees.hireType[_index].value
    } else {
      return '未知'
    }
  },
  // 时间转换
  formatTime: function (value) {
    return moment(value).format('YYYY-MM-DD')
  }
}
