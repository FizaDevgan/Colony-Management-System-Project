module.exports =(sequelize , Sequelize) => {
    var complaint = sequelize.define('complaint', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        userId:{type: Sequelize.INTEGER ,allowNull: false,references:{model:'users', key: 'id'}},
        email: {type : Sequelize.STRING , allowNull : false},
        type: {type : Sequelize.STRING , allowNull : false},
        description: {type : Sequelize.STRING , allowNull : false},
        date: {type : Sequelize.DATE , allowNull : false},
        suggestion: {type : Sequelize.STRING , allowNull : false},
        status :{type : Sequelize.STRING, defaultValue:'Pending'}

    });
    return complaint;
}