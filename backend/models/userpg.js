module.exports =(sequelize , Sequelize) => {
    var user = sequelize.define('user', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        name: {type : Sequelize.STRING , allowNull : false},
        email:{type : Sequelize.STRING },
        mobile:{type : Sequelize.STRING },
        password:{type : Sequelize.STRING },
        photo:{type : Sequelize.STRING },
        floor:{type : Sequelize.STRING },
        flat:{type : Sequelize.STRING },
        members:{type : Sequelize.STRING },
        date:{type : Sequelize.DATE },

    });
    return user;
}