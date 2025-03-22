// model/comment_like.js
module.exports = (sequelize, DataTypes) => {
    const CommentLike = sequelize.define(
      'CommentLike',
      {
        comment_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: 'COMMENT_LIKE', // 실제 DB 테이블명
        timestamps: true,         // createdAt, updatedAt 자동 관리
      }
    );
  
    CommentLike.associate = (models) => {
      // COMMENT_LIKE → COMMENT (N:1)
      CommentLike.belongsTo(models.Comment, {
        foreignKey: 'comment_id',
        targetKey: 'comment_id',
      });
      // COMMENT_LIKE → USER (N:1)
      CommentLike.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
      });
    };
  
    return CommentLike;
  };
  