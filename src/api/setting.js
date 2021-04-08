import http from '@/utils/request.js'

// 获取角色列表
export function sysRoleget (params) {
  return http({
    method: 'get',
    url: '/sys/role',
    params
  })
}

// 获取公司数据
export function companyget (id) {
  return http({
    method: 'get',
    url: `/company/${id}`
  })
}

// 添加角色
export function sysrolepost (data) {
  return http({
    method: 'post',
    url: `/sys/role`,
    data
  })
}

// 编辑角色
export function sysRoleput (data) {
  return http({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}

export function sysroledel (id) {
  return http({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}
