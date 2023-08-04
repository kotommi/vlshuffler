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

const resetElements = () => {
    const errDiv = document.getElementById("err")
    if (errDiv) {
        errDiv.hidden = true
        errDiv.textContent = null
    }
    const rowdiv = document.getElementById("rowdiv")
    if (rowdiv) {
        rowdiv.hidden = true
        rowdiv.textContent = null
    }


}

function shuffle() {

    resetElements()

    const box = document.getElementById("namesarea")
    const namelist = box.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const singlebox = document.getElementById("singlearea")
    const singlelist = singlebox.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const allNames = namelist.concat(singlelist)
    const names = new Map()
    allNames.forEach(name => {
        map.set(name, map.has(name) ? map.get(name) + 1 : 1)
    })
    singlelist.forEach(name => names.add(name))

    const n = namelist.length + singlelist.length

    if (n > 30 || n < 15) {
        const errDiv = document.getElementById("err")
        errDiv.textContent = `Invalid number of igns: ${n}`
        errDiv.hidden = false
    }

    if (names.size !== n) {
        const errDiv = document.getElementById("err")
        errDiv.textContent = errDiv.textContent +
            `Duplicate names in lists: ${names.keys().filter(name => names.get(name) !== 1).join(', ')}`
        errDiv.hidden = false;
    }

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
    prows.forEach(row => rowdiv.append(row))
}

function shuffleArray(array) {
    let m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
