<template>
  <section class="container">
    <div class="title-wrap">
      <h1>씨앗 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>회원리스트</h2>
            <div class="search">
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <colgroup>
              <col width="80" />
              <col width="150" />
              <col width="150" />
              <col width="150" />
            </colgroup>
            <thead>
              <tr>
                <th>회원고유코드</th>
                <th>회원이름</th>
                <th>아이디(이메일)</th>
                <th>씨앗수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="seedUserList(item.homepageUserSid)">
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepageUserName }}</td>
                <td>{{ item.homepageUserEmail }}</td>
                <td>{{ item.seedPrice }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">회원 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>설정</h2>
            <div class="btn-group">
              <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
              <!--v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(homepageUserSid)">삭제</v-btn-->
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <form>
              <table width="100%" class="tbl-reg">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>회원 고유코드</td>
                  <td><input type="text" v-model="homepageUserSid"  /></td>
                  <td style="text-align:right;padding-right:10px;">씨앗 고유코드</td>
                  <td><input type="text" v-model="homepageUserSeedSid" readonly /></td>
                </tr>
                <tr>
                  <td>회원 이름</td>
                  <td><input type="text" v-model="homepageUserName" readonly /></td>
                  <td style="text-align:right;padding-right:10px;">이메일 주소</td>
                  <td><input type="text" v-model="homepageUserEmail" readonly /></td>
                </tr>
              </table>
              <div class="tbl-div-line"></div>
              <table width="100%" class="tbl-reg">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>                
                <tr>
                  <td>씨앗처리구분</td>
                  <td>
                    <pull-down :data="homepageUserSeedKind" :code="homepageUserSeedKindCode" @selected="homepageUserSeedKindProp" class="pull-down"></pull-down>
                  </td>
                  <td style="text-align:right;padding-right:10px;">차감코멘트</td>
                  <td><input type="text" v-model="homepageUserSeedComment" readonly /></td>                    
                </tr>
                <tr>
                  <td>씨앗 수</td>
                  <td><input type="text" v-model="homepageUserSeedPrice" /></td>
                  <td style="text-align:right;padding-right:10px;">처리일시</td>
                  <td><input type="text" v-model="homepageUserSeedDateTime" readonly /></td>
                </tr>
                <tr>
                  <td>테이블 고유코드</td>
                  <td><input type="text" v-model="homepageUserSeedTable"  readonly  /></td>
                  <td  style="text-align:right;padding-right:10px;">테이블명</td>
                  <td><input type="text" v-model="homepageUserSeedTableSid"  readonly  /></td>
                </tr>

              </table>
            </form>
            <div class="tbl-div-line"></div>
            <div class="history mt20">
              <div class="header"><h2>회원 씨앗 HISTORY</h2></div>
              <table class="tbl tbl-reg user-list-tbl select-tbl">
                <colgroup>
                  <col width="70" />
                  <col width="90" />
                  <col width="120" />
                  <col width="*" />
                  <col width="80" />
                </colgroup>
                <thead>
                  <tr>
                    <th>고유코드</th>
                    <th>처리일시</th>
                    <th>처리구분</th>
                    <th>코멘트</th>
                    <th>씨앗수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in seedHistory" :key="idx" @click="seedDetail(item.homepageUserSeedSid)">
                    <td>{{ item.homepageUserSeedSid }}</td>
                    <td>{{ item.homepageUserSeedDateTime }}</td>
                    <td>{{ item.homepageUserSeedKindName }}</td>
                    <td>{{ item.homepageUserSeedComment }}</td>
                    <td>{{ item.homepageUserSeedPrice }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import { CheckPassword, verifyEmail } from "@/utils/validate";
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import responseMixin from "@/mixins/response";
export default {
  components: { alim, confirm, PullDown },
  mixins: [loading, alimMixin, deleteMixin, responseMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //씨앗 디테일 데이터
      homepageUserSeedSid:"",
      homepageUserSid:"",
      homepageUserName:"",
      homepageUserEmail:"",
      homepageUserSeedKind:"",
      homepageUserSeedPrice:"",
      homepageUserSeedComment:"",
      homepageUserSeedDateTime:"",
      homepageUserSeedTable:"",
      homepageUserSeedTableSid:"",
      homepageUserSeedKindName:"",
      //셀렉트 설정
      homepageUserSeedKindCode: "SYS22A21B007",
      seedHistory: [],
    };
  },
  computed: {
    ...mapGetters("seed", ["getSeedList", "getSeedUserList","getSeedDetail", "seedAddResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    //풀다운 데이터 emit
    homepageUserSeedKindProp(data) {
      this.homepageUserSeedKind = data.sysCodeSid;
      this.homepageUserSeedKindName = data.sysCodeName;
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("seed/GET_SEED_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }

        const data = res.seed;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async seedUserList(id) {    
      try {
        bus.$emit("start:spinner");
        this.homepageUserSid=id;
        await this.$store.dispatch("seed/GET_SEEDUSER_LIST",id);
        const res = this.getSeedUserList.nextmApiResult;

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        console.log(res.seed);
        this.seedHistory = res.seed;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유저 상세 정보
    async seedDetail(id) {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("seed/GET_SEED_DETAIL", id);

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        console.log(res);
        const seedDetail = res.seed;
        this.homepageUserSeedSid=seedDetail.homepageUserSeedSid;
        this.homepageUserSid=seedDetail.homepageUserSid;
        this.homepageUserName=seedDetail.homepageUserName;
        this.homepageUserEmail=seedDetail.homepageUserEmail;
        this.homepageUserSeedKind=seedDetail.homepageUserSeedKind;
        this.homepageUserSeedPrice=seedDetail.homepageUserSeedPrice;
        this.homepageUserSeedComment=seedDetail.homepageUserSeedComment;
        this.homepageUserSeedDateTime=seedDetail.homepageUserSeedDateTime;
        this.homepageUserSeedTable=seedDetail.homepageUserSeedTable;
        this.homepageUserSeedTableSid=seedDetail.homepageUserSeedTableSid;

      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //씨앗  추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("seed/SEED_ADD", {
          homepageUserSid:this.homepageUserSid,
          homepageUserSeedKind:this.homepageUserSeedKind,
          homepageUserSeedPrice:this.homepageUserSeedPrice,
        });
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return;
        }

        this.alim("씨앗이 추가 되었습니다.", this.successColor);
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.homepageUserSeedSid !== "") {
          this.alim("씨앗 고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
        if (this.homepageUserSid === "") {
          this.alim("회원 고유코드를 입력해 주세요.", this.errorColor);
          return false;
        }
        if (this.homepageUserSeedPrice === "") {
          this.alim("씨앗수 를 입력해 주세요.", this.errorColor);
          return false;
        }        
        if (this.homepageUserSeedKind === "" ||(this.homepageUserSeedKind !== "SYS22A21B010" && this.homepageUserSeedKind !== "SYS22A21B012")) {
          this.alim("씨앗처리구분이 선택되지 않았거나 관리자 지급 또는 관리자 차감만 선택할 수 있습니다.", this.errorColor);
          return false;
        }

      }

      if (status === "reg") {
        this.reg();
      }
    },
  
    //항목 clear
    clear() {
      // const select = document.querySelectorAll(".select-tbl tr");
      // select.forEach(ele => ele.classList.remove("active"));
      this.homepageUserSeedSid = "";
      this.homepageUserSid = "";
      this.homepageUserName = "";
      this.homepageUserEmail = "";
      this.homepageUserSeedKind = "";
      this.homepageUserSeedPrice = "";
      this.homepageUserSeedComment = "";
      this.homepageUserSeedDateTime = "";
      this.homepageUserSeedTable = "";
      this.homepageUserSeedTableSid = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 50% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(50% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
