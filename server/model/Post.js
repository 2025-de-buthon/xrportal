// model/post.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      post_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nft_token_id: {
        type: DataTypes.STRING(100),
        allowNull: true, // 필요에 따라 false로 조정
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      writer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: false,
      },
      gas_fee: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: false,
      },
    },
    {
      tableName: 'POST',       // 실제 DB 테이블명
      timestamps: true,        // createdAt, updatedAt을 사용
      createdAt: 'created_at', // createdAt 대신 DB 컬럼명 'created_at' 사용
      updatedAt: false,        // 별도의 updated_at 컬럼이 없다면 false
    }
  );

  Post.associate = (models) => {
    // Post → User (owner)
    Post.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'owner_id',
      targetKey: 'user_id',
    });
    // Post → User (writer)
    Post.belongsTo(models.User, {
      as: 'writer',
      foreignKey: 'writer_id',
      targetKey: 'user_id',
    });
  };

  return Post;
};

  