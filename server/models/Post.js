const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('Post', {
  post_title: DataTypes.STRING,
  post_content: DataTypes.TEXT,
  writer_id: DataTypes.INTEGER,
  owner_id: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(20, 4),
  gas_fee: {
    type: DataTypes.DECIMAL(20, 4),
    defaultValue: 0.001
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { timestamps: true });

module.exports = Post;
