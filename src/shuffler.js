function splitter(names, singles) {
    // 2a + b = 30
    // a + b = n
    // b = n - a
    // 2a + n - a = 30
    // a = 30 - n
    // x gets double box, y single.
    // works for 15 <= n <= 30
    const ALL_BOXES = 30
    const n = names.length
    const x = ALL_BOXES - n - singles.length
    const y = n - x
    return { x, y } // y == how many from the doublelist gets 1 box
}

function buildrows(doubles, singles) {
    const rows = []
    let row = "Row 1: "
    let idx = 1
    let rowIndex = 1
    for (let i = 0; i < doubles.length; i++) {
        const name = doubles[i]
        row = row.concat(`${name} ${idx},${++idx} `)
        if (idx % 10 == 0) {
            rows.push(row)
            row = `Row ${++rowIndex}: `
        }
        idx++
    }
    for (let i = 0; i < singles.length; i++) {
        const name = singles[i]
        row = row.concat(`${name} ${idx} `)
        if (idx % 10 == 0) {
            rows.push(row)
            row = `Row ${++rowIndex}: `
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

function checkDupes(allNames, n) {
    const names = new Map()
    allNames.forEach(name => {
        names.set(name, names.has(name) ? names.get(name) + 1 : 1)
    })

    if (names.size !== n) {
        const errDiv = document.getElementById("err")
        let dupes = []
        for (const key of names.keys()) {
            if (names.get(key) !== 1) {
                dupes.push(key)
            }
        }
        errDiv.textContent = errDiv.textContent +
            `Duplicate names in lists: ${dupes.join(', ')}`
        errDiv.hidden = false;
    }
}

function checkRange(n) {
    if (n > 30 || n < 15) {
        const errDiv = document.getElementById("err")
        errDiv.textContent = `Invalid number of igns: ${n}`
        errDiv.hidden = false
    }
}

function decideBoxes(ratio, namelist, singlelist) {
    // 3 cases:
    // Perfect split (e.g. 12 + 6, 13 + 4)
    // Too many doubles: Have to push some doubles to singles
    // Too little doubles: Have to pull from singles to doubles

    const shuffledNames = shuffleArray(namelist)
    const shuffledSingles = shuffleArray(singlelist)

    let doubles = shuffledNames.slice(0, ratio['x']) // can slice past the end
    const y = ratio['y']
    let singles
    if (y === 0) {
        singles = shuffledSingles
    } else if (y >= 0) {
        singles = shuffledNames.slice(-y).concat(shuffledSingles)
    } else if (y <= 0) {
        doubles = doubles.concat(shuffledSingles.slice(0, -y))
        singles = shuffledSingles.slice(-y, shuffledSingles.length)
    }
    return { doubles, singles }
}

function shuffle() {

    resetElements()

    const box = document.getElementById("namesarea")
    const namelist = box.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const singlebox = document.getElementById("singlearea")
    const singlelist = singlebox.value.split("\n").map(s => s.trim()).filter(s => s.length > 0)

    const allNames = namelist.concat(singlelist)
    const n = allNames.length

    checkDupes(allNames, n)
    checkRange(n)

    const ratio = splitter(namelist, singlelist)

    const { doubles, singles } = decideBoxes(ratio, namelist, singlelist)

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

module.exports = { decideBoxes, splitter }