


module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      // userId:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {         // User belongsTo Company 1:1
      //     model: 'users',
      //     key: 'id'
      //   }
      //}
    });

    return Tutorial;
  };