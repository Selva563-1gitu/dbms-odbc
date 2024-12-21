--    Create this query in sql developer
create table metro_train_db(
    user_id number(20) primary key,
    user_name varchar2(50) not null,
    train_name varchar2(30) not null,
    train_time date,
    booking_date date default sysdate,
    user_ph_no number(10)
);

create table metro_train(
    user_id number(20) primary key,
    user_name varchar2(50) not null,
    train_name varchar2(30) not null,
    train_time date,
    booking_date date default sysdate,
    user_ph_no number(10),
    iscommited varchar(5) default 'false'
);


open this folder in terminal:

//start the backend
?/dbms-odbc> npm start

//start the frontend
?/dbms-odbc> cd frontend
?/dbms-odbc/frontend> npm start
