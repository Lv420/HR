import http from '@/utils/request.js'

// 获取所有权限点
export function syspermissionget () {
  return http({
    method: 'get',
    url: '/sys/permission'
  })
}

// 新增权限
export function sysPermissionpost (data) {
  return http({
    method: 'post',
    url: '/sys/permission',
    data
  })
}

// 删除权限点
export function sysPermission (id) {
  return http({
    method: 'delete',
    url: `/sys/permission/${id}`
  })
}

// 编辑权限
export function sysPermissionput (data) {
  return http({
    method: 'put',
    url: `/sys/permission/${data.id}`,
    data
  })
}

// 在setting页面获取权限点详情
export function sysroleget (id) {
  return http({
    method: 'get',
    url: `/sys/role/${id}`
  })
}

// 在setting页面给角色分配权限
export function sysRoleAssignPrem (data) {
  return http({
    method: 'put',
    url: '/sys/role/assignPrem',
    data
  })
}
