exports.up = (pgm) => {
  pgm.createTable("attachments", {
    id: "id",
    task_id: {
      type: "integer",
      notNull: true,
      references: "tasks",
      onDelete: "CASCADE",
    },
    file_name: { type: "varchar(255)", notNull: true },
    file_url: { type: "text", notNull: true },
    file_size: { type: "integer" },
    file_type: { type: "varchar(100)" },
    uploaded_by: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("attachments", "task_id");
  pgm.createIndex("attachments", "uploaded_by");
};

exports.down = (pgm) => {
  pgm.dropTable("attachments");
};