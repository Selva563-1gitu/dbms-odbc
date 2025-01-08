# Welcome To World of Learning!
### For deployment - Go to [Deploy](Deploy.md)
### Run The Following Code for Execution

### Run these queries in SQL Developer

To create a buffer table:

```sql
create table metro_train(
   user_id number(20) primary key,
   user_name varchar2(50) not null,
   train_name varchar2(30) not null,
   train_time date,
   booking_date date default sysdate,
   user_ph_no number(10),
   iscommited varchar(5) default 'false'
);
```

To create a main database table:

```sql
create table metro_train_db(
   user_id number(20) primary key,
   user_name varchar2(50) not null,
   train_name varchar2(30) not null,
   train_time date,
   booking_date date default sysdate,
   user_ph_no number(10)
);
```

## Run these commands in the terminal

Open this folder in Terminal:

### To start backend:

```bash
/dbms-odbc> npm start
```

### To start frontend:

```bash
/dbms-odbc> cd frontend
/dbms-odbc/frontend> npm start
```

Happy learning!!
