import Vue from "vue";
import Vuex from "vuex";

// common
import common from "@/store/modules/common/common.js";

// system
import system from "@/store/modules/system/system.js";
import member from "@/store/modules/system/member.js";
import menu from "@/store/modules/system/menu.js";
import systemCode from "@/store/modules/system/systemCode.js";
import languageSet from "@/store/modules/system/languageSet.js";

// member
import login from "@/store/modules/member/login.js";
// contents EditorsPick
import editorsPick from "@/store/modules/contents/editorsPick.js";
import creatorVideo from "@/store/modules/contents/creatorVideo.js";

// homepage
import user from "@/store/modules/homepage/user.js";
import seed from "@/store/modules/homepage/seed.js";
import creatorUser from "@/store/modules/homepage/creatorUser.js";
import banner from "@/store/modules/homepage/banner.js";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    common,

    system,
    member,
    menu,
    systemCode,

    login,
    editorsPick,
    creatorVideo,
    user,
    seed,
    creatorUser,
    banner,
  },
});
