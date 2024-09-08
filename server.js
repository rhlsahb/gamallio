const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

app.post('/upload', async (req, res) => {
    const { image, fileName } = req.body;
    const githubToken = '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';
    const owner = 'rhlsahb';
    const repo = 'gamallio';

    const path = `images/${fileName}`;
    const content = Buffer.from(image, 'base64').toString('base64');

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${githubToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Upload ${fileName}`,
            content: content,
            branch: 'main'
        })
    });

    const data = await response.json();

    if (response.ok) {
        res.json({ success: true, url: data.content.download_url });
    } else {
        res.json({ success: false, error: data.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
