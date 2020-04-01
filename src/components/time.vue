<template>
    <div class="panel">
        <h4 class="text-center">当前时间：{{time}}</h4>
    </div>
</template>

<script>
export default {
    data(){
        return{
            time: new Date(),
        }
    },
    mounted() {
        var that = this;
        this.timer = setInterval(function(){
            that.time = new Date()
        },1000);
    },
    beforeDestroy (){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
}
</script>

<style lang="css">
</style>
