exports.up = (pgm) => {
  pgm.createTable("workspace_members", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    role: {
      type: "varchar(20)",
      notNull: true,
      default: "member",
    },
    joined_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("workspace_members", "unique_workspace_user", {
    unique: ["workspace_id", "user_id"],
  });

  pgm.createIndex("workspace_members", "workspace_id");
  pgm.createIndex("workspace_members", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("workspace_members");
};exports.up = (pgm) => {
  pgm.createTable("workspace_members", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    role: {
      type: "varchar(20)",
      notNull: true,
      default: "member",
    },
    joined_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("workspace_members", "unique_workspace_user", {
    unique: ["workspace_id", "user_id"],
  });

  pgm.createIndex("workspace_members", "workspace_id");
  pgm.createIndex("workspace_members", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("workspace_members");
};