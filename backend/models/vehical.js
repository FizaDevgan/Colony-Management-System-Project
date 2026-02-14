module.exports =(sequelize , Sequelize) => {
    var vehical = sequelize.define('vehical', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        userId:{type: Sequelize.INTEGER ,allowNull: false,references:{model:'users', key: 'id'}},
        email: {type : Sequelize.STRING , allowNull : false},
        oname: {type : Sequelize.STRING , allowNull : false},
        type: {type : Sequelize.STRING , allowNull : false},
        vnumber: {type : Sequelize.STRING , allowNull : false},
        rc: {type : Sequelize.STRING , allowNull : false},
        status :{type : Sequelize.STRING, defaultValue:'pending'}
    });
    return vehical;
}