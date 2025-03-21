
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

const createLines = (data) => {
    return data.split('\n');
};

const createDataConfig = (lines) => {
    return new Map([...lines[0].split(',').map((col, i) => [col, i]), ['relDensity', 5]]);
};

const createSortedTable = (lines, dataConfig) => {
    return lines.slice(1, -1)
        .map(line => line.split(','))
        .sort((row1, row2) => row2[dataConfig.get('density')] - row1[dataConfig.get('density')]);
};

const addRelDensity = (table, dataConfig) => {
    const maxDensity = table[0][dataConfig.get('density')];
    return table.map(row => {
        const relDensityValue = (Math.round((row[dataConfig.get('density')] * 100) / maxDensity)).toString();        
        return [...row, relDensityValue];
    });
};

const renderTable = (table, rowRenderConfig) => {
    table.forEach(row => {
        const formattedRow = row
            .map((cell, i) => cell[rowRenderConfig[i].method](rowRenderConfig[i].length))
            .join('');
        console.log(formattedRow);
    });
};

const main = (data) => {
    if (!data) return;
    const rowRenderConfig = [
        { length: 18, method: 'padEnd' },
        { length: 10, method: 'padStart' },
        { length: 8, method: 'padStart' },
        { length: 8, method: 'padStart' },
        { length: 18, method: 'padStart' },
        { length: 6, method: 'padStart' }
    ];
    const lines = createLines(data);
    const dataConfig = createDataConfig(lines);
    const table = createSortedTable(lines, dataConfig);
    renderTable(addRelDensity(table, dataConfig),rowRenderConfig);
};

main(data);