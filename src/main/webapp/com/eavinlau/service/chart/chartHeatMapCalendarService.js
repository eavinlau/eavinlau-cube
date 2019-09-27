/**
 * Created by Junjie.M on 2017/07/26.
 */
'use strict';
elCube.service('chartHeatMapCalendarService', function () {

    this.render = function (containerDom, option, scope, persist) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        return new ELCubeEChartRender(containerDom, option).chart(height, persist);
    };

    this.parseOption = function (data) {
        var preferredLanguage = settings.preferredLanguage;
        var config = data.chartConfig;
        var dateFormat = config.values[0].dateFormat ? config.values[0].dateFormat : "yyyy-MM-dd";
        var style = config.values[0].style ? config.values[0].style : "blue";
        // var style = 

        var dates = data.keys.map(function (item) {
            var date = item[0];
            if ("yyyyMMdd" == dateFormat) {
                return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
            } else if ("yyyy/MM/dd" == dateFormat) {
                return date.replace(/\//g, '-')
            }
            return date;
        });
        

        var yearMap = {};
        dates.map(function (date) {
            var time = +echarts.number.parseDate(date);
            if (time) {
                var year = echarts.format.formatTime('yyyy', time);
                yearMap[year] = 1;
            }
        });
        var yearArr = [];
        for (var year in yearMap) {
            yearArr.push(year);
        }
        // 从大到小
        yearArr.sort(function (a, b) {
            return b - a
        });
        var count = 0;
        var calendar = yearArr.map(function (year) {
            return {
                top: 60 + 140 * count++,
                cellSize: ['auto', 25],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#dbdfe8',
                        width: 1,
                        type: 'solid'
                    }
                },
                range: year,
                itemStyle: {
                    normal: {
                        color: '#07a2a4',
                        borderWidth: 1,
                        borderColor: '#039092'
                    }
                },
                monthLabel: {
                    nameMap: preferredLanguage,
                    textStyle: {
                        color: '#2f2f2f'
                    }
                },
                dayLabel: {
                    firstDay: 1,
                    nameMap: preferredLanguage,
                    textStyle: {
                        color: '#2f2f2f'
                    }
                },
                yearLabel: {show: true}
            };
        });

        var min = 0;
        var max = 0;
        var dataMap = {};
        var datas = [];
        for (var i in data.keys) {
            var time = +echarts.number.parseDate(dates[i]);
            if (time) {
                var year = echarts.format.formatTime('yyyy', time);
                var date = echarts.format.formatTime('yyyy-MM-dd', time);
                if (dataMap[year])
                    datas = dataMap[year];
                else
                    datas = [];
                var value = data.data[0][i];
                min = value < min ? value : min;
                max = value > max ? value : max;
                datas.push([date, value]);
                dataMap[year] = datas;
            }
        }
        count = 0;
        var series = yearArr.map(function (year) {
            return {
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                calendarIndex: count++,
                data: dataMap[year],
                symbolSize: function (val) {
                	if (val[1] / 5000<5) {
						return 5;
					}else if (val[1] / 5000>18) {
						return 18;
					} else {
						return val[1] / 5000;
					}
                },
                hoverAnimation: true,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    normal: {
                        color: style,
                        shadowBlur: 10,
                        shadowColor: '#2ec7c9'
                    }
                },
            };
        });
        
        /*console.log(data)*/

        var option = {
            tooltip: {
                position: 'top',
                trigger: 'item',
                axisPointer: {
                    show: true,
                    type: 'shadow'
                },
                formatter: function (params) {
                    return elcubeTranslate("COMMON.DATE") + ': ' + params.value[0] + "<br>"
                        + elcubeTranslate("COMMON.VALUE") + ": " + params.value[1];
                }
            },
           
           /* visualMap: {
                
                type:'piecewise',
                calculable: true,
                orient: 'horizontal',
                left: 'left',
                bottom: '90%',
                show: true,
                inRange: {
                    color: ['#eee', style]
                }
            },*/
            calendar: calendar,
            series: series
            	
        };
        console.log(option, "option-333")
        return option;
    };

});