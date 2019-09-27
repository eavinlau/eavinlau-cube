var ELCubeKpiRender = function (jqContainer, options) {
    this.container = jqContainer; // jquery object
    this.options = options;
};

ELCubeKpiRender.prototype.html = function (persist) {
    var self = this;
    var temp = "" + self.template;
    var html = temp.render(self.options);
    if (persist) {
        setTimeout(function () {
            self.container.css('background', '#fff');
            html2canvas(self.container, {
                onrendered: function (canvas) {
                    persist.data = canvas.toDataURL("image/jpeg");
                    persist.type = "jpg";
                    persist.widgetType = "kpi";
                }
            });
        }, 1000);
        // persist.data = {name: self.options.kpiName, value: self.options.kpiValue};
        // persist.type = "kpi";
    }
    return html;
};

ELCubeKpiRender.prototype.realTimeTicket = function () {
    var self = this;
    return function (o) {
        $(self.container).find('h3').html(o.kpiValue);
    }
};

ELCubeKpiRender.prototype.do = function () {
    var self = this;
    $(self.container).html(self.rendered());
};

ELCubeKpiRender.prototype.template =
    "<div class='small-box {style}'> \
               <div class='inner'> \
                  <h3>{kpiValue}</h3> \
                  <p>{kpiName}</p> \
               </div> \
               <div class='icon'> \
                   <i class='ion ion-stats-bars'></i> \
               </div> \
            </div>";
