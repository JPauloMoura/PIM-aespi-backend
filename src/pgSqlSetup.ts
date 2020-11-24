import BaseDataBase from "./data/BaseDataBase"

class CreateTable extends BaseDataBase{
   async createTables(){
      try {
         await BaseDataBase.connection.raw(`
             CREATE TABLE IF NOT EXISTS students(
                 id VARCHAR(255) PRIMARY KEY,
                 email VARCHAR(255) NOT NULL UNIQUE,
                 password VARCHAR(255) NOT NULL,
                 questionnaire_answered BOOLEAN DEFAULT false
             );
         `)
   
         await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS teaches(
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                questionnaire_answered BOOLEAN DEFAULT false
            );
         `)

         await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS admin(
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
         `)

         await BaseDataBase.connection.raw(`
            CREATE TYPE TYPE_USER AS ENUM ('students','teaches');
            CREATE TABLE IF NOT EXISTS questionnaires(
                id VARCHAR(255) PRIMARY KEY,
                question TEXT NOT NULL UNIQUE,
                t_user TYPE_USER NOT NULL
            );
         `)

         await BaseDataBase.connection.raw(`
            CREATE TYPE TYPE_RESPONSE AS ENUM ('great', 'good', 'bad', 'very bad');
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