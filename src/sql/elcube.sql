
CREATE DATABASE  IF NOT EXISTS `elcube` DEFAULT CHARACTER SET utf8 ;

/*Table structure for table `dashboard_board` */

CREATE TABLE `dashboard_board` (
  `board_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `board_name` varchar(100) NOT NULL,
  `layout_json` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_board` */

insert  into `dashboard_board`(`board_id`,`user_id`,`category_id`,`board_name`,`layout_json`,`create_time`,`update_time`) values (1,'1',5,'test','{\"rows\":[{\"type\":\"param\",\"params\":[{\"paramType\":\"daterangepicker\",\"selects\":[\"2019-04-10\",\"2019-04-18\",\"2019-06-27\",\"2019-09-24\",\"2019-09-25\"],\"multipleValues\":[],\"col\":[{\"name\":\"t1\",\"column\":\"cdate\",\"datasetId\":8}],\"values\":[],\"name\":\"创建日期\",\"type\":\"[a,b]\",\"datesinglepickerValues\":[],\"daterangepickerValues\":[\"-15\",\"0\"]}]},{\"type\":\"widget\",\"widgets\":[{\"widgetId\":1,\"name\":\"图表名称\",\"width\":12}]}]}','2019-09-27 11:47:58','2019-10-08 11:17:29');

/*Table structure for table `dashboard_board_param` */

CREATE TABLE `dashboard_board_param` (
  `board_param_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `board_id` bigint(20) NOT NULL,
  `config` text,
  PRIMARY KEY (`board_param_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_board_param` */

/*Table structure for table `dashboard_category` */

CREATE TABLE `dashboard_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_category` */

insert  into `dashboard_category`(`category_id`,`category_name`,`user_id`) values (1,'大屏','1');
insert  into `dashboard_category`(`category_id`,`category_name`,`user_id`) values (5,'报表','1');

/*Table structure for table `dashboard_dataset` */

CREATE TABLE `dashboard_dataset` (
  `dataset_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `dataset_name` varchar(100) DEFAULT NULL,
  `data_json` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`dataset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_dataset` */

insert  into `dashboard_dataset`(`dataset_id`,`user_id`,`category_name`,`dataset_name`,`data_json`,`create_time`,`update_time`) values (8,'1','test','t1','{\"schema\":{\"measure\":[{\"column\":\"id\",\"id\":\"05398907-3eec-4a94-a33b-c7d95dc67de1\",\"type\":\"column\"},{\"column\":\"view\",\"id\":\"3bfcb70a-f986-4a41-aff9-60cd3ccbbedb\",\"type\":\"column\"}],\"dimension\":[{\"column\":\"type\",\"alias\":\"类型\",\"id\":\"070427d2-d5bd-4a29-a972-a49ac68fdf67\",\"type\":\"column\"},{\"column\":\"title\",\"alias\":\"标题\",\"id\":\"389e793d-1222-4aec-9880-50813596651b\",\"type\":\"column\"},{\"column\":\"cdate\",\"alias\":\"创建日期\",\"id\":\"a9a4f8d1-a254-4655-9fbf-bc636fac5dbf\",\"type\":\"column\"},{\"column\":\"mdate\",\"alias\":\"修改日期\",\"id\":\"a7cca14a-c04a-47ae-a29d-022e690e9683\",\"type\":\"column\"}]},\"selects\":[\"cdate\",\"ctime\",\"id\",\"mdate\",\"mtime\",\"name\",\"title\",\"type\",\"view\"],\"datasource\":1,\"query\":{\"sql\":\"select *,left(ctime,10) cdate,left(mtime,10) mdate from eavinlau.home\"},\"filters\":[],\"expressions\":[]}','2019-05-07 10:51:43','2019-10-08 11:15:33');

/*Table structure for table `dashboard_datasource` */

CREATE TABLE `dashboard_datasource` (
  `datasource_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `source_name` varchar(100) NOT NULL,
  `source_type` varchar(100) NOT NULL,
  `config` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`datasource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_datasource` */

insert  into `dashboard_datasource`(`datasource_id`,`user_id`,`source_name`,`source_type`,`config`,`create_time`,`update_time`) values (1,'1','本地','jdbc','{\"aggregateProvider\":true,\"password\":\"123456\",\"pooled\":true,\"driver\":\"com.mysql.jdbc.Driver\",\"jdbcurl\":\"jdbc:mysql://localhost:3306/?characterEncoding=utf-8\",\"username\":\"root\"}','2018-12-12 14:35:01','2019-05-07 10:46:49');

/*Table structure for table `dashboard_job` */

CREATE TABLE `dashboard_job` (
  `job_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(200) DEFAULT NULL,
  `cron_exp` varchar(200) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `job_type` varchar(200) DEFAULT NULL,
  `job_config` text,
  `user_id` varchar(100) DEFAULT NULL,
  `last_exec_time` timestamp NULL DEFAULT NULL,
  `job_status` bigint(20) DEFAULT NULL,
  `exec_log` text,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_job` */

insert  into `dashboard_job`(`job_id`,`job_name`,`cron_exp`,`start_date`,`end_date`,`job_type`,`job_config`,`user_id`,`last_exec_time`,`job_status`,`exec_log`) values (1,'test','0 0 6 * * ?','2019-09-27 00:00:00','2019-09-29 00:00:00','mail','{\"subject\":\"测试\",\"boards\":[{\"id\":1,\"type\":\"img\"}],\"to\":\"eavinlau@163.com\"}','1','2019-09-27 13:12:16',1,'');

/*Table structure for table `dashboard_role` */

CREATE TABLE `dashboard_role` (
  `role_id` varchar(100) NOT NULL,
  `role_name` varchar(100) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_role` */

insert  into `dashboard_role`(`role_id`,`role_name`,`user_id`) values ('bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','dt','1');

/*Table structure for table `dashboard_role_res` */

CREATE TABLE `dashboard_role_res` (
  `role_res_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` varchar(100) DEFAULT NULL,
  `res_type` varchar(100) DEFAULT NULL,
  `res_id` bigint(20) DEFAULT NULL,
  `permission` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`role_res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_role_res` */

insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (1,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','menu',2,'00');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (2,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','menu',1,'00');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (3,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','menu',3,'00');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (4,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','menu',4,'00');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (5,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','board',5,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (6,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','datasource',3,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (7,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','datasource',1,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (8,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','dataset',4,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (9,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','dataset',3,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (10,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','dataset',2,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (11,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','dataset',1,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (12,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','widget',6,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (13,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','widget',4,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (14,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','widget',3,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (15,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','widget',5,'11');
insert  into `dashboard_role_res`(`role_res_id`,`role_id`,`res_type`,`res_id`,`permission`) values (16,'bc1aa32f-6ab5-4ca9-8495-bcd5e2417b0a','widget',2,'11');

/*Table structure for table `dashboard_user` */

CREATE TABLE `dashboard_user` (
  `user_id` varchar(50) NOT NULL,
  `login_name` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_user` */

insert  into `dashboard_user`(`user_id`,`login_name`,`user_name`,`user_password`,`user_status`) values ('1','admin','Administrator','53a7d68451579f6b62ebc36c0401322f',NULL);
insert  into `dashboard_user`(`user_id`,`login_name`,`user_name`,`user_password`,`user_status`) values ('a7caff81-5e57-4297-8aed-c6b7c7152f75','liudebin','刘德宾','e10adc3949ba59abbe56e057f20f883e',NULL);

/*Table structure for table `dashboard_user_role` */

CREATE TABLE `dashboard_user_role` (
  `user_role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `role_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_user_role` */

/*Table structure for table `dashboard_widget` */

CREATE TABLE `dashboard_widget` (
  `widget_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `widget_name` varchar(100) DEFAULT NULL,
  `data_json` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`widget_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `dashboard_widget` */

insert  into `dashboard_widget`(`widget_id`,`user_id`,`category_name`,`widget_name`,`data_json`,`create_time`,`update_time`) values (1,'1','test','t1','{\"datasetId\":8,\"config\":{\"valueAxis\":\"vertical\",\"chart_type\":\"line\",\"keys\":[{\"col\":\"cdate\",\"values\":[],\"alias\":\"创建日期\",\"sort\":\"asc\",\"id\":\"a9a4f8d1-a254-4655-9fbf-bc636fac5dbf\",\"type\":\"eq\"}],\"values\":[{\"name\":\"\",\"series_type\":\"bar\",\"type\":\"value\",\"cols\":[{\"col\":\"id\",\"alias\":\"视频个数\",\"aggregate_type\":\"count\"},{\"col\":\"view\",\"alias\":\"观看次数\",\"aggregate_type\":\"sum\"}]}],\"groups\":[],\"filters\":[],\"coordinateSystem\":\"cartesian2d\",\"option\":{\"dataZoom\":false,\"gridCustom\":false,\"legendShow\":true}},\"expressions\":[],\"filterGroups\":[]}','2019-09-27 11:47:17','2019-10-08 11:16:41');
insert  into `dashboard_widget`(`widget_id`,`user_id`,`category_name`,`widget_name`,`data_json`,`create_time`,`update_time`) values (2,'1','test','t2','{\"datasetId\":8,\"config\":{\"chart_type\":\"kpi\",\"keys\":[],\"values\":[{\"name\":\"观看次数\",\"style\":\"bg_bg6\",\"cols\":[{\"col\":\"view\",\"aggregate_type\":\"sum\"}]}],\"groups\":[],\"filters\":[],\"option\":{}},\"expressions\":[],\"filterGroups\":[]}','2019-10-08 13:34:56','2019-10-08 13:34:56');

