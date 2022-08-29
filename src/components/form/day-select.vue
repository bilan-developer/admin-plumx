<template>
  <v-row>
    <v-col>
      <v-select
          v-model="selectedItems"
          :items="items"
          :label="label"
          multiple
          chips
          hint="Selected Days"
          persistent-hint
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:['label', 'value'],

  data () {
    return {
      selectedItems: this.value ?? [],
      items: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    }
  },
  watch:{
    selectedItems: function (val){
      this.$emit('input', val);
    }
  },
}
</script>
