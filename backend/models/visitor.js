module.exports =(sequelize , Sequelize) => {
    var visitor = sequelize.define('visitor', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        userId:{type: Sequelize.INTEGER ,allowNull: false,references:{model:'users', key: 'id'}},
        name: {type : Sequelize.STRING , allowNull : false},
        email: {type : Sequelize.STRING , allowNull : false},
        mobile: {type : Sequelize.STRING , allowNull : false},
        floor: {type : Sequelize.STRING , allowNull : false},
        flat: {type : Sequelize.STRING , allowNull : false},
        date: {type : Sequelize.DATE , allowNull : false},
        parking: {type : Sequelize.STRING , allowNull : false},
        status :{type : Sequelize.STRING, defaultValue:'notvisited'}
    });
    return visitor;
}