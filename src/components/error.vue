<template>
    <div id='app' style="background:gray; height:100vh; width:100%;">
     <div class=" " style="position:relative;  top:40%;">
          <div class="container">
         <div class="row" >
  <div class="col-sm-6  offset-sm-3" >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:red;">ERROR</h5>
        <p class="card-text" style="text-align:center; color:red;">ไม่สามารถเข้าถึงระบบได้</p>
        <div class="col-sm-6 offset-sm-5 col-xs-6 offset-xs-5">
            <button @click='redircet_next()' class='btn btn-primary'>ตกลง</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
     </div>
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
            redircet_next(){
                this.$router.push({name:'login'});
            }
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