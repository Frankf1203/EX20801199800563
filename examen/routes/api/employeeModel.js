var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');
  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(
      (err, docs) => {
        if (err) {
          handler(err, null);
        } else {
          handler(null, docs);
        }
      }
    );
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesById = (employeeId, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    empColl.findOne({ "_id": new ObjectId(employeeId) }, (err, doc) => {
      if (err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    empColl.findOne({ "company": new ObjectId(company) }, (err, doc) => {
      if (err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    empColl.findOne({ "age, range": new ObjectId(ageLowLimit,ageHighLimit) }, (err, doc) => {
      if (err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    var queryObject = { "tags": { "$in": Array.isArray(tags) ? tags : [tags] } };
    empColl.find(queryObject).toArray((err, docs) => {
      if (err) {
        handler(err, null);
      } else {
        handler(null, docs);
      }
    }); 
    //return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    var curatedTags = Array.isArray(tags) ? tags : [tags];
    var updateObject = { "$set": { "tags": curatedTags } };
    empColl.updateOne({ "_id": ObjectId(id) }, updateObject, (err, rsult) => {
      if (err) {
        handler(err, null);
      } else {
        handler(null, rsult.result);
      }
    });
    //return handler(new Error("No Implementado"), null);
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    empColl.deleteOne({ "_id": ObjectId(Id) }, (err, rslt) => {
      if (err) {
        console.log(err);
        handler(err, null);
      } else {
        handler(null, rslt.result);
      }
    });
    //return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
