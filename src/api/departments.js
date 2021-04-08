import http from '@/utils/request.js'

// 获取组织架构列表
export function companyDepartment () {
  return http({
    method: 'get',
    url: '/company/department'
  })
}

// 获取负责人
export function sysuser () {
  return http({
    method: 'get',
    url: '/sys/user'
  })
}

// 新增部门
export function setcompanydepartment (data) {
  return http({
    method: 'post',
    url: '/company/department',
    data
  })
}

// 编辑部门
export function companydepartment (data) {
  return http({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}

// 删除部门
export function companyDepartmentdel (id) {
  return http({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
