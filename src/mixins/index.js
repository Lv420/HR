export default {
  methods: {
    filterbtn (str) {
      return this.$store.getters.userInfo.roles.points.includes(str)
    }
  }
}
