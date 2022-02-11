
"use strict";
module.exports = (sequelize, Sequelize) => {
  const ProgramSteps = sequelize.define(
    "ProgramSteps", {
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }

  });

  ProgramSteps.associate = function (models) {
    ProgramSteps.belongsToMany( models.Programs, 
      { through: 'ProgramProgramSteps',foreignKey: 'programStepId'} ) 
  };

  return ProgramSteps;
};