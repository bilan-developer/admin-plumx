import dialogConfirm from '@/components/app/dialog-confirm';

export default {
    components:{
        dialogConfirm
    },
    data: () => ({
        dialogDelete:{
            isOpen:false,
            id: null,
        },
    }),
    methods: {
        openConfirm(item){
            this.dialogDelete.id = item.id;
            this.dialogDelete.isOpen = true;
        },
    }
}