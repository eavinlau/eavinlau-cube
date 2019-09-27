/**
 * Created by Peter on 2016/10/23.
 */
// CBoard settings
var settings = {
    preferredLanguage: "cn" // en/cn: Switch language to Chinese
};

var CB_I18N;

$.ajax({
    url: "i18n/" + settings.preferredLanguage + "/elcube.json",
    type: "GET",
    dataType: "json",
    success: function(data) {
        return CB_I18N = data;
    },
    async: false
});

var color=new Array();
color.push('#b6a2de');
color.push('#00ea71');
color.push('#3EC6F5');
color.push("#37b7ff");
color.push("#0045c7");
color.push("#ff7a5e");
color.push("#ffc10b");
color.push("#2ec7c9");
color.push("#b6a2de");
color.push("#5ab1ef");
color.push("#ffb980");
color.push("#d87a80");
color.push("#8d98b3");
color.push("#e5cf0d");
color.push("#97b552");
color.push("#95706d");
color.push("#dc69aa");
color.push("#07a2a4");
color.push("#9a7fd1");
color.push("#588dd5");
color.push("#f5994e");
color.push("#c05050");
color.push("#59678c");
color.push("#c9ab00");
color.push("#7eb00a");
color.push("#6f5553");
color.push("#c14089");
color.push("#7e890a");
color.push("#6f5398");
color.push("#c14189");
