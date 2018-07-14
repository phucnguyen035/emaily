const { redirectDomain } = require('../../config/keys');

module.exports = ({ body }) => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input</h3>
        <p>Please answer the following question</p>
        <p>${body}</p>

        <div>
          <a href="${redirectDomain}/api/surveys/feedback">Yes</a>
          <a href="${redirectDomain}/api/surveys/feedback">No</a>
        </div>
      </div>
    </body>
  </html>
`;
