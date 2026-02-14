module.exports =(sequelize , Sequelize) => {
    var bookhelper = sequelize.define('bookhelper', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        helperId:{type: Sequelize.INTEGER ,allowNull: false,references:{model:'helpers', key: 'id'}},
        userId:{type: Sequelize.INTEGER ,allowNull: false,references:{model:'users', key: 'id'}},
        date: {type : Sequelize.DATE , allowNull : false},
        instructions: {type : Sequelize.STRING , allowNull : false},
    });
    return bookhelper;
}