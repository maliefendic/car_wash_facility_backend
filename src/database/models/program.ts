
    "use strict";
    module.exports = (sequelize, Sequelize) => {
        const Programs = sequelize.define("Programs", {
          id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
          },
            
      total: {
        type: Sequelize.FLOAT,
      },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        });
    
        Programs.associate = function(models) {    
            Programs.belongsToMany( models.ProgramSteps, 
                { through: 'ProgramProgramSteps',foreignKey: 'programId', as:"steps"} ) 
        };
     
        return Programs;
    };