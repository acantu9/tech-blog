const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/connection');

class BlogPost extends Model {
 static upvote(body, models) {
    return body.vote(models.BlogPost);
 }
}

BlogPost.init(
 {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
 },
 {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_post'
 }
);

module.exports = BlogPost;