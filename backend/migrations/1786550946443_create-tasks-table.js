exports.up = (pgm) => {
  pgm.createTable("tasks", {
    id: "id",
    project_id: {
      type: "integer",
      notNull: true,
      references: "projects",
      onDelete: "CASCADE",
    },
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "todo",
    },
    priority: {
      type: "varchar(20)",
      notNull: true,
      default: "medium",
    },
    assignee_id: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    due_date: { type: "date" },
    created_by: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("tasks", "project_id");
  pgm.createIndex("tasks", "assignee_id");
  pgm.createIndex("tasks", "status");
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
};  