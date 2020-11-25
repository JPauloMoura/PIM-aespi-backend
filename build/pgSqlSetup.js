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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDataBase_1 = __importDefault(require("./data/BaseDataBase"));
class CreateTable extends BaseDataBase_1.default {
    createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDataBase_1.default.connection.raw(`
             CREATE TABLE IF NOT EXISTS students(
                 id VARCHAR(255) PRIMARY KEY,
                 email VARCHAR(255) NOT NULL UNIQUE,
                 password VARCHAR(255) NOT NULL,
                 questionnaire_answered BOOLEAN DEFAULT false
             );
         `);
                yield BaseDataBase_1.default.connection.raw(`
            CREATE TABLE IF NOT EXISTS teaches(
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                questionnaire_answered BOOLEAN DEFAULT false
            );
         `);
                yield BaseDataBase_1.default.connection.raw(`
            CREATE TABLE IF NOT EXISTS admin(
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
         `);
                yield BaseDataBase_1.default.connection.raw(`
            CREATE TYPE TYPE_USER AS ENUM ('students','teaches');
            CREATE TABLE IF NOT EXISTS questionnaires(
                id VARCHAR(255) PRIMARY KEY,
                question TEXT NOT NULL UNIQUE,
                t_user TYPE_USER NOT NULL
            );
         `);
                yield BaseDataBase_1.default.connection.raw(`
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