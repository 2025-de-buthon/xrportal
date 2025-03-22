// model/post_like.js
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    'PostLike',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'POST_LIKE',
      timestamps: true, // createdAt, updatedAt 자동 관리
    }
  );

  PostLike.associate = (models) => {
    // POST_LIKE → USER (N:1)
    PostLike.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });
    // POST_LIKE → POST (N:1)
    PostLike.belongsTo(models.Post, {
      foreignKey: 'post_id',
      targetKey: 'post_id',
    });
  };

  return PostLike;
};
