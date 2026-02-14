module.exports =(sequelize , Sequelize) => {
    var ccategory = sequelize.define('ccategory', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        type:{type : Sequelize.STRING },
    });
    return ccategory;
}