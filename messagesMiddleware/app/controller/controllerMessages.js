const consumerKafka = require("../service/consumerKafka");

module.exports = {
  async hello(route, req, res) {
    await consumerKafka();
    const hello = {
      haaalo: "aaa",
    };

    return res.json(hello);
  },
};
