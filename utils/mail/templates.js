export const textTemplate = (link) => {
  if (!link) {
    return '';
  }
  return `Please, confirm your email address by pasting the link below into your browser.\n\n${link}`;
};

export const htmlTemplate = (link) => {
  if (!link) {
    return '';
  }

  return `
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
      <tbody>
        <tr>
          <td align="center" valign="top" bgcolor="#D1D1D1" width="100%" style="padding:40px 0;background-color:#D1D1D1">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;max-width:580px;min-width:300px;margin:0 auto;">
              <tbody>
                <tr>
                  <td align="center" valign="top" bgcolor="#ffffff" style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;padding:40px 0;border-radius:20px;">
                    <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:center;vertical-align:top;width:100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" style="padding:0 40px">
                              <a href="https://www.upfemco.com" style="margin:0;font-weight:normal;line-height:1;margin:0;padding:0;text-align:left;text-decoration:none" target="_blank">
                                Up FemCo
                              </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                      <tbody>
                        <tr style="padding:0;text-align:left;vertical-align:top">
                          <td align="center" valign="top" height="30px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:30px;font-weight:normal;line-height:30px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                      <tbody>
                        <tr>
                          <td align="left" valign="top" style="padding:0 40px">
                            <h1>Hi there,</h1>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                      <tbody>
                        <tr>
                          <td align="left" valign="top" style="padding:0 40px;">
                            <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                              <tbody>
                                <tr style="padding:0;text-align:left;vertical-align:top">
                                  <td align="center" valign="top" height="10px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                              <tbody>
                                <tr style="padding:0;text-align:left;vertical-align:top">
                                  <td align="center" valign="top" height="20px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            <h2 style="font-weight:400">Complete your support by confirming your email address.</h2>
                            Use the button below to confirm your address.
                            <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                              <tbody>
                                <tr style="padding:0;text-align:left;vertical-align:top">
                                  <td align="center" valign="top" height="50px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:50px;font-weight:normal;line-height:50px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:center;vertical-align:top;width:100%">
                              <tbody>
                                <tr>
                                  <td align="center" valign="top">
                                    
                                    <a href="${link}" style="box-sizing:border-box;border:2px solid #011627;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Inter','Helvetica','Arial',sans-serif;font-size:20px;font-weight:600;padding:14px 40px;text-align:center;text-decoration:none;background-color:#011627" target="_blank">
                                      Confirm your email address
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                              <tbody>
                                <tr style="padding:0;text-align:left;vertical-align:top">
                                  <td align="center" valign="top" height="50px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:50px;font-weight:normal;line-height:50px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            Or you can copy and paste this link into your browser: 
                            <b />
                            <a href="${link}" style="color:#F6DB6E;display:inline-block;font-family:'Inter','Helvetica','Arial',sans-serif;text-decoration:underline;" target="_blank">
                              ${link}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;
};
