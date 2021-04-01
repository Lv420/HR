const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  islogin: state => {
    return state.user.userInfo.userId ? true : false
  },
  userInfo: state => state.user.userInfo
}
export default getters
