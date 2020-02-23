<template>
  <div class="container">
    <button v-on:click="login">ログイン</button>
  </div>
</template>

<script>
import { firebase } from "~/plugins/firebase";

export default {
  mounted() {
   console.log(this.$store.getters.isAuthenticated)
 },
  methods: {

  }
};
</script>