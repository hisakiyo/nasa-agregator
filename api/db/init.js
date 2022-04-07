import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('database.sqlite')

db.serialize(function () {
    // Create table NEWS
    db.run('CREATE TABLE IF NOT EXISTS NEWS (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date TEXT, author_id INTEGER, image TEXT)');
    // Create table USERS
    db.run('CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role_id INTEGER)');
    // Create table ROLES
    db.run('CREATE TABLE IF NOT EXISTS ROLES (id INTEGER PRIMARY KEY, name TEXT)');
    // Create table COMMENT
    db.run('CREATE TABLE IF NOT EXISTS COMMENTS (id INTEGER PRIMARY KEY, news_id INTEGER, text TEXT, date TEXT, author_username TEXT, author_email TEXT, isValidated INTEGER)');
    // Insert default roles
    db.run('INSERT OR IGNORE INTO ROLES (id, name) VALUES (1, "admin")');
    db.run('INSERT OR IGNORE INTO ROLES (id, name) VALUES (2, "editor")');
    // Insert default users
    db.run('INSERT OR IGNORE INTO USERS (id, username, password, role_id) VALUES (1, "admin", "admin", 1)');
    db.run('INSERT OR IGNORE INTO USERS (id, username, password, role_id) VALUES (2, "editor", "editor", 2)');
    // Insert a default news
    db.run('INSERT OR IGNORE INTO NEWS (id, title, description, date, author_id, image) VALUES (1, "News 1", "Description 1", "2020-01-01", 1, "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png")');
});

module.exports = db