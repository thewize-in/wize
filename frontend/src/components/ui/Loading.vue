<template>
  <v-row style="height: 80vh;">
    <v-col class="flex-column-center-center loading-container">
      <div class="load">
        <div class="spinner">
          <div class="bubble-1"></div>
          <div class="bubble-2"></div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import "../../assets/styles/colors.css";
export default {
  name: "Loading"
};
</script>

<style scoped>
.spinner {
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0 auto;
}
.loading-container {
  background-color: var(--main-container);
}

.bubble-1,
.bubble-2 {
  position: absolute;
  top: 0;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #4b9cdb;
}

.bubble-2 {
  top: auto;
  bottom: 0;
}

.l {
  animation-delay: 1.44s;
}

.load .spinner {
  animation: loadingI 2s linear infinite;
}
.load .bubble-1,
.load .bubble-2 {
  animation: bounce 2s ease-in-out infinite;
}
.load .bubble-2 {
  animation-delay: -1s;
}

@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
