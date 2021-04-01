const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: sdate => sdate.user.token
}
export default getters
