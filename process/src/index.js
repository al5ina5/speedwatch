import { exec } from "child_process"
import path, { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import cron from 'node-cron'
import cors from 'cors'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express'
// const express = require('express')
const app = express()
const port = 7777

console.log(__dirname)

const file = join(__dirname, '../', 'db.json')

const adapter = new JSONFile(file)
const db = new Low(adapter)

const speedtest = async () => {
    exec("speedtest -f json", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        await db.data.tests.push(JSON.parse(stdout))
        await db.write()
    });
}


const init = async () => {
    await db.read()
    db.data ||= { tests: [] }

    app.use(cors('*'))

    app.get('/', (req, res) => {
        res.send(db.data)
    })

    app.listen(port)


    cron.schedule('* * * * *', () => {
        speedtest()
    });
}

init()