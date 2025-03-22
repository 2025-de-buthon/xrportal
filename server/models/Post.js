const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('Post', {
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  writer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(20,4),
    allowNull: true,  // 판매 시작 시 설정
  },
  gas_fee: {
    type: DataTypes.DECIMAL(20,4),
    allowNull: true,  // 판매 시작 시 설정
    defaultValue: null
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sale_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: true });

module.exports = Post;
