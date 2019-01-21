<template>
    <div id='app'  style=" height:100vh; background:gray;      " >
        <div class="card" style="
        width:50%;
        top:30%;  
        position:relative;
        margin:auto;
        " >
  <div class="card-body">
      <h3 style="text-align:center;">Login Admin</h3>
      <hr>
  <form v-on:submit.prevent>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-5 col-form-label">Username</label>
    <div class="col-sm-7">
      <input type="email"  v-on:keydown="user_press()" class="form-control" id="inputEmail3" v-model="username" placeholder="Username">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-5 col-form-label">Password</label>
    <div class="col-sm-7">
      <input type="password" class="form-control" id="inputPassword3" v-model="password" placeholder="Password">
    </div>
  </div>

  <div class="row">
    <div class="col-sm-7 offset-sm-5  col-xs-7 offset-xs-5"  >
      <button type="button" class="btn btn-primary center-block" @click="login_admin()" > LOG IN</button>
    </div>
    <div class="col-sm-7 offset-sm-3"  style="    font-weight:bold; color:red;" v-show="check">Username หรือ Password ไม่ถูกต้อง</div>
  </div>
</form>
<!-- <baseinput v-on:click.native="onFocus" @ev="fn2()"></baseinput> -->

 <!-- <sync  :val.sync="usercount"></sync>
 {{ usercount }}
 <br/> -->
<!-- <slotx  :items="['one','two','tree']">
    <template scope="ax">
            <h2 v-text="ax.foo"></h2>
    </template>
</slotx> -->
         <!-- Submitxxx
<br><br><br>
 <span slot="header">
    Metasit     
</span> -->


 
 
  </div>
</div>
    </div>
</template>


<script>
import baseinput from '../components/nativet.vue'
import sync from '../components/sync.vue'
import slotx from '../components/slot.vue'
import axios from 'axios'
    export default
{
        data(){
                return{ 
                        name:'Vue',
                        username:'',
                        password:'',
                        check:false,
                        usercount:5
                        
                      };
             },
        methods:   {
            fn2(){
                console.log(event.target.value);
            },
            onFocus(event){
                console.log("onFocus2");
                console.log(event);
            },
            user_press(){
                this.check = false;
            },
            login_admin(){
                this.$cookie.get('name')
                axios({
                method: 'post',
                url: 'http://178.128.27.207:10121/api/v1/user/auth',
                data:{
                    	"username": this.username,
	                    "password": this.password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOCwidXNlcl90eXBlIjpbeyJ1c2VyX3R5cGVfaWQiOjF9XSwiaWF0IjoxNTQ3NDM3MDg5LCJleHAiOjE1NDc1MjM0ODl9.cbi_NhdEoClaPs_Dq80mrDbQc66lUGjO28SZvP_01P0"
                }
                
                })
                .then((success)=>{ 
                    if(success.data.status=="success") {
                        
                        // console.log(success.data.data.id);        
                        this.$cookie.set('username', this.username);
                        this.$cookie.set('id',success.data.data.id );
                        this.$cookie.set('token',success.data.data.token )
                        // window.token = success.data.data.token;
                        // console.log(success.data.data.token);
                        // console.log(this.$cookie.get('username'));
                        this.$router.push({name:'home'});
                    }else {
                        console.log(success.data.status);
                        this.check = true;
                        this.username = "";
                        this.password = "";
                    }                    

                    });



            }
         },
        computed:  { },
        watch:     { },
        props:     [''],
        components:{ baseinput:baseinput,sync:sync ,slotx:slotx },
        mounted()  {},
        mixins:    [ ],
}
</script>


<style scoped>
    
</style>