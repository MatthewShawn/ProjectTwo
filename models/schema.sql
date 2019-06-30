
DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS perf_review;
CREATE DATABASE perf_review;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

use perf_review;

create table roles (
id integer not null auto_increment,
r_title varchar(150) not null,
salary_low float,
salary_high float,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL,
primary key (id)
);

create table employees (
id integer not null auto_increment,
text varchar(100) not null,
password varchar(255) default null,
salary int,
avg_score integer,
is_manager BOOLEAN DEFAULT false,
job_role int,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL,
primary key (id),
foreign key (job_role) references roles(id)
);

create table skill_data (
id integer not null auto_increment,
d_title varchar (150) not null,
d_desc text,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL,
primary key (id)
);

create table emp_skills (
id integer not null auto_increment,
employee int,
reviewer int,
the_skill int,
current_level int,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL,
primary key (id),
foreign key (employee) references employees(id),
foreign key (reviewer) references employees(id),
foreign key (the_skill) references skill_data(id)
);

create table job_skills (
id integer not null auto_increment,
min_level_required int,
job_for_this_level int,
the_skill int,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL,
primary key (id),
foreign key (job_for_this_level) references roles(id),
foreign key (the_skill) references skill_data(id)
);

