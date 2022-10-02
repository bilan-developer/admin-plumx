<template>
    <v-list dense>
        <template v-for="(item, index) in items">
            <v-list-group v-if="item.group" :prepend-icon="item.icon" no-action :key="index">
                <template v-slot:activator>
                    <v-list-item class="pl-0">
                        <v-list-item-content><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content>
                    </v-list-item>
                </template>
                <v-list-item v-for="subItem in item.group" :key="subItem.title" :to="subItem.route" link>
                    <v-list-item-content><v-list-item-title>{{ subItem.title }}</v-list-item-title></v-list-item-content>
                </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="item.title" :to="item.route" link>
                <v-list-item-action><v-icon>{{ item.icon }}</v-icon></v-list-item-action>
                <v-list-item-content><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content>
            </v-list-item>
        </template>


        <v-list-item @click="logout">
            <v-list-item-action><v-icon>mdi-logout</v-icon></v-list-item-action>
            <v-list-item-content><v-list-item-title>Выход</v-list-item-title></v-list-item-content>
        </v-list-item>
    </v-list>
</template>
<script>

export default {
    name: 'sidebar-app',
    data() {
        return {
            items: [
                {icon: 'mdi-alpha-r-box-outline', title:'Rules', route:'/admin/entity/rules'},
                {icon: 'mdi-alpha-r-box', title:'Rules Boxes', route:'/admin/entity/rule-boxes'},
                {icon: 'mdi-account-box-multiple', title:'Partners', route:'/admin/entity/partners'},
                {icon: 'mdi-file-multiple', title:'Leads', route:'/admin/entity/leads'},
                {icon: 'mdi-rocket', title:'Conversions', route:'/admin/entity/conversions'},
                {icon: 'mdi-account-multiple', title:'Roles', route:'/admin/entity/roles'},
                {icon: 'mdi-account-multiple', title:'Users', route:'/admin/entity/users'},
                {icon: 'mdi-history', title:'Affiliate Histories', route:'/admin/entity/affiliate-histories'},
            ],
        };
    },
    methods: {
        logout(){
            this.auth.logout(this);
        }
    },
}
</script>