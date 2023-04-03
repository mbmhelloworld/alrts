// import puppeteer from 'puppeteer';
//
// async function findChannelsForMatch({fixture}: { fixture: any }): Promise<String[]> {
//     const searchQuery = `${fixture.homeTeam} vs ${fixture.awayTeam}`;
//     const url = 'https://www.tvguide.com/';
//
//     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
//     const page = await browser.newPage();
//
//     await page.goto(url);
//     await page.type('#searchInput', searchQuery);
//     await page.keyboard.press('Enter');
//
//     await page.waitForSelector('.search-results');
//
//     const results = await page.$$('.search-results .search-result');
//
//     let channels: String[] = [];
//
//     for (let i = 0; i < results.length; i++) {
//         const result = results[i];
//         const title = await result.$eval('.result-title', (el: Element) => el.textContent);
//
//         if (title?.toLowerCase().includes(searchQuery.toLowerCase())) {
//             const channelName = await result.$eval('.result-channel', (el: Element) => el.textContent);
//             //const channelLink = await result.$eval('.result-channel a', (el: HTMLAnchorElement) => el.getAttribute('href'));
//
//             channels.push(channelName??'');
//         }
//     }
//
//     await browser.close();
//
//     return channels;
// }
//
// export default findChannelsForMatch;