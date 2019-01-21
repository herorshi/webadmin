<template>
    <div id='app' style=" height:100vh; " v-on:scroll="fn1()">
        <div   class="container" style="padding-top:20px; padding-bottom:20px;">
<div class="card" style="">
  <div class="card-body" >
    <h5 class="card-title">เลือกข้อมูล</h5>
  <multiselect  v-model="value" :options="options" label="name"></multiselect>
  {{valueaws}}
  </div>
</div>
        </div>
      <router-view></router-view>
    </div>
</template>


<script>
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)
    export default
{
        data(){
                return{ 
                        name:'Vue',
                        manage_db:'',
                        value: null,
                        options:[
                                { name: 'ใบงาน', value: 'data_job_info' },
                                { name: 'ผู้ใช้งาน', value: 'data_job_info2' },
                                { name: 'อุปกรณ์', value: 'data_job_info3' },
                                ]
                      };
             },
        methods:   { 
            fn1(){
                console.log("fn1");
            },
            fntest(){
                
             console.log(this.$cookie.get('username'));
            },
            change_route(){
              if(this.manage_db!='')  this.$router.push({name:this.manage_db});
            }
        },
        computed:  { 
            valueaws(){           
                if (this.value!=null)this.$router.push({name:this.value.value});
            }
        },
        watch:     { },
        props:     [''],
        components:{ Multiselect },
        mounted()  { },
        mixins:    [ ],
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    
</style>