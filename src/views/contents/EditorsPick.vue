<template>
    <section class="container">
      <div class="title-wrap">
        <h1>EditorsPick 관리</h1>
      </div>
      <section class="member-manage">
        <section class="member-list section-box border-outside">
          <div class="border">
            <div class="header">
              <h2>리스트</h2>
              <div class="search">
                <pull-down :data="searchCategory" :code="searchCategoryCode" @selected="searchCategoryProp" :includeTotalElem="true" class="pull-down searchSelect"></pull-down>
                <input type="text" placeholder="검색어를 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
                <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
              </div>
            </div>
            <table class="tbl mt20 user-list-tbl select-tbl">
              <colgroup>
                <col width="100" />
                <col width="100" />
                <col width="*" />
                <col width="100" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>영상고유코드</th>
                  <th  class="left">영상제목</th>
                  <th>Sort</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="editorPickDetail(item.contentsCountSid)">
                  <td>{{ item.contentsCountSid }}</td>
                  <td>{{ item.contentsCreatorVideoSid }}</td>
                  <td class="left">{{ item.creatorVideoTitle}}</td>                  
                  <td>{{ item.contentsCount }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="4">리스트가 없습니다.</td>
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
                <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
                <v-btn small color="error" dark @click="confirm(contentsCountSid)">삭제</v-btn>
                <v-btn small @click="clear">clear</v-btn>
              </div>
            </div>
            <div class="field">
              <form>
                <table width="100%" class="tbl-reg">
                  <colgroup>
                    <col width="100" />
                    <col width="*" />
                  </colgroup>
                  <tr>
                    <td>고유코드</td>
                    <td><input type="text" v-model="contentsCountSid" readonly /></td>
                  </tr>
                  <tr>
                    <td>영상고유코드</td>
                    <td><input type="text" v-model="contentsCreatorVideoSid" /></td>
                  </tr>
                  <tr>
                    <td>Sort</td>
                    <td><input type="text" v-model="contentsCount" /></td>
                  </tr>
                  <tr>
                    <td>영상제목</td>
                    <td><input type="text" readonly v-model="creatorVideoTitle" /></td>
                  </tr>
                  <tr>
                    <td>영상카태고리</td>
                    <td><input type="text" readonly v-model="categorys" /></td>
                  </tr>
                </table>
              </form>
              <div class="tbl-div-line"></div>
            </div>
            <!-- 알럿 -->
            <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
            <!-- 삭제 컨펌 -->
            <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
          </div>
        </section>
      </section>
    </section>
  </template>
  
  <script>
  import { getPopupOpt } from "@/utils/modal";
  import { mapGetters } from "vuex";
  import alim from "@/components/dialog/Alim.vue";
  import confirm from "@/components/dialog/Confirm.vue";
  import loading from "@/mixins/loading";
  import bus from "@/utils/bus";
  import PullDown from "@/components/form/PullDown.vue";
  import alimMixin from "@/mixins/alim.js";
  import resMixin from "@/mixins/response.js";
  import deleteMixin from "@/mixins/delete.js";
  import FileUpload from "@/components/form/FileUpload.vue";
  import fileUploadMixin from "@/mixins/fileUpload";
  import thumbnailModal from "@/components/modal/common/Thumbnail";
  import { formatDate } from "@/utils/filters";
  export default {
    components: { alim, confirm,PullDown,FileUpload },
    mixins: [loading, alimMixin, deleteMixin,fileUploadMixin, resMixin],
    props: ["size"],
    data() {
      return {
        //게시물 설정
        page: 1,
        searchCategory:"",
        searchText: "",
        len: null,
        list: [],
        message: true,
        //데이터
        contentsCountSid:"",
        contentsCount:"",
        contentsCreatorVideoSid:"",
        creatorVideoTitle:"",
        categorys:"",

        searchCategoryCode: "SYS22A17B017",      
      };
    },
    computed: {
      ...mapGetters("editorsPick", ["getEditorsPickList", "getEditorsPickDetail", "editorsPickAdd","editorsPickModify", ,"editorsPickDeleteResult"]),      
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
      searchCategoryProp(data) {
        this.searchCategory = data.sysCodeSid;
        this.searchCategoryName = data.sysCodeName;
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
          await this.$store.dispatch("editorsPick/GET_EDITORSPICK_LIST", {
            size: this.size,
            page: this.page,
            searchCategory: this.searchCategory,
            searchText: this.searchText,
          });
          //console.log(this.getEditorsPickList);
          if (this.getEditorsPickList.nextmApiResult.errorCode === 200) {
            const editorPickList = this.getEditorsPickList.nextmApiResult.editorPick;
            this.list = editorPickList.data;
            this.len = editorPickList.last_page;
          } else {
            this.alim(this.getEditorsPickList.nextmApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
      //상세 정보
      async editorPickDetail(id) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("editorsPick/GET_EDITORSPICK_DETAIL",id);
          if (this.getEditorsPickDetail.nextmApiResult.errorCode === 200) {
            const dataDetail = this.getEditorsPickDetail.nextmApiResult.editorPick;

            this.contentsCountSid = dataDetail.contentsCountSid;
            this.contentsCount = dataDetail.contentsCount;
            this.contentsCreatorVideoSid = dataDetail.contentsCreatorVideoSid;
            this.creatorVideoTitle = dataDetail.creatorVideoTitle;
            const cate = dataDetail.category_result;
            if(cate[0]){
              var categoryNames='';
              cate.forEach(function (value,key) {
                categoryNames += value.creatorVideoCategoryName+" , ";
              });
            }  
            this.categorys = categoryNames;  
          } else {
            this.alim(this.getCreatorUserDetail.nextmApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
     //썸네일 모달
     thumbnailModal(data) {
        const file = this.file;
        this.$modal.show(thumbnailModal, { updateData: this.reload, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
      },    
      // 추가
      async reg() {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("editorsPick/EDITORSPICK_ADD", {
            contentsCount : this.contentsCount,
            contentsCreatorVideoSid : this.contentsCreatorVideoSid
          });
          if (this.editorsPickAdd.nextmApiResult.errorCode == 200) {
            this.alim("추가 되었습니다.", this.successColor);
            this.reload(0);
          } else {
            this.alim(this.editorsPickAdd.nextmApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
      //등록 validate
      validate(status) {
        if (status === "reg") {
          if (this.contentsCreatorVideoSid == "") {
            this.alim("영상 고유코드를 입력해 주세요.", this.errorColor);
            return false;
          }
          if (this.contentsCount == "") {
            this.alim("Sort를 입력해 주세요.", this.errorColor);
            return false;
          }

        }
        if (status === "reg") {
          this.reg();
        }
        if (status === "modify") {
          this.modify();
        }
      },
      // 수정
      async modify() {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("editorsPick/EDITORSPICK_MODIFY", {            
            contentsCountSid : this.contentsCountSid,
            contentsCount : this.contentsCount,
            contentsCreatorVideoSid : this.contentsCreatorVideoSid,
          });
          console.log(this.editorsPickModify);
          if (this.editorsPickModify.nextmApiResult.errorCode == 200) {
            this.alim("수정 되었습니다.", this.successColor);
            this.reload(0);
          } else {
            this.alim(this.editorsPickModify.nextmApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {

          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
      //유저 삭제
      async emitResetConfirm(data) {
        if (data.del === "Y") {
          if (data.type === "list") {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("editorsPick/EDITORSPICK_DELETE", this.contentsCountSid);
              if (this.editorsPickDeleteResult.nextmApiResult.errorCode === 200) {
                this.reload(0);
                if (this.list.length < 1) {
                  this.page = this.page - 1;
                }
                this.alim("삭제 되었습니다.", this.successColor);
              } else {
                this.alim(this.editorsPickDeleteResult.nextmApiResult.errorMessage, this.errorColor);
              }
            } catch (error) {
              this.alim(error, this.errorColor);
            } finally {
              bus.$emit("end:spinner");
            }
          }
        }
        this.resetDeleteData();
      },
      //항목 clear
      clear() {
        const select = document.querySelectorAll(".select-tbl tr");
        select.forEach(ele => ele.classList.remove("active"));
        this.contentsCountSid='';
        this.contentsCount='';
        this.contentsCreatorVideoSid='';
        this.creatorVideoTitle='';
        this.categorys='';

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
  <style scoped>
  .searchSelect{
    width: 200px !important;
    vertical-align: middle;
    margin-right: 5px;
  }  
</style>