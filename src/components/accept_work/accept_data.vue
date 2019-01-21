<template>
    <div id='app' >
        <div class="block-left" style="overflow-y: scroll;  " >
            <div style="background-color:#4d4d4d;  height:7vh; margin: auto; padding-top:13px; text-align:center;">  
                Navbar
            </div>
            <div
            v-for="(item, index) in 20" :key="index" 
            style="background-color:white;  width:100%; color:black; font-weight: bold;  ">
              <div style="margin-top:10px; text-align:center;  " >
               <span>   29/11/2018 </span>
               <span style="margin-left:20px;">  16 นาฬิกา 45 นาที </span>
              </div>
              <hr>
              <div style="text-align:center;">
                  ใบงานเลขที่7677TOEI39  
                   <span class="fa fa-arrow-alt-circle-down "  style="margin-left:5px;"></span>
              </div>
              <div style="text-align:center; margin-bottom:50px;">
                   <div style="margin-top:10px;">
                        <span class="fa fa-home "  style=""></span> จุดรับสินค้า 
                    </div>
                   <div style="margin-top:10px;" v-for="(item, index) in 5" :key="index">
                        <span class="fa fa-map-marker-alt "  style=" ">
                            จุดรับสินค้าที่ {{ item }}
                        </span>
                   </div>
              </div>
              <hr style="height:5px;">
            </div>                
        </div>
        <div class="block-right">
            <div id="map_div" style="height:100vh;"></div>
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
        methods:   { },
        computed:  { },
        watch:     { },
        props:     [''],
        components:{ },
        mounted()  {
            console.log("mounted")


/*
 * declare map as a global variable
 */
 var map;

/*
 * use google maps api built-in mechanism to attach dom events
 */
google.maps.event.addDomListener(window, "load", function () {
console.log("googlempa");
  /*
   * create map
   */
  var map = new google.maps.Map(document.getElementById("map_div"), {
    center: new google.maps.LatLng(33.808678, -117.918921),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  /*
   * create infowindow (which will be used by markers)
   */
  var infoWindow = new google.maps.InfoWindow();

  /*
   * marker creater function (acts as a closure for html parameter)
   */
  function createMarker(options, html) {
    var marker = new google.maps.Marker(options);
    if (html) {
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html);
        infoWindow.open(options.map, this);
      });
    }
    return marker;
  }

  /*
   * add markers to map
   */
  var marker0 = createMarker({
    position: new google.maps.LatLng(33.808678, -117.918921),
    map: map,
    icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
  }, "<h1>Marker 0</h1><p>This is the home marker.</p>");

  var marker1 = createMarker({
    position: new google.maps.LatLng(33.818038, -117.928492),
    map: map
  }, "<h1>Marker 1</h1><p>This is marker 1</p>");

  var marker2 = createMarker({
    position: new google.maps.LatLng(33.803333, -117.915278),
    map: map
  }, "<h1>Marker 2</h1><p>This is marker 2</p>");
});


         },
        mixins:    [ ],
}
</script>
<style scoped>
hr {
    border: none;
    height: 1px;
    /* Set the hr color */
    color: #333; /* old IE */
    background-color: #333; /* Modern Browsers */
}
 .block-left{
  width:25%;
  height:100vh;
  background-color:white;
  float:left;
  color:white;
}
.block-right{
  width:75%;
  height:100vh;
  background-color:gray;
  float:left;
}

/* MEDIA QUERIES FOR 545px <= Resolutions */ 


</style>