import http from '@/utils/request.js'

// 获取所有权限点
export function syspermissionget () {
  return http({
    method: 'get',
    url: '/sys/permission'
  })
}
