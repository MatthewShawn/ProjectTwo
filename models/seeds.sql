use perf_review;

insert into roles values(1, "Little Biggie", 4000, 6000);
insert into roles values(2, "Biggie", 5000, 7000);
insert into employees values (1, "Bob Smith", 5000, 1, false, 1);
insert into employees values (2, "Joe Jones", 5500, 1, true, 2);
insert into skill_data values (1, "LB skill 1", "LB must be proficient in skill 1");
insert into skill_data values (2, "LB skill 2", "LBs must know a little about skill 2");
insert into skill_data values (3, "BGs skill 1", "Pointy hair");
insert into skill_data values (4, "BGs skill x", "Overly large bladder...for long meetings");
insert into emp_skills values (1, 1, 1, 1, 2);
insert into emp_skills values (2, 1, 1, 2, 2);
insert into emp_skills values (3, 1, 2, 1, 1);
insert into emp_skills values (4, 1, 2, 2, 5);
insert into job_skills values (1, 4, 2, 3);
insert into job_skills values (2, 3, 2, 4);


