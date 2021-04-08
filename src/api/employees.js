import http from '@/utils/request.js'

// 获取员工数据
export function sysuserget (params) {
  return http({
    method: 'get',
    url: '/sys/user',
    params
  })
}
