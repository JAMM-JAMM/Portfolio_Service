create table if not exists user(
    id int not null AUTO_INCREMENT,
    fullname varchar(32) not null,
    email varchar(64) not null,
    password varchar(128) not null,
    primary key(id),
    unique(email)
);
create table if not exists education(
    id int not null AUTO_INCREMENT,
    user_email varchar(32) not null,
    university varchar(32) not null,
    major varchar(32) not null,
    degree varchar(32) not null,
    create_date timestamp default NOW(),
    primary key(id)
);
create table if not exists awards(
    id int not null AUTO_INCREMENT,
    user_email varchar(32) not null,
    awardName varchar(32) not null,
    awardDesc text not null,
    create_date timestamp default NOW(),
    primary key(id)
);
create table if not exists project(
    id int not null AUTO_INCREMENT,
    user_email varchar(32) not null,
    projectName varchar(32) not null,
    projectDesc varchar(32) not null,
    projectStart date not null,
    projectEnd date not null,
    create_date timestamp default NOW(),
    primary key(id)
);
create table if not exists certificate(
    id int not null AUTO_INCREMENT,
    user_email varchar(32) not null,
    certificateN varchar(32) not null,
    certificateP varchar(32) not null,
    certificateI date not null,
    create_data timestamp default NOW(),
    primary key(id)
);