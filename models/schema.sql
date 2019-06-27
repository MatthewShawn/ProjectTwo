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
salary_low integer,
salary_high integer,
primary key (id)
);

create table employees (
id integer not null auto_increment,
e_name varchar(100) not null,
pswd varchar(255) default null,
salary int,
avg_score integer,
is_manager BOOLEAN DEFAULT false,
job_role int,
primary key (id),
foreign key (job_role) references roles(id)
);

create table skill_data (
id integer not null auto_increment,
d_title varchar (150) not null,
d_desc text,
primary key (id)
);

create table emp_skills (
id integer not null auto_increment,
employee int,
reviewer int,
the_skill int,
current_level int,
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

primary key (id),
foreign key (job_for_this_level) references roles(id),
foreign key (the_skill) references skill_data(id)
);

