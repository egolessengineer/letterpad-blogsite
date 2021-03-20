import { Permission } from "./permission";
import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
} from "sequelize";
import config from "../../config";

export interface RoleAttributes {
  id: number;
  name: string;
}

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPermissions!: HasManyGetAssociationsMixin<Permission>;
}

export default function initRole(sequelize) {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: config.defaultTitle,
      },
    },
    {
      tableName: "roles",
      sequelize, // passing the `sequelize` instance is required
    },
  );

  return Role;
}

export function associateRole(): void {
  Role.belongsToMany(Permission, {
    through: "rolePermissions",
  });
}
