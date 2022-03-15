<template>
  <div class="table_container">

  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      options: [
        {
          value: '1',
          label: 'Today'
        },
        {
          value: '2',
          label: 'Yesterday'
        }
      ],
      dialogVisible: false
    }
  },
  created () {
    const currentIndex = '/settings'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
