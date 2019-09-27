/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
elCube.service('chartPieService', function ($state, $window) {

    this.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new ELCubeEChartRender(containerDom, option);
        render.addClick(chartConfig, relations, $state, $window);
        return render.chart(null, persist);
    };

    this.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        var series = new Array();
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_value = _.map(casted_values, function (value) {
            return value.join('-');
        });
        var b = 100 / (casted_values.length * 9 + 1);
        var titles = [];

        for (var i = 0; i < aggregate_data.length; i++) {
            var joined_values = casted_values[i].join('-');
            var realType = angular.copy(newValuesConfig[joined_values]).type;
            var s = {
                name: string_value[i],
                type: 'pie',
                realType: realType,
                center: [5 * b + i * 9 * b + '%', '50%'],               
                data: [],
                //roseType: 'angle'
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            //position:'inside',
                            formatter: '{b}: {d}%'
                        },
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    labelLine: {show: true}
                }
            };
            if (realType == 'coxcomb') {
                s.roseType = 'angle';
            }
            titles.push({
                textAlign: 'center', textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }, text: string_value[i], left: 5 * b + i * 9 * b + '%', top: '90%'
            });
            var colorList1 = [
            	"#FFCCCC", 
            	"#00FFB4", 
            	"#00FAFC", 
            	"#99CC33", 
            	"#FFCC99", 
            	"#FF99CC", 
            	"#666699", 
            	"#99CCFF",
            	"#CC9966", 
            	"#FFFFCC",
            	"#ABCDEF",
            	"#CCCC66",
            	"#CC99CC",
            	"#FFCC99",
            	"#CCFF66",
            	"#66CC99",
            	"#CCCC99",
            	"#CCCCCC",
            	"#99CC99",
            	"#CCFF66"
            	];
            var colorList2 = [
            	"#FF070D", 
            	"#00CEE1", 
            	"#0079FF", 
            	"#FF8F00", 
            	"#FF6600", 
            	"#CC3399", 
            	"#660099", 
            	"#0099CC", 
            	"#996633",
            	"#FFFF00",
            	"#3366CC",
            	"#999933",
            	"#663366",
            	"#FF9900",
            	"#99CC33",
            	"#339999",
            	"#663300",
            	"#999999",
            	"#003333",
            	"#99CC00"
            	];
            for (var j = 0; j < aggregate_data[i].length; j++) {
                s.data.push({
                    name: string_keys[j],
                    value: _.isUndefined(aggregate_data[i][j]) ? 0 : aggregate_data[i][j],
                    itemStyle:{
                      normal:{
                          color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                          {
                              offset: 0.2,
                              color: (function(params) {
                                    return colorList1[j];
                                  })()
                          },{
                              offset: 1,
                              color: (function(params) {
                                    return colorList2[j];
                                  })()
                          }])
                      }
                    }
                });
            }
            series.push(s);
        }
        var echartOption = {
            /*title: titles,*/
            /*legend: {
                orient: 'vertical',
                x: 'left',
                textStyle:{
                    color: '#fff'//字体颜色
                },
                data: string_keys
            },*/
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: false,
            series: series
        };

        updateEchartOptions(chartConfig.option, echartOption);
        console.log(echartOption, "123")
        return echartOption;
    };
});