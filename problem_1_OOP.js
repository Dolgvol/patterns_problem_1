
const data = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria
Istanbul,14160467,5461,2593,Turkey
Tokyo,13513734,2191,6168,Japan
Sao Paulo,12038175,1521,7914,Brazil
Mexico City,8874724,1486,5974,Mexico
London,8673713,1572,5431,United Kingdom
New York City,8537673,784,10892,United States
Bangkok,8280925,1569,5279,Thailand`;

const rowRenderConfig = [
    { length: 18, method: 'padEnd' },
    { length: 10, method: 'padStart' },
    { length: 8, method: 'padStart' },
    { length: 8, method: 'padStart' },
    { length: 18, method: 'padStart' },
    { length: 6, method: 'padStart' }
];

class DataHandler {
    constructor(data) {
        this.lines = data.split('\n');
        this.dataConfig = new Map([...this.lines[0].split(',').map((col, i) => [col, i]), ['relDensity', 5]]);
        this.table = this.createSortedTable();
    }

    createSortedTable() {
        return this.lines.slice(1, -1)
            .map(line => line.split(','))
            .sort((row1, row2) => row2[this.dataConfig.get('density')] - row1[this.dataConfig.get('density')]);
    }

    addRelDensity() {
        const maxDensity = this.table[0][this.dataConfig.get('density')];
        this.table = this.table.map(row => {
            const relDensityValue = (Math.round((row[this.dataConfig.get('density')] * 100) / maxDensity)).toString();        
            return [...row, relDensityValue];
        });
    }

    getTable() {
        this.addRelDensity();
        return this.table;
    }
}

class TableRenderer {
    constructor(table) {
        this.table = table;
        this.rowRenderConfig = rowRenderConfig;
    }

    render() {
        this.table.forEach(row => {
            const formattedRow = row
                .map((cell, i) => cell[this.rowRenderConfig[i].method](this.rowRenderConfig[i].length))
                .join('');
            console.log(formattedRow);
        });
    }
}

class MainApp {
    constructor(data) {
        this.handler = new DataHandler(data);
        this.renderer = new TableRenderer(this.handler.getTable());
    }

    run() {
        this.renderer.render();
    }
}

const app = new MainApp(data);
app.run();