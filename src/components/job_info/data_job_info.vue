<template>
  <div id="app" style=" padding-bottom:20px;  background-color:gray; height:100vh; ">
    <div class="container">
      <div class="card" style="margin-bottom:100px;">
        <h3 class="card-header card-primary no-margin">
          <span class="float-left" style="margin-right:20px;">ใบงาน</span>
          <button @click="route_change('creatework')" class="btn btn-success float-right">สร้างใบงาน</button>
          <div class="float-left">
            <select
              class="form-control"
              style="width:200px;"
              v-model="select_number"
              @change="change_page(select_number)"
            >
              <option value="page" selected>page</option>
              <option v-for="(item, index) in page_number" :key="index" >{{ item }}</option>
            </select>
          </div>
        </h3>

        <div class="card-body" style>
          <form>
            <div class="table-responsive">
              <table class="table table-hover" style="width:100%;">
                <thead>
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">หมายเลขใบงาน</th>
                    <th scope="col">เวลาเริ่มต้น</th>
                    <th scope="col">เวลาสิ้นสุด</th>
                    <th scope="col">เวลารวม</th>
                    <th scope="col">เวลาระยะทางรวม</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col">ลบ/แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in data_job_info"
                    :key="index"
                    v-if=" (index+1) > (page_current*select_number)-select_number && (index+1)  < (page_current*select_number+1)  "
                  >
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ item.job_no }}</td>
                    <td>
                      <span v-if="item.start_time==null">ไม่มีข้อมูล</span>
                      <span v-else>{{ item.start_time }}</span>
                    </td>
                    <td>
                      <span v-if="item.finish_time==null">ไม่มีข้อมูล</span>
                      <span v-else>{{ item.finish_time }}</span>
                    </td>
                    <td>
                      <span v-if="item.total_time==null">ไม่มีข้อมูล</span>
                      <span v-else>{{ item.total_time }}</span>
                    </td>
                    <td>
                      <span v-if="item.total_distance==null">ไม่มีข้อมูล</span>
                      <span v-else>{{ item.total_distance }}</span>
                    </td>
                    <td>{{ item["job_status.name"] }}</td>

                    <td>
                      <a href="#">
                        <span
                          class="fa fa-trash-alt"
                          @click="delete_work(item.id)"
                          style="margin-right:10px;"
                        ></span>
                        <span class="fa fa-edit" @click="route_change('update_job_info',item.id)"></span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>

          <nav aria-label="...">
            <ul class="pagination">
              <li class="page-item ">
                <a class="page-link" href="#"  @click="page_current =  (page_current-1)<1 ? page_current:--page_current">ก่อนหน้า</a>
              </li>
              <li  
                @click="page_current = item"
                :class=" {'page-item':true,'active':item==page_current } "
                v-for="(item, index) in Math.ceil(this.data_job_info.length/select_number)"
                :key="index"
              >
                <a class="page-link" href="#"  v-if="item<=10 && page_current <=5" >{{ item }}</a>
                <a class="page-link" href="#" v-if=" ( item >= (page_current - 4 ))  && item <= (page_current + 5) &&  page_current > 5 && item <= Math.ceil(data_job_info.length/select_number) "  >{{ item  }}</a>
              </li>
              
              <li class="page-item">
                <a class="page-link" href="#" @click="page_current = (page_current+1) > Math.ceil(data_job_info.length/select_number) ?  page_current:++page_current ">ถัดไป  </a>
              </li>
            </ul>
           
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: "Vue",
      db_select: "",
      page_number: [10, 20, 25, 100],
      select_number: 10,
      data_job_info: "",
      page_current: 1
    };
  },
  methods: {
    fn4(){
      this.page_current = 1;
    },
    change_page(number) {
      this.select_number = parseInt(number);
      this.page_current = 1;
    },
    route_change(name, id) {
      this.$router.push({ name: name, query: { id: id } });
    },
   async delete_work(id) {
      this.$swal({
        title: "ยืนยันลบใบงาน",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง"
      }).then(async result =>  {
        if (result.value) {
        await  axios({
            method: "delete",
            url: "http://178.128.27.207:10121/api/v1/job_info/" + id,
            headers: {
              "Content-Type": "application/json",
              "x-access-token": this.$cookie.get('token')
            }
          }).then(success => {
            console.log("success");
          });
          window
            .axios({
              method: "get",
              url: "http://178.128.27.207:10121/api/v1/job_info",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": this.$cookie.get('token')
              }
            })
            .then(success => {
              this.data_job_info = success.data.data;
            });
          this.$swal({
            type: "success",
            title: "ลบใบงานสำเร็จ",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    change_number() {}
  },
  computed: {},
  watch: {},
  props: [""],
  components: {},
  activated(){
        window
      .axios({
        method: "get",
        url: "http://178.128.27.207:10121/api/v1/job_info",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.$cookie.get('token')
        }
      })
      .then(success => {
        this.data_job_info = success.data.data;
      });
  },
  beforeUpdate() {
  },
  updated(){
  },
  created() {
    window
      .axios({
        method: "get",
        url: "http://178.128.27.207:10121/api/v1/job_info",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.$cookie.get('token')
        }
      })
      .then(success => {
        this.data_job_info = success.data.data;
      });
  },
  mixins: []
};
</script>


<style scoped>
</style>