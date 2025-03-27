
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

const DATA_CONFIG = {
    'city': {
        index: 0,
        type: 'string',
    },
    'population': {
        index: 1,
        type: 'number',
    },
    'area': {
        index: 2,
        type: 'number',
    },
    'density': {
        index: 3,
        type: 'number',
    },
    'country': {
        index: 4,
        type: 'string',
    },
    'relDensity': {
        index: 5,
        type: 'number',
    },
}

const ROW_RENDER_CONFIG = [
    { length: 18, pad: 'end' },
    { length: 10, pad: 'start' },
    { length: 8, pad: 'start' },
    { length: 8, pad: 'start' },
    { length: 18, pad: 'start' },
    { length: 6, pad: 'start' },
];

const createLines = (data, separator='\n', headerLines=1) => {
    return data.split(separator).slice(headerLines);
};

const createTable = (lines, dataConfig, separator=',') => {
    return lines.map(line => {
        const cells = line.split(separator);
        return {
            city: cells[dataConfig.city.index]?.trim() || '',
            population: parseFloat(cells[dataConfig.population.index]) || 0,
            area: parseFloat(cells[dataConfig.area.index]) || 0,
            density: parseFloat(cells[dataConfig.density.index]) || 0,
            country: cells[dataConfig.country.index]?.trim() || '',
            relDensity: 0,
        }
    });
};

const makeSortedTable = (table, sortingColumn, sortingMethod = 'desc') => {
    const compareFunctions = {
        asc: (a, b) => (a > b) - (a < b),
        desc: (a, b) => (b > a) - (b < a)
    };
    return table.toSorted((row1, row2) => compareFunctions[sortingMethod](row1[sortingColumn], row2[sortingColumn]));
};

const makeUpdatedTable = (table, parentColumn) => {
    const maxDensity = table[0][parentColumn];
    return table.map(row => {
        row.relDensity = (Math.round((row[parentColumn] * 100) / maxDensity));
        return row;
    });
};

const renderTable = (table, rowRenderConfig) => {
    table.forEach(row => {
        const formattedRow = Object.values(row)
            .map((cell, i) => String(cell)[
                    (rowRenderConfig[i].pad === 'end') && 'padEnd' || 
                    (rowRenderConfig[i].pad === 'start') && 'padStart'
                ](rowRenderConfig[i].length))
            .join('');
        console.log(formattedRow);
    });
};

const main = (data) => {
    if (!data) return;
    const lines = createLines(data);
    const table = createTable(lines, DATA_CONFIG);
    const sortedTable = makeSortedTable(table, 'density');
    const updatedTable = makeUpdatedTable(sortedTable, 'density');
    renderTable(updatedTable, ROW_RENDER_CONFIG);
};

main(data);