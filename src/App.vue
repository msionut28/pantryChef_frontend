<template> 
<main>
  <router-view :key="$route.path" />
</main>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { mapState } from 'vuex';
export default {
  name: 'App',
  mounted() {
    if(this.$cookies.isKey('user_session')) {
        this.$store.dispatch('login')
        const userData = decodeCredential(this.$cookies.get('user_session'))
        this.userName = userData.given_name
        if(this.$cookies.isKey('new_user')){
          this.$store.dispatch('modal')
        }
    }else if(this.$cookies.isKey('admin_session')){
      this.$store.dispatch('isAdmin')
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'showModal'])
  },
}
</script>

<style>

</style>
