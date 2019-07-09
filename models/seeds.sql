use sfw7ofbm798lm5df;

insert into Role values(1, "Little Biggie", 4000, 6000,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Role values(2, "Biggie", 5000, 7000,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Employees values (1, "Bob Smith", "", 5000, 1, false, 1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Employees values (2, "Joe Jones", "", 5500, 1, true, 2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Skill_crap values (1, "LB skill 1", "LB must be proficient in skill 1",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Skill_crap values (2, "LB skill 2", "LBs must know a little about skill 2",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Skill_crap values (3, "BGs skill 1", "Pointy hair",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Skill_crap values (4, "BGs skill x", "Overly large bladder...for long meetings",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Emp_skills values (1, 1, 1, 1, 2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Emp_skills values (2, 1, 1, 2, 2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Emp_skills values (3, 1, 2, 1, 1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Emp_skills values (4, 1, 2, 2, 5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Job_skills values (1, 4, 2, 3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into Job_skills values (2, 3, 2, 4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


