module.exports =(sequelize , Sequelize) => {
    var helper = sequelize.define('helper', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        name: {type : Sequelize.STRING , allowNull : false},
        gender:{type : Sequelize.STRING },
        number:{type : Sequelize.STRING },
        email:{type : Sequelize.STRING },
        password:{type : Sequelize.STRING },
        adharcard:{type : Sequelize.STRING },
        servicetype:{type : Sequelize.STRING },
        availability:{type : Sequelize.STRING },
        medical:{type : Sequelize.STRING },
        status :{type : Sequelize.STRING, defaultValue:'Approved'}
    });
    return helper;
}