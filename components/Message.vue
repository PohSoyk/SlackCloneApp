<template>
 <div class="chat-container">
   <div class="thumbnail-container">
     <img src="https://pbs.twimg.com/profile_images/1095378300225019904/17wfi0ZD_400x400.jpg" />
   </div>
   <div class="message-container">
     <div class="user-name">hokuro.jump</div>
     <div class="message">今日も良い天気ですね</div>
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
</style>