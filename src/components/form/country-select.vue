<template>
  <v-row>
    <v-col>
      <v-select
          v-model="selectedItems"
          :items="items"
          item-text="name"
          item-value="code"
          :label="label"
          multiple
          chips
          hint="Selected countries"
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
      items: [],
    }
  },
  created() {
    this.getCountries();
  },
  watch:{
    selectedItems: function (val){
      this.$emit('input', val);
    }
  },
  methods:{
    getCountries(){
      this.api.entity.get('countries', {order: 'asc'}).then(r => {
        this.items = r.data.data
      })
    }
  }
}
</script>
