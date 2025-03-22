// model/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true, // 이메일 중복 방지 (필요 시 제거)
        },
        user_pw_hash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        user_wallet_address: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        user_token_balance: {
          type: DataTypes.DECIMAL(20, 4),
          allowNull: false,
          defaultValue: 0.0,
        },
        create_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'USER',       // 실제 DB 테이블명
        timestamps: true,        // createdAt, updatedAt 자동 관리
        createdAt: 'create_date',// createdAt을 DB의 create_date 컬럼으로 매핑
        updatedAt: false,        // updatedAt 컬럼 사용 안 함
      }
    );
  
    User.associate = (models) => {
      // 예) User.hasMany(models.Post, { foreignKey: 'writer_id' });
      //     User.hasMany(models.Comment, { foreignKey: 'user_id' });
      //     ...
    };
  
    return User;
  };
  
