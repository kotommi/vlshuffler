function splitter(names, singles) {
    // 2x + y = 30
    // x + y = n
    // y = n - x
    // 2x + n - x = 30
    // x = 30 - n
    // x gets double box, y single.
    // works for 15 <= n <= 30
    const ALL_BOXES = 30
    const n = names.length
    const x = ALL_BOXES - n - singles.length
    const y = n - x
    return { x, y }
}

function buildrows(doubles, singles) {
    const rows = []
    let row = "Row 1: "
    let idx = 1
    let rowi = 1
    for (let i = 0; i < doubles.length; i++) {
        const name = doubles[i]
        row = row.concat(`${name} ${idx},${++idx} `)
        if (idx % 10 == 0) {
            rows.push(row)
            row = `Row ${++rowi}: `
        }
        idx++
    }
    for (let i = 0; i < singles.length; i++) {
        const name = singles[i]
        row = row.concat(`${name} ${idx} `)
        if (idx % 10 == 0) {
            rows.push(row)
            row = `Row ${++rowi}: `
        }
        idx++
    }
    return rows
}

function shuffle() {
    const box = document.getElementById("namesarea")
    const namelist = box.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const singlebox = document.getElementById("singlearea")
    const singlelist = singlebox.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const ratio = splitter(namelist, singlelist)

    const shuffled = shuffleArray(namelist)
    const doubles = shuffled.slice(0, ratio["x"])
    const singles = ratio["y"] !== 0 ? shuffled.slice(-ratio["y"]).concat(singlelist) : singlelist

    const rows = buildrows(doubles, singles)
    const prows = rows.map(row => {
        const el = document.createElement("p")
        el.appendChild(document.createTextNode(row))
        return el
    })
    const rowdiv = document.getElementById("rowdiv")
    rowdiv.hidden = false
    rowdiv.textContent = null
    prows.forEach(row => rowdiv.append(row))
}

function shuffleArray(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
