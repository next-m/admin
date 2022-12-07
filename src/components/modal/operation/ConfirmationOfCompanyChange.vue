<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>업체 수정사항</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="left-column init-wrap section-box">
          <h1>변경 전</h1>
          <table width="100%" class="tbl-reg column2 tabled mt10">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>업체 고유코드</td>
              <td colspan="3">{{ origin.companySid }}</td>
            </tr>
            <tr>
              <td>부모회사 코드</td>
              <td colspan="3" class="field-div">{{ origin.companyParentSid }}</td>
            </tr>
            <tr>
              <td>국가코드</td>
              <td>{{ origin.companyNation }}</td>
              <td class="rights">업체구분</td>
              <td>{{ origin.companyKindName }}</td>
            </tr>
            <tr>
              <td>업체명</td>
              <td>{{ origin.companyName }}</td>
              <td class="rights">사업자등록번호</td>
              <td>{{ origin.companyCrNum }}</td>
            </tr>
            <tr>
              <td>법인번호</td>
              <td>{{ origin.companyBtNum }}</td>
              <td class="rights">대표자명</td>
              <td>{{ origin.companyCeo }}</td>
            </tr>
            <tr>
              <td>업종</td>
              <td>{{ origin.companyIndustries }}</td>
              <td class="rights">업태</td>
              <td>{{ origin.companyTypeOfBusiness }}</td>
            </tr>
            <tr>
              <td>우편번호</td>
              <td colspan="3">{{ origin.companyZipCode }}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td colspan="3">{{ origin.companyAddress1 }}</td>
            </tr>
            <tr>
              <td>상세 주소</td>
              <td colspan="3">{{ origin.companyAddress2 }}</td>
            </tr>
            <tr>
              <td class="toped pt10 rights">사용여부</td>
              <td colspan="3" class="toped">
                <div class="radio">
                  <v-radio-group v-model="origin.companyUseFlag" :readonly="true" :mandatory="false">
                    <v-radio label="사용함" value="Y"></v-radio>
                    <v-radio label="사용안함" value="N"></v-radio>
                  </v-radio-group>
                </div>
              </td>
            </tr>

            <tr>
              <td>비고</td>
              <td colspan="3" class="textarea-space">{{ origin.companyMemo }}</td>
            </tr>
          </table>
          <table width="100%" class="tbl-reg tabled">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>세금 처리 방법</td>
              <td>{{ origin.companyPaymentKindName }}</td>
              <td class="rights">은행</td>
              <td>{{ origin.companyBankName }}</td>
            </tr>
            <tr>
              <td>계좌번호</td>
              <td>{{ origin.companyBankAccount }}</td>
              <td class="rights">예금주</td>
              <td>{{ origin.companyBankAccountHolder }}</td>
            </tr>
          </table>
        </section>
        <section class="init-wrap section-box right-column">
          <h1>변경 후</h1>
          <table width="100%" class="tbl-reg column2 tabled mt10">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>업체 고유코드</td>
              <td colspan="3">{{ compare.companySid }}</td>
            </tr>
            <tr>
              <td>부모회사 코드</td>
              <td colspan="3" class="field-div">{{ compare.companyParentSid }}</td>
            </tr>
            <tr>
              <td>국가코드</td>
              <td>{{ compare.companyNation }}</td>
              <td class="rights">업체구분</td>
              <td>{{ compare.companyKindName }}</td>
            </tr>
            <tr>
              <td>업체명</td>
              <td>{{ compare.companyName }}</td>
              <td class="rights">사업자등록번호</td>
              <td>{{ compare.companyCrNum }}</td>
            </tr>
            <tr>
              <td>법인번호</td>
              <td>{{ compare.companyBtNum }}</td>
              <td class="rights">대표자명</td>
              <td>{{ compare.companyCeo }}</td>
            </tr>
            <tr>
              <td>업종</td>
              <td>{{ compare.companyIndustries }}</td>
              <td class="rights">업태</td>
              <td>{{ compare.companyTypeOfBusiness }}</td>
            </tr>
            <tr>
              <td>우편번호</td>
              <td colspan="3">{{ compare.companyZipCode }}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td colspan="3">{{ compare.companyAddress1 }}</td>
            </tr>
            <tr>
              <td>상세 주소</td>
              <td colspan="3">{{ compare.companyAddress2 }}</td>
            </tr>
            <tr>
              <td class="toped pt10 rights">사용여부</td>
              <td colspan="3" class="toped">
                <div class="radio">
                  <v-radio-group v-model="compare.companyUseFlag" :readonly="true" :mandatory="false">
                    <v-radio label="사용함" value="Y"></v-radio>
                    <v-radio label="사용안함" value="N"></v-radio>
                  </v-radio-group>
                </div>
              </td>
            </tr>

            <tr>
              <td>비고</td>
              <td colspan="3" class="textarea-space">{{ compare.companyMemo }}</td>
            </tr>
          </table>
          <table width="100%" class="tbl-reg tabled">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>세금 처리 방법</td>
              <td>{{ compare.companyPaymentKindName }}</td>
              <td class="rights">은행</td>
              <td>{{ compare.companyBankName }}</td>
            </tr>
            <tr>
              <td>계좌번호</td>
              <td>{{ compare.companyBankAccount }}</td>
              <td class="rights">예금주</td>
              <td>{{ compare.companyBankAccountHolder }}</td>
            </tr>
          </table>

          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 사진파일 삭제 컨펌 -->
          <confirm
            :type="type"
            :open="dialog"
            :txt="dialogText"
            :h1="dialogTitle"
            @resetConfirm="emitResetConfirm"
            :kind="dialogKind"
            :deleteText="deleteText"
          ></confirm>
        </section>
      </div>
      <div class="mt20 aa v-application">
        <div class="btn-group">
          <v-btn color="primary" @click="approval('Y')">승인</v-btn>
          <v-btn color="warning" class="ml10" @click="approval('N')">거절</v-btn>
        </div>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["companySid"],
  data() {
    return {
      origin: {},
      compare: {},
      confirmTitle: "",
      confirmText: "",
      deleteText: "",
      flag: "SYS22629B003",
    };
  },
  computed: {
    ...mapGetters("company", ["getCompanyInfo", "companyApproval"]),
  },
  mounted() {
    this.companyDetail(this.companySid);
  },

  methods: {
    close() {
      this.$emit("close");
    },
    //조회
    async companyDetail(id) {
      bus.$emit("start:spinner");
      await this.$store.dispatch("company/COMPANY_DETAIL", {
        companySid: id,
      });

      const res = this.getCompanyInfo.nextmApiResult;
      if (res.errorCode !== 200) {
        this.alim(res.errorMessage, this.errorColor);
        bus.$emit("end:spinner");
        setTimeout(() => {
          this.close();
        }, 1500);
      }
      this.origin = res.companyMaster;
      this.compare = res.companyMaster.companyMasterLog;
      bus.$emit("end:spinner");
    },
    approval(flag) {
      if (flag === "Y") {
        this.confirmTitle = "업체 계약 승인";
        this.confirmText = "해당 업체의 수정사항을 승인 하시겠습니까?";
        this.deleteText = "승인";
        this.flag = "SYS22629B003";
      } else {
        this.confirmTitle = "업체 계약 승인 거절";
        this.confirmText = "해당 업체의 수정사항을 거절 하시겠습니까?";
        this.deleteText = "거절";
        this.flag = "SYS22629B005";
      }
      this.customConfirm();
    },
    async emitResetConfirm({ del, type }) {
      console.log(del, type);
      if (del === "Y") {
        if (type === "list") {
          bus.$emit("start:spinner");
          await this.$store.dispatch("company/COMPANY_APPROVAL", {
            companySid: this.origin.companySid,
            flag: this.flag,
          });
          const res = this.companyApproval.nextmApiResult;
          if (res.errorCode !== 200) {
            bus.$emit("end:spinner");
            return this.alim(res.errorMessage, this.errorColor);
          }
          bus.$emit("end:spinner");
          this.alim(res.errorMessage, this.successColor);
          setTimeout(() => {
            this.close();
            this.$attrs.update;
          }, 1500);
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  justify-content: space-between;
  & .right-column {
    width: calc(50% - 20px);
    max-height: 800px;
  }
  & .left-column {
    width: calc(50% - 20px);
    max-height: 800px;
  }

  .tbl {
    & tr {
      cursor: pointer;
    }
  }
  & .url-create {
    & input {
      width: calc(100% - 160px) !important;
      margin: 0 10px 0 3px;
    }
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 115px) !important;
    margin: 0 0 0 5px !important;
  }
}
.tabled {
  border-top: 1px solid rgb(193, 193, 193);
  padding-bottom: 5px;
  & tr {
    & td {
      border-bottom: 1px solid rgb(193, 193, 193);
      padding-left: 10px !important;
      height: 30px;
    }
    & td:nth-child(odd) {
      background-color: #f4f4f4;
    }
  }
}

.aa {
  display: flex;
  justify-content: center;
}
</style>
