const {Sequelize, DataTypes, Model, Deferrable} = require('sequelize');
const sequelize = require('../config/db')

class User extends Model {
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['m', 'f', 'u'],
        defaultValue: 'u',
        comment: 'm 是 男, f 是 女, u 是 保密'
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'user'
});

class Blog extends Model {
}

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    },
    uid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Blog', // We need to choose the model name
    tableName: 'blog'
});

module.exports = {
    User,
    Blog
}
