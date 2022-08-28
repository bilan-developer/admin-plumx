<template>
    <v-menu ref="menu"
        v-model="openDatePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="dateRangeText"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="dates" range no-title :max="max" locale="ru" :first-day-of-week="1"></v-date-picker>
    </v-menu>
</template>

<script>

import moment from 'moment';
export default {
    data: () => ({
        dates: [],
        max: null,
        openDatePicker: false,
    }),
    computed: {
        dateRangeText () {
            return this.dates.join(' - ')
        },
    },
    mounted() {
        this.max = moment().format('YYYY-MM-DD');
        this.dates = [
            moment().subtract(1,'M').format('YYYY-MM-DD'),
            moment().format('YYYY-MM-DD')
        ];
        this.$emit('input', this.dates);
    },
    watch:{
        openDatePicker: function (val){
            if(!val) this.$emit('input', this.dates);
        }
    }
}
</script>
