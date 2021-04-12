import http from '@/utils/request.js'

// 获取员工数据
export function sysuserget (params) {
  return http({
    method: 'get',
    url: '/sys/user',
    params
  })
}

// 新增员工
export function sysuserpost (data) {
  return http({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 删除员工
export function sysuserdel (id) {
  return http({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

// 批量导入员工
export function sysuserbatchpost (data) {
  return http({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

// 获取员工基本信息
export function sysUserget (id) {
  return http({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

// 保存员工基本信息
export function sysuserput (data) {
  return http({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

// 获取员工个人信息
export function employeesget (id) {
  return http({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

// 保存员工个人信息
export function employeesput (data) {
  return http({
    method: 'put',
    url: `/employees/${data.id}/personalInfo`,
    data
  })
}

// 获取员工岗位信息
export function employeesjobget (id) {
  return http({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

// 保存员工岗位信息
export function employeesjobput (data) {
  return http({
    method: 'put',
    url: `/employees/${data.id}/jobs`,
    data
  })
}

// 保存员工角色
export function sysUserAssignRolesput (data) {
  return http({
    method: 'put',
    url: '/sys/user/assignRoles',
    data
  })
}
