const mongoose = require('mongoose');
const SchemaDB = mongoose.Schema;

var EmployersSchemaDB = new SchemaDB({
        first_name: String,
        last_name: String,
        birth_date: String,
        salary: Number
    },
    { 
        collection: 'employers'
    }
);

module.exports = mongoose.model('EmployersSchemaDB', EmployersSchemaDB);
