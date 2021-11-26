const e = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
    console.log("bla: " + req.body.contactPhone)

    var findContactPhone = json.clients.findIndex(el => el.phone == req.body.contactPhone);
    
    console.log("user: " + findUserPhone)
    console.log("contact: " + findContactPhone)


    delete req.body.userPhone

    if (findContactPhone != -1 && findUserPhone != -1) {

      var aux = json.clients.findIndex(el => el.phone == req.body.phone);

      json.clients[findUserPhone].contact.push({"contactName" : json.clients[findContactPhone].name, "contactPhone" : req.body.contactPhone});

      console.log("Name: " +  json.clients[findUserPhone].name)
      const data2 = {"contactName" : json.clients[findUserPhone].name, "contactPhone" : json.clients[findUserPhone].phone}

      json.clients[findContactPhone].contact.push(data2)

      let data = JSON.stringify(json);
    
      await fs.writeFile('./app/lib/bd.json', data,  {'flag':'w'},  function(err) {
        if (err) {
            return console.error(err);
        }
      });


      return res.json((json.clients[findUserPhone]));
    }

    return res.send(400, "Erro da horta");
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
  },

  async getAllUsers(route, req, res) {

    const json = require('../lib/bd.json');
    var retorno = []
    for(var i = 0; i < json.clients.length; i++) {
      retorno.push({"contactName" : json.clients[i].name, "contactPhone" : json.clients[i].phone})
    }

    return res.json(200, retorno)
  },

  async deleteContact(route, req, res) {
    const json = require('../lib/bd.json');

    var userIndex = json.clients.findIndex(el => el.phone == req.body.userPhone);
    var index = json.clients.findIndex(el => el.phone == req.body.contactPhone);
    if(index != -1 && userIndex != -1) {
      
      if((json.clients[userIndex].contact) == null) 
        return res.send(400, "Sem contatos adicionados :(");

      var findContactInsideUser = json.clients.findIndex(el => el.phone == req.body.userPhone)
      var findUserInsideContact = json.clients.findIndex(el => el.phone == req.body.contactPhone)
      
      for (var i = 0; i < json.clients[findContactInsideUser].contact.length; i++)  {

        if(json.clients[findContactInsideUser].contact[i].contactPhone === req.body.contactPhone) {
        
          delete json.clients[findContactInsideUser].contact[i]
          delete json.clients[findUserInsideContact].contact[i]

          var data = JSON.stringify(json.clients, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )

          await fs.writeFile('./app/lib/bd.json',data,  {'flag':'w'},  function(err) {
            if (err) {
                return console.error(err);
            }
          });
        }

      }
    
      return res.json((json.clients[findContactInsideUser]));
    }

    return res.send(400, "Erro da horta");
  },

  async createGroup(route, req, res) {
    const json = require('../lib/bdGroups.json');
    let jsonMonstro = {
      "groupName": req.body.groupName,
      "groupMembers": req.body.groupMembers,
      "groupID": uuidv4()
    }
    
    json.groups.push(jsonMonstro)

    let data = JSON.stringify(json);

    await fs.writeFile('./app/lib/bdGroups.json', data,  {'flag':'w'},  function(err) {
      if (err) {
          return console.error(err);
      }
    });
    return res.json((json.groups))
    console.log(indexedJSON);
  },

  async addUserToGroup(route, req, res) {
    const json = require("../lib/bdGroups.json");

    var groupIndex = json.groups.findIndex(
      (el) => el.groupID == req.body.groupID
    );

    if (groupIndex != -1) {
      if (json.groups[groupIndex] == null) {
        return res.send(400);
      }

      if (json.groups[groupIndex].groupID == req.body.groupID) {
        json.groups[groupIndex].groupMembers.push({
          "contactName": req.body.contactName,
          "contactPhone": req.body.contactPhone,
        });
      }
    }

    let data = JSON.stringify(json);

    await fs.writeFile(
      "./app/lib/bdGroups.json",
      data,
      { flag: "w" },
      function (err) {
        if (err) {
          return console.error(err);
        }
      }
    );

    return res.json(json.groups[groupIndex]);
  },

  async deleteGroup(route, req, res) {

    const json = require('../lib/bdGroups.json');

    var groupIndex = json.groups.findIndex(el => el.groupID == req.body.groupID);
    console.log("Group: " + groupIndex)
    if(groupIndex != -1) {
      
      if((json.groups[groupIndex]) == null) 
        return res.send(400, "Grupo inexistente :(");

        console.log("Aoba: " + JSON.stringify(json.groups[groupIndex]));
        
          delete json.groups[groupIndex]
          var data = JSON.stringify(json, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )

  
          //var data = JSON.stringify(json.groups, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )

          await fs.writeFile('./app/lib/bdGroups.json',data,  {'flag':'w'},  function(err) {
            if (err) {
                return console.error(err);
            }
          });

          return res.json((json.groups));

      }
      return res.send(400, "Erro da horta");

      
  },

  async deleteUserFromGroup(route, req, res) {
  
    const json = require('../lib/bdGroups.json');
    
    var groupIndex = json.groups.findIndex(el => el.groupID == req.body.groupID);
    console.log("Group: " + groupIndex)

    if(groupIndex != -1) {
      
      if((json.groups[groupIndex]) == null) 
        return res.send(400, "Grupo inexistente :(");
    
          
      var data = JSON.stringify(json.groups, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )

      if(json.groups[groupIndex].groupID == req.body.groupID) {
        
        for(var i = 0; i < json.groups[groupIndex].groupMembers.length; i++)

          if(json.groups[groupIndex].groupMembers[i].contactPhone === req.body.contactPhone) {
              
            //console.log("VRUUUM: " + JSON.stringify(json.groups[groupIndex].groupMembers[0]))
            delete json.groups[groupIndex].groupMembers[i]

              var data = JSON.stringify(json, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )
         
              await fs.writeFile('./app/lib/bdGroups.json', data,  {'flag':'w'},  function(err) {
                if (err) {
                    return console.error(err);
                }
              });

              return res.json(200, data);

            }

            return res.json(400, "sla");

      } 
    }
  },

  async getGroupsFromUser(route, req, res) {
    const json = require('../lib/bdGroups.json');

    contato = []

    for(var i = 0; i < json.groups.length; i++) {

      for(var j = 0; j < json.groups[i].groupMembers.length; j++) {
        console.log("Ó EU: " + JSON.stringify(json.groups[i].groupMembers[j].contactPhone))
        if(json.groups[i].groupMembers[j].contactPhone === req.body.contactPhone) {
          contato.push({"groupName" : json.groups[i].groupName, "groupID" : json.groups[i].groupID})
        }

      }

    }

    return res.json(200, contato)

  }


};
