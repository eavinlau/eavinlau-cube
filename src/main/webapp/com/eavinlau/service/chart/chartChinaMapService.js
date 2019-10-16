/**
 * Created by jintian on 2017/8/22.
 */
elCube.service('chartChinaMapService', function () {
    this.render = function (containerDom, option, scope, persist,drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        return new ELCubeHeatMapRender(containerDom, option).chart(height, persist);
    };

    this.parseOption = function (data) {
        var optionData = [];
        var seriesData = [];
        var data_keys = data.keys;
        var data_series = data.series;
        var chartConfig = data.chartConfig;
        var code = 'china';
        if (chartConfig.city && chartConfig.city.code) {
            code = chartConfig.city.code;
        } else if (chartConfig.province && chartConfig.province.code) {
            code = chartConfig.province.code;
        }

        var url;
        if (code == 'china') {
            url = 'plugins/FineMap/mapdata/china.json'
        } else if (code.length > 2) {
            url = 'plugins/FineMap/mapdata/geometryCouties/' + code + '.json';
        } else {
            url = 'plugins/FineMap/mapdata/geometryProvince/' + code + '.json';
        }

        //var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        //var planePath = 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyMzEzNTE2NTEyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MTY1IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc2Ny45OTc5NjkgNzY3Ljk5Nzk2OXY1NS45OTk0MjhjMCAyMi40MDA1ODQgMTcuNjAwNzQ5IDM5Ljk5OTMwMiAzOS4xOTg5OSAzOS45OTkzMDJoNjQuODAwODE5di05Ni4wMDA3NjFoLTEwMy45OTk4MDl2MC4wMDIwMzF6TTE1Mi4wMDAxOSA4NjMuOTk4NzNoNjQuODAwODE5YzIxLjYwMDI3MyAwIDM5LjE5ODk5MS0xNy42MDA3NDkgMzkuMTk4OTkxLTM5Ljk5OTMwMXYtNTUuOTk5NDI5aC0xMDMuOTk5ODF2OTUuOTk4NzN6IiBmaWxsPSIjMUUyRTM3IiBwLWlkPSIyNDE2NiI+PC9wYXRoPjxwYXRoIGQ9Ik04MzkuOTk3NTI0IDc2Ny45OTc5Njl2MTMwLjM5OTkxN2MwIDI5LjU5OTMyMSAyMy45OTkxNzUgNTMuNjAwNTI3IDUyLjgwMDIxNiA1My42MDA1MjdoMjkuNTk5MzIxYzI5LjU5OTMyMSAwIDUyLjgwMDIxNi0yMy45OTkxNzUgNTIuODAwMjE2LTUzLjYwMDUyN3YtMTQ2LjQwMDA0NGwtMTM1LjE5OTc1MyAxNi4wMDAxMjd6TTQ4LjAwMDM4MSA4OTguMzk3ODg2YzAgMjkuNTk5MzIxIDIzLjk5OTE3NSA1My42MDA1MjcgNTIuODAwMjE2IDUzLjYwMDUyN2gyOS41OTkzMmMyOS41OTkzMjEgMCA1Mi44MDAyMTYtMjMuOTk5MTc1IDUyLjgwMDIxNi01My42MDA1Mjd2LTEzMC4zOTk5MTdsLTEzNS4xOTk3NTItMTYuMDAwMTI3djE0Ni40MDAwNDR6IiBmaWxsPSIjMzI0RDVCIiBwLWlkPSIyNDE2NyI+PC9wYXRoPjxwYXRoIGQ9Ik01MDguNzk4NzU2IDcxLjk5OTU1NmgyLjQwMDkzM2MyNzEuMTk5ODE2IDAgMzM2Ljc5ODkxNSAxMTYuMDAwNDEzIDMzNi43OTg5MTUgMzM1Ljk5ODYwM0gxNzUuOTk5MzY1YzAtMjE5Ljk5ODE5MSA2Ni4zOTk0MS0zMzUuOTk4NjA0IDMzMi43OTkzOTEtMzM1Ljk5ODYwM3oiIGZpbGw9IiNCRjM5MkIiIHAtaWQ9IjI0MTY4Ij48L3BhdGg+PHBhdGggZD0iTTUwOS41OTkwNjcgMTExLjk5ODg1N2gyLjQwMDkzM2MyMzguMzk5MjUxIDAgMjk1Ljk5OTMwMiAxMDIuMzk5MTg4IDI5NS45OTkzMDIgMjk1Ljk5OTMwMkgyMTUuOTk4NjY3YzAtMTkzLjU5ODA4MyA1OC40MDAzNjItMjk1Ljk5OTMwMiAyOTMuNjAwNC0yOTUuOTk5MzAyeiIgZmlsbD0iIzg1QzZEQyIgcC1pZD0iMjQxNjkiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDY4MC4wMDAzMTdjMTYzLjIwMDQ4MiAwIDI5NS45OTkzMDIgMzAuMzk5NjMyIDI5NS45OTkzMDIgNjguMDAwMDMycy0xMzIuNzk4ODE5IDY4LjAwMDAzMi0yOTUuOTk5MzAyIDY4LjAwMDAzMi0yOTUuOTk5MzAyLTMwLjM5OTYzMi0yOTUuOTk5MzAyLTY4LjAwMDAzMmMtMC4wMDIwMzEtMzcuNjAyNDMxIDEzMi43OTg4MTktNjguMDAwMDMyIDI5NS45OTkzMDItNjguMDAwMDMyeiIgZmlsbD0iIzg1MjgxRSIgcC1pZD0iMjQxNzAiPjwvcGF0aD48cGF0aCBkPSJNMTc5LjIwMDYwOSA0MzEuOTk5MzY1bDMzMy41OTk3MDItNDguMDAwMzgxIDMzMS45OTkwOCA0OC4wMDAzODFjOTkuMTk5OTc1IDAgMTc5LjIwMDYwOSA4MC43OTg5MTUgMTc5LjIwMDYwOSAxODEuNTk5NTExdjM5LjE5ODk5MWMwIDI4Ljc5OTAxLTEyLjgwMDkxNCA1MS45OTk5MDUtNTEuMTk5NTk0IDUxLjk5OTkwNUg1MS4xOTk1OTRDMTMuNTk5MTk0IDcwMy45OTk0OTIgMCA2ODAuNzk4NTk3IDAgNjUxLjk5OTU4N3YtMzkuMTk4OTljMC0xMDAuMDAyMzE3IDgwLjAwMDYzNS0xODAuODAxMjMxIDE3OS4yMDA2MDktMTgwLjgwMTIzMnoiIGZpbGw9IiNCRjM5MkIiIHAtaWQ9IjI0MTcxIj48L3BhdGg+PHBhdGggZD0iTTQwLjc5OTYxMyA2OTUuOTk4NDEzaDk0MS41OTg0MzJjMTMuNTk5MTk0IDAgMjQuNzk5NDg2IDEwLjM5OTk4MSAyNC43OTk0ODYgMjMuOTk5MTc1IDAgMjYuNDAwMTA4LTIyLjQwMDU4NCA0OC4wMDAzODEtNTAuMzk5MjgzIDQ4LjAwMDM4MUg2Ni4zOTk0MWMtMjguMDAwNzMgMC01MC4zOTkyODMtMjEuNjAwMjczLTUwLjM5OTI4My00OC4wMDAzODEgMC0xMy41OTkxOTQgMTEuMjAwMjkyLTIzLjk5OTE3NSAyNC43OTk0ODYtMjMuOTk5MTc1eiIgZmlsbD0iI0U0RTdFNyIgcC1pZD0iMjQxNzIiPjwvcGF0aD48cGF0aCBkPSJNODU4LjM5ODU4NCA0MDcuMTk5ODc5cy05Mi43OTk1MTggMzYuODAwMDg5LTE0MS42MDAyMDkgMTk5LjIwMDI2MWMwIDAtMjcuMjAwNDE5IDg5LjYwMDMwNS04OS42MDAzMDUgODkuNjAwMzA0SDM5Ni43OTk4OThjLTYyLjM5OTg4NiAwLTg5LjYwMDMwNS04OS42MDAzMDUtODkuNjAwMzA0LTg5LjYwMDMwNC00OC44MDA2OTItMTYyLjQwMDE3MS0xNDAuNzk5ODk4LTE5Ny41OTk2MzgtMTQwLjc5OTg5OS0xOTcuNTk5NjM5LTMyLjAwMDI1NC0xMi44MDA5MTQgMC0zMi4wMDAyNTQgMC0zMi4wMDAyNTMgMTI5LjU5OTYwNi03My42MDAxNzggMzQ1LjYwMDMwNS02NC44MDA4MTkgMzQ1LjYwMDMwNS02NC44MDA4MTlzMjE1LjIwMDM4Ny05LjU5OTY3IDM0Ni4zOTg1ODQgNjQuODAwODE5YzAgMCAyOS41OTkzMjEgMTYuNzk4NDA3IDAgMzAuMzk5NjMxeiIgZmlsbD0iI0UyNTc0QyIgcC1pZD0iMjQxNzMiPjwvcGF0aD48cGF0aCBkPSJNMzQyLjM5OTA2MSA1OTUuMTk5ODQ4YzMuOTk5NTI0IDEyLjgwMDkxNCAyNC43OTk0ODYgNjAuNzk5MjY0IDUxLjE5OTU5MyA2MC43OTkyNjNoNzAuMzk4OTM0VjM1MS45OTg3M2MtMTIxLjYwMDU1OSAwLTIwMC43OTg4NTEgMjIuNDAwNTg0LTI0Ny45OTg5MjEgNDMuMjAwNTQ2IDM2LjgwMDA4OSAyOC4wMDA3MyA5Mi4wMDEyMzggODYuMzk5MDYxIDEyNi40MDAzOTQgMjAwLjAwMDU3MnogbTIxNy41OTkyODktMjQzLjIwMTExOHYzMDQuMDAwMzgxaDYzLjIwMDE5NmMyNy4yMDA0MTkgMCA0Ny4yMDAwNy00OC4wMDAzODEgNTEuMTk5NTk0LTYwLjc5OTI2MyAzMy42MDA4NzYtMTExLjk5ODg1NyA4Ny45OTk2ODMtMTcxLjE5OTUzIDEyNC43OTk3NzItMjAwLjAwMDU3Mi00NS41OTk0NDgtMjAuNzk5OTYyLTEyMi4zOTg4MzgtNDIuNDAwMjM1LTIzOS4xOTk1NjItNDMuMjAwNTQ2eiIgZmlsbD0iI0JGMzkyQiIgcC1pZD0iMjQxNzQiPjwvcGF0aD48cGF0aCBkPSJNNDk1Ljk5OTg3MyAzMTEuOTk5NDI5aDMyLjAwMDI1NHYzODMuOTk4OTg0aC0zMi4wMDAyNTRWMzExLjk5OTQyOXoiIGZpbGw9IiNFODc5NzAiIHAtaWQ9IjI0MTc1Ij48L3BhdGg+PHBhdGggZD0iTTE0My45OTkxMTEgNTAzLjk5ODkyMWMtMzkuOTk5MzAyIDAtNzEuOTk5NTU2IDMyLjAwMDI1NC03MS45OTk1NTUgNzEuOTk5NTU2czMyLjAwMDI1NCA3MS45OTk1NTYgNzEuOTk5NTU1IDcxLjk5OTU1NSA3MS45OTk1NTYtMzIuMDAwMjU0IDcxLjk5OTU1Ni03MS45OTk1NTVjMC0zOS45OTcyNzEtMzEuOTk4MjIzLTcxLjk5OTU1Ni03MS45OTk1NTYtNzEuOTk5NTU2eiBtNzM1Ljk5OTc0NiAwYy0zOS45OTkzMDIgMC03MS45OTk1NTYgMzIuMDAwMjU0LTcxLjk5OTU1NSA3MS45OTk1NTZzMzIuMDAwMjU0IDcxLjk5OTU1NiA3MS45OTk1NTUgNzEuOTk5NTU1IDcxLjk5OTU1Ni0zMi4wMDAyNTQgNzEuOTk5NTU2LTcxLjk5OTU1NWMwLTM5Ljk5NzI3MS0zMi4wMDAyNTQtNzEuOTk5NTU2LTcxLjk5OTU1Ni03MS45OTk1NTZ6IiBmaWxsPSIjRTBFM0U0IiBwLWlkPSIyNDE3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0xNDMuOTk5MTExIDU1MS45OTkzMDJjLTEzLjU5OTE5NCAwLTIzLjk5OTE3NSAxMC4zOTk5ODEtMjMuOTk5MTc0IDIzLjk5OTE3NXMxMC4zOTk5ODEgMjMuOTk5MTc1IDIzLjk5OTE3NCAyMy45OTkxNzQgMjMuOTk5MTc1LTEwLjM5OTk4MSAyMy45OTkxNzUtMjMuOTk5MTc0LTExLjE5ODI2MS0yMy45OTkxNzUtMjMuOTk5MTc1LTIzLjk5OTE3NXogbTczNS45OTk3NDYgMGMtMTMuNTk5MTk0IDAtMjMuOTk5MTc1IDEwLjM5OTk4MS0yMy45OTkxNzQgMjMuOTk5MTc1czEwLjM5OTk4MSAyMy45OTkxNzUgMjMuOTk5MTc0IDIzLjk5OTE3NCAyMy45OTkxNzUtMTAuMzk5OTgxIDIzLjk5OTE3NS0yMy45OTkxNzQtMTAuMzk5OTgxLTIzLjk5OTE3NS0yMy45OTkxNzUtMjMuOTk5MTc1eiIgZmlsbD0iI0MwQzhDQiIgcC1pZD0iMjQxNzciPjwvcGF0aD48cGF0aCBkPSJNODY2LjM5NzYzMiAzOTIuMDAwMDYzaC0xNC4zOTk1MDVjLTE2LjAwMDEyNyAwLTI4Ljc5OTAxIDEyLjAwMDYwMy0yOC43OTkwMDkgMjguMDAwNzN2MTMuNTk5MTk0YzAgNy45OTkwNDggMTYuMDAwMTI3IDEzLjU5OTE5NCAzNS4xOTk0NjYgMTMuNTk5MTk0IDE5Ljk5OTY1MSAwIDM1LjE5OTQ2Ny02LjQwMDQ1NyAzNS4xOTk0NjctMTMuNTk5MTk0di0xMy41OTkxOTRjMS42MDA2MjItMTUuMjAxODQ3LTExLjIwMDI5Mi0yOC4wMDA3My0yNy4yMDA0MTktMjguMDAwNzN6IG0tNjk1Ljk5ODQxMyAwSDE1NS45OTk3MTRjLTE2LjAwMDEyNyAwLTI4Ljc5OTAxIDEyLjAwMDYwMy0yOC43OTkwMDkgMjguMDAwNzN2MTMuNTk5MTk0YzAgNy45OTkwNDggMTYuMDAwMTI3IDEzLjU5OTE5NCAzNS4xOTk0NjYgMTMuNTk5MTk0czM1LjE5OTQ2Ny02LjQwMDQ1NyAzNS4xOTk0NjctMTMuNTk5MTk0di0xMy41OTkxOTRjMS42MDA2MjItMTUuMjAxODQ3LTExLjIwMDI5Mi0yOC4wMDA3My0yNy4yMDA0MTktMjguMDAwNzN6IiBmaWxsPSIjRjRCNDU5IiBwLWlkPSIyNDE3OCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMzguMzk5MjUxIDI0OC43OTkyMzJjMzkuOTk5MzAyLTE5Ljk5OTY1MSAxNTUuOTk5NzE0LTcxLjE5OTI0NSAyNzIuMDAwMTI3LTcxLjE5OTI0NSAxMTYuODAwNzI0IDAgMjM0LjM5OTcyNyA1MS4xOTk1OTQgMjc0LjM5OTAyOSA3MS4xOTkyNDUtMzMuNjAwODc2LTkwLjQwMDYxNi0xMTEuOTk4ODU3LTEzNi44MDAzNzUtMjcyLjgwMDQzOC0xMzYuODAwMzc1aC0yLjQwMDkzM2MtMTU4LjM5ODYxNiAwLTIzNi43OTY1OTggNDYuNDAxNzktMjcxLjE5Nzc4NSAxMzYuODAwMzc1eiIgZmlsbD0iIzkyRDJFOCIgcC1pZD0iMjQxNzkiPjwvcGF0aD48cGF0aCBkPSJNODc5Ljk5ODg1NyA1MTkuOTk5MDQ4YzMxLjE5OTk0MyAwIDU1Ljk5OTQyOSAyNC43OTk0ODYgNTUuOTk5NDI5IDU1Ljk5OTQyOXMtMjQuNzk5NDg2IDU1Ljk5OTQyOS01NS45OTk0MjkgNTUuOTk5NDI4LTU1Ljk5OTQyOS0yNC43OTk0ODYtNTUuOTk5NDI4LTU1Ljk5OTQyOGMwLTMxLjE5NzkxMiAyNC43OTk0ODYtNTUuOTk5NDI5IDU1Ljk5OTQyOC01NS45OTk0MjltLTczNS45OTk3NDYgMGMzMS4xOTk5NDMgMCA1NS45OTk0MjkgMjQuNzk5NDg2IDU1Ljk5OTQyOSA1NS45OTk0MjlzLTI0Ljc5OTQ4NiA1NS45OTk0MjktNTUuOTk5NDI5IDU1Ljk5OTQyOC01NS45OTk0MjktMjQuNzk5NDg2LTU1Ljk5OTQyOC01NS45OTk0MjhDODcuOTk5NjgzIDU0NC44MDA1NjUgMTEyLjc5OTE2OCA1MTkuOTk5MDQ4IDE0My45OTkxMTEgNTE5Ljk5OTA0OG03MzUuOTk5NzQ2LTE2LjAwMDEyN2MtMzkuOTk5MzAyIDAtNzEuOTk5NTU2IDMyLjAwMDI1NC03MS45OTk1NTUgNzEuOTk5NTU2czMyLjAwMDI1NCA3MS45OTk1NTYgNzEuOTk5NTU1IDcxLjk5OTU1NSA3MS45OTk1NTYtMzIuMDAwMjU0IDcxLjk5OTU1Ni03MS45OTk1NTVjMC0zOS45OTcyNzEtMzIuMDAwMjU0LTcxLjk5OTU1Ni03MS45OTk1NTYtNzEuOTk5NTU2eiBtLTczNS45OTk3NDYgMGMtMzkuOTk5MzAyIDAtNzEuOTk5NTU2IDMyLjAwMDI1NC03MS45OTk1NTUgNzEuOTk5NTU2czMyLjAwMDI1NCA3MS45OTk1NTYgNzEuOTk5NTU1IDcxLjk5OTU1NSA3MS45OTk1NTYtMzIuMDAwMjU0IDcxLjk5OTU1Ni03MS45OTk1NTVjMC0zOS45OTcyNzEtMzEuOTk4MjIzLTcxLjk5OTU1Ni03MS45OTk1NTYtNzEuOTk5NTU2eiIgZmlsbD0iI0NDRDBEMiIgcC1pZD0iMjQxODAiPjwvcGF0aD48L3N2Zz4='
        var planePath = 'path://M176.6,57.9h-39.4c-0.2-5.6-0.4-11.9-0.8-16.9c-0.2-4.6-6.5-7.8-14.8-9.4V37l-1.3-0.4c-8.3-1.9-21.5-1.9-29.8,0L89.3,37   v-5.6c-8.7,1.6-15,4.8-15.2,9.4c-0.3,5-0.5,11.4-0.7,17.1H33.9l0,0h39.4c-0.2,4.7-0.3,9.6-0.4,14.6c-1.9,0.9-3.7,2.6-5.2,5v2.6   l4.9-1.3c-0.6,29-0.4,61.1,1.1,84.6c0.1,3.1,2.6,4.8,5.7,5.7c17.4,5,34.4,4.6,51.1,0c2.9-0.9,5.5-2.6,5.7-5.7   c1.5-23.7,1.9-55.7,1.3-84.6l5.2,1.5v-2.6c-1.5-2.6-3.3-4.1-5.2-5.2c-0.1-5-0.2-9.9-0.3-14.6H176.6L176.6,57.9z M124.7,34.5   c3.8,0.9,7.2,2.2,9.4,4.8v1.6c-3.1-0.7-6.3-1.3-9.4-2V34.5z M76.5,39.3c2.2-2.4,5.5-3.9,9.4-4.5v4.4c-3.1,0.7-6.3,1.3-9.4,2V39.3z    M125.5,124.8v-18.1l8,0.5c0,6.7-0.2,13.3-0.6,20L125.5,124.8z M132.8,129.9c-0.2,3.2-0.4,6.2-0.6,9.3c-2.6-2.5-4.8-5.8-6.3-11.9   L132.8,129.9z M109.6,85h-7.8c-0.5,0-0.9,0.4-0.9,0.9s0.3,0.9,0.9,0.9h2.8v1.3c-5.9,0.2-11.8,0.9-17.4,2.6c-1.8-7.6-4-14.5-7-20.6   c13.3-5.4,37.2-5.4,50.3,0c-2.7,6.3-5.1,13.2-7,20.6c-5.3-1.7-11.1-2.6-17-2.6v-1.3h3.1c0.5,0,0.9-0.4,0.9-0.9S110.2,85,109.6,85z    M77.6,127.3l-0.6-20l8-0.6v18.2L77.6,127.3z M84.2,127.5c-1.6,5.5-3.8,8.9-6.1,11.9c0-3.2-0.2-6.2-0.4-9.3L84.2,127.5z M77,104.5   c-0.2-8.3-0.2-16.9,0-25.2c0.4-0.9,0.6-1.8,1.1-2.8c2.9,5.2,5.1,11.3,7,17.8v10L77,104.5z M125.6,104.5v-10c1.8-6.5,4-12.6,7-17.8   c0.2,0.7,0.5,1.7,0.9,2.6c0.2,8.4,0.2,16.9,0.2,25.4L125.6,104.5z M87.9,169.6c-5.9-1.3-12-2.6-12.4-5.6c4.3,1.1,8.4,2.4,12.4,3.6   V169.6z M80.2,146.2c2.7-4.8,5.3-9.8,8.3-15.4c9.1,2.2,24.5,2.2,33.6,0c2.9,5.6,5.7,10.6,8.3,15.4   C118.3,153.2,92.2,153.2,80.2,146.2z M122.4,169.5v-2c4.1-1.1,8.3-2.4,12.4-3.5C134.4,166.7,128.3,168,122.4,169.5z'
        var fromName;
        var fromN;
        var fromL;
        var toName;
        var toN;
        var toL;
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
//    				console.log(lineSum)
//    				console.log(pointSum)
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
                            }

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
                        }
                        

                        if(lineData.length > 0){
                            seriesData.push(
                                {
                                    name:fromName,
                                    type: 'lines',
                                    coordinateSystem: 'geo',
                                    symbol: ['none', 'arrow'],
                                    symbolSize: 6,
                                    effect: {
                                        show: true,
                                        period: 6,
                                        trailLength: 0,
                                        symbol: planePath,
                                        symbolSize: 22
                                    },
                                    
                                    lineStyle: {
                                        normal: {
                                            width: 1,
                                            opacity: 0.6,
                                            curveness: 0.2
                                        }
                                    },
                                    data: lineData
                                },{
                                    name: fromName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    data: lineData1,
                                    symbolSize: function (val) {
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
                                    zlevel: 1
                                },{
                                    name: toName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    data: lineData2,
                                    symbolSize: function (val) {
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
                        }

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
                                mapType: code,
                                coordinateSystem: 'geo',
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
                        }

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
                                coordinateSystem: 'geo',
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
                                        show: true
                                    },
                                    emphasis: {
                                    	formatter: '{b}',
                                        position: 'right',
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

        var mapOption;
        // 散点图
        $.ajax({
            type: "get",
            url: url,
            async: false,
            //type:'json',
            success: function (cityJson) {
                echarts.registerMap(code, cityJson);
                mapOption = {
//                    legend: {
//                        orient: 'vertical',
//                        top: 'top',
//                        left: 'left',
//                        selectedMode: 'multiple',
//                        data: optionData
//                    },
                    visualMap: {
                        min: min,
                        max: max,
                        x : 'left',
						y : 'center',
						show: false,
                        //text: ['High', 'Low'],
                        inRange: {
                            color: ['#d94e5d','#eac736'].reverse()
                        }
                    },
                    geo: {
                        map: 'china',
                        roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                       
                        zoom: 1.20,
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00a0c9'
                                }
                            },
                            emphasis: { // 对应的鼠标悬浮效果
                                show: true,
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                            	borderWidth: 1,
                            	areaColor: '#0083ce',
                            	borderColor: "#43d0d6" //地图边框颜色
                            },
                            emphasis: {
                                borderWidth: 1,
                                borderColor: "#43d0d6", //地图边框颜色
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    },
                    tooltip : {
                    	trigger: 'item',
                    	position: function (point, params, dom, rect, size) {
	   	                     return [point[0]+8, point[1]+8];
	   					},
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
                    zoom: 1.5,
    		        roam: false,
                    series:seriesData
                };
            }
        });
        console.log(mapOption, "mapOption-1")
        return mapOption;
    };

});
