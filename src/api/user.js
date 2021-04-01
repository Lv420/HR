import http from '@/utils/request.js'

// 登录接口
export function loginapi (data) {
  return http({
    method: 'post',
    url: '/sys/login',
    Catch: true,
    data
  })
}
