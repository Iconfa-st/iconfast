CREATE TABLE IF NOT EXISTS verification_token
(
    identifier TEXT        NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    token      TEXT        NOT NULL,

    PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts
(
    id                  SERIAL,
    "userId"            INTEGER      NOT NULL,
    type                VARCHAR(255) NOT NULL,
    provider            VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token       TEXT,
    access_token        TEXT,
    expires_at          BIGINT,
    id_token            TEXT,
    scope               TEXT,
    session_state       TEXT,
    token_type          TEXT,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions
(
    id             SERIAL,
    "userId"       INTEGER      NOT NULL,
    expires        TIMESTAMPTZ  NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id              SERIAL,
    name            VARCHAR(255),
    email           VARCHAR(255) unique NOT NULL,
    password        VARCHAR(255),
    "emailVerified" TIMESTAMPTZ,
    image           TEXT,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS svg
(
    svgid   SERIAL PRIMARY KEY,
    name    VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    userid  INTEGER NOT NULL
        constraint user_id_fk references users
);