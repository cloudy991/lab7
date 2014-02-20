var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }

  models.Project.find({"_id": projectID}).exec(afterQuery);
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();

    var newData = new models.Project({
      "title": form_data.project_title,
      "date": form_data.date,
      "summary": form_data.summary,
      "image": form_data.image_url
    });

  function saveCallback(err) {
    if(err) { 
      console.log(err); 
    }
    else {
      console.log("No Error during save!");
      res.send();
    }
  }

    newData.save(saveCallback);



}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  function deleteCallback(err) {
    if(err) { 
      console.log(err); 
    }
    else {
      console.log("No Error during remove!");
      res.send();
    }
  }

  models.Project.find({"_id": projectID}).remove().exec(deleteCallback);

}