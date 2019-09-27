/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
elCube.service('chartLineService', function ($state, $window) {

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
        var series_data = [];
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var tunningOpt = chartConfig.option;
        // console.log(tunningOpt, "tunningOpt")
        var zipDataWithCfg = _.chain(aggregate_data)
            .map(function (data, i) {
                var joined_values = casted_values[i].join('-');
                var s = newValuesConfig[joined_values];
                s.key =joined_values;
                s.data = data;
                return s;
            }).value()

        var sum_data =_.chain(zipDataWithCfg)
            .groupBy(function (item) {
                return item.valueAxisIndex;
            })
            .map(function (axisSeries) {
                var sumArr = [];
                for (var i = 0; i < axisSeries[0].data.length; i++) {
                    var sumItem = 0;
                    for (var j = 0; j < axisSeries.length; j++) {
                        var cell = axisSeries[j].data[i];
                        sumItem += cell? Number(cell) : 0;
                    }
                    sumArr.push(sumItem)
                }
                return sumArr;
            })
            .value();

        for (var j = 0; aggregate_data[0] && j < aggregate_data[0].length; j++) {
            for (var i = 0; i < aggregate_data.length; i++) {
                aggregate_data[i][j] = aggregate_data[i][j] ? Number(aggregate_data[i][j]) : 0;
            }
        }

        for (var i = 0; i < zipDataWithCfg.length; i++) {
            var s = zipDataWithCfg[i];
            s.name = s.key;
            var sumData = sum_data[s.valueAxisIndex];
            if (s.type.indexOf('percent') > -1) {
                if (chartConfig.valueAxis === 'horizontal') {
                    s.data = _.map(s.data, function (e, i) {
                        return (e / sumData[i] * 100).toFixed(2);
                    })
                } else {
                    s.data = _.map(s.data, function (e, i) {
                        return [i, (e / sumData[i] * 100).toFixed(2), e];
                    });
                }
            }
            s.coordinateSystem = chartConfig.coordinateSystem;

            if (s.type == 'stackbar') {
                s.type = 'bar';
                s.stack = s.valueAxisIndex.toString();
                s.barWidth =  10;
                s.itemStyle =  {
                    normal: {
                        barBorderRadius: 5,
                        color: '#8F43FA',
                    }
                }
            } else if (s.type == 'percentbar') {
                s.type = 'bar';
                s.stack = s.valueAxisIndex.toString();
                s.barWidth =  10;
                s.itemStyle =  {
                    normal: {
                        barBorderRadius: 5,
                        color: '#60C9FD',
                    }
                }
                // s.areaStyle = {normal: {color: "#287927"}};
            } else if (s.type == "arealine") {
                s.type = "line";
                s.areaStyle = {normal: {}};
            } else if (s.type == "stackline") {
                s.type = "line";
                s.stack = s.valueAxisIndex.toString();
                s.areaStyle = {normal: {}};
            } else if (s.type == 'percentline') {
                s.type = "line";
                s.stack = s.valueAxisIndex.toString();
                s.areaStyle = {normal: {}};
            }
            if (chartConfig.valueAxis == 'horizontal') {
                s.xAxisIndex = s.valueAxisIndex;
            } else {
                s.yAxisIndex = s.valueAxisIndex;
            }
            s.barMaxWidth = 40;
            series_data.push(s);
            // console.log(s, "s--")
        }
        // console.log(series_data, "series_data")
        var valueAxis = angular.copy(chartConfig.values);
        _.each(valueAxis, function (axis, index) {
            axis.axisLabel = {
            	textStyle:{
                   color: '#203160'//字体颜色
                },
                formatter: function (value) {
                    return numbro(value).format("0a.[0000]");
                }
            };
            axis.splitLine = {
                 lineStyle:{
                    type: 'dashed'
                 }
            };
            axis.axisLine = {
                show: false
            };
            if (axis.series_type == "percentbar" || axis.series_type == "percentline") {
                axis.min = 0;
                axis.max = 100;
            } else {
                axis.min = axis.min ? axis.min : null;
                axis.max = axis.max ? axis.max : null;
            }
            if (index > 0) {
                axis.splitLine = false;
            }
            axis.scale = true;
        });

        if (tunningOpt) {
            var labelInterval, labelRotate;
            tunningOpt.ctgLabelInterval ? labelInterval = tunningOpt.ctgLabelInterval : 'auto';
            tunningOpt.ctgLabelRotate ? labelRotate = tunningOpt.ctgLabelRotate : 0;
        }

        var categoryAxis = {
            type: 'category',
            data: string_keys,
            splitLine:{
            	lineStyle:{
            		type: 'dashed'
            	},
            	show: false
            },
            axisLabel: {
            	textStyle: {
                    color: '#203160',//坐标值得具体的颜色

                },
                interval: labelInterval,
                rotate: labelRotate
            },
            boundaryGap: false
        };

        _.each(valueAxis, function (axis) {
            var _stype = axis.series_type;
            if (_stype.indexOf('bar') !== -1) {
                categoryAxis.boundaryGap = true;
            }
        });

        var echartOption = {
            grid: angular.copy(echartsBasicOption.grid),
            legend: {
            	textStyle:{
                    color: '#203160'//字体颜色
                },
                data: _.map(casted_values, function (v) {
                    return v.join('-');
                })
            },
            tooltip: {
                formatter: function (params) {
                    var name = params[0].name;
                    var s = name + "</br>";
                    for (var i = 0; i < params.length; i++) {
                        s += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>';
                        if (params[i].value instanceof Array) {
                            s += params[i].seriesName + " : " + params[i].value[1] + "% (" + params[i].value[2] + ")<br>";
                        } else {
                            s += params[i].seriesName + " : " + params[i].value + "<br>";
                        }
                    }
                    return s;
                },
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            color:color,
            itemStyle: {
                normal: {
                    show: true,
                    /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#00c0e9'
                    }, {
                        offset: 1,
                        color: '#3b73cf'
                    }]),*/
                    barBorderRadius: 10,
                    borderWidth: 0,
                },
                emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(182,123, 214, 0.7)'
                }
            },
            series: series_data
        };

        if (chartConfig.coordinateSystem == 'polar') {
            echartOption.angleAxis = chartConfig.valueAxis == 'horizontal' ? valueAxis : categoryAxis;
            echartOption.radiusAxis = chartConfig.valueAxis == 'horizontal' ? categoryAxis : valueAxis;
            echartOption.polar = {};
        } else {
            echartOption.xAxis = chartConfig.valueAxis == 'horizontal' ? valueAxis : categoryAxis;
            echartOption.yAxis = chartConfig.valueAxis == 'horizontal' ? categoryAxis : valueAxis;
        }

        if (chartConfig.valueAxis === 'horizontal') {
            echartOption.grid.left = 'left';
            echartOption.grid.containLabel = true;
            echartOption.grid.bottom = '5%';
        }
        if (chartConfig.valueAxis === 'vertical' && chartConfig.values.length > 1) {
            echartOption.grid.right = 40;
        }

        // Apply tunning options
        echartOption.color =  ["#3EC6F5", "#b6a2de", "#00ea71", "#37b7ff", "#3adbb8", "#ff7a5e", "#ffc10b", "#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"];
        updateEchartOptions(tunningOpt, echartOption);
        // console.log(echartOption, "echartOption")
        return echartOption;
    };
});
