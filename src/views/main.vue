<template>
  <section class="main-container">
    <div class="time-line">
      {{ time }}
    </div>
    <v-progress-linear :value="timeVal" buffer-value="300" color="#ff4d56" background-color="#f4f4f4"></v-progress-linear>
    <div class="dividing">
      <section class="member-manage">
        <!-- 컨테이너 하단에 갈 경우 이 섹션과 같은 level에서 만들어야 한다. -->
        <section class="member-list section-box">
          <div class="square-container">
            <square titled="씨앗적립" :total="totalTodal" :month="totalMonth" :day="totalDay"></square>
            <square titled="씨앗후원" :total="donationTodal" :month="donationMonth" :day="donationDay"></square>
          </div>
          <!--div class="store-traffic-container mt10"></div-->
        </section>
      </section>
      <section class="righs">
        <div class="d-flex mt10" style="height: 135px">
          <rectangle :naming="dataName" titled="회원현황" status="member" :info="userInfoArr" class="mr10"></rectangle>
          <rectangle :naming="dataName2" titled="크리에이터 등록" :info="creatorArr" class="mr10"></rectangle>          
          <rectangle :naming="dataName3" titled="콘탠츠 등록" :info="contentsArr"></rectangle>
        </div>
        <!--div class="store-traffic-container mt10">
          <h2>1:1 문의 <span></span></h2>
          <div class="store-traffic-wrap">
            <div class="tbl-wrap">
              <table class="tbl user-list-tbl">
                <colgroup>
                  <col width="70" />
                  <col width="*" />
                  <col width="60" />
                </colgroup>
                <thead>
                  <tr>
                    <th>고유코드</th>
                    <th class="left">제목</th>
                    <th class="right pr10">답변여부</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in sensorList" :key="idx">
                    <td>{{ item.id }}</td>
                    <td class="left">{{ item.name }}</td>
                    <td class="right">{{ item.cnt }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="sensorList.length < 1">
                  <tr>
                    <td colspan="3">항목이 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div-->
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </div>
  </section>
</template>

<script>
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Square from "@/components/form/Square";
import Rectangle from "@/components/form/Rectangle";
export default {
  components: {
    Square,
    Rectangle,
    alim,
  },
  mixins: [alimMixin, loading],
  data() {
    return {
      content: "",
      time: "",
      dataName: ["회원가입수", "휴먼/탈퇴 (누적)", "DAY", "휴면계정", "누적", "탈퇴 계정"],
      dataName2: ["전체", "신청", "승인", "종료"],
      dataName3: ["전체", "승인대기", "승인", "승인불가"],
      userInfoArr: ["", "", 0, 0, 0, 0],
      creatorArr: [0, 0, 0, 0, "", ""],
      contentsArr: [0, 0, 0, 0, "", ""],
      totalTodal: 0,
      totalMonth: 0,
      totalDay: 0,
      donationTodal: 0,
      donationMonth: 0,
      donationDay: 0,
      videoTodal: 0,
      videoMonth: 0,
      videoDay: 0,
      sensor: {},
      sensorObj: {},
      sensorList: [],
      stat: "",
      timeVal: 0,
    };
  },
  computed: {
    ...mapGetters("menu", ["dashBoard"]),
  },
  watch: {
    timeVal(val) {
      if (Math.floor(val) > 100) {
        this.getDashBoard();
      }
    },
  },
  mounted() {
    this.getDashBoard();
    this.getDay();
    setInterval(this.getDay.bind(this), 1000);
    setInterval(this.timeIncrease.bind(this), 1000);
  },
  methods: {
    send() {
      let frag = document.createElement("div");
      frag.innerHTML = this.content;
      let items = [...frag.querySelectorAll("img")].filter((img) => img.getAttribute("src").startsWith("data")).map((img) => img.getAttribute("src"));
      let fileList = [];
      items.forEach((imgBase64, index) => {
        // const formData = new FormData();
        // const file = this.DataURIToBlob(imgBase64);
        // formData.append('upload', file, 'image.jpg');
        // formData.append('profile_id', this.profile_id); //other param
        // formData.append('path', 'temp/'); //other param
        // fileList.push(formData);

        //fileList.push(this.DataURIToBlob(imgBase64));
        fileList.push(this.dataURLtoFile(imgBase64, index));
      });
    },
    // DataURIToBlob(dataURI) {
    // 	const splitDataURI = dataURI.split(',');
    // 	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    // 	const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    // 	const ia = new Uint8Array(byteString.length);
    // 	for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    // 	return new Blob([ia], { type: mimeString });
    // },
    dataURLtoFile(dataurl, fileName) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    },
    async getDashBoard() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/DASHBOARD");
        const res       = this.dashBoard.nextmApiResult.dashboard;

         this.totalTodal = res.seedInfo.total.total;
         this.totalMonth = res.seedInfo.total.month;
         this.totalDay   = res.seedInfo.total.day;
         this.donationTodal = res.seedInfo.donation.total;
         this.donationMonth = res.seedInfo.donation.month;
         this.donationDay   = res.seedInfo.donation.day;

         const user      = res.userInfo;         
         this.userInfoArr = ["", "", user.dayUser, user.dormancyUser, user.totalUser, user.withdrawalUser];

         const creator      = res.creatorInfo;         
         this.creatorArr = [creator.creatorTotal, creator.creatorAfter, creator.creatorStart, creator.creatorEnd, "", ""];         

         const content      = res.contentInfo;         
         this.contentsArr = [content.total, content.before, content.approval, content.sorry, "", ""];         


        // this.videoTodal = res.buyInfo.video.total;
        // this.videoMonth = res.buyInfo.video.month;
        // this.videoDay   = res.buyInfo.video.day;
        // this.sensorObj  = res.wiInfo.count;
        // this.sensor     = res.wiInfo.list;

        // const store     = res.storeInfo;

        // this.stat       = "total";
        // this.sensorList = [...this.sensor.active, ...this.sensor.down, ...this.sensor.warning, ...this.sensor.in_progress];
        // this.storeArr   = [
        //   store.companyStoretotal,
        //   store.companyStoreAfter,
        //   store.companyStoreStart,
        //   store.companyStoreEnd,
        //   store.companyStoreErr,
        //   store.companyStoreHold,
        // ];
        this.timeVal = 0;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    getDay() {
      dayjs.locale("ko");
      this.time = dayjs().format("YYYY. MM. DD. dddd. HH:mm:ss");
    },
    timeIncrease() {
      this.timeVal += 0.2;
    },
    view(status) {
      switch (status) {
        case "total":
          this.stat = "total";
          this.sensorList = [...this.sensor.active, ...this.sensor.down, ...this.sensor.warning, ...this.sensor.in_progress];
          break;
        case "active":
          this.stat = "active";
          this.sensorList = this.sensor.active;
          break;
        case "down":
          this.stat = "down";
          this.sensorList = this.sensor.down;
          break;
        case "warning":
          this.stat = "warning";
          this.sensorList = this.sensor.warning;
          break;
        case "prog":
          this.stat = "prog";
          this.sensorList = this.sensor.in_progress;
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.square{
  width:50%;
}
.main-container {
  padding: 40px 20px;
  max-width: 100% !important;
  width: 100%;

  & .square-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 135px;
    & > div {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  & .rectangle-container {
    display: flex;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 100% !important;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
}
.store-traffic-container {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 15px;
  & h2 {
    font-size: 1.6rem;
    & span {
      color: #525252;
      font-size: 1.3rem;
      font-weight: 400;
    }
  }
  & .store-traffic-wrap {
    display: flex;
    justify-content: space-between;

    & .num-wrap {
      min-width: 130px;
      border-radius: 5px;
      & ul {
        margin-top: 15px;
        & li {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          border-top: 1px dashed #ccc;
          padding: 5px 0 2px 0;
          & .subject {
            font-size: 1.3rem;
            padding-left: 5px;
          }
          & .data {
            padding-right: 5px;
            font-size: 1.4rem;
            font-weight: 700;
            &.warning {
              background: #fff !important;
              color: #ff4d56;
            }
          }
        }
      }
    }
    & .tbl-wrap {
      flex-grow: 1;
      margin-left: 30px;
      max-height: 160px;
      overflow-y: auto;
    }
  }
}

.active {
  background-color: rgb(225, 225, 225);
}
.activing {
  background: rgb(225, 225, 225) !important;
  color: #ff4d56;
}
.dividing {
  display: flex;
  justify-content: space-between;
  & .member-manage {
    width: 40% !important;
  }
  & .righs {
    width: calc(60% - 10px);
  }
}
.time-line {
  display: flex;
  justify-content: flex-end;
}
</style>
