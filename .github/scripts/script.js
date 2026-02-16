const fs = require('fs');
const repos = JSON.parse(fs.readFileSync('repos.json', 'utf8'));

let readme = fs.readFileSync('README.md', 'utf8');

let tableHtml = `<table style="border-collapse: collapse;width: 100%;">
    <thead align="center">
        <tr>
            <td><b>Project</b></td>
            <td><b>URL</b></td>
            <td><b>Description</b></td>
        </tr>
    </thead>
    <tbody>\n`;

repos.forEach(repo => {
    tableHtml += `        <tr>
            <td>${repo.name}</td>
            <td><a href="${repo.html_url}">${repo.html_url}</a></td>
            <td>${repo.description || 'No Description'}</td>
        </tr>\n`;
});

tableHtml += `    </tbody>
</table>`;

const startMarker = '<!-- PROJECTS:START -->';
const endMarker = '<!-- PROJECTS:END -->';
const newReadme = readme.replace(
    new RegExp(`${startMarker}[\\s\\S]*${endMarker}`),
    `${startMarker}\n${tableHtml}\n${endMarker}`
);

fs.writeFileSync('README.md', newReadme);