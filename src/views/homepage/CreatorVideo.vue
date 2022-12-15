<template>
    <section class="container">
      <div class="title-wrap">
        <h1>콘텐츠 현황</h1>
      </div>
      <section class="member-manage">
        <section class="member-list section-box border-outside">
          <div class="border">
            <div class="header">
              <h2>콘텐츠 리스트</h2>
              <div class="search">
                <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
                <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
              </div>
            </div>
            <table class="tbl mt20 user-list-tbl select-tbl">
              <colgroup>
                <col width="150" />
                <col width="*" />
                <col width="160" />
                <col width="100" />
                <col width="100" />
                <col width="100" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th class="left">크리에이터 고유코드</th>
                  <th>크리에이터 채널</th>
                  <th>콘탠츠 제목</th>
                  <th>상태</th>
                  <th>등록일시</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="userDetail(item.homepageUserCreatorSid)">
                  <td>{{ item.homepageUserCreatorSid }}</td>
                  <td class="left">{{ item.homepageUserEmail }}</td>
                  <td>{{ item.homepageUserName }}</td>
                  <td>{{ item.homepageUserCreatorYoutubeChannel }}</td>
                  <td>{{ item.homepageUserCreatorStatusName }}</td>
                  <td>{{ item.created_at | formatDate }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="6">리스트가 없습니다.</td>
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
                <v-btn small color="error" dark @click="confirm(homepageUserCreatorSid)">삭제</v-btn>
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
                    <td><input type="text" v-model="homepageUserCreatorSid" /></td>
                  </tr>
                  <tr>
                    <td>크리에이터 고유코드</td>
                    <td><input type="text" readonly v-model="homepageUserEmail" /></td>
                  </tr>
                  <tr>
                    <td>콘탠츠 제목</td>
                    <td><input type="text" readonly v-model="homepageUserName" /></td>
                  </tr>
                  <tr>
                    <td>유튜브 URL</td>
                    <td><input type="text" v-model="homepageUserCreatorChurch" /></td>
                  </tr>
                  <tr>
                    <td>콘탠츠 재생 수</td>
                    <td><input type="text" v-model="homepageUserCreatorChurchPlatform" /></td>
                  </tr>
                  <tr>
                    <td>등록일</td>
                    <td><input type="text" v-model="homepageUserCreatorChurchPosition" /></td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td><input type="text" v-model="homepageUserCreatorYoutubeUrl" /></td>
                  </tr>
                  <tr>
                  <td>콘탠츠 상태</td>
                  <td >
                    <pull-down :data="homepageUserCreatorStatus" :code="statusCode" @selected="homepageUserCreatorStatusNameProp" class="pull-down"></pull-down>
                  </td>
                </tr>
                </table>
              </form>
              <div class="tbl-div-line"></div>
              <table width="100%" class="tbl-reg">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>파일 첨부</td>
                  <td class="file-add" colspan="3">
                    <div class="file-wrap">
                      <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                      <ul class="thumbnail mt10">
                        <li v-for="(item, index) in file" :key="index">
                          <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                          <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                            <img
                              :src="`${url}/file/fileView/${item.url}?size=80`"
                              @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            />
                          </div>
                        </li>
                        <div v-if="message === true">첨부된 파일이 없습니다.</div>
                      </ul>
                    </div>
                  </td>
                </tr>
              </table>
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
        searchText: "",
        len: null,
        list: [],
        message: true,
        file: [],
        //유저 디테일 데이터
        homepageUserCreatorSid: "",
        homepageUserName: "",
        homepageUserEmail: "",
        adminUserPhoto:'',
        homepageUserCreatorChurch:'',
        homepageUserCreatorChurchPlatform:'',
        homepageUserCreatorChurchPosition:'',
        homepageUserCreatorYoutubeChannel:'',
        homepageUserCreatorYoutubeUrl:'',
        homepageUserCreatorStatus:'',
        homepageUserCreatorStatusName:'',
        nextmFiles: [],
  
        statusCode: "SYS22A26B002",      
        url: process.env.VUE_APP_API,
      };
    },
    computed: {
      ...mapGetters("creatorUser", ["getCreatorUserList", "getCreatorUserDetail", "creatorUserAdd", "creatorUserDeleteResult"]),
      ...mapGetters("common", ["fileDeleteResult"]),
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
      homepageUserCreatorStatusNameProp(data) {
        this.homepageUserCreatorStatus = data.sysCodeSid;
        this.homepageUserCreatorStatusName = data.sysCodeName;
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
          await this.$store.dispatch("creatorUser/GET_CREATORUSER_LIST", {
            size: this.size,
            page: this.page,
            searchText: this.searchText,
          });
          if (this.getCreatorUserList.nextmApiResult.errorCode === 200) {
            const userList = this.getCreatorUserList.nextmApiResult.homepageUserCreator;
            this.list = userList.data;
            this.len = userList.last_page;
          } else {
            this.alim(this.getCreatorUserList.nextmApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
      //유저 상세 정보
      async userDetail(id) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("creatorUser/GET_CREATORUSER_DETAIL",id);
          if (this.getCreatorUserDetail.nextmApiResult.errorCode === 200) {
            const userDetail = this.getCreatorUserDetail.nextmApiResult.homepageUserCreator;

            this.homepageUserCreatorSid = userDetail.homepageUserCreatorSid;
            this.homepageUserName = userDetail.homepageUserName;
            this.homepageUserEmail = userDetail.homepageUserEmail;
            this.homepageUserCreatorChurch = userDetail.homepageUserCreatorChurch;
            this.homepageUserCreatorChurchPlatform = userDetail.homepageUserCreatorChurchPlatform;
            this.homepageUserCreatorChurchPosition = userDetail.homepageUserCreatorChurchPosition;
            this.homepageUserCreatorYoutubeChannel = userDetail.homepageUserCreatorYoutubeChannel;
            this.homepageUserCreatorYoutubeUrl = userDetail.homepageUserCreatorYoutubeUrl;
            this.homepageUserCreatorStatus = userDetail.homepageUserCreatorStatus;
            this.homepageUserCreatorStatusName = userDetail.homepageUserCreatorStatusName;
  
            this.file = [];
            userDetail.file_result.forEach(row => {
              if (row.fileSid !== "") {
                //pdf 업로드 가능시 보내야할 데이터
                this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
              }
            });
            if (this.file[0] === undefined) {
              this.message = true;
            } else {
              this.message = false;
            }
  
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
      //유저 추가
      async reg() {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("creatorUser/CREATORUSER_ADD", {
            homepageUserCreatorSid : this.homepageUserCreatorSid,
            homepageUserName : this.homepageUserName,
            homepageUserEmail : this.homepageUserEmail,
            homepageUserCreatorChurch : this.homepageUserCreatorChurch,
            homepageUserCreatorChurchPlatform : this.homepageUserCreatorChurchPlatform,
            homepageUserCreatorChurchPosition : this.homepageUserCreatorChurchPosition,
            homepageUserCreatorYoutubeChannel : this.homepageUserCreatorYoutubeChannel,
            homepageUserCreatorYoutubeUrl : this.homepageUserCreatorYoutubeUrl,
            homepageUserCreatorStatus : this.homepageUserCreatorStatus,
  
            nextmFiles: this.nextmFiles,                                                                      
          });
          if (this.creatorUserAdd.nextmApiResult.errorCode == 200) {
            this.alim("관리자가 추가 되었습니다.", this.successColor);
            this.reload(0);
          } else {
            this.alim(this.creatorUserAdd.nextmApiResult.errorMessage, this.errorColor);
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
          if (this.homepageUserCreatorSid == "") {
            this.alim("사용자 고유코드를 입력해 주세요.", this.errorColor);
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
      //유저 수정
      async modify() {
        try {
          bus.$emit("start:spinner");
          console.log( this.homepageUserCreatorStatus);
          const res = await this.__getResponse("creatorUser/CREATORUSER_MODIFY", {
            homepageUserCreatorSid : this.homepageUserCreatorSid,
            homepageUserName : this.homepageUserName,
            homepageUserEmail : this.homepageUserEmail,
            homepageUserCreatorChurch : this.homepageUserCreatorChurch,
            homepageUserCreatorChurchPlatform : this.homepageUserCreatorChurchPlatform,
            homepageUserCreatorChurchPosition : this.homepageUserCreatorChurchPosition,
            homepageUserCreatorYoutubeChannel : this.homepageUserCreatorYoutubeChannel,
            homepageUserCreatorYoutubeUrl : this.homepageUserCreatorYoutubeUrl,
            homepageUserCreatorStatus : this.homepageUserCreatorStatus,
            nextmFiles: this.nextmFiles,
          });
          this.__responseCheck(res, this.alim, this.reload);
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
              await this.$store.dispatch("creatorUser/CREATORUSER_DELETE", this.homepageUserCreatorSid);
              if (this.creatorUserDeleteResult.nextmApiResult.errorCode === 200) {
                this.reload(0);
                if (this.list.length < 1) {
                  this.page = this.page - 1;
                }
                this.alim("삭제 되었습니다.", this.successColor);
              } else {
                this.alim(this.creatorUserDeleteResult.nextmApiResult.errorMessage, this.errorColor);
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
        this.homepageUserCreatorSid='';
        this.homepageUserName='';                
        this.homepageUserEmail='';
        this.homepageUserCreatorChurch = "";
        this.homepageUserCreatorChurchPlatform = "";
        this.homepageUserCreatorChurchPosition = "";
        this.homepageUserCreatorYoutubeChannel = "";
        this.homepageUserCreatorYoutubeUrl = "";
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
  