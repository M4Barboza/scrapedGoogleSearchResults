import * as cheerio from "cheerio";
import fetch from 'node-fetch';
import { createServer } from 'http';



export async function getDados(String) {
    let e = String
    try {
        const response = await fetch(`https://www.google.com/search?q=${e}`);
        const body = await response.text();
        const $ = cheerio.load(body);
        const data = [];
        const titles = [];
        $(".zBAuLc.l97dzf").map((i, el) => {
            titles[i] = $(el).text();

        });

        const links = [];
        $(".egMi0.kCrYT > a").map((i, el) => {
            links[i] = $(el).attr("href");
        });

        for (let i = 0; i < titles.length; i++) {
            data[i] = {
                title: titles[i],
                links: links[i],
            };
        }
        return data

    } catch (error) {
        console.log(error);
    }
}



createServer(async (req, res) => {
    if (req.method !== 'GET' || req.url !== '/') {
        return res.end('Rota não encontrada')
    }
    const result = await getDados(String);

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result))
    res.end()
})
    .listen(3000, () => console.log('Servidor rodando em http://localhost:3000'))

