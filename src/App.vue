<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeMount () {
    let user = window.localStorage.getItem('admin')
    if (user === null || user === 'null') {
      return this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>
  @import "./styles/base.css";
</style>
