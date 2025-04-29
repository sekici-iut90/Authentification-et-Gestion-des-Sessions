const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
    const User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "users"
    });

    return User;
};

