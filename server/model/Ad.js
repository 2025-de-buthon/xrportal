// model/advertisement.js
module.exports = (sequelize, DataTypes) => {
    const Advertisement = sequelize.define(
      'Advertisement',
      {
        ad_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // 광고 작성자: 광고를 등록한 유저의 ID
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ad_title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        ad_content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        tableName: 'ADVERTISEMENT',
        timestamps: true, // createdAt, updatedAt 자동 관리
      }
    );
  
    Advertisement.associate = (models) => {
      // 광고는 반드시 작성자(User)에 속함.
      Advertisement.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
      });
    };
  
    return Advertisement;
  };
