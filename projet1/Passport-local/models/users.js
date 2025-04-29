const {DataTypes} = require("sequelize");
module.exports = function(sequelize){
    const User = sequelize.define('user', {
        id:{autoIncrement: true, primaryKey:true, type: DataTypes.INTEGER, allowNull:false},
        firstName:{type:DataType.STRING, notEmpty:true},
        lastName:{type:DataType.STRING, notEmpty:true},
        emailId:{type:DataType.STRING, notEmpty:true, 
            validate : {isEmail:true}},
        password:{type:DataType.STRING, allowNull:false}

    },
    {tableName:"users"}
    );
    return User;
}