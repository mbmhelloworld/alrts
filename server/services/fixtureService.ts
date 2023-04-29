import puppeteer from 'puppeteer';

interface IScrapFixture {
    league: string;
    homeTeam: string|null|undefined;
    awayTeam: string|null|undefined;
    time: string|null|undefined;
    date: string|null|undefined;
    channel: String[];
}

const url = 'https://www.espn.com/soccer/fixtures/_/league/ger.1';
const iScrapFixtures: IScrapFixture[] = [];

async function findFixtures(): Promise<IScrapFixture[]> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(() => {
        const matchNodes =  document.querySelectorAll('.Table__TR');
        const fixtures: IScrapFixture[] = [];
        const today = new Date();
        today.setDate(today.getDate());
        matchNodes.forEach(node => {
            const fixture: IScrapFixture = {
                league: '1.Bundesliga',
                awayTeam: node.querySelector('.away')?.textContent ?? 'unknown',
                homeTeam: node.querySelector('.Table__Team:not(.away)')?.textContent ?? 'unknown',
                time: node.querySelector('.date__col')?.textContent ?? 'NoTime',
                date: today.toString(),
                channel: ['TV'],
            };
            fixtures.push(fixture);
        });
        return fixtures;
    });
    console.log(data);
    await browser.close();
    return data;
}

export default findFixtures;
