CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL DEFAULT '',
	surname VARCHAR(255) NOT NULL DEFAULT '',
	contact_number VARCHAR(50) NOT NULL DEFAULT '',

	email VARCHAR(50) NOT NULL DEFAULT '',
	password VARCHAR(200) NOT NULL,
	last_token VARCHAR(500) NOT NULL DEFAULT '',
	verify_token VARCHAR(50) NOT NULL,

	role INT NOT NULL DEFAULT 1,

	is_active BOOLEAN DEFAULT TRUE,
	is_verify BOOLEAN DEFAULT FALSE,
	is_archive BOOLEAN DEFAULT FALSE,
	is_block BOOLEAN DEFAULT FALSE,

	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
	archived_at TIMESTAMP,
	last_login_at TIMESTAMP
);

DROP TABLE users;

INSERT INTO users (first_name, surname, contact_number, email, password, is_active, verify_token) VALUES ("Kasra", "Karami", "+989183619290", "Kasra_K2K@yahoo.com", "123456789", true, "fake_verify_token");

UPDATE users SET first_name = "Kasra" WHERE id = 1;