module.exports =(sequelize , Sequelize) => {
    var gaurd = sequelize.define('gaurd', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        name: {type : Sequelize.STRING , allowNull : false},
        gender:{type : Sequelize.STRING },
        number:{type : Sequelize.STRING },
        email:{type : Sequelize.STRING },
        password:{type : Sequelize.STRING },
        adharcard:{type : Sequelize.STRING },
        gate:{type : Sequelize.STRING },
        shift:{type : Sequelize.STRING },
        status :{type : Sequelize.STRING, defaultValue:'Approved'}
    });
    return gaurd;
}