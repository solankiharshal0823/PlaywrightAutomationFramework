const fs = require('fs');

class PropertiesReader {
    constructor(filePath) {
        this.properties = {};
        this.loadProperties(filePath);
    }

    loadProperties(filePath) {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        for (const line of lines) {
            if (line.trim() && !line.startsWith('#')) {
                const index = line.indexOf('=');
                const key = line.slice(0, index).trim();
                const value = line.slice(index + 1).trim();
                this.properties[key] = value;
            }
        }
    }

    getProperty(key) {
        return this.properties[key];
    }
};

module.exports = PropertiesReader;