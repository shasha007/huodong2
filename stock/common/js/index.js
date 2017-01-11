/**
 * Created by huqiwen on 16/9/5.
 *  index Js
 */

//requireJs 设置
require.config({
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "vue": "../../bower_components/vue/dist/vue",
        "clipboard": "../../bower_components/clipboard/dist/clipboard.min",
        "Util": "../../common/js/util",
        "tmp" : "../../common/js/tmp"
    },
});
var SearchRecord = "http://pocketuni.net/index.php?app=pufinance&mod=Public&act=schools";
var applyUrl = 'http://pocketuni.net/index.php?app=home&mod=Public&act=stock';
//requireJs
require(['jquery', 'vue', 'Util','clipboard'], function ($, Vue, util,clipboard) {
    var index = new Vue({
        el: '#shares',
        data: {
            school:[],
            pdata: {
                sname: '学校',
                sid: '',
                realname: '',
                mobile: ''
            }
        },
        methods: {
            init: function (proId) {
                //获取搜索纪录
                index.school = new util.AjaxVue(SearchRecord, {'proid' : proId}, false, index.school).get();
            },
            copy : function () {
                var elem = document.getElementById("copyCon");
                elem.focus();
                elem.setSelectionRange(0, elem.value.length);
            },
            goTo : function () {
                if (this.pdata.realname == '' && $('#realname').val() != '') {
                    this.pdata.realname = $('#realname').val();
                }
                $.post(applyUrl, this.pdata, function (result) {
                    if (result.status) {
                        window.location.href = 'https://m.zhangle.com/downloads/index.html?client=cft71&branch=HTC1-9000000052';
                    } else {
                        alert(result.info);
                        return false;
                    }
                }, 'json');
            },
            getFocus : function () {
                $("#h_LogInBg").show();
                $(".sharesCon").hide();
            },
            select : function (tit,id) {
                this.pdata.sname =tit;
                this.pdata.sid = id;
                $('.schoolName').css('color', '#3E3E3E');
                $("#h_LogInBg").hide();
                window.scrollTo(0,0);
                $(".sharesCon").show();
                if (window.location.hash !== "") {
                    window.location.hash = "";
                }
            }
        },
        computed: {},
        watch: {
        }
    });
    index.init(proId);

});

