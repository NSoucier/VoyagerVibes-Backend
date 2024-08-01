\echo 'Delete and recreate voyagervibes db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE voyagervibes;
CREATE DATABASE voyagervibes;
\connect voyagervibes

\i voyagerVibes-schema.sql

\echo 'Delete and recreate voyagervibes_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE voyagervibes_test;
CREATE DATABASE voyagervibes_test;
\connect voyagervibes_test

\i voyagerVibes-schema.sql
