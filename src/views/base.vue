<template>
  <div>
    <headers></headers>
    <sidebar></sidebar>
      <div class="footer">
        <span>Copyright by 一页书屋 &copy; 2017</span>
      </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import headers from 'components/headers.vue'
  import sidebar from 'components/sidebar.vue'
  export default {
    components: {
      headers, sidebar
    }
  }
</script>
<style scoped>
  .footer {
    width: 100%;
    margin-left:360px;
  }
</style>
