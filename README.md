Uputstvo za pokretanje aplikacije:

1.Uraditi komandu **npm instal**

2.Instalirati postgres bazu.

3.Instalirati **unaccent** ekstenziju na postgres bazu.  (CREATE EXTENSION unaccent;)

4.Napraviti tabele book,auhtor,user.

******************book tabela******************

create table book
(
id          integer default nextval('table_name_id_seq'::regclass) not null
constraint table_name_pkey
primary key,
title       varchar,
author_id   integer,
description text,
genre       varchar,
created_at  timestamp
);

***************author tabela***************

create table author
(
id         serial
constraint author_pk
primary key,
user_id    integer,
email      varchar,
created_at timestamp,
full_name  varchar
);

***************user tabela***************

create table "user"
(
id         serial
constraint user_pk
primary key,
password   varchar,
is_admin   boolean,
username   varchar not null,
created_at timestamp
);

5.Napraviti **.env** file u kome se nalaze podaci za pristup bazi i secret za pravljenje tokena.

***********env example***********

DB_NAME=<"YOUR DATABASE NAME">

DB_USERNAME=<"YOUR USERNAME">

DB_PASSWORD=<"YOUR PASSWORD">

DB_HOST=<"YOUR HOST">

DB_SECRET =<YOUR SECRET>
