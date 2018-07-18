const { redirectDomain } = require('../../config/keys');

module.exports = ({ body, id }) => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>We would like your input</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>

        <div>
          <a href="${redirectDomain}/api/surveys/${id}/yes">Yes</a>
          <a href="${redirectDomain}/api/surveys/${id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
`;
