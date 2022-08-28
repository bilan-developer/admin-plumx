<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="authenticated" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app expand-on-hover>
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-overlay :value="$store.state.loading.status" color="#fff">
      <v-progress-circular :size="70" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <notifications group="foo" />
  </v-app>
</template>

<script>
import sidebar from './components/app/sidebar';

export default {
  name: 'app',
  components: {
    sidebar,
  },
  data() {
    return {
      dialog: false,
      drawer: null,
    };
  },
  computed:{
    authenticated(){
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logout(){
      this.auth.logout(this);
    }
  },
}
</script>
<style>
  .v-main{
    padding-left: 56px !important;
  }
</style>
