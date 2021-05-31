import SV from './SV';
import Config from '../../../config/config';

const crypto = require('crypto');
const aesjs = require('aes-js');

const ENCRYPTION_KEY = [13, 15, 8, 5, 10, 53, 21, 9, 3, 9, 43, 18, 26, 3, 51, 4];

export default class SF {

    static hashPassword(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) {
                    reject(err);
                }

                resolve(derivedKey.toString('hex'));
            });
        });
    }

    static generateSalt() {
        return new Promise((resolve, reject) => {
            return crypto.randomBytes(128, (err, buf) => {
                if (err) {
                    reject(err);
                }

                resolve(buf.toString('hex'));
            });
        });
    }

    static passwordValidation(password) {
        return true;
    }

    static hashContent(content) {
        const hash = crypto.createHash('sha256');
        hash.update(content);
        return hash.digest('hex');
    }

    static encrypt(plainString) {
        const bytes = aesjs.utils.utf8.toBytes(plainString);
        const aesCtr = new aesjs.ModeOfOperation.ctr(ENCRYPTION_KEY, new aesjs.Counter(5));
        const encryptedBytes = aesCtr.encrypt(bytes);
        return aesjs.utils.hex.fromBytes(encryptedBytes);
    }

    static descrypt(encryptedHex) {
        const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
        const aesCtr = new aesjs.ModeOfOperation.ctr(ENCRYPTION_KEY, new aesjs.Counter(5));
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return aesjs.utils.utf8.fromBytes(decryptedBytes);
    }

    static getTargetSiteWebUrlButMine(): string[] {
        const result = [];

        if (Config.Server.SITE_ID !== 1) {
            result.push(Config.Server.SITE_ID_1_WEB_URL);
        }
        if (Config.Server.SITE_ID !== 2) {
            result.push(Config.Server.SITE_ID_2_WEB_URL);
        }
        if (Config.Server.SITE_ID !== 3) {
            result.push(Config.Server.SITE_ID_3_WEB_URL);
        }

        return result;
    }

    static getTargetSiteWebUrlByDestinationSiteId(destinationSiteId: number): string {
        switch (destinationSiteId) {
            case 1:
                return Config.Server.SITE_ID_1_WEB_URL;
            case 2:
                return Config.Server.SITE_ID_2_WEB_URL;
            case 3:
                return Config.Server.SITE_ID_3_WEB_URL;
            default:
                return SV.Strings.EMPTY;
        }
    }

    static getIntegrationNodeDestinationAddrByDestinationSiteId(destinationSiteId: number): string {
        switch (destinationSiteId) {
            case 1:
                return Config.Server.SITE_ID_1_INTEGRATION_NODE_ADDR;
            case 2:
                return Config.Server.SITE_ID_2_INTEGRATION_NODE_ADDR;
            case 3:
                return SV.Strings.EMPTY;
            default:
                return SV.Strings.EMPTY;
        }
    }

}
