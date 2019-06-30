use perf_review;

insert into role values(1, "Little Biggie", 4000, 6000,null,null);
insert into role values(2, "Biggie", 5000, 7000,null,null);
insert into employees values (1, "Bob Smith", "", 5000, 1, false, 1,null,null);
insert into employees values (2, "Joe Jones", "", 5500, 1, true, 2,null,null);
insert into skill_data values (1, "LB skill 1", "LB must be proficient in skill 1",null,null);
insert into skill_data values (2, "LB skill 2", "LBs must know a little about skill 2",null,null);
insert into skill_data values (3, "BGs skill 1", "Pointy hair",null,null);
insert into skill_data values (4, "BGs skill x", "Overly large bladder...for long meetings",null,null);
insert into emp_skills values (1, 1, 1, 1, 2,null,null);
insert into emp_skills values (2, 1, 1, 2, 2,null,null);
insert into emp_skills values (3, 1, 2, 1, 1,null,null);
insert into emp_skills values (4, 1, 2, 2, 5,null,null);
insert into job_skills values (1, 4, 2, 3,null,null);
insert into job_skills values (2, 3, 2, 4,null,null);


