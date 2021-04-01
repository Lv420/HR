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

// 个人信息
export function userinfoapi () {
  return http({
    method: 'post',
    url: '/sys/profile'
  })
}

// 获取头像信息
export function sysuser (id) {
  return http({
    method: 'get',
    url: `/sys/user/${id}`
  })
}
