var Sequelize = require("sequelize");
var dbName = 'society';
var dbUser = 'root';
var dbPassword = 'system';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* MODELS */
db.admin = require('./models/Admin')(sequelize,Sequelize);
db.user = require('./models/userpg')(sequelize,Sequelize);
db.gaurd = require('./models/gaurd')(sequelize,Sequelize);
db.helper = require('./models/helper')(sequelize,Sequelize);
db.bookhelper = require('./models/bookhelper')(sequelize,Sequelize);
db.vehical = require('./models/vehical')(sequelize,Sequelize);
db.ccategory = require('./models/ccategory')(sequelize,Sequelize);
db.complaint = require('./models/complaint')(sequelize,Sequelize);
db.visitor = require('./models/visitor')(sequelize,Sequelize);
db.flat = require('./models/flat')(sequelize,Sequelize);



db.helper.hasMany(db.bookhelper ,{foreignKey:'helperId'});
db.bookhelper.belongsTo(db.helper);


db.user.hasMany(db.bookhelper ,{foreignKey:'userId'});
db.bookhelper.belongsTo(db.user);

db.user.hasMany(db.vehical ,{foreignKey:'userId'});
db.vehical.belongsTo(db.user);


db.user.hasMany(db.complaint ,{foreignKey:'userId'});
db.complaint.belongsTo(db.user);

db.user.hasMany(db.visitor ,{foreignKey:'userId'});
db.visitor.belongsTo(db.user);






module.exports = db;