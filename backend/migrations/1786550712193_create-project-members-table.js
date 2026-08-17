exports.up = (pgm) => {
  pgm.createTable("project_members", {
    id: "id",
    project_id: {
      type: "integer",
      notNull: true,
      references: "projects",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    added_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("project_members", "unique_project_user", {
    unique: ["project_id", "user_id"],
  });

  pgm.createIndex("project_members", "project_id");
  pgm.createIndex("project_members", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("project_members");
};