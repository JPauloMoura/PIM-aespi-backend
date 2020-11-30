"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDataBase_1 = require("./data/BaseDataBase");
class CreateTable extends BaseDataBase_1.BaseDataBase {
    createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().raw(`
            CREATE TYPE TYPE_USER AS ENUM ('student','teacher','admin');
            CREATE TABLE IF NOT EXISTS users(
               id VARCHAR(255) PRIMARY KEY,
               email VARCHAR(255) NOT NULL UNIQUE,
               password VARCHAR(255) NOT NULL,
               role TYPE_USER NOT NULL,
               questionnaire_answered BOOLEAN DEFAULT false
            );
         `);
                yield this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS questionnaires(
                id VARCHAR(255) PRIMARY KEY,
                question TEXT NOT NULL UNIQUE,
                role TYPE_USER NOT NULL
            );
         `);
                yield this.getConnection().raw(`
            CREATE TYPE TYPE_RESPONSE AS ENUM ('great', 'good', 'bad', 'very bad');
            CREATE TABLE IF NOT EXISTS evaluative_report(
                id_question VARCHAR(255) NOT NULL,
                response TYPE_RESPONSE NOT NULL,
                FOREIGN KEY (id_question) REFERENCES questionnaires(id)
            );
         `);
                console.log("Postgres setup completed!");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const dataBase = new CreateTable();
dataBase.createTables();
//# sourceMappingURL=pgSqlSetup.js.map