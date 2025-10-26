import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('example_db', 'postgres', 'postgres', {
  dialect: 'postgres',
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  },
  host: 'localhost',
  logging: false,
})
