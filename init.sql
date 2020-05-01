CREATE TABLE teemat (
    teema_id SERIAL PRIMARY KEY,
    teema VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tekstit (
    id SERIAL PRIMARY KEY,
    teksti VARCHAR(500) NOT NULL,
    teema_id INTEGER REFERENCES teemat (teema_id)
);

INSERT INTO teemat (teema) VALUES ('joulu'), ('hautajaiset');
INSERT INTO tekstit (teksti, teema_id) VALUES ('Joulu on taas, hurraa', 1);
