-- run with 
-- $ sqlite3 urls.db < schema.sql

CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shortened VARCHAR,
  url VARCHAR
);

CREATE INDEX url_index ON urls(url);
CREATE INDEX shortened_index ON urls(shortened);

-- explicitly setting the ID here starts the sequence at this number
INSERT INTO urls (id, shortened, url) VALUES (503567, 'chad', 'http://chadmaughan.com');
