<template>
  <v-row>
    <v-col>
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="time"
              :label="label"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
            v-if="menu"
            v-model="time"
            format="24hr"
            use-seconds
            header-color="primary"
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="reset"
          >
            Сбросить
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.menu.save(time)"
          >
            Сохранить
          </v-btn>
        </v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props:['label', 'value'],
  data() {
    return {
      time: this.value,
      menu: false,
    }
  },
  watch:{
    time: function (val){
      this.$emit('input', val);
    }
  },
  methods:{
    reset(){
      this.$refs.menu.save(null)
      this.menu = false;
    }
  }
}
</script>