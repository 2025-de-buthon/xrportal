// model/fee.js
module.exports = (sequelize, DataTypes) => {
    const Fee = sequelize.define(
      'Fee',
      {
        fee_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        transaction_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fee_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        fee_recipient_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fee_rate: {
          type: DataTypes.DECIMAL(5, 4),
          allowNull: false,
        },
        fee_type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        is_settled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: 'FEE',   // 실제 DB 테이블명
        timestamps: true,   // createdAt, updatedAt 자동 관리
      }
    );
  
    Fee.associate = (models) => {
      // FEE → TRANSACTION (N:1)
      Fee.belongsTo(models.Transaction, {
        foreignKey: 'transaction_id',
        targetKey: 'transaction_id',
      });
  
      // FEE → USER (N:1)
      // 광고 수익의 수령자(원작자 등)를 의미한다고 가정하여 별칭을 'recipient'로 지정
      Fee.belongsTo(models.User, {
        as: 'recipient',
        foreignKey: 'fee_recipient_id',
        targetKey: 'user_id',
      });
    };
  
    return Fee;
  };
  