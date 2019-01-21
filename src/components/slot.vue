<template>
    <div id='app'>
        
        <ul>
            <li v-for="(item, index) in items" :key="index">
                
            </li>
        </ul>
        <slot :item="item" foo="thing" name2="metasit"></slot>
    </div>
</template>


<script>
    export default
{
        data(){
                return{ 
                        name:'Vue',
                        family:'family'
                      };
             },
        methods:   { },
        computed:  { },
        watch:     { },
        props:     ['items'],
        components:{ },
        mounted()  { },
        mixins:    [ ],
}
</script>


<style scoped>
    
</style>