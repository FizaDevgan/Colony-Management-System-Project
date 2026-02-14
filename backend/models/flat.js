module.exports =(sequelize , Sequelize) => {
    var flat = sequelize.define('flat', {
        id:{type : Sequelize.INTEGER , primaryKey: true, autoIncrement : true},
        bname: {type : Sequelize.STRING , allowNull : false},
        ftype: {type : Sequelize.STRING , allowNull : false},
        floor: {type : Sequelize.STRING , allowNull : false},
        flat: {type : Sequelize.STRING , allowNull : false},
        sdeposite: {type : Sequelize.STRING , allowNull : false},
        rent: {type : Sequelize.STRING , allowNull : false},
        furnished: {type : Sequelize.STRING , allowNull : false},
    });
    return flat;
}