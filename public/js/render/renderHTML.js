function webStatus(website) {
  const html = `
    <div class="alert" site="${website.name}">
    <div class="alert-status">
        <div class="source-website-light source-website-light-${
          website.status / 100 / 2 === 1
            ? "green"
            : website.status / 100 / 4 === 1
            ? "red"
            : "yellow"
        }"></div>
    </div>
    <div class="source-website-alert-name">
   <a href="${website.url}" target="_blank">${website.name}</a>
    </div>
</div>
    `;
  return html;
}
export default {
  webStatus,
};
