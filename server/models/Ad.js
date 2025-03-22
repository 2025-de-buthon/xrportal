const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ad = sequelize.define('Ad', {
  ad_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ad_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,  // 년/월/일만 저장
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,  // 년/월/일만 저장
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ad_price: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, { timestamps: true });

module.exports = Ad;
