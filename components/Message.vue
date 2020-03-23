<template>
  <div class="chat-container">
    <div class="thumbnail-container">
     <img v-bind:src="message.user.thumbnail" />
    </div>
    <div class="message-container">
      <div class="user-name">{{ displayName }}</div>
      <div v-if="!message.image" class="message">{{ message.text }}</div>
      <el-image
        
        v-if="!message.text" 
        :src="message.image"
        :fit="cover"
      >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
      </el-image>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  padding: 8px;
}

.thumbnail-container {
  margin-right: 16px;
}

.thumbnail-container img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.user-name {
  font-weight: bold;
}

.el-image >>> .el-image__inner{
  width: 45%;
  height: auto;
}
</style>

<script>
export default {
  props: ["message"],
  computed: {
    displayName() {
      return `@${this.message.user.name}`;
    }
  }
};
</script>