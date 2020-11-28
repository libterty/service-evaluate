module.exports = {
  apps: [
    {
      name: "service-evaluate",
      script: "../dist/src/main",
      watch: true,
      error_file: "/logs/service-evaluate.log",
      out_file: "/logs/service-evaluate.log",
      merge_logs: true,
    },
  ],
};
