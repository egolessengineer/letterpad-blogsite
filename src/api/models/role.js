export default (conn, DataTypes) => {
  const Role = conn.define(
    "role",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
    },
  );

  Role.associate = models => {
    Role.belongsToMany(models.Permission, {
      through: "RolePermission",
    });
    Role.hasMany(models.Author);
  };

  return Role;
};
