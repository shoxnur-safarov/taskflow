exports.up = (pgm) => {
  // Umumiy trigger funksiyasi
  pgm.createFunction(
    "update_updated_at_column",
    [],
    {
      returns: "trigger",
      language: "plpgsql",
    },
    `
    BEGIN
      NEW.updated_at = current_timestamp;
      RETURN NEW;
    END;
    `
  );

  // updated_at ustuniga ega barcha jadvallarga trigger qo'shamiz
  const tables = ["users", "workspaces", "projects", "tasks", "comments"];

  tables.forEach((table) => {
    pgm.createTrigger(table, `set_updated_at_${table}`, {
      when: "BEFORE",
      operation: "UPDATE",
      function: "update_updated_at_column",
      level: "ROW",
    });
  });
};

exports.down = (pgm) => {
  const tables = ["users", "workspaces", "projects", "tasks", "comments"];

  tables.forEach((table) => {
    pgm.dropTrigger(table, `set_updated_at_${table}`);
  });

  pgm.dropFunction("update_updated_at_column", []);
};