<template>
    <div id='app'>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>


<script>
    export default
{
        data(){
                return{ 
                        name:'Vue'
                      };
             },
        methods:   { 



        },
        computed:  { },
        watch:     { },
        props:     [''],
        components:{ },
        mounted()  { },
        mixins:    [ ],
}
</script>


<style scoped>
    
</style>