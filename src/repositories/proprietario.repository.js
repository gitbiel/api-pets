import sqlite3 from 'sqlite3';
import { randomUUID } from 'crypto';
import path, { resolve } from 'path';

const dbPath = path.resolve(new URL(import.meta.url).pathname, '../petshop_db');

class ProprietarioRepository {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  async create({ nome, cpf, telefone  }) {
    return new Promise((resolve , reject) => {
  
      const id = randomUUID();

      this.db.run('INSERT INTO proprietarios VALUES(?, ?, ?, ?)', [id, nome, cpf, telefone], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
  
    })
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM proprietarios', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async listById({ id }) {
    return new Promise((resolve,reject) => {
      
      this.db.get('SELECT * FROM proprietarios WHERE id = ?', id, (err, row) => {
        if (err) {
          reject(err);
        } else if(!row){
          reject({ message: 'proprietario não encontrado'});
        } else {
          resolve(row)
        }
      });

    });
  }

  async listByProprietario({ cpf }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT cpf FROM proprietarios WHERE cpf = ?', cpf,(err, row) => {
        if(err) {
          reject(err);
        } else {
          resolve(row);
        }
      });

    });
  }

}

export default new ProprietarioRepository()