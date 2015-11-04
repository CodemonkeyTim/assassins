CREATE TABLE `users` (
  `id`      	INT(10) UNSIGNED          	NOT NULL AUTO_INCREMENT,
  `target_id`   INT(10) UNSIGNED        	NOT NULL,
  `email`       VARCHAR(60)               	NOT NULL,
  `password`    VARCHAR(255)              	NOT NULL,
  `name`   		VARCHAR(50)               	NOT NULL,
  `nickname`   	VARCHAR(50)               	NOT NULL,
  `imageURL`   	VARCHAR(50)               	NOT NULL,
  `routines`   	TEXT		               	NOT NULL,
  `inGame`      TINYINT(1)                	NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
  `id`      	INT(10) UNSIGNED          	NOT NULL AUTO_INCREMENT,
  `user_id`   	INT(10) UNSIGNED        	NOT NULL,
  `header`    	VARCHAR(255)              	NOT NULL,
  `msg_body`   	TEXT		               	NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;