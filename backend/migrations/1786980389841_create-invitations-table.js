exports.up = (pgm) => {
  pgm.createTable("invitations", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    email: { type: "varchar(255)", notNull: true },
    role: {
      type: "varchar(20)",
      notNull: true,
      default: "member",
    },
    token: { type: "varchar(255)", notNull: true, unique: true },
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "pending",
    },
    invited_by: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    expires_at: { type: "timestamp", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("invitations", "workspace_id");
  pgm.createIndex("invitations", "email");
  pgm.createIndex("invitations", "token");
};

exports.down = (pgm) => {
  pgm.dropTable("invitations");
};