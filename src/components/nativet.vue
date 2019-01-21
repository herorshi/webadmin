<template>
    <div id='app'>
    <label>
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('ev', $event.target.value)"
  >
</label>
<select  class='form-control'>
    <option value=''>choose</option>
</select>
    </div>
</template>


<script>
    export default
{
        data(){
                return{ 
                        name:'Vue',
                        value:1234,
                        label:'label'
                      };
             },
        methods:   { 
            onFocus(){
                console.log("onFocus3");
            },
          
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