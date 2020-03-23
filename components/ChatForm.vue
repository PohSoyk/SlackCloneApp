<template>
  <div class="input-container">
    <img v-if="isAuthenticated" :src="user.photoURL" class="avatar" />
    <textarea v-model="text" v-if="isAuthenticated" v-on:keydown.enter="addMessage"></textarea>
    <textarea v-model="text" v-else v-on:click="openLoginModal"></textarea>
    <el-upload
      v-if="isAuthenticated"
      action=""
      :show-file-list="false"
      :http-request="uploadFile"
      >
      <el-button type="info"  plain class="button">
        <i class="el-icon-camera"></i>
        画像をアップロード
      </el-button>
    </el-upload>
    <el-dialog title :visible.sync="dialogVisible" width="380px" center>
      <form class="box">
        <h1>Login</h1>
        <input type="text" name placeholder="Username" value="Googleでログインしてね" />
        <input type="password" name placeholder="Password" />
        <input type="submit" name value="Login" />
        <div class="s-m">
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#"  v-on:click="login">
            <i class="fab fa-google-plus-g"></i>
          </a>
          <a href="#">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
  display: flex;
}

.avatar {
  height: 100%;
  width: auto;
}

textarea {
  width: 100%;
  height: 100%;
}

.button{
  font-size: 15px;
  line-height: 0px;
  padding: 23px 20px;
}

.el-icon-camera {
  font-size: 18px;
  vertical-align: text-bottom;
}

.box h1 {
  color: black;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
}

input::placeholder {
  color: #dcdde1;
}

.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: black;
  border-radius: 24px;
  transition: 0.25s;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 280px;
  border-color: #2ecc71;
}

.box input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40px;
  width: 200px;
  outline: none;
  color: #2ecc71;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type="submit"]:hover {
  background: #2ecc71;
  color: white;
}

.s-m {
  display: flex;
  justify-content: center;
  align-items: center;
}

.s-m a {
  display: inline-flex;
  width: 40px;
  height: 40px;
  background: #2c3e50;
  color: white;
  margin: 0 6px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  font-size: 22px;
  text-decoration: none;
}
.s-m a:hover {
  background: #2ecc71;
}
.s-m a i {
  transition: 0.4s all;
}

</style>

<script>
import { db, firebase } from "~/plugins/firebase.js";

import Vue from "vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      text: null,
      imageUrl: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    openLoginModal() {
      this.dialogVisible = true;
    },
    addMessage(event) {
      if (this.keyDownedForJPConversion(event)) {
        return;
        debugger
      }
      const channelId = this.$route.params.id;
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          text: this.text,
          createdAt: new Date().getTime(),
          user: {
            name: this.user.displayName,
            thumbnail: this.user.photoURL
          }
        })
        .then(() => {
          this.text = null;
        });
    },
    keyDownedForJPConversion(event) {
      const codeForConversion = 229;
      return event.keyCode === codeForConversion;
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const user = result.user;
          this.setUser(user);
          this.dialogVisible = false;
        })
        .catch(() => {
          window.alert(error);
        });
    },
    async uploadFile (deta){
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`massages/${time}_${deta.file.name}`)
      const snapshot =await ref.put(deta.file)
      const url = await snapshot.ref.getDownloadURL()
      this.imageUrl = url
      const channelId = this.$route.params.id;
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          image: this.imageUrl,
          createdAt: new Date().getTime(),
          user: {
            name: this.user.displayName,
            thumbnail: this.user.photoURL
          }
        })
    }
  }
};
</script>