const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/carro', async (req, res, next) => {
    const browser = await puppeteer.launch({ headless: true, 'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ] });
    const page = await browser.newPage();

    const qualquerUrl = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl);

    const marca = await page.evaluate(() => {
        return document.querySelector('.makeName').innerText;
    });

    const modelo = await page.evaluate(() => {
        return document.querySelector('.modelName').innerText;
    });

    const ano = await page.evaluate(() => {
        return document.querySelector('.modelYear').innerText;
    });

    const ptotal = await page.evaluate(() => {
        return document.querySelector('.title-big').innerText;
    });

    const ptdetalhada = await page.evaluate(() => {
        return document.querySelector('.grade-box__body').innerText;
    });

    const splittedPtDetalhada = ptdetalhada.split(/\n/)

    const confortoAcabamento = splittedPtDetalhada[0]
    const consumo = splittedPtDetalhada[2]
    const custoBeneficio = splittedPtDetalhada[4]
    const design = splittedPtDetalhada[7]
    const dirigibilidade = splittedPtDetalhada[9]
    const manutencao = splittedPtDetalhada[11]
    const performance = splittedPtDetalhada[13]

    const valor = await page.evaluate(() => {
        return document.querySelector('.font-bold').innerText;
    });
    
    const pontuacaoDetalhada = {
        confortoAcabamento,
        consumo,
        custoBeneficio,
        design,
        dirigibilidade,
        manutencao,
        performance
    }

    const car = {
        marca,
        modelo,
        ano,
        ptotal,
        pontuacaoDetalhada,
        valor
    }

    await browser.close();

    return res.send({ ok: true, car });
});


module.exports = app;
