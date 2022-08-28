<template>
  <div class="page">
    <v-card class="mx-auto my-12 pa-4" max-width="500">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field label="Логин"
                        v-model="form.name"
                        required
                        :rules="requiredRules"
          ></v-text-field>
          <v-text-field label="Пароль"
                        v-model="form.password"
                        type="password"
                        required
                        :rules="requiredRules"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" @click="login" :loading="loading">Вход</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {requiredRules} from '@/helpers/validate-rules';

export default {
  name: "login-index",
  data() {
    return {
      requiredRules,
      valid: false,
      loading: false,
      form: {
        name: null,
        password: null,
      },
    }
  },

  mounted() {

  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) return;

      this.loading = true
      this.api.user.login(this.form).then(r => {
        this.auth.login(r.data.data);
        this.$router.push('/');
      }).finally(() => {
        this.loading = false
      });
    }
  }
}
</script>
