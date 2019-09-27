/**
 * Created by yfyuan on 2017/3/28.
 */
'user strict';
elCube.controller('paramCtrl', function ($scope, $uibModal, $http) {

    var evalValue = function (value) {
        if (isNaN(Number(value))) {
            var now = function (i, key) {
                if (i == undefined) {
                    return +moment();
                }
                return +moment().add(i, key);
            };
            var interval = function (i, key) {
                if (i == undefined) {
                    i == 1
                }
                var y = 0;
                switch (key) {
                    case 'h':
                        y = 60 * 60 * 1000;
                        break;
                    case 'd':
                        y = 24 * 60 * 60 * 1000;
                        break;
                    case 'm':
                        y = 60 * 1000;
                        break;
                    case 's':
                        y = 1000;
                        break;
                }
                return i * y;
            };
            return eval(value);
        } else {
            return value;
        }
    };

    var formatter = function (d, f) {
        if (_.isUndefined(f)) {
            return d;
        } else {
            return moment(d).format(f);
        }
    };
    $scope.init = function () {
        $scope.param = $scope.$parent.param;
        $scope.param.selects = [];
        if(!$scope.param.type && $scope.param.paramType != 'daterangepicker') $scope.param.type = '=';
        if($scope.param.paramType == 'daterangepicker') $scope.param.type = '[a,b]';
        if(!$scope.param.values) $scope.param.values = [];
        if(!$scope.param.datesinglepickerValues) $scope.param.datesinglepickerValues = [];
        if(!$scope.param.daterangepickerValues) $scope.param.daterangepickerValues = [];
        if(!$scope.param.multipleValues) $scope.param.multipleValues = [];
        if ($scope.param.paramType == 'slider') {
            var cfg = $scope.param.cfg;
            var _max = evalValue(_.result(cfg, 'max', null));
            var _min = evalValue(_.result(cfg, 'min', null));
            var apply = _.debounce($scope.$parent.applyParamFilter, 800);
            $scope.slider = {
                minValue: _max - Number(evalValue(_.result(cfg, 'range', 0))),
                maxValue: _max,
                options: {
                    floor: _min,
                    ceil: _max,
                    draggableRange: true,
                    enforceStep: false,
                    maxRange: Number(evalValue(_.result(cfg, 'maxRange', null))),
                    step: evalValue(_.result(cfg, 'step', 1 * 60 * 1000)),
                    translate: function (value) {
                        return formatter(value, cfg.formatter);
                    },
                    onChange: function (sliderId, modelValue, highValue, pointerType) {
                        $scope.param.type = _.result(cfg, 'filterType', '[a,b]');
                        $scope.param.values = [formatter(modelValue, cfg.value_fmt), formatter(highValue, cfg.value_fmt)];
                        apply();
                    }
                }
            };
            $scope.param.type = _.result(cfg, 'filterType', '[a,b]');
            $scope.param.values = [formatter($scope.slider.minValue, cfg.value_fmt), formatter($scope.slider.maxValue, cfg.value_fmt)];
            $scope.param.refresh = function () {
                if ($scope.slider.maxValue == $scope.slider.options.ceil) {
                    var _range = $scope.slider.maxValue - $scope.slider.minValue;
                    var cfg = $scope.param.cfg;
                    var max = evalValue(_.result(cfg, 'max', null));
                    var min = evalValue(_.result(cfg, 'min', null));
                    $scope.slider.maxValue = max;
                    $scope.slider.minValue = max - _range;
                    $scope.slider.options.floor = min;
                    $scope.slider.options.ceil = max;
                    $scope.param.type = _.result(cfg, 'filterType', '[a,b]');
                    $scope.param.values = [formatter($scope.slider.minValue, cfg.value_fmt), formatter($scope.slider.maxValue, cfg.value_fmt)];
                }
            }
        } else {
        	
        	var GetDateStr = function (AddDayCount) {
       		   var dd = new Date();
       		   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
       		   var y = dd.getFullYear();
       		   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
       		   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
       		   return y+"-"+m+"-"+d;
       	    };
        	if($scope.param.paramType =='datesinglepicker' && $scope.param.datesinglepickerValues.length != 0 && $scope.param.datesinglepickerValues[0] != ""){
	             $scope.param.values= [GetDateStr(parseInt($scope.param.datesinglepickerValues[0]))]
            };
        	if($scope.param.paramType =='daterangepicker' && $scope.param.daterangepickerValues.length != 0 && $scope.param.daterangepickerValues[0] != "" && $scope.param.daterangepickerValues[1] != ""){
 	             $scope.param.values = [GetDateStr(parseInt($scope.param.daterangepickerValues[0])),GetDateStr(parseInt($scope.param.daterangepickerValues[$scope.param.daterangepickerValues.length - 1]))]
            };
            _.each($scope.param.col, function (c) {
                var p;
                if (_.isUndefined(c.datasetId)) {
                    _.each($scope.board.layout.rows, function (row) {
                        _.each(row.widgets, function (widget) {
                            if (widget.widget.id == c.widgetId) {
                                p = {
                                    datasourceId: widget.widget.data.datasource,
                                    query: angular.toJson(widget.widget.data.query),
                                    datasetId: null
                                };
                            }
                        });
                    });
                } else {
                    p = {datasourceId: null, query: null, datasetId: c.datasetId};
                }
                $http.post("dashboard/getDimensionValues.do", {
                    datasourceId: p.datasourceId,
                    query: p.query,
                    datasetId: p.datasetId,
                    colmunName: c.column
                }).success(function (response) {
                    _.each(response, function (s) {
                        if (_.indexOf($scope.param.selects, s) < 0) {
                            $scope.param.selects.push(s);
                        }
                    });

                });
            });
        }
        $scope.$emit('paramInitFinish', $scope.param);
    };

    $scope.editParam = function () {
        $uibModal.open({
            templateUrl: 'com/eavinlau/view/dashboard/modal/param.html',
            windowTemplateUrl: 'com/eavinlau/view/util/modal/window.html',
            backdrop: false,
            size: 'lg',
            resolve: {
                param: function () {
                    if ($scope.param) {
                        return angular.copy($scope.param);
                    } else {
                        return {type: '='}
                    }
                },
                filter: function () {
                    return false;
                },
                getSelects: function () {
                    return function (byFilter, column, callback) {
                        callback($scope.param.selects);
                    };
                },
                ok: function () {
                    return function (param) {
                        $scope.param.values = param.values;
                        $scope.param.type = param.type;
                        $scope.applyParamFilter();
                    }
                }
            },
            controller: 'paramSelector'
        });
    };
    
    $scope.editParamConfig = function () {
        $uibModal.open({
            templateUrl: 'com/eavinlau/view/dashboard/modal/param-config.html',
            windowTemplateUrl: 'com/eavinlau/view/util/modal/window.html',
            backdrop: false,
            size: 'lg',
            resolve: {
                param: function () {
                    if ($scope.param) {
                        return angular.copy($scope.param);
                    } else {
                        return {type: '[a,b]'}
                    }
                },
                filter: function () {
                    return false;
                },
                getSelects: function () {
                    return function (byFilter, column, callback) {
                        callback($scope.param.selects);
                    };
                },
                ok: function () {
                    return function (param) {
                        $scope.param.values = param.values;
                        $scope.param.datesinglepickerValues = param.datesinglepickerValues;
                        $scope.param.daterangepickerValues = param.daterangepickerValues;
                        $scope.param.multipleValues = param.multipleValues;
                        $scope.param.type = param.type;
                    }
                }
            },
            controller: 'paramSelector-config'
        });
    };

});
