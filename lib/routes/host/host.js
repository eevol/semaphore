var models = require('../../models')
var mongoose = require('mongoose')
var express = require('express')

exports.unauthorized = function (app, template) {
	template([
		'view'
	], {
		prefix: 'job'
	});
}

exports.httpRouter = function (app) {
}

exports.router = function (app) {
	app.param('hostgroup_id', getHostGroup)
	app.param('host_id', getHost)

	var hostGroup = express.Router();

	hostGroup.get('/', viewHostGroup)
	    .put('/', updateHostGroup)
		.delete('/', removeHostGroup)

		.get('/hosts', getHosts)
		.post('/hosts', addHost)

	app.use('/playbook/:playbook_id/hostgroup/:hostgroup_id', hostGroup);

	var host = express.Router();
	host.get('/', viewHost)
	    .put('/', updateHost)
		.delete('/', removeHost)
	
	app.use('/playbook/:playbook_id/hostgroup/:hostgroup_id/host/:host_id', host);
}

/*
 * hostgroup -> hosts
 */

function getHosts (req, res) {
	models.Host.find({
		group: req.hostgroup._id
	}).sort('-created').exec(function (err, hosts) {
		res.send(hosts)
	})
}

function addHost (req, res) {
	var host = new models.Host({
		group: req.hostgroup._id,
		playbook: req.playbook._id,
		name: req.body.name,
		hostname: req.body.hostname
	});
	
	host.save(function () {
		res.send(host);
	});
}

/*
 * hostgroup (singular)
 */

function getHostGroup (req, res, next, id) {
	models.HostGroup.findOne({
		_id: id
	}).exec(function (err, hostgroup) {
		if (err || !hostgroup) {
			return res.send(404);
		}

		req.hostgroup = hostgroup;
		next();
	});
}

function viewHostGroup (req, res) {
	res.send(req.hostgroup);
}

function updateHostGroup (req, res) {
    console.log("updateHostGroup: " + req);
    //req.hostgroup.update();
}

function removeHostGroup (req, res) {
	req.hostgroup.remove(function (err) {
		res.send(201);
	})
}

/*
 * hostgroup -> host (singular)
 */

function getHost (req, res, next, id) {
	models.Host.findOne({
		_id: id
	}).exec(function (err, host) {
		console.log(host);
		if (err || !host) {
			return res.send(404);
		}

		req.group_host = host;
		next();
	});
}

function viewHost (req, res) {
	res.send(req.group_host);
}

function updateHost (req, res) {
    console.log("updateHost: " + req);
    //req.group_host.update();
}

function removeHost (req, res) {
	console.log(req.group_host)
	req.group_host.remove(function (err) {
		res.send(201);
	})
}