# Welcome To World of Learning!
/
## Run The Following Code for Execution
/
### Run these queries in Sql Developer
/
To create a buffer table
/
>create table metro_train( /s/s
>   user_id number(20) primary key, /s/s
>   user_name varchar2(50) not null, /s/s
>   train_name varchar2(30) not null, /s/s
>   train_time date, /s/s
>   booking_date date default sysdate, /s/s
>   user_ph_no number(10), /s/s
>   iscommited varchar(5) default 'false' /s/s
>);
/
To create a main database table
/
>create table metro_train_db( /s/s
>   user_id number(20) primary key, /s/s
>   user_name varchar2(50) not null, /s/s
>   train_name varchar2(30) not null, /s/s
>   train_time date, /s/s
>   booking_date date default sysdate, /s/s
>   user_ph_no number(10) /s/s
>);
/
/
## Run these commands in terminal
/
Open this folder in Terminal:
/
To start backend
/
> /dbms-odbc> npm start
/
To start frontend
/
> /dbms-odbc> cd frontend
> /dbms-odbc/frontend> npm start
/
/
/
Happy learning!!