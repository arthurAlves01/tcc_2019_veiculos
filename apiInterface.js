const sql = require("sqlite3")
const db = new sql.Database("portal.db")
const express = require('express');
const router = express.Router();
const pug = require('pug');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/")