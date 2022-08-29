<template>
  <v-row>
    <v-col>
      <v-select
          v-model="selectedItems"
          :items="items"
          :label="label"
          multiple
          chips
          hint="Selected language"
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
      items: ['en'],
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
      this.api.entity.get('countries').then(r => {
        let data = r.data.data.map(item => {
          return item.code.toLowerCase();
        });

        this.items.push(...data.sort())
      })
    }
  }
}
</script>
