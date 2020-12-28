function loadchemequ() {
    var e = ["Al + Fe2O4 = Fe + Al2O3", "H2 + O2 = H2O", "Fe + O2 = Fe2O3", "NH3 + O2 = NO + H2O", "Mg + HCl = MgCl2 + H2", "CH4 + O2 = CO2 + H2O", "C6H12O6 + O2 = CO2 + H2O", "CH4 + O2 = CO2 + 2H2O"]
      , t = e[Math.floor(Math.random() * e.length)];
    $("#chemeuqation").val(t)
}
function CallId(e) {
    var t = e
      , i = document.getElementById("chemeuqation").value;
    $("#chemeuqation").val(i + t)
}
function CallSpace() {
    var e = document.getElementById("chemeuqation").value;
    $("#chemeuqation").val(e + " ")
}
function CallNumber(e) {
    var t = e
      , i = document.getElementById("chemeuqation").value;
    $("#chemeuqation").val(i + t)
}
function CallClear() {
    document.getElementById("chemeuqation").value = ""
}
var atomSet, tablicaJonow, tablicaCzasteczek, heightfromTop = 0, totalWidth = $(window).width();
function getHeight() {
    (heightfromTop = $("#sidebar").offset().top) ? document.getElementById("sidebar").offsetHeight : heightfromTop = $("#sidebar").offset().top
}
function stopRKey(e) {
    var t = (e = e || (event || null)).target ? e.target : e.srcElement ? e.srcElement : null;
    if (13 == e.keyCode && "text" == t.type)
        return !1
}
class aClass_moleculeSet {
    constructor() {
        this.count = 0;
        this.data = new Array;
    }

    add(e) {
        this.data[this.count] = e,
        this.count++
    }

    addOnce(e) {
        for (var t = 0; t < this.count; t++)
            if (this.data[t].name == e.name)
                return;
        this.data[this.count] = e,
        this.count++
    }
    
    size() {
        return this.count
    }
    
    itemAt(e) {
        return this.data[e]
    }

    writeOut() {
        for (var e = 0; e < this.count; e++)
            beingUsed_write(this.data[e].name),
            e < this.count - 1 && beingUsed_write(", ")
    }

    indexOf(e) {
        for (var t = 0; t < this.count; t++)
            if (this.data[t].name == e)
                return t;
        return -1
    }
    
    contains(e) {
        for (var t = 0; t < this.count; t++)
            if (this.data[t] == e)
                return !0;
        return !1
    }
}
function multiply(e, t) {
    var i = new Array;
    for (ii = 0; ii < e.length; ii++)
        i[ii] = e[ii] * t;
    return i
}
function add(e, t) {
    var i = new Array;
    for (ii = 0; ii < e.length; ii++)
        i[ii] = e[ii] + t[ii];
    return i
}
function Matrix(width, height) {
    for (this.width = width,
    this.height = height,
    this.matrix = new Array(width),
    this.getElement = function(e, t) {
        return this.matrix[e][t]
    }
    ,
    this.setElement = function(e, t, i) {
        this.matrix[e][t] = i
    }
    ,
    this.wypisz = function() {
        for (ii = 0; ii < height; ii++) {
            for (kk = 0; kk < width; kk++) {
                var i = String(this.matrix[kk][ii]);
                1 == i.length ? beingUsed_write("  " + i) : 2 == i.length ? beingUsed_write(" " + i) : beingUsed_write(i),
                beingUsed_write(" ")
            }
            beingUsed_write("\n")
        }
    }
    ,
    this.copy = function() {
        var i = new Matrix(width,height);
        for (ii = 0; ii < width; ii++)
            for (i.matrix[ii] = new Array(height),
            x = 0; x < height; x++)
                i.matrix[ii][x] = this.matrix[ii][x];
        return i
    }
    ,
    this.substituteColumn = function(e, i) {
        for (x = 0; x < height; x++)
            this.matrix[e][x] = i[x]
    }
    ,
    this.det = function() {
        for (var lastDiv, lastRow, rowProduct = 1, a = 1, rowOffset = 1, row = 0; row < height - 1; row++)
            for (var subRow = row + 1; subRow < height; subRow++) {
                rowOffset = 1;
                e: for (; 0 == this.matrix[row][row]; ) {
                    if (row + rowOffset >= height) {
                        a = 0;
                        break e
                    }
                    for (var column = 0; column < height; column++)
                        lastRow = this.matrix[row][column],
                        this.matrix[row][column] = this.matrix[row + rowOffset][column],
                        this.matrix[row + rowOffset][column] = lastRow;
                    rowOffset++,
                    a *= -1
                }
                if (0 != this.matrix[row][row]) {
                    lastDiv = -this.matrix[subRow][row] / this.matrix[row][row];
                    for (var subSubRow = row; subSubRow < height; subSubRow++)
                        this.matrix[subRow][subSubRow] = lastDiv * this.matrix[row][subSubRow] + this.matrix[subRow][subSubRow]
                }
            }
        for (var u = 0; u < height; u++)
            rowProduct *= this.matrix[u][u];
        return rowProduct * a
    }
    ,
    this.randomSubMatrix = function() {
        for (var set = new aClass_moleculeSet, mat = new Matrix(width,width - 1), a = 0; a < width; a++)
            mat.matrix[a][0] = this.matrix[a][0];
        set.add(0);
        for (var i = 1; i < width - 1; i++) {
            for (var o; ; )
                if (o = Math.ceil(Math.random() * height - 1),
                !set.contains(o)) {
                    set.add(o);
                    break
                }
            for (var a = 0; a < width; a++)
                mat.matrix[a][i] = this.matrix[a][o]
        }
        return mat
    }
    ,
    ii = 0; ii < width; ii++)
        for (this.matrix[ii] = new Array(height),
        x = 0; x < height; x++)
            this.matrix[ii][x] = 0
}
function Node(atoms, someboolean) {
    this.isOperator = someboolean,
    this.leftNode = null,
    this.rightNode = null,
    this.data = atoms,
    this.sumujAtomy = function() {
        return "*" == this.data ? multiply(this.leftNode.sumujAtomy(), this.rightNode.sumujAtomy()) : "+" == this.data ? add(this.leftNode.sumujAtomy(), this.rightNode.sumujAtomy()) : this.data
    }
    ,
    this.wypisz = function() {
        null != this.leftNode && this.leftNode.wypisz();
        null != this.rightNode && this.rightNode.wypisz();
        beingUsed_write(this.data + " ")
    }
}
function Molecule(e) {
    this.name = e,
    this.charge = 0,
    this.atomTable = new Array,
    this.expressionTree = null,
    this.showAtomTable = function() {
        for (var e = 0; e < atomSet.size(); e++)
            beingUsed_write(atomSet.itemAt(e).name + ":" + this.atomTable[e] + ",");
        beingUsed_write("ładunek:" + this.charge + "\n")
    }
    ,
    this.sumuj = function() {
        this.atomTable = this.expressionTree.sumujAtomy()
    }
}
function Atom(e) {
    this.name = e,
    this.count = 0
}
function clearValue() {
    beingUsed_setStatus(" [&copy; Witek Mozga] Type an equation below:"),
    document.calculator.chemeuqation.value = "H2 O2 H2O",
    document.calculator.detailed.value = " * Calculator just tries to balance the equation. It cannot predict products.",
    document.calculator.detailed.value += "\n * Reagents are sufficient to make an equation, e.g. H2 O2 H2O. Signs '+' or '=' are optional, however must be separated with spaces from reagents when introduced, e.g. H2 + O2 => H2O",
    document.calculator.detailed.value += "\n * One can try balance half reactions. Ions should be depicted with square or round braces like these: H[+], SO3(2-), Cu[+2].",
    document.calculator.detailed.value += "\n * Electrons e[-] must not be specified in half reactions."
}
function beingUsed_write(e) {
    var t = document.getElementById("detailed");
    t.value += e,
    t.scrollTop = t.scrollHeight
}
function beingUsed_setStatus(e) {
    document.getElementById("res").innerHTML = e
}
function beingUsed_isDigit(e) {
    return re = /[0-9]/,
    re.test(e)
}
function isLower(e) {
    return re = /[a-z]/,
    re.test(e)
}
function isUpper(e) {
    return re = /[A-Z]/,
    re.test(e)
}
function beingUsed_openBrace(e) {
    return re = /[\(\[]/,
    re.test(e)
}
function beingUsed_closesBrace(e) {
    return re = /[\)\]]/,
    re.test(e)
}
function isMolecule(e) {
    return !(!isUpper(e.charAt(0)) && !beingUsed_openBrace(e.charAt(0)) || containsJunk(e))
}
function beingUsed_isJunkOnly(e) {
    return !isUpper(e) && !isLower(e)
}
function containsJunk(e) {
    return re = /[^A-Za-z0-9\+\-\(\[\)\]]/,
    re.test(e)
}
function beingUsed_containsError(e) {
    return re1 = /[\(\[][a-z0-9]/,
    re2 = /[0-9][a-z]/,
    re1.test(e) || re2.test(e)
}
function equsolve() {
    let beingUsed_moleculesArray = new Array,
    beingUsed_atomSet = new aClass_moleculeSet,
    beingUsed_ionsSet = new aClass_moleculeSet,
    beingUsed_moleculesSet = new aClass_moleculeSet,
    beingUsed_equation = document.getElementById("chemeuqation").value;
    beingUsed_moleculesArray = beingUsed_equation.split(" ");
    for (var i = 0; i < beingUsed_moleculesArray.length; i++) {
        if ("" != (theMolecule = beingUsed_moleculesArray[i]) && !beingUsed_isJunkOnly(theMolecule)) {
            for (; beingUsed_isDigit(theMolecule.charAt(0)); )
                theMolecule = theMolecule.slice(1);
            beingUsed_moleculesSet.addOnce(new Molecule(theMolecule))
        }
    }
    for (var loop_i = 0; loop_i < beingUsed_moleculesSet.size(); loop_i++) {
        if (!isMolecule(theMolecule = beingUsed_moleculesSet.itemAt(loop_i).name))
            return beingUsed_write("Incorrect structure " + theMolecule + "\n"),
            void (document.getElementById("error").innerHTML = "Incorrect structure " + theMolecule)
    }
    if (!(beingUsed_moleculesSet.size() > 0))
        return beingUsed_write("No molecules found.\n"),
        void beingUsed_setStatus("No molecules found.");
    for (var i = 0; i < beingUsed_moleculesSet.size(); i++) {
        findAtoms(theMolecule = beingUsed_moleculesSet.itemAt(i).name, beingUsed_atomSet)
    }
    if (beingUsed_write("Found:\n"),
    beingUsed_atomSet.writeOut(),
    beingUsed_write("\n"),
    beingUsed_moleculesSet.size() > beingUsed_atomSet.size() + 1)
        return document.getElementById("error").innerHTML = "Infinite number of solutions.",
        beingUsed_write("\nPROBLEM: The equation probably is a combination of many reactions."),
        void beingUsed_write(" Try to remove one reagent.\n");
    beingUsed_write("\n"),
    beingUsed_setStatus("Searching for ions..."),
    beingUsed_write("Searching for ions...\n");
    let found = !1;
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        var charge = checkCharge(theMolecule = beingUsed_moleculesSet.itemAt(i));
        if (1 == charge)
            beingUsed_write(theMolecule.name + " charge: " + theMolecule.charge),
            beingUsed_write("\n"),
            found = !0;
        else if (-1 == charge)
            return beingUsed_write("Incorrect structure of ion " + theMolecule.name + "\n"),
            void beingUsed_setStatus("Incorrect structure of ion " + theMolecule.name)
    }
    found || beingUsed_write("Not found.\n"),
    beingUsed_write("\n"),
    beingUsed_setStatus("Searching for incorrect ions..."),
    beingUsed_write("Searching for incorrect ions...\n");
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        if (beingUsed_containsPlusOrMinus((theMolecule = beingUsed_moleculesSet.itemAt(i)).name) && 0 == theMolecule.charge)
            return beingUsed_write("Incorrect notation of charge in " + theMolecule.name + "\n"),
            void beingUsed_setStatus("Incorrect notation of charge in " + theMolecule.name)
    }
    beingUsed_write("Not found.\n"),
    beingUsed_write("\n"),
    beingUsed_setStatus("Searching for incorrect brackets..."),
    beingUsed_write("Searching for incorrect brackets...\n");
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        for (var theMolecule = beingUsed_moleculesSet.itemAt(i).name, r = 0, j = 0; j < theMolecule.length; j++)
            if (beingUsed_openBrace(theMolecule.charAt(j)) ? r++ : beingUsed_closesBrace(theMolecule.charAt(j)) && r--,
            r < 0)
                return beingUsed_write("Incorrect notation of brackets in " + theMolecule + "\n"),
                void beingUsed_setStatus("Incorrect notation of brackets in " + theMolecule);
        if (0 != r)
            return beingUsed_write("Incorrect notation of brackets in " + theMolecule + "\n"),
            void beingUsed_setStatus("Incorrect notation of brackets in " + theMolecule)
    }
    beingUsed_write("Not found.\n"),
    beingUsed_write("\n");
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        theMolecule = beingUsed_moleculesSet.itemAt(i);
        var moleculeName = new String(theMolecule.name);
        if (0 != theMolecule.charge && (index1 = moleculeName.lastIndexOf("["),
        index2 = moleculeName.lastIndexOf("("),
        index = index1 > index2 ? index1 : index2,
        moleculeName = moleculeName.slice(0, index)),
        beingUsed_setStatus("Analyzing structure " + moleculeName),
        theMolecule.expressionTree = createTree(moleculeName),
        null == theMolecule.expressionTree)
            return beingUsed_write("Incorrect structure of " + moleculeName + "\n"),
            void beingUsed_setStatus("Incorrect structure of " + moleculeName)
    }
    function createTree(e) {
        var nameString = new String(e);
        if (beingUsed_setStatus("Analyzing structure " + nameString),
        beingUsed_containsError(nameString))
            return null;
        if (nameString.indexOf("(") < 0 && nameString.indexOf("[") < 0) {
            var i = countAtoms(nameString);
            return (s = new Node("*",!0)).leftNode = new Node(i,!1),
            s.rightNode = new Node(1,!1),
            s
        }
        if (isUpper(nameString.charAt(0))) {
            index1 = nameString.indexOf("["),
            index2 = nameString.indexOf("("),
            -1 != index1 && -1 != index2 ? 
            index = index1 < index2 ? index1 : index2 : -1 == index1 ? index = index2 : index = index1;
            var n = new String(nameString.slice(0, index))
              , a = new String(nameString.slice(index));
            return (s = new Node("+",!0)).leftNode = createTree(n),
            s.rightNode = createTree(a),
            s
        }
        if (beingUsed_openBrace(nameString.charAt(0)))
            for (var size = 1, index = 1; index < nameString.length; index++)
                if (beingUsed_openBrace(nameString.charAt(index)) ? size++ : beingUsed_closesBrace(nameString.charAt(index)) && size--,
                0 == size) {
                    var s;
                    n = new String(nameString.slice(1, index));
                    index++;
                    for (var left = new String(""); index < nameString.length && beingUsed_isDigit(nameString.charAt(index)); )
                        left += nameString.charAt(index),
                        index++;
                    return "" == left && (left = 1),
                    "" != (a = new String(nameString.slice(index))) ? ((s = new Node("+",!0)).leftNode = new Node("*",!0),
                    s.leftNode.leftNode = createTree(n),
                    s.leftNode.rightNode = new Node(Number(left),!1),
                    s.rightNode = createTree(a),
                    s) : ((s = new Node("*",!0)).leftNode = createTree(n),
                    s.rightNode = new Node(Number(left),!1),
                    s)
                }
        return beingUsed_setStatus("Fatal error during analysis " + nameString),
        beingUsed_write("Fatal error during analysis " + nameString),
        null
    }
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        beingUsed_setStatus("Counting atoms in " + (theMolecule = beingUsed_moleculesSet.itemAt(i)).name),
        theMolecule.sumuj()
    }
    for (i = 0; i < beingUsed_atomSet.size(); i++) {
        var atomName = beingUsed_atomSet.itemAt(i).name
          , total = 0;
        for (j = 0; j < beingUsed_moleculesSet.size(); j++)
            total += beingUsed_moleculesSet.itemAt(j).atomTable[i];
        if (1 == total)
            return document.getElementById("error").innerHTML = "PROBLEM: Only one atom " + atomName,
            beingUsed_write("\nPROBLEM: Found only one atom " + atomName + ". "),
            void beingUsed_write("In each reaction any element must appear at least twice.\n")
    }
    beingUsed_write("\n");
    let systemOfEquations = new Matrix(beingUsed_moleculesSet.size() + 1,beingUsed_atomSet.size() + 1);
    for (i = 0; i < beingUsed_moleculesSet.size(); i++) {
        beingUsed_setStatus("Bulding matrix for " + (theMolecule = beingUsed_moleculesSet.itemAt(i)).name);
        for (j = 0; j < beingUsed_atomSet.size(); j++)
            systemOfEquations.setElement(i + 1, j + 1, theMolecule.atomTable[j]);
        systemOfEquations.setElement(i + 1, 0, theMolecule.charge)
    }
    systemOfEquations.setElement(0, 0, -1),
    beingUsed_setStatus("Bulding column of free constituents " + (theMolecule = beingUsed_moleculesSet.itemAt(beingUsed_moleculesSet.size() - 1)).name),
    (table = new Array)[0] = theMolecule.charge;
    for (j = 0; j < beingUsed_atomSet.size(); j++)
        table[j + 1] = theMolecule.atomTable[j];
    if (systemOfEquations.width != systemOfEquations.height + 1) {
        for (loop_i = 0; loop_i < 100; loop_i++) {
            var matrix = systemOfEquations.copy().randomSubMatrix();
            if (0 != (f = matrix.copy().det())) {
                var table = new Array;
                for (j = 0; j < matrix.height; j++)
                    table[j] = matrix.getElement(matrix.width - 1, j);
                for (possibleReturn = new Array,
                i = 0; i < beingUsed_moleculesSet.size(); i++) {
                    (z = matrix.copy()).substituteColumn(i, table),
                    possibleReturn[i] = z.det()
                }
                if (possibleReturn[possibleReturn.length] = -f,
                f > 0)
                    for (i = 0; i < possibleReturn.length; i++)
                        possibleReturn[i] *= -1;
                return beingUsed_checkFunction(possibleReturn, systemOfEquations) ? void beingUsed_printToScreen(possibleReturn = beingUsed_renderToScreen(possibleReturn)) : (beingUsed_write("Contradictory equation. Such reaction will never happen.\n"),
                void (document.getElementById("error").innerHTML = "Such reaction will never happen."))
            }
        }
        return beingUsed_write("Strange equation that cannot be solved.\n"),
        void (document.getElementById("error").innerHTML = "Strange equation that cannot be solved.")
    }
    for (var f = (z = systemOfEquations.copy()).det(), possibleReturn = new Array, i = 0; i < beingUsed_moleculesSet.size(); i++) {
        var z;
        (z = systemOfEquations.copy()).substituteColumn(i, table),
        possibleReturn[i] = z.det()
    }
    if (possibleReturn[possibleReturn.length] = -f,
    f > 0)
        for (var i = 0; i < possibleReturn.length; i++)
            possibleReturn[i] *= -1;
    beingUsed_printToScreen(possibleReturn = beingUsed_renderToScreen(possibleReturn))
}
function elementRownania(e, t) {
    this.molecule = e,
    this.text = new String(e.name),
    this.html = new String,
    this.wspolczynnik = t,
    this.convert = function() {
        var e = new String(this.text);
        0 != this.molecule.charge && (index1 = this.text.lastIndexOf("["),
        index2 = this.text.lastIndexOf("("),
        index = index1 > index2 ? index1 : index2,
        e = this.text.slice(0, index));
        for (var t = 0; t < e.length; t++) {
            var i = e.charAt(t);
            beingUsed_isDigit(i) ? (this.html += "<sub>",
            this.html += i,
            this.html += "</sub>") : this.html += i
        }
        0 != this.molecule.charge && (this.html += "<sup>",
        this.molecule.charge > 0 ? (1 != this.molecule.charge && (this.html += this.molecule.charge),
        this.html += "+") : (-1 != this.molecule.charge && (this.html += -this.molecule.charge),
        this.html += "-"),
        this.html += "</sup>")
    }
}
function beingUsed_checkFunction(answer, system) {
    for (var i = 0; i < system.height; i++) {
        for (var n = 0, a = 0; a < system.width; a++)
            n += answer[a] * system.getElement(a, i);
        if (0 != n)
            return !1
    }
    return !0
}
function beingUsed_printToScreen(e) {
    var t = new Array
      , i = new Array;
    notAll = !1,
    none = !0;
    var n = "";
    if (0 != (o = Math.round(e[0]))) {
        var a = new elementRownania(tablicaCzasteczek.itemAt(0),Math.abs(o));
        a.html = "e<sup>-</sup>",
        a.text = "e(-)",
        o < 0 ? t.push(a) : i.push(a)
    }
    for (var r = 1; r < e.length; r++) {
        var o;
        if (0 != (o = Math.round(e[r]))) {
            none = !1;
            var s = new elementRownania(tablicaCzasteczek.itemAt(r - 1),Math.abs(o));
            s.convert(),
            o < 0 ? t.push(s) : i.push(s)
        } else
            notAll = !0
    }
    beingUsed_write("\n");
    for (r = 0; r < t.length; r++)
        1 != t[r].wspolczynnik && (beingUsed_write(t[r].wspolczynnik),
        n += "<font color=darkblue>",
        n += t[r].wspolczynnik,
        n += "</font>"),
        beingUsed_write(t[r].text),
        n += t[r].html,
        r != t.length - 1 && (beingUsed_write(" + "),
        n += " + ");
    none || (beingUsed_write(" → "),
    n += " → ",
    document.getElementById("error").innerHTML = "",
    $("#equation").val($("#chemeuqation").val()),
    $("#show-res-slide").removeClass("d-none"),
    scrollResult());
    for (r = 0; r < i.length; r++)
        1 != i[r].wspolczynnik && (beingUsed_write(i[r].wspolczynnik),
        n += "<font color=darkblue>",
        n += i[r].wspolczynnik,
        n += "</font>"),
        beingUsed_write(i[r].text),
        n += i[r].html,
        r != i.length - 1 && (beingUsed_write(" + "),
        n += " + ");
    if (beingUsed_setStatus(n),
    none)
        return beingUsed_write("Strange equation that cannot be solved.\n"),
        void beingUsed_setStatus("Strange equation that cannot be solved.");
    notAll && beingUsed_write("\n\nNot all molecules are necessary.\n"),
    beingUsed_write("\n")
}
function beingUsed_renderToScreen(inputArray) {
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    e: for (var i = 0; i < primes.length; i++)
        for (; ; ) {
            for (var n = 0, j = 0; j < inputArray.length; j++) {
                if (0 == inputArray[j] && n++,
                Math.abs(Math.round(inputArray[j])) % primes[i] != 0 || n == inputArray.length)
                    continue e
            }
            for (j = 0; j < inputArray.length; j++)
                inputArray[j] /= primes[i]
        }
    return inputArray
}
function findAtoms(molecule, atomset) {
    for (var i = 0; i < molecule.length; i++) {
        var character = molecule.charAt(i);
        if (isUpper(character)) {
            var atom = character;
            for (i++; i < molecule.length; ) {
                if (!isLower(character = molecule.charAt(i))) {
                    i--;
                    break
                }
                atom += character,
                i++
            }
            atomset.addOnce(new Atom(atom))
        }
    }
}
function countAtoms(name) {
    for (var atoms = new Array, i = 0; i < atomSet.size(); i++)
        atoms[i] = 0;
    for (i = 0; i < name.length; i++) {
        var character = name.charAt(i);
        if (isUpper(character)) {
            var atom = character
              , r = "";
            for (i++; i < name.length && isLower(character = name.charAt(i)); )
                atom += character,
                i++;
            if (beingUsed_isDigit(name.charAt(i)))
                for (; i < name.length; ) {
                    if (!beingUsed_isDigit(character = name.charAt(i))) {
                        i--;
                        break
                    }
                    r += character,
                    i++
                }
            else
                i--,
                r = "1";
            atoms[atomSet.indexOf(atom)] += Number(r)
        }
    }
    return atoms
}
function isCharged(e) {
    return re1 = /[\[\(]([0-9]+)[\+\-][\]\)]$/,
    re2 = /[\[\(][\+\-]([0-9]+)[\]\)]$/,
    re3 = /[\[\(][\+\-][[\]\)]$/,
    result = re1.exec(e),
    result || (result = re2.exec(e),
    result || (result = re3.exec(e),
    result || null))
}
function beingUsed_containsPlusOrMinus(e) {
    return re = /[\-\+]/,
    re.test(e)
}
function checkCharge(e) {
    return result = isCharged(e.name),
    factor = 1,
    charge = 1,
    result ? 
    e.name.indexOf("+") != e.name.lastIndexOf("+") ?
    -1 : e.name.indexOf("-") != e.name.lastIndexOf("-") ?
    -1 : e.name.indexOf("-") > -1 && e.name.indexOf("+") > -1 ?
    -1 : (result[0].indexOf("-") > -1 && (factor = -1),
    2 == result.length && (charge = result[1]),
    e.charge = charge * factor,
    1) : 0
}
document.onkeypress = stopRKey;
