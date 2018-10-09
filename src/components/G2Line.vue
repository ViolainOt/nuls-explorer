<template>
    <!--Vuejs2.X g2 Chart components-->
    <!--npm install --save-dev g2-->
    <!--https://antv.alipay.com/zh-cn/g2/3.x/tutorial-->
    <div :id="id"></div>
</template>
<script>
import G2 from 'g2';
import {formatDateEn} from '../assets/js/util.js';
G2.Global.setTheme('dark');
export default {
    data() {return {};},
    props: {
        charData: {
            type: Array,
            default: function () {
                return {
                    data: []
                };
            }
        },
        id: String
    },
    mounted: function () {
        this.drawChart(this.$props.charData);
    },
    beforeUpdate: function () {
    },
    watch: {
        charData: function (val, oldVal) {
            this.drawChart(val);
        }
    },
    methods: {
        drawChart: function (datas) {
            var _self = this;
            this.chart && this.chart.destroy();
            let data = datas;
            this.chart = new G2.Chart({
                id: this.id,
                height: 245,
                //width: 525,
                width: 472,
                //forceFit: true,
                background: {
                    fill: "#17202e",
                    fillOpacity: 1,
                    stroke: "",
                    strokeOpacity: 1,
                    opacity: 1,
                    lineWidth: 1,
                    radius: 0
                }
            });
            this.chart.source(data, {
                value: {
                    range: [0, 1],
                    alias: _self.$t("notice.transCount")
                },
                day: {
                    type: 'timeCat',
                    range: [0, 1],
                    alias: _self.$t("notice.transDate"),
                    formatter: val => {
                        //console.log(_self.$i18n.locale);
                        if(val){
                            var valueDate=new Date(val);
                            return _self.$i18n.locale==="zh"?((parseInt(valueDate.getMonth(),10)+1)+"-"+valueDate.getDate()):formatDateEn(valueDate);
                        }
                        return "";
                    },
                    nice: false
                }
            });
            this.chart.line().position('day*value').color("#5e84b8").size(1);
            this.chart.point().position('day*value').color('#5e84b8')
                .shape('circle')
                .label('value', {offset: 10, label: {fill: '#fff'}});
            this.chart.render();
        }
    }
}
</script>
