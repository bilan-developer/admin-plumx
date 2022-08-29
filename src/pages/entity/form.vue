<template>
  <div class="page">
    <v-card :loading="loading">
      <v-card-title><span class="text-h5">{{ title }}</span></v-card-title>
      <v-card-text>
        <v-form ref="form" v-if="item">
          <v-container>
            <v-row>
              <v-col v-for="field in fields" :key="field.name" cols="12" :md="field.cols ?? 3">
                <div v-if="field.type === 'image'">
                  <v-img :src="item[field.name + '_preview']" max-height="250" max-width="350"></v-img>
                  <v-file-input v-model="item[field.name]" :label="field.label"></v-file-input>

                </div>
                <v-switch v-model="item[field.name]" :label="field.label" color="success" hide-details
                          v-if="field.type === 'switch'"></v-switch>
                <v-text-field v-model="item[field.name]" :label="field.label" :rules="field.rule ?? []"
                              v-if="field.type === 'string'"></v-text-field>
                <v-text-field v-model="item[field.name]" :label="field.label" :rules="field.rule ?? []"
                              v-if="field.type === 'number'" type="number"></v-text-field>
                <time-picker
                    v-if="field.type === 'time-picker'"
                    :rules="field.rule ?? []"
                    :label="field.label"
                    v-model="item[field.name]"
                >
                </time-picker>

                <v-textarea
                    v-model="item[field.name]"
                    solo
                    name="input-7-4"
                    :rules="field.rule ?? []"
                    :label="field.label"
                    v-if="field.type === 'textarea'"
                ></v-textarea>

                <country-select
                    v-model="item[field.name]"
                    :label="field.label"
                    v-if="field.type === 'country-select'"
                ></country-select>

                <day-select
                    v-model="item[field.name]"
                    :label="field.label"
                    v-if="field.type === 'day-select'"
                ></day-select>
                <language-select
                    v-model="item[field.name]"
                    :label="field.label"
                    v-if="field.type === 'language-select'"
                ></language-select>
                <datetime-picker
                    v-model="item[field.name]"
                    :label="field.label"
                    v-if="field.type === 'datetime'"
                ></datetime-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions v-if="item">
        <v-spacer></v-spacer>
        <router-link class="text-decoration-none" :to="{name:'entity', params:{entity: $route.params.entity}}">
          <v-btn color="blue darken-1" text>Отменить</v-btn>
        </router-link>


        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>

import crud from '@/directory/crud';
import TimePicker from '@/components/form/time-picker';
import DatetimePicker from '@/components/form/datetime-picker';
import CountrySelect from '@/components/form/country-select';
import DaySelect from '@/components/form/day-select';
import LanguageSelect from '@/components/form/language-select';

export default {
  name: "entity-form",
  components: {
    DatetimePicker,
    TimePicker,
    CountrySelect,
    DaySelect,
    LanguageSelect
  },
  data: () => ({
    loading: false,
    item: null,
  }),
  created() {
    this.getItem()
  },
  computed: {
    title: function () {
      return crud[this.$route.params.entity].title;
    },
    fields: function () {
      return crud[this.$route.params.entity].fields;
    },
  },
  methods: {
    getItem() {
      if (!this.$route.params.id) {
        this.item = crud[this.$route.params.entity].model;
        return;
      }

      this.loading = true;
      this.api.entity.show(this.$route.params.entity, this.$route.params.id).then(r => {
        this.item = r.data.data;
      }).finally(() => this.loading = false);
    },
    save() {
      if (!this.$refs.form.validate()) {
        this.$notify({group: 'foo', type: 'error', text: 'Fill in all required fields'});
        return;
      }
      this.loading = true;

      if (this.$route.params.id) {
        this.api.entity.update(this.$route.params.entity, this.$route.params.id, this.item).then(() => {
          this.$notify({group: 'foo', type: 'success', text: 'Data saved'});
          this.$router.push({name: 'entity', params: {entity: this.$route.params.entity}});
        }).finally(() => this.loading = false);
      } else {
        this.api.entity.save(this.$route.params.entity, this.item).then(() => {
          this.$notify({group: 'foo', type: 'success', text: 'Data saved'});
          this.$router.push({name: 'entity', params: {entity: this.$route.params.entity}});
        }).finally(() => this.loading = false);
      }


    },
  },
}
</script>
