<template>
  <v-row style="height: 95vh;">
    <v-col cols="12" class="flex-column-between-center">
      <v-col cols="10" class="flex-column-center-center">
        <h1>Wize</h1>
      </v-col>
      <v-col cols="12" class="flex-column-center-center">
        <v-btn color="primary" x-large @click="signIn" :loading="loading">
          <div class="icon-container flex-row-center-center">
            <div class="icon flex-column-center-center">
              <svg
                width="24"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M29 14.8326C29 13.8469 28.9184 12.8559 28.7445 11.8862H14.7908V17.4699H22.7814C22.4498 19.2708 21.3844 20.8638 19.8243 21.8761V25.4991H24.5915C27.391 22.9737 29 19.2441 29 14.8326Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M14.7908 28.9986C18.7807 28.9986 22.1454 27.7146 24.597 25.4981L19.8298 21.8751C18.5034 22.7596 16.7912 23.2604 14.7962 23.2604C10.9368 23.2604 7.66445 20.7083 6.49032 17.2771H1.57092V21.012C4.08226 25.9084 9.19735 28.9986 14.7908 28.9986V28.9986Z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.48488 17.2771C5.8652 15.4762 5.8652 13.5262 6.48488 11.7254V7.99048H1.57092C-0.527302 12.0877 -0.527302 16.9148 1.57092 21.0119L6.48488 17.2771V17.2771Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M14.7908 5.73722C16.8999 5.70525 18.9383 6.48313 20.4658 7.91102L24.6894 3.77121C22.015 1.3097 18.4654 -0.0435995 14.7908 -0.000975987C9.19735 -0.000975987 4.08226 3.08923 1.57092 7.99094L6.48489 11.7258C7.65358 8.28931 10.9314 5.73722 14.7908 5.73722V5.73722Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="29" height="29" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          sign in with google
        </v-btn>
      </v-col>
      <v-col cols="10" xl="3" lg="3" md="4" sm="10">
        <div class="links-container flex-row-around-center">
          <div>
            <router-link to="/guide">Guide</router-link>
          </div>
          .
          <div>
            <router-link to="/contactus">Contact Us</router-link>
          </div>
          .
          <div>
            <router-link to="/aboutus">About Us</router-link>
          </div>
        </div>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import router from '../router';
export default {
  name: 'SignInPage',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      window.location.href = '/api/v1/auth/login';
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.icon-container {
  padding-right: 0.5rem;
}
.icon {
  background-color: var(--main-color);
  padding: 0.3rem;
  border-radius: 50%;
}
a {
  text-decoration: none;
}
</style>
