exports.up = (pgm) => {
  pgm.createTable("labels", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    name: { type: "varchar(100)", notNull: true },
    color: { type: "varchar(20)", notNull: true },
  });

  pgm.addConstraint("labels", "unique_workspace_label_name", {
    unique: ["workspace_id", "name"],
  });

  pgm.createIndex("labels", "workspace_id");
};

exports.down = (pgm) => {
  pgm.dropTable("labels");
};