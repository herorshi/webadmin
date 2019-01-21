<template >
  <div id='app'    style="width:100%;height:100vh;    overflow-y: scroll; display: block;  position:static; background:gray; "  >
   <nav class="navbar navbar-expand-sm      navbar-dark bg-dark  "  >
   <a class="navbar-brand"  href="#"   @click="route_change('manage_data')"  > บริหารข้อมูล </a>
  <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse  " id="navbarText">
    <ul class="navbar-nav mr-auto">
      <!-- <li class="nav-item active navbar-brand">
        <a class="nav-link" href="#" @click="route_change('accept_data')">ตอบรับใบงาน <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active navbar-brand">
        <a class="nav-link active" href="#">ปิดใบงาน</a>
      </li>
      <li class="nav-item active navbar-brand">
        <a class="nav-link" href="#"  @click="route_change('home')"   >  Home  </a>
      </li> -->
    </ul>
    <span class="navbar-text active" style="color:white;">{{  this.$cookie.get('username') }}</span>
       <a class="navbar-text active "  @click="exit_admin()" href="#" style="color:white; margin-left:20px; ">ออกจากระบบ</a>
  </div>
</nav>
<router-view  ></router-view>
  <footer>
    <span id="x1" class= "vertical-center">
    Web Admin
    </span>
  </footer>
  
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

      route_change(path){
        this.$router.push({name:path})
      },
      exit_admin(){
          this.$swal({
  title: 'ยืนยันออกจากระบบ?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
        this.$cookie.delete('username');
        this.$router.push({name:'login'});
  }
})

      }

     },
    computed:  { },
    watch:     { },
    props:     [''],
    components:{ },
    mounted()  { if(this.$cookie.get('username')==null) this.$router.push({name:'login'});},
    mixins:    [ ],
}
</script>


<style scoped>

.scrolling-box {

 
}

footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:60px;   /* Height of the footer */
   background:#343a40;
   font-weight: bold;
   color:white;
   text-align: center;
  

   
}
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: red;
   color: white;
   text-align: center;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.centerx {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1000px;
  height: 100px;

  border-radius: 3px;
}
</style>