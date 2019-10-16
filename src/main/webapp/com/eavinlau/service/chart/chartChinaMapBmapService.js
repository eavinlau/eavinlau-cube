/**
 * Created by jintian on 2017/8/23.
 */
elCube.service('chartChinaMapBmapService', function () {
    this.render = function (containerDom, option, scope, persist,drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        return new ELCubeBMapRender(containerDom, option).chart(height, persist);
    };

    this.parseOption = function (data) {
        var optionData = [];
        var seriesData = [];
        var data_keys = data.keys;
        var data_series = data.series;

        //var planePath = 'path://M1136.047896 339.882267C1112.706905 143.149344 1017.345943-0.2756 900.268988 0.0004L358.6862 1.290399c-117.106954 0.276-211.762917 144.067944-234.275909 340.954867C42.146324 391.197247-0.27366 490.974208 0.00134 606.394163c0.184 85.699967 24.016991 162.533937 69.902973 216.394916l0.46 191.364925 212.804916-0.49-0.276-112.077956 697.337728-1.687 0.276 112.076957 212.805917-0.521-0.46-191.364925c45.639982-54.014979 69.134973-131.001949 68.919973-216.700916-0.245-115.205955-43.185983-214.890916-125.725951-263.506897zM358.9312 74.320371l541.583788-1.289c75.392971-0.184 141.491945 101.98596 166.489935 240.563907-11.532995-2.299999-23.648991-3.709999-36.193986-4.446999 0-0.307 0.338-0.92 0.062-0.889999-101.89396 0.246-70.055973 0.154-141.799944 0.337999s-46.559982 0.092-118.118954 0.276l-523.669796 1.257c-19.016993 0.031-36.990986 2.085999-53.983979 5.551998C217.807255 176.920331 283.538229 74.473371 358.9312 74.320371zM218.298255 702.030126c-46.590982 0.092-84.317967-42.787983-84.440967-95.973963-0.123-53.093979 37.419985-96.249962 83.980967-96.372962 46.376982-0.092 84.103967 42.879983 84.256967 95.974962 0.123 53.277979-37.389985 96.249962-83.796967 96.371963z m656.972743-18.126993l-488.365809 0.583c-76.12997 0.184-77.78597-131.124949-0.307-131.308949l488.366809-1.166c71.219972-0.184 71.527972 131.707949 0.306 131.891949z m168.667934 16.133994c-46.468982 0.122-84.195967-42.757983-84.318967-95.943963-0.122-53.093979 37.419985-96.279962 83.858967-96.372962 46.499982-0.122 84.256967 42.849983 84.379967 95.973962 0.03 53.278979-37.450985 96.280962-83.919967 96.342963z'
        //var planePath = 'path://M726.353 191.887c1.257 32.687 1.257 65.375 2.514 98.062 15.087 7.543 28.915 18.858 41.488 37.715v17.601l-40.231-11.314c5.029 192.352 7.543 389.732-3.771 582.084-1.257 21.373-25.144 76.689-45.259 82.976-114.405 32.687-213.724 33.944-331.901 0-21.373-6.286-50.288-61.602-51.545-82.976-12.571-189.837-7.543-388.475-3.771-582.084l-40.231 11.314v-17.601c11.314-18.858 25.144-30.173 40.231-37.715 1.257-32.687 1.257-65.375 2.514-98.062 1.257-67.889 22.63-124.463 65.375-152.121 76.689-50.288 199.895-51.545 279.099-11.314 54.059 25.144 82.976 88.004 85.49 163.436zM327.82 276.119c10.057 47.774 30.173 94.29 52.802 140.807 40.231-11.314 84.233-16.344 128.234-17.601v-8.8h-20.115c-3.771 0-6.286-2.514-6.286-6.286s2.514-6.286 6.286-6.286h52.802c3.771 0 6.286 2.514 6.286 6.286s-2.514 6.286-6.286 6.286h-21.373v8.8c42.745 0 86.747 6.286 125.72 17.601 21.373-42.745 38.974-90.519 52.802-140.807-99.319-36.458-272.812-36.458-370.874 0zM694.922 970.094l-86.747 22.63v13.83c41.488-8.8 82.976-17.601 86.747-36.458zM332.848 970.094c3.771 20.115 45.259 27.658 86.747 36.458v-13.83l-86.747-22.63zM337.878 249.718c12.571-81.719 40.231-158.408 84.233-226.296-2.514 0-6.286 1.257-8.8 1.257-57.831 20.115-88.004 62.859-98.062 119.434l61.602-65.375c-27.658 49.031-44.002 105.604-54.059 167.208v20.115c5.029-6.286 10.057-11.314 15.087-16.344zM702.466 142.856c-10.057-56.574-40.231-99.319-98.062-119.434-2.514 0-6.286-1.257-8.8-1.257 45.259 67.889 71.66 144.578 84.233 226.296 5.029 5.029 10.057 10.057 15.087 16.344v-20.115c-10.057-61.602-26.401-116.92-54.059-167.208l61.602 65.375zM396.966 645.735c-20.115 51.545-38.974 99.319-56.574 143.321 82.976 66.632 261.498 66.632 343.215 0-17.601-44.002-36.458-91.776-56.574-143.321-62.859 21.373-168.465 21.373-230.068 0zM702.466 382.98c-2.514-5.029-5.029-11.314-6.286-16.344-15.087 45.259-32.687 77.946-47.774 111.891v140.807l51.545 1.257c3.771-79.203 5.029-147.092 2.514-237.611zM650.921 635.678c12.571 37.715 27.658 60.345 44.002 77.946 1.257-26.401 2.514-51.545 3.771-74.175l-47.774-3.771zM317.762 376.695c-2.514 91.776-1.257 162.179 2.514 243.897l51.545-1.257v-148.349c-18.858-32.687-35.201-67.889-47.774-111.891-1.257 6.286-3.771 11.314-6.286 17.601zM369.308 635.678l-47.774 3.771c1.257 23.887 2.514 47.774 3.771 74.175 16.344-18.858 31.43-41.488 44.002-77.946z'
        var planePath = 'path://M176.6,57.9h-39.4c-0.2-5.6-0.4-11.9-0.8-16.9c-0.2-4.6-6.5-7.8-14.8-9.4V37l-1.3-0.4c-8.3-1.9-21.5-1.9-29.8,0L89.3,37   v-5.6c-8.7,1.6-15,4.8-15.2,9.4c-0.3,5-0.5,11.4-0.7,17.1H33.9l0,0h39.4c-0.2,4.7-0.3,9.6-0.4,14.6c-1.9,0.9-3.7,2.6-5.2,5v2.6   l4.9-1.3c-0.6,29-0.4,61.1,1.1,84.6c0.1,3.1,2.6,4.8,5.7,5.7c17.4,5,34.4,4.6,51.1,0c2.9-0.9,5.5-2.6,5.7-5.7   c1.5-23.7,1.9-55.7,1.3-84.6l5.2,1.5v-2.6c-1.5-2.6-3.3-4.1-5.2-5.2c-0.1-5-0.2-9.9-0.3-14.6H176.6L176.6,57.9z M124.7,34.5   c3.8,0.9,7.2,2.2,9.4,4.8v1.6c-3.1-0.7-6.3-1.3-9.4-2V34.5z M76.5,39.3c2.2-2.4,5.5-3.9,9.4-4.5v4.4c-3.1,0.7-6.3,1.3-9.4,2V39.3z    M125.5,124.8v-18.1l8,0.5c0,6.7-0.2,13.3-0.6,20L125.5,124.8z M132.8,129.9c-0.2,3.2-0.4,6.2-0.6,9.3c-2.6-2.5-4.8-5.8-6.3-11.9   L132.8,129.9z M109.6,85h-7.8c-0.5,0-0.9,0.4-0.9,0.9s0.3,0.9,0.9,0.9h2.8v1.3c-5.9,0.2-11.8,0.9-17.4,2.6c-1.8-7.6-4-14.5-7-20.6   c13.3-5.4,37.2-5.4,50.3,0c-2.7,6.3-5.1,13.2-7,20.6c-5.3-1.7-11.1-2.6-17-2.6v-1.3h3.1c0.5,0,0.9-0.4,0.9-0.9S110.2,85,109.6,85z    M77.6,127.3l-0.6-20l8-0.6v18.2L77.6,127.3z M84.2,127.5c-1.6,5.5-3.8,8.9-6.1,11.9c0-3.2-0.2-6.2-0.4-9.3L84.2,127.5z M77,104.5   c-0.2-8.3-0.2-16.9,0-25.2c0.4-0.9,0.6-1.8,1.1-2.8c2.9,5.2,5.1,11.3,7,17.8v10L77,104.5z M125.6,104.5v-10c1.8-6.5,4-12.6,7-17.8   c0.2,0.7,0.5,1.7,0.9,2.6c0.2,8.4,0.2,16.9,0.2,25.4L125.6,104.5z M87.9,169.6c-5.9-1.3-12-2.6-12.4-5.6c4.3,1.1,8.4,2.4,12.4,3.6   V169.6z M80.2,146.2c2.7-4.8,5.3-9.8,8.3-15.4c9.1,2.2,24.5,2.2,33.6,0c2.9,5.6,5.7,10.6,8.3,15.4   C118.3,153.2,92.2,153.2,80.2,146.2z M122.4,169.5v-2c4.1-1.1,8.3-2.4,12.4-3.5C134.4,166.7,128.3,168,122.4,169.5z'
                
        var fromName;
        var fromN;
        var fromL;
        var toName;
        var toN;
        var toL;
        var effectScatterValue;
        var max;
        var min;
        var j = 0;
        var maxScatter;
        
        /*添加飞线数据*/
        var lineSum = [];
        //var pointSum = [];
        //var pointSumHas = false;
        for (var i = 0; i < data.data[0].length; i++) {
        	lineSum.push(0)
		}
        /*添加飞线数据*/
    	
        for(var serieConfig in data.seriesConfig){
            var serieType = data.seriesConfig[serieConfig].type;
            //重置为null，防止脏数据
            fromName = null;
            fromN = null;
            fromL = null;
            if(data_series[j].length > 3){
                fromName = data_series[j][2];
                fromN = parseFloat(data_series[j][0]);
                fromL = parseFloat(data_series[j][1]);
            }else if(data_series[j].length == 3){
                fromName = data_series[j][1];
                fromN = parseFloat(data_series[j][0].split(",")[0]);
                fromL = parseFloat(data_series[j][0].split(",")[1]);
            }

            //根据不同的地图类型获取不同的series
            switch (serieType){
                case "markLine" :
                    var lineData = [];
                    var lineData1 = [];
                    var lineData2 = [];
                    
                    /*求飞线数据和飞线点数据*/
                    //var pointSumIn = 0;
                    var sersdata=data.data;
    				for (var n = 0; n < data.data[j].length; n++) {
    					if (typeof(data.data[j][n])!="undefined") {
    						//pointSumIn += parseInt(data.data[j][n]);
    						lineSum[n] += parseInt(data.data[j][n]);
    					}
    				}
    				
    				//pointSum.push(pointSumIn);
    				//console.log(lineSum)
    				//console.log(pointSum)
                    /*求飞线数据和飞线点数据*/
                    
                    if(fromN && fromL){
                        for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                            toName = null;
                            toN = null;
                            toL = null;
                            if(data_keys[i].length > 2){
                                toName = data_keys[i][2];
                                toN = parseFloat(data_keys[i][0]);
                                toL = parseFloat(data_keys[i][1]);
                            }else if(data_keys[i].length == 2){
                                toName = data_keys[i][1];
                                toN = parseFloat(data_keys[i][0].split(",")[0]);
                                toL = parseFloat(data_keys[i][0].split(",")[1]);
                            };
                            

                            if(data.data[j][i] && toN && toL){
                                lineData.push({
                                	fromName: fromName,
                                    toName: toName,
                                    coords: [[fromN,fromL],[toN, toL]],
                                    value: data.data[j][i]    
                                });
                                lineData1.push({
                                	name: fromName,
                                	value: [fromN, fromL]
                                });
                                lineData2.push({
                                	name: toName,
                                	value: [toN, toL,parseFloat(lineSum[i])]
                                });

                                if(max == null || max <= parseFloat(data.data[j][i])){
                                    max = parseFloat(data.data[j][i]) + 10;
                                }
                                if(min == null || min >= parseFloat(data.data[j][i])){
                                    min = parseFloat(data.data[j][i]) - 10;
                                }
                            }
                        };
                        
                        if(lineData.length > 0){
                            seriesData.push(
                                {
                                    name:fromName,
                                    type: 'lines',
                                    coordinateSystem: 'bmap',
                                    symbol: ['none', 'arrow'],
                                    symbolSize: 6,
                                    tooltip: {
                                    },
                                    effect: {
                                    	show: true,
                                        period: 6,
                                        trailLength: 0,
                                        symbol: planePath,
                                        symbolSize: 22
                                    },
                                    lineStyle: {
                                          normal: {
                                          color: '#C5F80E',
                                          width: 1,
                                          opacity: 0.6,
                                          curveness: 0.2
                                         }
                                     },
                                    data: lineData
                                },{
                                    name: fromName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'bmap',
                                    data: lineData1,
                                    symbolSize: function (val) {
                                        /*return val[2] / 5;*/
                                    	return 16
                                    },
                                    showEffectOn: 'render',
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    hoverAnimation: true,
                                    label: {
                                        normal: {
                                            formatter: '{b}',
                                            position: 'right',
                                            show: true
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f4e925'
                                        }
                                    },
                                    zlevel: 1
                                },{
                                    name: toName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'bmap',
                                    data: lineData2,
                                    symbolSize: function (val) {
                                        /*return val[2] / 5;*/
                                    	return 16
                                    },
                                    showEffectOn: 'render',
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    hoverAnimation: true,
                                    label: {
                                        normal: {
                                            formatter: '{b}',
                                            position: 'right',
                                            show: true
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f4e925'
                                        }
                                    },
                                    zlevel: 1
                                }
                            );
                            optionData.push(fromName);
                        }
                    }
                    break;
                case "heat" :
                    var heatmapData = [];
                    for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                        toName = null;
                        toN = null;
                        toL = null;
                        if(data_keys[i].length > 2){
                            toName = data_keys[i][2];
                            toN = parseFloat(data_keys[i][0]);
                            toL = parseFloat(data_keys[i][1]);
                        }else if(data_keys[i].length == 2){
                            toName = data_keys[i][1];
                            toN = parseFloat(data_keys[i][0].split(",")[0]);
                            toL = parseFloat(data_keys[i][0].split(",")[1]);
                        };

                        if(data.data[j][i]){
                            heatmapData.push([toN,toL,parseFloat(data.data[j][i])]);

                            if(max == null || max <= parseFloat(data.data[j][i])){
                                max = parseFloat(data.data[j][i]) + 10;
                            }
                            if(min == null || min >= parseFloat(data.data[j][i])){
                                min = parseFloat(data.data[j][i]) - 10;
                            }
                        }
                    }
                    if(heatmapData.length > 0){
                        seriesData.push(
                            {
                                name: serieConfig,
                                type: 'heatmap',
                                coordinateSystem: 'bmap',
                                data: heatmapData
                            }
                        );
                        optionData.push(serieConfig);
                    }
                    break;

                case "scatter" :
                    var scatterData = [];
                    for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                        toName = null;
                        toN = null;
                        toL = null;
                        if(data_keys[i].length > 2){
                            toName = data_keys[i][2];
                            toN = parseFloat(data_keys[i][0]);
                            toL = parseFloat(data_keys[i][1]);
                        }else if(data_keys[i].length == 2){
                            toName = data_keys[i][1];
                            toN = parseFloat(data_keys[i][0].split(",")[0]);
                            toL = parseFloat(data_keys[i][0].split(",")[1]);
                        };

                        if(data.data[j][i]){
                            scatterData.push({
                                name:toName,
                                value:[toN,toL,parseFloat(data.data[j][i])]
                            });
                            if(maxScatter == null || maxScatter < parseFloat(data.data[j][i])){
                                maxScatter = parseFloat(data.data[j][i]);
                            }

                            if(max == null || max <= parseFloat(data.data[j][i])){
                                max = parseFloat(data.data[j][i]) + 10;
                            }
                            if(min == null || min >= parseFloat(data.data[j][i])){
                                min = parseFloat(data.data[j][i]) - 10;
                            }
                        }
                    }
                    
                    
                    if(scatterData.length > 0){
                        seriesData.push(
                            {
                                name: serieConfig,
                                type: 'scatter',
                                coordinateSystem: 'bmap',
                                
                                lineStyle: {
                                      normal: {
                                      color: '#C5F80E',
                                      width: 1,
                                      opacity: 0.6,
                                      curveness: 0.2
                                     }
                                 },
                                
                                data: scatterData,
                                symbolSize : function (val) {
                                	if (val[2] * 30 / maxScatter<8) {
                                		return 8;
									}else if (val[2] * 30 / maxScatter>20) {
										return 20;
									}else {
										return val[2] * 30 / maxScatter;
									}
                                },
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: false
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                }
                            }
                        );
                        optionData.push(serieConfig);
                    }
            }
            j++;
        }


        var startPoint = {
            x: 104.114129,
            y: 37.550339
        };
        // 地图自定义样式
        var bmap = {
            center: [startPoint.x, startPoint.y],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#0A5AED'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#263C7C'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#93EBF8'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
//                {
//                    'featureType': 'label',
//                    'elementType': 'labels.text.fill',
//                    'stylers': {
//                        'color': '#5F6368'
//                    }
//                }
                ]
            }
        };
        var  mapOption = {
            bmap: bmap,
//            legend: {
//                orient: 'vertical',
//                top: 'top',
//                left: 'left',
//                selectedMode: 'multiple',
//                data: optionData
//            },
            visualMap: {
                min: min,
                max: max,
                x : 'left',
				y : 'center',
				show: false,
                //text: ['High', 'Low'],
                inRange: {
                    color: ['#d94e5d','#eac736'].reverse()
                },
                
                textStyle: {
                    color: '#d94e5d'
                }
            },
            tooltip : {
            	trigger: 'item',
                formatter:function(params, ticket, callback){
                  if(params.seriesType=="effectScatter") {
                	  if (params.data.value[2]) {
                		  return params.data.name+":"+params.data.value[2];
					}else {
						return params.data.name
					}
                  }else if(params.seriesType=="lines"){
                    return params.data.fromName+"->"+params.data.toName+"<br />"+params.data.value;
                  }else{
                    return params.name+":"+params.data.value[2];
                  }
                }
              },
            series:seriesData
        };
        console.log(mapOption, "mapOption-2")
        return mapOption;
    };
});
