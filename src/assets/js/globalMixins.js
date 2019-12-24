export default {
  computed: {
    clickType () {
      return this.$store ? this.$store.state.clickType : 'default'
    }
  },
  watch: {
    clickType (value) {
      if (value === 'left') {
        if (this.refresh) {
          this.refresh()
        }
      }
    }
  }
}
