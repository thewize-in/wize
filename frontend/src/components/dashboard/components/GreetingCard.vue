<template>
  <v-col
    cols="10"
    xl="10"
    lg="10"
    md="10"
    sm="10"
    class="card greeting-container flex-column-start-center"
  >
    <div class="date">{{ date }}</div>
    <div class="greeting">
      <p>
        {{ greet() }}
        <b>Dr.{{doctor}}!</b>
      </p>
    </div>
  </v-col>
</template>

<script>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

export default {
  name: "GreetingCard",
  props: ["doctor"],
  computed: {
    date: {
      get() {
        return dayjs().format("ll");
      }
    }
  },
  methods: {
    greet() {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour <= 17) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 95%;
}
.greeting-container {
  color: var(--light-text-color);
}
.date {
  font-size: 0.8rem;
  font-weight: 350;
}

.greeting {
  font-size: 1.6rem;
}
p {
  font-weight: 400 !important;
}
b {
  color: var(--dark-text-color);
}
</style>
