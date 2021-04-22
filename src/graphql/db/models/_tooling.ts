import { Model } from "sequelize";

// according to https://github.com/sequelize/sequelize/issues/10579#issuecomment-574604414
// and https://github.com/RobinBuschmann/sequelize-typescript/issues/612#issuecomment-583728166
export default function restoreSequelizeAttributesOnClass(
  newTarget,
  self: Model,
  methods: string[],
): void {
  methods.forEach(method => {
    const fnToAttach = method
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .pop();
    const devAssociationFn = (self as any).__proto__[method];
    const prodAssociationFn = (self as any).__proto__[
      method + "_" + fnToAttach
    ];

    self[method] = devAssociationFn || prodAssociationFn;
  });
  [
    ...Object.keys(newTarget.rawAttributes),
    ...Object.keys(newTarget.associations),
  ].forEach(propertyKey => {
    Object.defineProperty(self, propertyKey, {
      get() {
        return self.getDataValue(propertyKey);
      },
      set(value) {
        self.setDataValue(propertyKey, value);
      },
    });
  });
}
