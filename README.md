### <font style="color:#292b2c">Building a Simple Application with Node.js, Express and MongoDB</font>

**What is Node.Js, Express, MongoDB?**

*   **Node.js®** is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
*   **Express** is a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node. In case you were wondering, Node allows you to use JavaScript as your server-side language.
*   **MongoDB** is a database. This is the place where you store information for your web websites (or applications).
**You’ll need the following things for this web application:**

1.  Install MongoDB
    (https://www.mongodb.com/download-center#community)
2.  Install NodeJS
    (https://nodejs.org/en/download/)
3.  Install ExpressJS
    (npm install express, express-generator)
4.  Install Pug/Jade
    (npm install pug)
5.  Install MongoDB Client
    (npm install mongodb)
6.  Import films.json
    (http://guyharrison.squarespace.com/storage/sakila.tgz)

**List of MongoDB Commands**

1.  Starting MongoDB
    mongod --dbpath /mongodb/data/db/
2.  Importing Json files to Create Collection
    mongoimport --host localhost --port 8080 --db testdb --collection customers --file=/mongodb/customers.json
    mongoimport --host localhost --port 8080 --db testdb --collection films --file=/mongodb/films.json
3.  Show list of all databases
    show dbs
4.  Select the Database
    use mydb
5.  Show list of all collections
    show collections
6.  Read all documents from films collection.
    db.films.find()
7.  Fetch Category and Title columns from films collection
    db.films.find({},{"Category":1,"Title":1});
8.  Fetch Category and Title columns from films collection for a conditional search having Category field as Comedy.
    db.films.find({"Category":"Comedy"},{"Category":1,"Title":1});
9.  Fetch Category, Title and Rating columns from films collection for a conditional search having Category field as Comedy or Rating as PG.
    db.films.find({$or:[{"Category":"Comedy"},{"Rating":"PG"}]},{"Category":1,"Title":1, "Rating":1});
10.  Fetch Category, Title and Rating columns from films collection for a conditional search having Category field as Comedy or Rating as PG. Also sort the results by the field Title in Ascending order.
    db.films.find({$or:[{"Category":"Comedy"},{"Rating":"PG"}]},{"Category":1,"Title":1, "Rating":1}).sort({"Title":1});
11.  Fetch Category, Title and Rating columns from films collection for a conditional search having Category field as Comedy or Rating as PG. Also sort the results by the field Title in Descending order.
    db.films.find({$or:[{"Category":"Comedy"},{"Rating":"PG"}]},{"Category":1,"Title":1, "Rating":1}).sort({"Title":-1});
12.  Fetch top 5 record's Category, Title and Rating columns from films collection for a conditional search having Category field as Comedy or Rating as PG. Also sort the results by the field Title in Ascending order.
    db.films.find({$or:[{"Category":"Comedy"},{"Rating":"PG"}]},{"Category":1,"Title":1, "Rating":1}).sort({"Title":-1}).limit(5);
13.  Fetch next 10 record's Category, Title and Rating columns from films collection for a conditional search having Category field as Comedy or Rating as PG. Also sort the results by the field Title in Ascending order.
    db.films.find({$or:[{"Category":"Comedy"},{"Rating":"PG"}]},{"Category":1,"Title":1, "Rating":1}).sort({"Title":-1}).limit(10).skip(10);
14.  Return Distinct Category list from films collection
    db.films.distinct("Category");
15.  Return count of all records from films collection
    db.films.count();
16.  Count the number of records for a Category as "Music"
    db.films.count({"Category":"Music"});
17.  Group the all titles for each Category
    db.films.aggregate([ { $group: { _id : "$Category", movies: { $push: "$Title" } } } ] );
18.  Return the number of record counts for each Category.
    db.films.aggregate([ { $group: { _id : "$Category", count: { $sum: 1 } } } ] );
19.  Return the number of record counts for each Category and sort by Category in Ascending Order.
    db.films.aggregate([ { $group: { _id : "$Category", count: { $sum: 1 } } }, { $sort: { "_id": 1 } } ] );
20.  Return the number of record counts for each Category and sort by Category in Descending Order.
    db.films.aggregate([ { $group: { _id : "$Category", count: { $sum: 1 } } }, { $sort: { "_id": -1 } } ] );
21.  Return the number of record counts for a Category as "Action".
    db.films.aggregate([ { $match : { "Category" : "Action" } },{ $group: { _id : "$Category", count: { $sum: 1 } } } ] );

* * *

**Reference Links**

1.  https://www.npmjs.com/package/mongodb
2.  https://mongodb.github.io/node-mongodb-native/contents.html
3.  http://guyharrison.squarespace.com/blog/2015/3/23/sakila-sample-schema-in-mongodb.html
4.  http://www.querymongo.com
5.  http://html2pug.com
