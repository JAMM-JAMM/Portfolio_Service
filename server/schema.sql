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
    university varchar(32) not null,
    major varchar(32) not null,
    degree varchar(32) not null,
    create_date timestamp default NOW(),
    primary key(id)
);
create table if not exists awards(
    id int not null AUTO_INCREMENT,
    award_name varchar(32),
    award_desc text,
    create_date timestamp default NOW(),
    primary key(id)
)
