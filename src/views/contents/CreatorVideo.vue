<template>
    <section class="container">
      <div class="title-wrap">
        <h1>콘텐츠 등록</h1>
      </div>

      <section class="member-manage">
        <section class="init-wrap section-box border-outside">
          <div class="border">
            <div class="header">
              <h2>항목</h2>
              <div class="btn-group">
                <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
                <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
                <v-btn small color="error" dark @click="confirm(homepageUserSid)">삭제</v-btn>
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
                    <td>영상 고유코드</td>
                    <td><input type="text" readonly v-model="creatorVideoSid" /></td>
                  </tr>
                  <tr>
                    <td>크리에이터 고유코드</td>
                    <td style="display:flex;" ><input type="text"  v-model="homepageUserSid" style="margin-right:10px;" /><input type="text"  v-model="homepageUserSidName" readonly/></td>
                  </tr>
                  <tr>
                    <td>영상 타이틀</td>
                    <td><input type="text"  v-model="creatorVideoTitle" /></td>
                  </tr>
                  <tr>
                    <td>유튜브 URL</td>
                    <td style="display:flex;"><input type="text" v-model="creatorVideoYoutubeUrl" style="margin-right:20px;"/>
                      <v-btn small @click="youtubeSearch">Youtube</v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>영상 카태고리</td>
                    <pull-down-multi ref="pullDownMulti" :data="creatorVideoCategory" :code=creatorVideoCategoryCode @selected="creatorVideoCategoryProp" class="pull-down multi" :onlySelectPullDown="true"></pull-down-multi>
                  </tr>
                  <tr>
                    <td>영상길이(초)</td>
                    <td><input type="text" v-model="creatorVideoLangs" /></td>
                  </tr>
                  <tr>
                    <td>영상 설명</td>
                    <td><textarea v-model="creatorVideoDoc"></textarea></td>
                  </tr>
                  <tr>
                    <td>등록일</td>
                    <td><input type="text" v-model="creatorVideoDate" />
                      <!--date-picker :propdate="bannerStartDateTime" @updateDate="newBannerStartDateTime" class="modal-date"></date-picker --> 
                    </td>
                  </tr>
                  <tr>
                  <td>콘탠츠 상태</td>
                  <td >
                    <pull-down :data="creatorVideoStatus" :code="creatorVideoStatusCode" @selected="creatorVideoStatusProp" class="pull-down"></pull-down>
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
                  <td>가로이미지</td>
                  <td class="file-add" colspan="3">
                    <div class="file-wrap">
                      <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles1"  :fileType="'image/*'"></file-upload>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>세로 이미지</td>
                  <td class="file-add" colspan="3">
                    <div class="file-wrap">
                      <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles2" :fileType="'image/*'"></file-upload>
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
        <section class="init-wrap section-box border-outside">
          <div class="border youtube">
            <label>유튜브 영상</label>
            <div>
              <iframe id="player" type="text/html" width="100%" height="400"
              :src="youtubeIframeSrc"
              frameborder="0"></iframe>
            </div>
            <div class="cretorVideoImage">
              <div class="imageItem">
                <label for="">가로이미지</label>
                <div class="imageZone">
                      <ul class="thumbnail">
                        <li v-for="(item, index) in file1" :key="index">
                          <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                          <div v-if="message1 === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                            <img
                              :src="`${url}/file/fileView/${item.url}?size=300`"
                              @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            />
                          </div>
                        </li>
                        <div v-if="message1 === true">첨부된 파일이 없습니다.</div>
                      </ul>

                </div>
              </div>
              <div class="imageItem">
                <label for="">세로이미지</label>
                <div class="imageZone">
                  <ul class="thumbnail">
                        <li v-for="(item, index) in file2" :key="index">
                          <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                          <div v-if="message2 === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                            <img
                              :src="`${url}/file/fileView/${item.url}?size=300`"
                              @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            />
                          </div>
                        </li>
                        <div v-if="message2 === true">첨부된 파일이 없습니다.</div>
                      </ul>

                </div>
              </div>
            </div>
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
  import PullDownMulti from "@/components/form/PullDownMulti.vue";
  import alimMixin from "@/mixins/alim.js";
  import resMixin from "@/mixins/response.js";
  import deleteMixin from "@/mixins/delete.js";
  import FileUpload from "@/components/form/FileUpload.vue";
  import fileUploadMixin from "@/mixins/fileUpload";
  import thumbnailModal from "@/components/modal/common/Thumbnail";
  import { formatDate } from "@/utils/filters";
  export default {
    components: { alim, confirm,PullDown,PullDownMulti,FileUpload },
    mixins: [loading, alimMixin, deleteMixin,fileUploadMixin, resMixin],
    props: ["size"],
    data() {
      return {
        //게시물 설정
        page: 1,
        searchText: "",
        len: null,
        list: [],
        message1: true,
        message2: true,
        file1: [],
        file2: [],
        // 파일 삭제 아이디
        delId: "",

        //디테일 데이터
        creatorVideoSid: "",
        homepageUserSid:"",
        creatorVideoTitle:"",
        creatorVideoYoutubeUrl:"",
        creatorVideoLangs:"",
        creatorVideoDate:"",
        creatorVideoDoc:"",
        homepageUserSidName:"",
        creatorVideoStatus:"",
        creatorVideoCategory: [],
        youtubeIframeSrc:"",
        nextm1Files: [],  
        nextm2Files: [],  
        creatorVideoStatusCode: "SYS22B01B002",      
        creatorVideoCategoryCode: "SYS22A17B017",              
        url: process.env.VUE_APP_API,
      };
    },
    computed: {
      ...mapGetters("creatorVideo", ["getYoutubeInfo","getCreatorVideoList", "getCreatorVideoDetail", "creatorVideoAdd","creatorVideoModify", "creatorVideoDeleteResult"]),      
      ...mapGetters("common", ["fileDeleteResult"]),
    },
    mounted() {
     if(this.$route.params.creatorVideoSid){
      this.creatorVideoSid = this.$route.params.creatorVideoSid;
      this.creatorVideoDetail(this.creatorVideoSid);
     }else{
      this.clear();
     }
    },
    methods: {
      creatorVideoCategoryProp(data) {
        this.creatorVideoCategory = data.map(item => item.sysCodeSid);
//        this.creatorVideoCategory = data.sysCodeSid;
//        this.creatorVideoCategoryName = data.sysCodeName;
      },    
      creatorVideoStatusProp(data) {
        this.creatorVideoStatus = data.sysCodeSid;
//        this.creatorVideoStatusName = data.sysCodeName;
      },          
      //youtube 정보 가지고 오기
      async youtubeSearch() {
        if (this.creatorVideoYoutubeUrl == '') {
          this.alim("유튜브 URL을 입력해 주세요.", this.errorColor);          
          return false;
        }
        let youtubeId = this.creatorVideoYoutubeUrl.split('/').slice(-1)[0];
        const youtubeData = {youtubeId: youtubeId};
        await this.$store.dispatch('creatorVideo/GET_YOUTUBE_INFO', youtubeData);
        if (this.getYoutubeInfo.nextmApiResult.errorCode == 200) {
          let video = this.getYoutubeInfo.nextmApiResult.youtube.video;
          this.youtubeIframeSrc = `https://www.youtube.com/embed/${video.id}`;
          this.creatorVideoTitle = video.snippet.title;
          this.creatorVideoLangs = video.contentDetails.videoTimeSec;
          this.creatorVideoDoc = video.snippet.description;
        } else {
          this.$notify({
            group: 'notifyMessage',
            text: this.getYoutubeInfo.nextmApiResult.errorMessage,
          });
        }
      },

      //상세 정보
      async creatorVideoDetail(id) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("creatorVideo/GET_CREATORVIDEO_DETAIL",id);
          if (this.getCreatorVideoDetail.nextmApiResult.errorCode === 200) {
            const creatorVideoDetail = this.getCreatorVideoDetail.nextmApiResult.creatorVideo;
            //console.log(creatorVideoDetail);
            let youtubeId = creatorVideoDetail.creatorVideoYoutubeUrl.split('/').slice(-1)[0];            
            this.homepageUserSid = creatorVideoDetail.homepageUserSid;
            this.homepageUserSid = creatorVideoDetail.homepageUserSid;
            this.homepageUserSidName = creatorVideoDetail.homepage_user_creator.homepageUserCreatorChannelName;
            this.creatorVideoTitle = creatorVideoDetail.creatorVideoTitle;
            this.creatorVideoYoutubeUrl = creatorVideoDetail.creatorVideoYoutubeUrl;
            this.youtubeIframeSrc = `https://www.youtube.com/embed/${youtubeId}`;
            this.creatorVideoLangs = creatorVideoDetail.creatorVideoLangs;
            this.creatorVideoDate = creatorVideoDetail.creatorVideoDate;
            this.creatorVideoDoc = creatorVideoDetail.creatorVideoDoc;
            this.creatorVideoStatus = creatorVideoDetail.creatorVideoStatus;
            this.creatorVideoCategory = creatorVideoDetail.category_result.map(item => item.creatorVideoCategorySid);

            this.file1 = [];
            this.file2 = [];
            creatorVideoDetail.file_result.forEach(row => {
              if (row.fileSid !== "") {
                if(row.fileKind=="SYS22B01B001"){
                  this.file1.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
                }
                if(row.fileKind=="SYS22B07B001"){
                  this.file2.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });                  
                }                  
              }
            });
            if (this.file1[0] === undefined) {
              this.message1 = true;
            } else {
              this.message1 = false;
            }
            if (this.file2[0] === undefined) {
              this.message2 = true;
            } else {
              this.message2 = false;
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
      // 추가
      async reg() {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("creatorVideo/CREATORVIDEO_ADD", {
            homepageUserSid:this.homepageUserSid,
            creatorVideoTitle:this.creatorVideoTitle,
            creatorVideoCategory:this.creatorVideoCategory,
            creatorVideoYoutubeUrl:this.creatorVideoYoutubeUrl,
            creatorVideoLangs:this.creatorVideoLangs,
            creatorVideoDate:this.creatorVideoDate,
            creatorVideoDoc:this.creatorVideoDoc,
            creatorVideoStatus:this.creatorVideoStatus,
            
            nextm1Files: this.nextm1Files,                                                                      
            nextm2Files: this.nextm2Files,                                                                                  
          });
          if (this.creatorVideoAdd.nextmApiResult.errorCode == 200) {
            this.creatorVideoSid = this.creatorVideoAdd.nextmApiResult.creatorVideo.creatorVideoSid;
            this.creatorVideoDetail(this.creatorVideoSid);
            this.alim("영상이 추가 되었습니다.", this.successColor);
          } else {
            this.alim(this.creatorVideoAdd.nextmApiResult.errorMessage, this.errorColor);
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
          if (this.creatorVideoSid != "") {
            this.alim("영상 고유코드가 있을 경우 등록할 수 없습니다.", this.errorColor);
            return false;
          }          
          if (this.homepageUserSid == "") {
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
      // 수정
      async modify() {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("creatorVideo/CREATORVIDEO_MODIFY", {          
            creatorVideoSid:this.creatorVideoSid,
            homepageUserSid:this.homepageUserSid,
            creatorVideoTitle:this.creatorVideoTitle,
            creatorVideoCategory:this.creatorVideoCategory,
            creatorVideoYoutubeUrl:this.creatorVideoYoutubeUrl,
            creatorVideoLangs:this.creatorVideoLangs,
            creatorVideoDate:this.creatorVideoDate,
            creatorVideoDoc:this.creatorVideoDoc,
            creatorVideoStatus:this.creatorVideoStatus,
            
            nextm1Files: this.nextm1Files,                                                                      
            nextm2Files: this.nextm2Files,                                                                                  

          });
          if (this.creatorVideoModify.nextmApiResult.errorCode == 200) {
            this.creatorVideoDetail(this.creatorVideoSid);
            this.alim("영상이 수정 되었습니다.", this.successColor);
          } else {
            this.alim(this.creatorVideoModify.nextmApiResult.errorMessage, this.errorColor);
          }

        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      },
      // 삭제
      async emitResetConfirm(data) {
        if (data.del === "Y") {
          if (data.type === "list") {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("creatorVideo/CREATORVIDEO_DELETE", this.creatorVideoSid);
              if (this.creatorVideoDeleteResult.nextmApiResult.errorCode === 200) {
                this.clear();
                this.alim("삭제 되었습니다.", this.successColor);
              } else {
                this.alim(this.creatorVideoDeleteResult.nextmApiResult.errorMessage, this.errorColor);
              }
            } catch (error) {
              this.alim(error, this.errorColor);
            } finally {
              bus.$emit("end:spinner");
            }
          }
          if (data.type === "photo") {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("common/FILE_DELETE", this.delId);

              const res = this.fileDeleteResult.nextmApiResult;
              if (parseInt(res.errorCode) !== 200) {
                this.alim(res.errorMessage, this.errorColor);
                bus.$emit("end:spinner");
                return false;
              }
              this.creatorVideoDetail(this.creatorVideoSid);
              this.alim("삭제 되었습니다.", this.successColor);
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
        this.creatorVideoSid ='';
        this.homepageUserSid ='';
        this.homepageUserSid ='';
        this.homepageUserSidName ='';
        this.creatorVideoTitle ='';
        this.creatorVideoYoutubeUrl ='';
        this.youtubeIframeSrc ='';
        this.creatorVideoLangs ='';
        this.creatorVideoDate ='';
        this.creatorVideoDoc ='';
        this.creatorVideoStatus ='';
        this.creatorVideoCategory =[];
        this.file1=[];
        this.file2=[];
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .thumbnail li .thubmnail-type{
    width:100% !important;
    height:auto !important;
  }
  .thumbnail li .thubmnail-type img{
    width:100% !important;
    height:auto !important;    
  }
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
      width: calc(50% - 10px);
      & .border {
        & .field {
          & .required {
            font-weight: 700;
          }
        }
      }
    }
  }
  .youtube label{
    font-size:14px;
    width:100%;
    display:block;
    background-color: #ccc;
    margin-bottom:10px;
    padding:3px 0 3px 3px;
  }  
  .cretorVideoImage label{
    font-size:14px;
    width:100%;
    display:block;
    background-color: #ccc;
    padding:3px 0 3px 3px;
  }  
  .cretorVideoImage{
    margin-top:20px;
    display: flex;
    justify-content: space-between;
    & .imageItem{
      width:calc(50% - 10px);
      & .imageZone{
        border:1px solid #ccc;
        height:300px;
      }
    }
  }
  </style>
  