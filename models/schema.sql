DROP DATABASE IF EXISTS perf_review;
CREATE DATABASE perf_review;

use perf_review;

create table role (
id integer not null auto_increment,
r_title varchar(150) not null,
salary_low float,
salary_high float,
created_at TIMESTAMP NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NULL DEFAULT current_timestamp,
primary key (id)
);

create table employees (
id integer not null auto_increment,
text varchar(100) not null,
password varchar(255) default null,
salary int,
avg_score integer,
is_manager BOOLEAN DEFAULT false,
role_id int,
created_at TIMESTAMP NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NULL DEFAULT current_timestamp,
primary key (id),
foreign key (role_id) references role(id)
);

create table skill_crap (
id integer not null auto_increment,
d_title varchar (150) not null,
d_desc text,
created_at TIMESTAMP NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NULL DEFAULT current_timestamp,
primary key (id)
);

create table emp_skills (
id integer not null auto_increment,
employees_id int,
reviewer_id int,
skill_crap_id int,
current_level int,
created_at TIMESTAMP NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NULL DEFAULT current_timestamp,
primary key (id),
foreign key (employees_id) references employees(id),
foreign key (reviewer_id) references employees(id),
foreign key (skill_crap_id) references skill_crap(id)
);

ALTER TABLE Emp_skills
ADD CONSTRAINT Employees_Emp_SkillsId_fkey FOREIGN KEY (employees_id)
REFERENCES Employees (id) MATCH SIMPLE
ON DELETE CASCADE;

create table job_skills (
id integer not null auto_increment,
min_level_required int,
role_id int,
skill_crap_id int,
created_at TIMESTAMP NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NULL DEFAULT current_timestamp,
primary key (id),
foreign key (role_id) references role(id),
foreign key (skill_crap_id) references skill_crap(id)
);

