<template>
    <v-dialog v-model="dialog" max-width="700px">
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
                <v-btn color="blue darken-1" text @click="confirm">Удалить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        isOpen:{
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Вы уверены?'
        }
    },
    data() {
        return {
            dialog: false,
        }
    },
    watch: {
        isOpen(val) {
            this.dialog = val;
        },
        dialog(val) {
            if(!val) this.close();
        },
    },
    methods: {
        close() {
            this.$emit('close')
        },
        confirm() {
            this.$emit('confirm')
        },
    },
}
</script>