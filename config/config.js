require('dotenv').config()


module.exports={
  "development": {
    "username": 'root',
    "password": 'facun90',
    "database":  'mercado_liebre_entregable',
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "ba4e41f2f7cb39",
    "password": '4e2975fc',
    "database": "heroku_4e14c5d80732c38",
    "host": "us-cdbr-east-03.cleardb.com",
    "dialect": "mysql"
  }
}
