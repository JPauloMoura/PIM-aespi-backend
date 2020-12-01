import {BaseDataBase} from "./data/BaseDataBase"

class CreateTable extends BaseDataBase{
   async createTables(){
      try {
         await this.getConnection().raw(`
            CREATE TYPE TYPE_USER AS ENUM ('student','teacher','admin');
            CREATE TABLE IF NOT EXISTS users(
               id VARCHAR(255) PRIMARY KEY,
               email VARCHAR(255) NOT NULL UNIQUE,
               password VARCHAR(255) NOT NULL,
               role TYPE_USER NOT NULL,
               questionnaire_answered BOOLEAN DEFAULT false
            );
         `)

         await this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS questionnaires(
                id VARCHAR(255) PRIMARY KEY,
                question TEXT NOT NULL UNIQUE,
                role TYPE_USER NOT NULL
            );
         `)

         await this.getConnection().raw(`
            CREATE TYPE TYPE_RESPONSE AS ENUM ('great', 'good', 'regular', 'bad', 'very bad');
            CREATE TABLE IF NOT EXISTS evaluative_report(
                id_question VARCHAR(255) NOT NULL,
                response TYPE_RESPONSE NOT NULL,
                FOREIGN KEY (id_question) REFERENCES questionnaires(id)
            );
         `)
   
         console.log("Postgres setup completed!")
      } catch (error) {
         console.log(error)
      }
   }
}

const dataBase:CreateTable = new CreateTable()
dataBase.createTables()