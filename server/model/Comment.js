// model/comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      'Comment',
      {
        comment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        comment_content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'COMMENT',     // 실제 DB 테이블명
        timestamps: true,         // createdAt, updatedAt 자동 관리
        createdAt: 'created_at',  // createdAt 필드를 DB의 created_at 컬럼으로 매핑
        updatedAt: false,         // updatedAt 컬럼을 사용하지 않음
      }
    );
  
    Comment.associate = (models) => {
      // COMMENT → POST (N:1)
      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        targetKey: 'post_id',
      });
      // COMMENT → USER (N:1)
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
      });
    };
  
    return Comment;
  };
  