<template>
  <section>
    <base-card>
      <header>
        <h2>Received Request</h2>
      </header>
      <ul v-if="hasRequests">
        <request-item
          v-for="request in receiveRequests"
          :email="request.userEmail"
          :message="request.message"
          :key="request.id"
        >
        </request-item>
      </ul>
      <h3 v-else>You have'nt receive any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  computed: {
    receiveRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>