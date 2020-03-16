<template>
  <div class="input-container">
    <img v-if="isAuthenticated" :src="user.photoURL" class="avatar" />
    <textarea v-model="text" v-if="isAuthenticated" v-on:keydown.enter="addMessage"></textarea>
    <textarea v-model="text" v-else v-on:click="openLoginModal"></textarea>
    <el-dialog title :visible.sync="dialogVisible" width="380px" center>
      <!-- <div class="image-container">
        <img src="~/assets/google_sign_in.png" v-on:click="login" />
      </div>-->
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
      <loginform />
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

.image-container {
  display: flex;
  justify-content: center;
}

img {
  width: 70%;
  cursor: pointer;
}

/* l-dialog {
  width: 380px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,0%);
  background: #191919;
  text-align: center;
} */

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
.s-m a:hover > i {
  transform: scale(1.6) rotate(25deg);
}
</style>

<script>
import { db, firebase } from "~/plugins/firebase.js";

import Vue from "vue";
import { mapActions } from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
export default {
  data() {
    return {
      dialogVisible: false,
      text: null
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
    }
  }
};
</script>