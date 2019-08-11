var express = require ('express');
var todoRouter = express.Router();

var modelCreate = require ('../model/todocreatedb.js');
var modelQuery = require ('../model/todoquerydb.js');
var modelRemove = require ('../model/todoremovedb.js');
var modelUpdate = require ('../model/todoupdatedb.js');



todoRouter.get ('/todo', function (req, res){
  modelQuery.QueryGet({}, function (record){
  	if (req.xhr){//Only first load.
  	  //layout: false-> render a view without using a layout
      console.log("xhr request!");
  	  res.render ('recordTP', {layout: false, itemlist: record});
  	}else {
      console.log("load page!");
      res.render ('restfulTP', {itemlist: record});
  	}
  });
});

//Create (/restful/todo/)
todoRouter.post ('/todo', function (req, res){

  var dataSet = [{message: req.body.momsg}];
  console.log(dataSet);

  modelCreate.InsertNew (dataSet, function (msg){
  	return res.redirect('/restful/todo');
  });
});

//Read (/restful/todo/:id)
todoRouter.get ('/todo/:id', function (req, res){
  //req.params: the search string of web address.
  var dataSet = {message: req.params.id};
  modelQuery.QueryGet (dataSet, function (record){
  	if (req.xhr){
  	  res.render ('recordTP', {layout: false, itemlist: record});
  	}else {
  	  res.render ('restfulTP', {itemlist: record});
  	}
  });
});

todoRouter.put ('/todo/:id', function (req, res){
  var dataSet = {id: parseInt (req.params.id), message: req.body.momsg};
  modelUpdate.UpdataSave (dataSet, function (record){
  	res.render ('oneTP', {layout: false, oneid: record.id, onemsg: record.message});
  });
});

//Delete (/restful/todo/:id)
todoRouter.delete ('/todo/:id', function (req, res){
  console.log("todo.js delete router.");
  var dataSet = {id: parseInt (req.params.id)};

  modelRemove.RemoveSave (dataSet, function (msg){
    console.log("Enter todoremovedb.js.");
  	res.send(msg);
  });
})

todoRouter.use (function (req, res, next){
  console.log ('Something is happen...');
  next ();//Make sure we go to the next routes and don't stop here.
});

module.exports = todoRouter;