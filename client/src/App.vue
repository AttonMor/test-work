<template>
  <div class="container">
    <form @submit="onSubmit">
      <div class="input-group">
        <input
          type="text"
          v-model="text"
          name="text"
          placeholder="Введите ссылку"
        />
        <input type="submit" value="Найти" class="btn btn-block" />
      </div>
    </form>
    <Alert v-show='alert'/>
    <Spinner v-show="loading"/>
    <Sources :sources="sourcesList" />
  </div>
</template>

<script>
import axios from "axios";
import Sources from "./components/Sources";
import Spinner from './components/Spinner';
import Alert from './components/Alert'
export default {
  name: "App",
  components: {
    Sources,Spinner,Alert
  },
  data() {
    return {
      alert: false,
      loading: false,
      text: "",
      sourcesList: [],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.fetchSources();
    },
    async fetchSources() {
      this.loading = true;
      this.sourcesList = [];
      try {
        const { data } = await axios.post(
        "http://localhost:5001",
        { url: this.text },
      );
      this.sourcesList = data;
      } catch (error) {
        this.showAlert()
      }
      this.loading = false
    },
    showAlert(){
      this.loading = false;
      setTimeout(() => {
        this.alert = false;
        }, 5000)
      this.alert = true;
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
}
.input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
}

.btn {
  display: inline-block;
  background: #f4f4f4;
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
}

input[type='text'] {
  flex: 1 1 auto;
  width: 1%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
}

.form .form-group {
  margin: 1.2rem 0;
}

.form .form-text {
  display: block;
  margin-top: 0.3rem;
  color: #888;
}

</style>
