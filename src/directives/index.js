const directives = {
  imgerror: {
    inserted (el, obj) {
      el.onerror = function () {
        el.src = obj.value
      }
    }
  }
}

export default directives
