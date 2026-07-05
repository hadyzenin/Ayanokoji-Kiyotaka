/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

 const fs = require('fs');
 const path = require('path');
 const axios = require('axios');
 const cheerio = require('cheerio');
const { aikey } = require('../kiyotaka');

const path = require('path');
const fs = require('fs');

function clear() {
    const assetsDir = path.join(__dirname, '..', 'assets');
    fs.readdir(assetsDir, (err, files) => {
        if (err) return;
        files.forEach((file) => {
            const filePath = path.join(assetsDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (stats.isFile()) {
                    fs.unlink(filePath, () => {});
                }
            });
        });
    });
}

async function getStream(hadi, isekai) {
    try {
  const kiyotaka = await axios.get(hadi, { responseType: 'arraybuffer' });
  const otaku = Buffer.from(kiyotaka.data, 'binary');
  const wibu = path.join(__dirname, '..', 'assets', isekai);
    fs.writeFileSync(wibu, otaku);
      return wibu;
  } catch (error) {
    throw error;
 }
};

async function fbid(link) {
	try {
		const response = await axios.post(
			'https://seomagnifier.com/fbid',
			new URLSearchParams({
				'facebook': '1',
				'sitelink': link
			}),
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Cookie': 'PHPSESSID=0d8feddd151431cf35ccb0522b056dc6'
				}
			}
		);
		const id = response.data;
		if (isNaN(id)) {
			const html = await axios.get(link);
			const $ = cheerio.load(html.data);
			const el = $('meta[property="al:android:url"]').attr('content');
			if (!el) {
				throw new Error('UID not found');
			}
			const number = el.split('/').pop();
			return number;
		}
		return id;
	} catch (error) {
		throw new Error('An unexpected error occurred. Please try again.');
	}
};

async function DyAI(pesan) {
const res = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
  model: "llama-3.1-8b-instant",
  messages: [{ role: "user", content: pesan }]
}, {
  headers: {
    "Authorization": `Bearer ${aikey}`,
    "Content-Type": "application/json"
  }
}); 
  return res.data.choices[0].message.content;
};

module.exports = { clear, getStream, fbid, DyAI };
