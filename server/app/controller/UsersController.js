const fs = require('fs');

module.exports = {

  async getUser(route, req, res) {

    const json = require('../lib/bd.json');

    return res.json(json.clients);
  },

  async postUser(route, req, res) {

    const json = require('../lib/bd.json');

    var aux = json.clients.findIndex(el => el.phone == req.body.phone);

    if(aux == -1) {
      
      req.body.contact = [];
      json.clients.push(req.body);

      let data = JSON.stringify(json);
    
      await fs.writeFile('./app/lib/bd.json', data,  {'flag':'w'},  function(err) {
        if (err) {
            return console.error(err);
        }
      });
    
      return res.json((json.clients));
    }

    return res.send(400, "O usuario ja esta cadastrado, amigao. Tenta depois, serio");
  },

  async addContact(route, req, res) {

    const json = require('../lib/bd.json');
    
    var findUserPhone = json.clients.findIndex(el => el.phone == req.body.userPhone);
    var findContactPhone = json.clients.findIndex(el => el.phone == req.body.contactPhone);

    delete req.body.userPhone

    if (findContactPhone != -1 && findUserPhone != -1) {
      json.clients[findUserPhone].contact.push(req.body);

      let data = JSON.stringify(json);
    
      await fs.writeFile('./app/lib/bd.json', data,  {'flag':'w'},  function(err) {
        if (err) {
            return console.error(err);
        }
      });

      return res.json((json.clients[findUserPhone]));
    }
  },

  async getContacts(route, req, res) {
    const json = require('../lib/bd.json');
    var index = json.clients.findIndex(el => el.phone == req.body.phone);
    if(index != -1) {
      
      if((json.clients[index].contact) == null) 
        return res.send(400, "Sem contatos adicionados :(");

      return res.json((json.clients[index]));
    }

    return res.send(400, "Erro da horta");
  }

};
