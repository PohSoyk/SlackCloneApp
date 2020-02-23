<template>
  <div class="chats-container">
    <message v-for="(message, key) in messages" :key="key" :message="message" />
  </div>
</template>

<script>
import Message from "~/components/Message.vue";

export default {
  props: ["messages"],
  components: {
    Message
  }
};
</script>

<style scoped>
.chats-container {
  padding: 16px;
}
</style>