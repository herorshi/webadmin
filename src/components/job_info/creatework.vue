<template>
  <div id="app" >
    <div 
      class="container scrolling-box"
      style="margin-top:30px;  margin-bottom:80px;  overflow: auto; "
    >
      <div class="card">
        <div class="card-header" style=" font-weight: bold;">
          สร้างใบงาน
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
                <label for="inputEmail4">สถานที่รับสินค้า</label>
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
                  <span class="fa fa-plus-square" @click="plus_form()"></span>
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
                    (data_sent_product[index]['distribution_center_id']=='' || 
                    data_sent_product[index]['deadline_time']=='' ||
                    data_sent_product[index]['remark']=='') && notify_sent == true
                    "
                    >*</label>
                    <a href="javascript:void(0)">
                      <span
                        class="float-right fa fa-trash-alt"
                        v-show="index>0"
                        @click="delete_sent(index)"
                      ></span>
                    </a>
                  </h5>
                </div>
                <div
                  style="background-color:gray;"
                  :id="['collapseOne'+item]"
                  :class="{collapse:true,show:item==1}"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <span>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputEmail4">สถานที่ส่งสินค้า</label>
                          <label
                            style="color:red;"
                            v-show="data_sent_product[index]['distribution_center_id']=='' && notify_sent==true "
                          >*</label>
                          <select
                            class="form-control"
                            v-model="data_sent_product[index]['distribution_center_id']"
                          >
                            <option value>เลือกสถานที่</option>
                            <option
                               v-if = "location_item.id!=first_way"
                              :value = "location_item.id"
                              v-for="(location_item, index_location) in distribution_center_data"
                              :key="index_location"
                            >{{ location_item.name }}</option>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputPassword4">กำหนดเวลาส่ง</label>
                          <label
                            style="color:red;"
                            v-show="data_sent_product[index]['deadline_time']=='' && notify_sent==true "
                          >*</label>
                          <input
                            v-show="true"
                            class="form-control sent_product"
                            @blur="read_deadline({$event,index})"
                          >
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputAddress">หมายเหตุ</label>
                        <label
                          style="color:red;"
                          v-show="data_sent_product[index]['remark']=='' && notify_sent==true "
                        >*</label>
                        <textarea
                          class="form-control"
                          cols="30"
                          rows="5"
                          v-model="data_sent_product[index]['remark']"
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
                @click.prevent="create_work()"
              >ตกลง</a>
            </center>
              <!-- <input type='text' class='form-control'   > -->
              <!-- <form   v-on:submit.prevent> -->
              <!-- <a   href="#" @click.stop.prevent="fn1" class='btn btn-primary'>Click</a> -->
              <!-- <button type="submit" @click='fn1()' class='btn btn-primary'>Click</button>
            </form> -->
            <!-- <input type='text' class='form-control' v-model.lazy='name'> -->
            <!-- <input type='number' class='form-control' v-model.number='name' > -->
            <!-- <input type='text' class='form-control' v-model.trim='name'>
            {{ name }} -->
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
      sent_number: 1,
      data_sent_product: [],
      data_sent_product2: new Array(),
      distribution_center: "",
      notify_sent: false,
      remark_work: "",
      device_info: "",
      first_way: "",
      first_deadline: "",
      first_remark: "",
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
    fn1(){
      console.log("fn1");
    },
    deadline_first(event) {
      console.log(event.$event.target.value);
      this.first_deadline = event.$event.target.value;
    },
    show() {
      console.log(this.data_sent_product);
    },
    read_deadline(event) {
      console.log(event.$event.target.value, event.index);
      this.data_sent_product[event.index]["deadline_time"] =
        event.$event.target.value;
    },
    plus_form() {
      $(".sent_product").datetimepicker({ format: "d/m/Y H:i" });
      this.data_sent_product.push({
        distribution_center_id: "",
        deadline_time: "",
        remark: "",
        order_number: this.data_sent_product.length + 2,
        status_id: 2,
        distribution_center_type_id: 2,
        
      });
      this.sent_number;
      console.log(this.data_sent_product);
    },
    delete_sent(index) {
      console.log(index);
      console.log(this.data_sent_product);
      this.sent_number--;
      this.data_sent_product.splice(index, 1);

      console.log(this.data_sent_product);
    },
    change_route(data) {
      this.$router.push({ name: data });
    },
  async  create_work() {
      console.log(this.data_sent_product);
      for (let x = 0; x < this.data_sent_product.length; x++) {
        var distribution_center = this.data_sent_product[x][
          "distribution_center_id"
        ];
        var deadline = this.data_sent_product[x]["deadline_time"];
        var remark = this.data_sent_product[x]["remark"];

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
          console.log("error");
          break;
        } else {
          if (x + 1 == this.data_sent_product.length) {
            this.notify_sent = false;
            var job_distribution_center = [];
            job_distribution_center.push({
              distribution_center_id: this.first_way,
              distribution_center_type_id: 1,
              deadline_time: this.first_deadline,
              remark: this.first_remark,
              order_number: 1,
              status_id: 1
            });
            for (let x = 0; x < this.data_sent_product.length; x++) {
              job_distribution_center.push({
                distribution_center_id: this.data_sent_product[x]['distribution_center_id'],
                distribution_center_type_id: 2,
                deadline_time: this.first_deadline,
                remark: this.data_sent_product[x]['remark'],
                order_number: x + 2,
                status_id: this.data_sent_product[x]['status_id']
              });
            }
            console.log(this.data_sent_product);
            
            var sent_success = {
              user_id: parseInt(this.$cookie.get("id")),
              remark: this.remark_work,
              job_distribution_center: job_distribution_center
            };
            console.log(sent_success);
                  this.$swal({
                    title: "ยืนยันสร้างใบงาน",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ตกลง"
                  }).then(async result =>  {
                    if (result.value) {
                      axios({
                        method: "post",
                        url: "http://178.128.27.207:10121/api/v1/job_info",
                        data: sent_success,
                        headers: {
                          "Content-Type": "application/json",
                          "x-access-token": this.$cookie.get('token')
                        }
                      }).then(success => {
                        console.log(success, "success");
                      });
                    await  this.$swal({
                                      type: 'success',
                                      title: 'สร้างใบงานสำเร็จ',
                                      showConfirmButton: false,
                                      timer: 1500
                                });
                    this.$router.push({name:"data_job_info"});
                    console.log("success");
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
    this.data_sent_product.push({
      distribution_center_id: "",
      deadline_time: "",
      remark: "",
      order_number: 2,
      status_id: 2,
      distribution_center_type_id: 2
    });
    console.log(this.data_sent_product);
    axios({
      method: "get",
      url: "http://178.128.27.207:10121/api/v1/device_info",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.$cookie.get('token')
      }
    })
      .then(success => {
        this.device_info = success.data.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios({
      method: "get",
      url: "http://178.128.27.207:10121/api/v1/distribution_center",

      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.$cookie.get('token')
      }
    }).then(success => {
      this.distribution_center_data = success.data.data;
      console.log(this.distribution_center_data);
    });
    var self = this;
    $("#datepickerstart").datetimepicker({ format: "d/m/Y H:i" });
    $("#datepickerend").datetimepicker({ format: "d/m/Y H:i" });
    $("#deadline_read").datetimepicker({ format: "d/m/Y H:i" });
    $(".sent_product").datetimepicker({ format: "d/m/Y H:i" });
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