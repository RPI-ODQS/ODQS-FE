<template>
  <div class="data-array">
    <el-input
      class="input-item"
      v-model="array"
    />
  </div>
</template>

<script>
export default {
  name: 'notfound',
  prop: ['value'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.input-item {
  width: 15%;
  float: left;
  margin-right: 1%;
}
</style>

