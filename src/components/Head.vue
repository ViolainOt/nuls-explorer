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
                           @keyup.enter="search" type="text" v-model="searchValue"/>
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
            <div class="clear"></div>
        </div>
        <!--适配手机端-->
        <!--Adaptable mobile terminal-->
        <div class="nuls-head-content-mobile">
            <div class="flex2">
                <div class="nuls-logo-content"></div>
                <div @click="showMenu"><i class="el-icon-menu"></i></div>
            </div>
            <div class="nuls-search-box">
                <input placeholder="Address / Txhash / Block / Token" class="pointer" ref="search"
                       @keyup.enter="search" type="text" v-model="searchValue"/>
                <i class="el-icon-search pointer" @click="search"></i>
            </div>
            <el-row class="show-menu" v-show="showMenus">
                <el-col :span="24">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#0b1422"
                        text-color="#fff"
                        active-text-color="#88baff">
                        <el-menu-item index="1">
                            <span slot="title" @click="showMenu"><router-link to="/">{{$t("nav.index")}}</router-link></span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <span>{{$t("nav.rank")}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="showMenu"><router-link to="/cashAccount">{{$t("nav.currencyAccount")}}</router-link></el-menu-item>
                                <el-menu-item index="2-2" @click="showMenu"><router-link to="/pieceOfAccount">{{$t("nav.outPieceAccount")}}</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="3">
                            <span slot="title" @click="showMenu"><router-link to="/tokens/tokensList">{{$t("nav.tokens")}}</router-link></span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title" @click="showMenu"><router-link to="/contracts/contractsList">{{$t("nav.contracts")}}</router-link></span>
                        </el-menu-item>
                        <el-submenu index="5">
                            <template slot="title">
                                <span>{{$t("nav.wallet")}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="showMenu"><a class="pointer" href="https://nuls.io/wallet" target="_blank">{{$t("nav.clientDownloads")}}</a></el-menu-item>
                                <el-menu-item index="2-2" @click="showMenu"><a class="pointer" href="https://wallet.nuls.io/" target="_blank">{{$t("nav.webWallet")}}</a></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <span>{{langText}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="showMenu"><span @click="change('zh')">中文</span></el-menu-item>
                                <el-menu-item index="2-2" @click="showMenu"><span @click="change('en')">English</span></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
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
                searchValue: '',
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
                console.log(this.searchValue);
                let _self = this,
                    serchVal = _self.searchValue.replace(/(^\s*)|(\s*$)/g, "");
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
            showMenu() {
                this.showMenus = !this.showMenus;
            },
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .head {
        .nuls-head-content-mobile {
            display: none;
        }
    }

    @media screen and (max-width: 768px) {
        header.head {
            .nuls-head-content {
                display: none;
            }
            .nuls-head-content-mobile {
                .nuls-logo-content{
                    width:108px;
                    height:68px;
                    background: url(../assets/img/logo.png) 0 13px no-repeat;
                    /*background: url(../assets/img/testnet-logo.svg) 0 13px no-repeat;*/
                }
                display: block;
                .el-menu-item{
                    span,a{
                        display:inline-block;
                        width:100%;
                    }
                }
                .el-icon-menu {
                    font-size: 22px;
                }
                .show-menu {
                    position: fixed;
                    right: 0;
                    width:100%;
                    z-index:100;
                }
                .nuls-search-box{
                    background-color: #384252;
                    flex: 1;
                    position: relative;
                    height: 26px;
                    line-height: 26px;
                    margin-left: 1%;
                    margin-right: 1%;
                    margin-bottom:10px;
                    input{
                        position: absolute;
                        left: 1%;
                        outline: 0;
                        color: #bcc4cc;
                        width: 75%;
                        background-color: transparent;
                        border:none;
                        font-size: 0.875em;
                        height: 26px;
                    }
                    i{
                        position: absolute;
                        right: 6px;
                        top: 2px;
                        font-size: 1.2em;
                    }
                }
                ul, li {
                    height: auto;
                    width: auto;
                }
            }
        }
    }
</style>
