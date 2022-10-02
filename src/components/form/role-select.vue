<template>
  <v-row>
    <v-col>
      <v-select
          v-model="selectedItems"
          :items="items"
          item-text="name"
          item-value="id"
          :label="label"
          multiple
          chips
          hint="Selected role"
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
      selectedItems: this.value ? this.value.map(i => i.id) : [],
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  watch:{
    selectedItems: function (val){
      this.$emit('input', val);
    }
  },
  methods:{
    getItems(){
      this.api.entity.get('roles', {order: 'asc'}).then(r => {
        this.items = r.data.data;
        this.$emit('input', this.selectedItems);
      })
    }
  }
}
</script>
