const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')


var mongooseDb = require("../lib/mongoose");
var tickets = require('../lib/schema_tickets');

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  databases: [mongooseDb],
  rootPath: '/admin',
})




const router = AdminJSExpress.buildRouter(adminJs);
module.exports = router;
