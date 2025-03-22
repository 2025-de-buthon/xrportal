// model/transaction.js
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
      'Transaction',
      {
        transaction_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        transaction_type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: 'transactions',
        timestamps: true,
      }
    );
  
    Transaction.associate = (models) => {
      // 거래는 반드시 한 유저에 속합니다.
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
      });
      // 거래는 하나의 Fee를 가질 수 있습니다.
      Transaction.hasOne(models.Fee, {
        foreignKey: 'transaction_id',
        sourceKey: 'transaction_id',
      });
    };
  
    return Transaction;
  };
  