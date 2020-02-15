<template>
 <div class="input-container">
   <textarea @click="login"></textarea>
 </div>
</template>

<style scoped>
.input-container {
 padding: 10px;
 height: 100%;
}

textarea {
 width: 100%;
 height: 100%;
}
</style>

<script>
export default {
  methods: {
    login() {
      window.alert('ログインしろよ')
    }
  }
}
</script>