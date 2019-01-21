<template>
  <div id="app">
    <div
      class="container scrolling-box"
      style="margin-top:30px;  margin-bottom:80px;  overflow: auto; "
    >
      <div class="card">
        <div class="card-header" style=" font-weight: bold;">
          แก้ไขใบงาน {{ data_update['job_no'] }}
          <button
            @click="change_route('data_job_info')"
            class="btn btn-primary float-right"
          >กลับ</button>
        </div>
        <div class="card-body">
          <center>
            <h3>ข้อมูลใบงาน</h3>
          </center>
          <hr>
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="inputAddress">หมายเหตุ</label>
              <label style="color:red;" v-show="remark_work==''&&notify_sent==true">*</label>
              <textarea
                :class="{'form-control':true,'notify_border':remark_work==''&&notify_sent==true}"
                cols="10"
                rows="5"
                v-model="remark_work"
              ></textarea>
            </div>

            <center>
              <h3>ข้อมูลจุดรับสินค้า</h3>
            </center>

            <hr>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">สถานที่</label>
                <label style="color:red;" v-show="first_way==''&&notify_sent==true">*</label>
                <select
                  :class="{'form-control':true,'notify_border':first_way==''&&notify_sent==true}"
                  v-model="first_way"
                >
                  <option value>เลือกสถานที่</option>
                  <option
                    :value="data_dcd.id"
                    v-for="(data_dcd, index) in distribution_center_data"
                    :key="index"
                  >{{ data_dcd.name }}</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">กำหนดเวลา</label>
                <label style="color:red;" v-show="first_deadline==''&&notify_sent==true">*</label>
                <input
                v-model="first_deadline"
                  id="deadline_read"
                  @blur="deadline_first({$event})"
                  :class="{'form-control':true,'notify_border':first_deadline==''&&notify_sent==true}"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="inputAddress">หมายเหตุ</label>
              <label style="color:red;" v-show="first_remark==''&&notify_sent==true">*</label>
              <textarea
                :class="{'form-control':true,'notify_border':first_remark==''&&notify_sent==true}"
                cols="30"
                v-model="first_remark"
                rows="5"
              ></textarea>
            </div>

            <center>
              <h3>
                จุดส่งสินค้า
                <a href="#" @click="sent_number++">
                  <!-- <span class="fa fa-plus-square" @click="plus_form()"></span> -->
                </a>
              </h3>
              <hr>
            </center>

            <div class="accordion" id="accordionExample">
              <div class="card" v-for="(item, index) in sent_number" :key="index">
                <div
                  class="card-header"
                  id="headingOne"
                  style="color:white; background-color:#4d4d4d;"
                >
                  <h5 class="mb-0">
                    <button
                      style="color:white;"
                      class="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      :data-target="['#collapseOne'+item]"
                      aria-expanded="true"
                      :aria-controls="['collapseOne'+index]"
                    >สถานที่ส่ง {{ item }}</button>
                    
                    <label
                      style="color:red;"
                      v-show="
                    (data_update['job_distribution_center'][index+1]['distribution_center_id']=='' || 
                    data_update['job_distribution_center'][index+1]['deadline_time']=='' ||
                    data_update['job_distribution_center'][index+1]['remark']=='') && notify_sent == true
                    "
                    >*</label>
                    <a href="javascript:void(0)">
                      <!-- <span
                        class="float-right fa fa-trash-alt"
                        v-show="index>0"
                        @click="delete_sent(index)"
                      ></span> -->
                    </a>
                  </h5>
                </div>
                <div
                  style="background-color:gray;"
                  :id="['collapseOne'+item]"
                  :class="{collapse:true,show:item==1}"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample">
                  <div class="card-body">
                    <span>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputEmail4">สถานที่ส่งสินค้า</label>
                          <label
                            style="color:red;"
                            v-show="data_update['job_distribution_center'][index+1]['distribution_center_id']=='' && notify_sent==true "
                          >*</label>
                          <select
                            class="form-control"
                            v-model="data_update['job_distribution_center'][index+1]['distribution_center_id']"
                          >
                            <option value>เลือกสถานที่</option>
                            <option
                              :value="location_item.id"
                              v-for="(location_item, index_location) in distribution_center_data"
                              :key="index_location"
                            >{{ location_item.name }}</option>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputPassword4">กำหนดเวลาส่ง</label>
                          <label
                            style="color:red;"
                            v-show="data_update['job_distribution_center'][index+1]['deadline_time']=='' && notify_sent==true "
                          >*</label>
                          <input
                            v-show="true"
                            class="form-control sent_product"
                            v-model="data_update['job_distribution_center'][index+1]['deadline_time']"
                            @blur="read_deadline({$event,index})"
                          >
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputAddress">หมายเหตุ</label>
                        <label
                          style="color:red;"
                          v-show="data_update['job_distribution_center'][index+1]['remark']=='' && notify_sent==true "
                        >*</label>
                        <textarea
                          class="form-control"
                          cols="30"
                          rows="5"
                          v-model="data_update['job_distribution_center'][index+1]['remark']"
                        ></textarea>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group"></div>
            <center>
              <div style="color:red; " v-show="notify_sent">
                <h4>กรุณากรอกข้อมูลให้ครบ</h4>
              </div>
              <a
                type="button"
                class="btn btn-primary"
                style=" margin-right:10px; width:15%;"
                @click="update_work()"
              >ตกลง</a>
            </center>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "Vue",
      time: new Date(),
      date3: "",
      distribution_center_data: "",
      sent_number:1 ,
      data_sent_product: [],
      distribution_center: "",
      notify_sent: false,
      remark_work: "",
      device_info: "",
      first_way: "",
      first_deadline: "",
      first_remark: "",
      data_update:"",
    };
  },

  updated() {
    $(".sent_product").datetimepicker({ format: "Y-m-d H:i:s" });
    $("#datepickerstart").datetimepicker({ format: "Y-m-d H:i:s" });
    $("#datepickerend").datetimepicker({ format: "Y-m-d H:i:s" });
    $("#deadline_read").datetimepicker({ format: "Y-m-d H:i:s" });
    $(".sent_product").datetimepicker({ format: "Y-m-d H:i:s" });
  },
  watch: {},
  methods: {
    deadline_first(event) {
      this.data_update['job_distribution_center'][0]['deadline_time'] = event.$event.target.value;
    },
    show() {
    },
    read_deadline(event) {
      this.data_update['job_distribution_center'][event.index+1]['deadline_time'] = event.$event.target.value;
    },
    plus_form() {
        console.log("plusform");
      $(".sent_product").datetimepicker({ format: "d/m/Y H:i" });
       this.data_update['job_distribution_center'].push({
        distribution_center_id: "",
        deadline_time: "",
        remark: "",
        order_number: this.data_sent_product.length + 2,
        status_id: 2,
        distribution_center_type_id: 2
      });
    },
    delete_sent(index) {
      this.sent_number--;
      this.data_update['job_distribution_center'].splice(index+1, 1);
      console.log(this.data_update['job_distribution_center']);
    },
    change_route(data) {
      this.$router.push({ name: data });
    },

    async  update_work() {
      for (let x = 0; x < this.data_update['job_distribution_center'].length; x++) {
        var distribution_center = this.data_update['job_distribution_center'][x]['distribution_center_id'];
        var deadline = this.data_update['job_distribution_center'][x]['deadline_time'];
        var remark = this.data_update['job_distribution_center'][x]['remark'];

        if (
          distribution_center == "" ||
          deadline == "" ||
          remark == "" ||
          this.remark_work == "" ||
          this.first_way == "" ||
          this.first_deadline == "" ||
          this.first_remark == ""
        ) {
          this.notify_sent = true;
          break;
        } else {
          if (x + 1 == this.data_update['job_distribution_center'].length) {
            this.notify_sent = false;
            var job_distribution_center = [];
            job_distribution_center.push({
              distribution_center_id: this.first_way,
              distribution_center_type_id: 1,
              deadline_time: this.first_deadline,
              remark: this.first_remark,
              order_number: 1,
              status_id: 1,
              job_status_id:1,
              is_delete:false,
              id:this.data_update['job_distribution_center'][0]['id']
            });
            for (let x = 1; x < this.data_update['job_distribution_center'].length; x++) {
              job_distribution_center.push({
                distribution_center_id: this.data_update['job_distribution_center'][x]['distribution_center_id'],
                distribution_center_type_id: 2,
                deadline_time: this.data_update['job_distribution_center'][x]['deadline_time'],
                remark: this.data_update['job_distribution_center'][x]['remark'],
                order_number: x + 2,
                status_id:this.data_update['job_distribution_center'][x]['status_id'],
                //  is_delete:true,
                job_status_id:1,
                id:this.data_update['job_distribution_center'][x]['id']
              });
            }
            var sent_success = {
              user_id: parseInt(this.$cookie.get("id")),
              remark: this.remark_work,
              job_distribution_center: job_distribution_center
            };
                  this.$swal({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then(async result =>  {
                    if (result.value) {
                      axios({
                        method: "put",
                        url: "http://178.128.27.207:10121/api/v1/job_info/"+this.$route.query.id,
                        data: sent_success,
                        headers: {
                          "Content-Type": "application/json",
                          "x-access-token": this.$cookie.get('token')
                        }
                      }).then(success => {
                      });
                    await this.$swal({
                                      type: 'success',
                                      title: 'Your work has been saved',
                                      showConfirmButton: false,
                                      timer: 1500
                                    });
                    this.$router.push({name:"data_job_info"});
                    }
                  });
          }
        }
      }

    }
  },
  computed: {},
  props: [""],
  components: {},
  created() {
 
    axios({
      method: "get",
      url: "http://178.128.27.207:10121/api/v1/device_info",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.$cookie.get('token')
      }
    })
      .then(success => {this.device_info = success.data.data;})
      .catch(error => {console.log(error);});

    axios({
      method: "get",
      url: "http://178.128.27.207:10121/api/v1/distribution_center",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.$cookie.get('token')
      }
    }).then(success => {
      this.distribution_center_data = success.data.data;
    });
    axios({
    method: 'get',
    url: 'http://178.128.27.207:10121/api/v1/job_info/'+this.$route.query.id,
    headers:{
    'Content-Type': 'application/json',
    'x-access-token':this.$cookie.get('token')
    },
    }).then((success)=>{ 
        this.data_update = success.data.data;
        console.log(this.data_update['job_distribution_center'].length);
        this.sent_number = this.data_update['job_distribution_center'].length-1;
        this.remark_work = this.data_update['remark'];
        this.first_way = this.data_update['job_distribution_center'][0]['distribution_center_id'];
        this.first_deadline = this.data_update['job_distribution_center'][0]['deadline_time'];
        this.first_remark = this.data_update['job_distribution_center'][0]['remark'];
        console.log(this.data_update);

    });
  },
  mounted() {
    console.log("mounted");
  },

  mixins: []
};
</script>


<style scoped>
.notify_border {
  border-style: solid;
  border-color: red;
}
</style>