const directives = {
  imgerror: {
    inserted (el, obj) {
      el.src = el.src || obj.value
      el.onerror = function () {
        el.src = obj.value
      }
    },
    componentUpdated (el, obj) {
      el.src = el.src || obj.value
    }
  }
}

export default directives
