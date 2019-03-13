var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res, next) => {
    
    empModel.getEmployees( (err, docs)=>{
      if (err) {
        console.log(err);
        return res.status(500).json({"error":"Something went wrong :("});
      }
      return res.status(200).json(docs);
    });
    
  });// all

  router.get('/byid/:employeeid', (req, res, next) => {
    empModel.getThingById(req.params.employeeid, (err, employeeDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "error": "Error al obtener el empleado" });
      }
      return res.status(200).json(employeeDoc);
    });
  });
  
  router.get('/bycompany/:company', (req, res, next) => {
    empModel.getEmployeesByCompany(req.params.company, (err, companyDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "error": "Error al obtener el company" });
      }
      return res.status(200).json(companyDoc);
    });
  });

  router.get('/byagerange/:min/:max', (req, res, next) => {
    empModel.getEmployeesByCompany(req.params.company, (err, companyDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "error": "Error al obtener el company" });
      }
      return res.status(200).json(companyDoc);
    });
  });

  router.get('/bytag/:tag', (req, res, next) => {
    empModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "error": "No se encontro el tag" });
      } else {
        return res.status(200).json(docs);
      }
    }); //searchByTag
  });

  router.put('/addtag/:id', (req, res, next) => {
    empModel.addEmployeeATag((req.body.tags || '').split('|'), req.params.id, (err, rsult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ "error": "No se puede actualizar el tag" });
      }
      return res.status(200).json(rsult);
    });
  });





  return router;
}

module.exports = initEmployee;
