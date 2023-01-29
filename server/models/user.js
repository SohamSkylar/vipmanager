module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Usertest", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return User;
}