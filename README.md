# Node.js with TypeScript

Install npm and sequelize-cli:

Run migration:
 -npx sequelize db:migrate
Run seed:
 -npx sequelize db:seed:all

Start:
 -npm run build
 -npm start

## Main Libraries

- [Express](http://expressjs.com/) - web framework
- [InversifyJS](https://github.com/inversify/InversifyJS) - TypeScript DI/IoC framework
- [Sequelize](https://github.com/typeorm/typeorm) - Sequelize ORM 
- [Passport]
- [Joi]
- [winston](https://github.com/winstonjs/winston) - logging framework

## Architecture

The example follows a 3-tier architecture of controller -> service -> repository. The repository layer produces and accepts DTOs, the service and controller layers produce and accept models.