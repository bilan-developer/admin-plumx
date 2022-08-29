<template>
    <div class="page">
        <v-data-table
            fixed-header
            height="800"
            class="overflow-x-auto"
            :loading="loading"
            :headers="headers"
            :items="items"
            :items-per-page.sync="limit"
            :page.sync="page"
            :search="search"
            :sort-by.sync="sort"
            :sort-desc.sync="sortDesc"
            :server-items-length="totalItems"
            :options.sync="options"
            v-if="serverRender"
        >
            <template v-slot:top>
                <v-toolbar flat>{{ title }}<v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Поиск"
                        single-line
                        hide-details
                    ></v-text-field>
                    <router-link class="text-decoration-none"  :to="{name:'entity-create', params:{entity: $route.params.entity}}">
                        <v-btn color="primary" dark class="ml-3">
                                Добавить
                        </v-btn>
                    </router-link>

                </v-toolbar>
<!--                <view-dialog :dialog="dialog"-->
<!--                             :item="showItem"-->
<!--                             @close="dialog = false"-->
<!--                             @update="getItems"-->
<!--                ></view-dialog>-->
                <dialog-confirm :isOpen="dialogDelete.isOpen"
                                @close="dialogDelete.isOpen = false"
                                @confirm="destroy"
                ></dialog-confirm>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <router-link class="text-decoration-none"  :to="{name:'entity-edit', params:{entity: $route.params.entity, id:item.id}}">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
                <v-icon small @click="openConfirm(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <v-data-table
            fixed-header
            height="800"
            class="overflow-x-auto"
            :loading="loading"
            :headers="headers"
            :items="items"
            :search="search"
            v-else
        >
          <template v-slot:top>
            <v-toolbar flat>{{ title }}<v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Поиск"
                  single-line
                  hide-details
              ></v-text-field>
              <router-link class="text-decoration-none"  :to="{name:'entity-create', params:{entity: $route.params.entity}}">
                <v-btn color="primary" dark class="ml-3">
                  Добавить
                </v-btn>
              </router-link>

            </v-toolbar>
            <!--                <view-dialog :dialog="dialog"-->
            <!--                             :item="showItem"-->
            <!--                             @close="dialog = false"-->
            <!--                             @update="getItems"-->
            <!--                ></view-dialog>-->
            <dialog-confirm :isOpen="dialogDelete.isOpen"
                            @close="dialogDelete.isOpen = false"
                            @confirm="destroy"
            ></dialog-confirm>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <router-link class="text-decoration-none"  :to="{name:'entity-edit', params:{entity: $route.params.entity, id:item.id}}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small @click="openConfirm(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
    </div>
</template>

<script>

import confirmDelete from '@/mixin/confirm-delete.js';
import crud from '@/directory/crud';


export default {
    name: "entity-index",
    mixins:[confirmDelete],
    data: () => ({
        dialog: false,
        search: null,
        loading: false,
        items: [],
        options: {},
        showItem: null,
        page: 1,
        totalItems: 0,
        limit: 15,
        sort: 'id',
        sortDesc: false,
    }),
    computed:{
        headers: function (){
            let data = crud[this.$route.params.entity].headers.slice();
            data.push({ text: '', value: 'actions', align:'right', sortable: false, width: "75px" });

            return data;
        },
        title: function (){
            return  crud[this.$route.params.entity].title;
        },
        serverRender: function (){
            return !!crud[this.$route.params.entity].serverRender;
        }
    },
    created () {
        this.getItems()
    },
    watch:{
      page(){
        this.builder();
      },
      search(val){
        if(val.length > 2 || !val){
          this.builder();
        }
      },
      limit(){
        this.builder();
      },
      sort(){
        this.builder();
      },
      sortDesc(){
        this.builder();
      }
    },
    methods: {
        clearData(){
            this.search = null;
        },
        builder(){
          if(!crud[this.$route.params.entity].serverRender){
            return;
          }

          let query = {
            page: this.page,
            search: this.search,
            limit: this.limit,
            sort: this.sort,
            order: this.sortDesc ? 'desc' : 'asc',
          }
          this.getItems(query);
        },
        getItems(query) {
            this.items = [];
            this.loading = true;
            this.api.entity.get(this.$route.params.entity, query).then(r => {
                this.items = r.data.data;
                this.totalItems = r.data.meta ? r.data.meta.total : this.items.length;
            }).finally(() => this.loading = false);
        },
        show(item){
            this.showItem = item;
            this.dialog = true;
        },
        destroy(){
            this.loading = true;
            this.dialogDelete.isOpen = false;
            this.api.entity.destroy(this.$route.params.entity, this.dialogDelete.id).then(() => {
                this.getItems();
            }).finally(() => this.loading = false);
        }
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.clearData()
        this.getItems()
    },

}
</script>
