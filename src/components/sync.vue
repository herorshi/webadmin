<template>
    <div id='app'>
        <button @click='fn1()' class='btn btn-primary'>Click</button>
            {{ val }}
    </div>
</template>


<script>
    export default
{
        data(){
                return{ 
                        name:'syncx',
                        color:'color'
                        
                      };
             },
        methods:   { 
            fn1(){
                 this.$emit('update:val',this.val+1) 
            }

        },
        computed:  { },
        watch:     { },
          props: ['val'],
        components:{ },
        mounted()  { },
        mixins:    [ ],
}
</script>


<style scoped>
    
</style>