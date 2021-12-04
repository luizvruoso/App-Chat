const consumerKafka = require("../service/consumerKafka");

module.exports = {
  async hello() {
    console.log("aaa");
    await consumerKafka();
    const hello = {
      haaalo: "aaa",
    };

    //return res.json(hello);
  },
};
