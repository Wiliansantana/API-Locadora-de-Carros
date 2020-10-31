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

    const qualquerUrl1 = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl1);


    const modelo = await page.evaluate(() => {
        return document.querySelector('.modelName').innerText;
    });


    const qualquerUrl2 = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl2);

    const ano = await page.evaluate(() => {
        return document.querySelector('.modelYear').innerText;
    });


    const qualquerUrl3 = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl3);


    const ptotal = await page.evaluate(() => {
        return document.querySelector('.title-big').innerText;
    });

    const qualquerUrl4 = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl4);


    const ptdetalhada = await page.evaluate(() => {
        return document.querySelector('.grade-box__body').innerText;
    });


    const qualquerUrl5 = `https://www.icarros.com.br/ford/ecosport/2021/opiniao-do-dono`;
    await page.goto(qualquerUrl5);


    const valor = await page.evaluate(() => {
        return document.querySelector('.font-bold').innerText;
    });



    await browser.close();



    // retorna os dados
    return res.send({ ok: true, marca, modelo, ano, ptotal, ptdetalhada, valor });
});


module.exports = app;