// Job for mailing user data
import fs from 'fs';
import MailService from '../services/MailService';

/**
 * @class DataExportMail
 * @description BeeQueue Job for mailing user data
 */
class DataExportMail {
  // Unique job key
  get key() {
    return 'DataExportMail';
  }

  // Job task
  async handle(data: any) {
    const { userData } = data.data;

    try {
      // Create temporary directory
      const tempDir = await fs.promises.mkdtemp(`${__dirname}/`);

      // Write userData to file in tempDir
      const tempFile = `${tempDir}/data.json`;
      await fs.promises.writeFile(tempFile, JSON.stringify(userData));

      await MailService.sendMail({
        to: `<${userData.email}>`,
        subject: `Alerta do Tesouro - Exportação de seus dados`,
        text: `<h1>Alerta do Tesouro</h1>`,
        template: 'data-export',
        attachments: [
          {
            filename: `data_export_${userData.email}.json`,
            path: tempFile,
          },
        ],
      });

      console.log(`data-export email was just sent to '${userData.email}'.`);

      // Delete temporary directory
      await fs.promises.rm(tempDir, { recursive: true });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new DataExportMail();
