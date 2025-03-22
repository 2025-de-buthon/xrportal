const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ad = sequelize.define('Ad', {
  ad_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ad_content는 이제 S3에서 반환된 이미지 URL을 저장한다고 가정합니다.
  ad_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,  // 년-월-일 형식
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,  // 년-월-일 형식
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ad_price: {
    type: DataTypes.DECIMAL(20,4),
    allowNull: false,
  },
  // 기존 status 컬럼은 삭제하거나 무시합니다.
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, { timestamps: true });

module.exports = Ad;
