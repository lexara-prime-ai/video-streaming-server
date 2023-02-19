const log = console.log;
const fs = require('fs');
const fsPromises = require('fs').promises;
const  path = require('path');
const date = require('date-fns');
const { v4:uuid } = require('uuid');
const log_events = async (message, file_name) => {
    const log_date = date.format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const log_item = `${log_date}\t${uuid()}\t${message}\n`;
    try {
        let dir_path = path.join(__dirname, 'logs');
        let file_path = path.join(__dirname, 'logs', file_name);
        if (!fs.existsSync(dir_path)) {
            log('Creating log directory...');
            log(log_item);
            await fsPromises.mkdir(dir_path);
            await fsPromises.appendFile(file_path, log_item);
        } else {
            log(log_item);
            await fsPromises.appendFile(file_path, log_item);
        }
    } catch (err) {
        console.error(err);
    }
}
module.exports = log_events;