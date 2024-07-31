\echo 'Delete and recreate voyagerVibes db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE voyagerVibes;
CREATE DATABASE voyagerVibes;
\connect voyagerVibes

\i voyagerVibes-schema.sql

\echo 'Delete and recreate voyagerVibes_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE voyagerVibes_test;
CREATE DATABASE voyagerVibes_test;
\connect voyagerVibes_test

\i voyagerVibes-schema.sql
