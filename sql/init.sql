CREATE TABLE IF NOT EXISTS users
(
    userid SERIAL PRIMARY KEY,
    mail   VARCHAR NOT NULL
        constraint mail_unique UNIQUE
);

CREATE TABLE IF NOT EXISTS svg
(
    svgid   SERIAL PRIMARY KEY,
    name    VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    userid  INTEGER NOT NULL
        constraint user_id_fk references users
);