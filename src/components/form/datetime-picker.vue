<template>
  <v-row>
    <v-col>
      <v-datetime-picker
          timeFormat="HH:mm:ss"
          v-model="date"
          :label="label"
      ></v-datetime-picker>
    </v-col>
  </v-row>
</template>
<script>

import moment from 'moment';

export default {
  props:['label', 'value'],
  data() {
    return {
      date: this.value,
    }
  },
  watch:{
    date: function (val){
      this.$emit('input', moment(val).format('YYYY-MM-DD HH:mm:ss'));
    }
  },
}
</script>