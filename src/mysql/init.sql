# 创建用户系统表
CREATE TABLE IF NOT EXISTS user (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nickname VARCHAR(15),
	password VARCHAR(20) NOT NULL,
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);