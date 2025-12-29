const container = document.querySelector('#gameContainer');

for (let i = 0; i < 15; i++) {
    const column = document.createElement('div');
    column.textContent = '';
    column.className = 'column';
    container.appendChild(column);
    for (let j = 0; j < 15; j++) {
        const row = document.createElement('div');
        row.textContent = '';
        row.className = 'row';
        column.appendChild(row);
    } 
}