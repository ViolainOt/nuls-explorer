<template>
    <header class="head">
        <div class="nuls-head-content">
            <div class="menu flex menu-left">
                <div class="nuls-logo-content"></div>
                <ul>
                    <li>
                        <router-link to="/">{{$t("nav.index")}}</router-link>
                    </li>
                    <li>
                        <a>{{$t("nav.rank")}}</a>
                        <i class="el-icon-arrow-down"></i>
                        <div class="more left">
                            <div>
                                <router-link to="/cashAccount">{{$t("nav.currencyAccount")}}</router-link>
                            </div>
                            <div>
                                <router-link to="/pieceOfAccount">{{$t("nav.outPieceAccount")}}</router-link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link to="/tokens/tokensList">{{$t("nav.tokens")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/contracts/contractsList">{{$t("nav.contracts")}}</router-link>
                    </li>
                    <!--<li><router-link to="" :title="$t('nav.toolHit')">{{$t("nav.tool")}}</router-link></li>-->
                    <li>
                        <a class="nuls-dropdown">{{$t("nav.wallet")}}</a>
                        <i class="el-icon-arrow-down"></i>
                        <div class="more right">
                            <div>
                                <a class="pointer" href="https://nuls.io/wallet" target="_blank">{{$t("nav.clientDownloads")}}</a>
                            </div>
                            <div>
                                <a class="pointer" href="https://wallet.nuls.io/" target="_blank">{{$t("nav.webWallet")}}</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="menu flex menu-border menu-right">
                <div class="nuls-search-box">
                    <input placeholder="Address / Txhash / Block / Token" class="pointer" ref="search"
                           @keyup.enter="search" value="" type="text"/>
                    <i class="el-icon-search pointer" @click="search"></i>
                </div>
                <div class="nuls-language-box">
                    <div class="language-outter">
                        <router-link to="" class="whiteColor">{{langText}}</router-link>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="language_list">
                        <div class="pointer" @click="change('zh')">
                            <a>中文</a>
                        </div>
                        <div class="pointer" @click="change('en')">
                            <a>English</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--适配手机端-->
            <!--Adaptable mobile terminal-->
            <div class="menu-mobile">
                <div class="flex2">
                    <div class="nuls-logo-content"></div>
                    <div @click="showMenu"><i class="el-icon-menu"></i></div>
                </div>
                <el-row class="show-menu" v-show="showMenus">
                    <el-col :span="24">
                        <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                            <el-submenu index="2">
                                <template slot="title">
                                    <span>导航一</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title">分组一</template>
                                    <el-menu-item index="2-1">选项1</el-menu-item>
                                    <el-menu-item index="2-2">选项2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="分组2">
                                    <el-menu-item index="2-3">选项3</el-menu-item>
                                </el-menu-item-group>
                                <el-submenu index="2-4">
                                    <template slot="title">选项4</template>
                                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-menu-item index="3">
                                <span slot="title">导航二</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <span slot="title">导航三</span>
                            </el-menu-item>
                            <el-menu-item index="5">
                                <span slot="title">导航四</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="clear"></div>
        </div>
    </header>
</template>

<script>
    import {getSearchDataDetail} from "../assets/js/nuls.js";
    import {saveDataToTemp, getDataToTemp} from "../assets/js/util.js";
    import {brotherComponents} from '../assets/js/public.js';

    export default {
        name: "Head",
        data() {
            return {
                langText: "中文",
                changeType: "changeType",
                showMenus: false,
            }
        },
        created: function () {
            var lang = getDataToTemp(this.changeType);
            if (lang === "zh" || lang === "en") {
                this.reloadLanguage(lang);
            } else {
                this.reloadLanguage("en");
            }
        },
        methods: {
            /**
             * Language switching event, switching at the same time triggered the home page transaction history redraw
             * 语言切换事件，切换同时触发首页的交易历史重绘
             */
            change: function (lang) {
                this.reloadLanguage(lang);
                saveDataToTemp(this.changeType, lang);
            },
            reloadLanguage: function (lang) {
                if (this.$i18n.locale !== lang) {
                    this.langText = lang === "zh" ? "中文" : "English";
                    this.$i18n.locale = lang;
                    brotherComponents.$emit('redrawChart');
                    brotherComponents.$emit('reloadClass');
                }
            },
            search: function () {
                /*show loading*/
                let
                    _self = this,
                    serchVal = _self.$refs.search.value.replace(/(^\s*)|(\s*$)/g, "");
                if (serchVal && serchVal.length > 0) {
                    var loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    /*change the 'serchVal' is Available*/
                    getSearchDataDetail({key: serchVal}, function (res) {
                        if (res.success) {
                            if (res.data == 0) {
                                _self.$notify({
                                    title: _self.$t("notice.notice"),
                                    message: _self.$t("notice.searchFailed"),
                                    type: 'warning'
                                });
                            } else {
                                _self.$router.push({
                                    path: '/loadSearch',
                                    query: {queryType: res.data, queryValue: serchVal}
                                });
                            }

                        } else {
                            _self.$notify({
                                title: _self.$t("notice.notice"),
                                message: _self.$t("notice.searchFailed"),
                                type: 'warning'
                            });
                        }
                        loading.close();
                    });
                } else {
                    _self.$notify({
                        title: _self.$t("notice.notice"),
                        message: _self.$t("notice.searchNull"),
                        type: 'warning'
                    });
                }
                /*clear the search box*/
                _self.$refs.search.value = "";
            },
            showMenu(){
                this.showMenus=!this.showMenus;
            },
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .head{
        .nuls-head-content{
           .menu-mobile{
               display:none;
           }
        }
    }
    @media screen and (max-width: 768px) {
        .head{
            .nuls-head-content{
                .menu-mobile{
                    display:block;
                    .el-icon-menu{
                        font-size: 22px;
                    }
                    .show-menu{
                        position:fixed;
                        right:0;
                        ul.el-menu-vertical-demo{
                            height:auto;
                            li.el-menu-item,li.el-submenu{
                                float:none;
                                width:auto;
                            }
                        }
                    }
                }
                .menu-left,.menu-right{
                   display:none;
                }
            }
        }
    }
</style>
