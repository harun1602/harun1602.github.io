let dict = {
}

export function checkPattern(selectedNumbers) {
    isEven(selectedNumbers);
    isDiagonal(selectedNumbers);
    atleastThreeAreNextToEachother(selectedNumbers);
    atleastThreeAreStacked(selectedNumbers);
    isPrime(selectedNumbers);
    areNumbersClose(selectedNumbers);
    return Object.entries(dict);
}

function isEven(selectedNumbers)
{
    dict["isEven"] = false;
    dict["isEven"] = !!selectedNumbers.every(num => num % 2 === 0);
}

function isDiagonal(selectedNumbers)
{
    dict["isDiagonal"] = false;
    let copySelectedNumbers = selectedNumbers.slice();
    copySelectedNumbers.sort((a, b) => a - b);
    let initialDifference = copySelectedNumbers[1] - copySelectedNumbers[0];

    // Stelle sicher, dass die erste Differenz entweder 6 oder 8 ist
    if (initialDifference !== 6 && initialDifference !== 8) {
        console.log(copySelectedNumbers);
        return dict["isDiagonal"] = false;
    }

    for (let i = 1; i < copySelectedNumbers.length - 1; i++) {
        let difference = copySelectedNumbers[i + 1] - copySelectedNumbers[i];

        // Überprüfe, ob die Differenz mit der initialen Differenz übereinstimmt
        if (difference !== initialDifference) {
            return dict["isDiagonal"] = false;
        }
    }

    return dict["isDiagonal"] = true;
}

function atleastThreeAreNextToEachother(selectedNumbers)
{
    dict["atleastThreeAreNextToEachother"] = false;
    let copySelectedNumbers = selectedNumbers.slice();
    copySelectedNumbers.sort((a, b) => a - b);
    for (let i = 0; i <= copySelectedNumbers.length - 3; i++) {
        if (copySelectedNumbers[i] + 1 === copySelectedNumbers[i + 1] && copySelectedNumbers[i + 1] + 1 === copySelectedNumbers[i + 2]) {
            return dict["atleastThreeAreNextToEachother"] = true;
        }
    }

    return dict["atleastThreeAreNextToEachother"] = false;
}

function atleastThreeAreStacked(selectedNumbers)
{
    dict["atleastThreeAreStacked"] = false;
    let copySelectedNumbers = selectedNumbers.slice();
    copySelectedNumbers.sort((a, b) => a - b);
    for (let i = 0; i <= copySelectedNumbers.length - 3; i++) {
        if (copySelectedNumbers[i] + 7 === copySelectedNumbers[i + 1] && copySelectedNumbers[i + 1] + 7 === copySelectedNumbers[i + 2]) {
            return dict["atleastThreeAreStacked"] = true;
        }
    }

    return dict["atleastThreeAreStacked"] = false;
}

function isPrime(selectedNumbers) {
        dict["isPrime"] = false;
        // Helper function to determine if a single number is prime
        function checkPrime(num) {
            if (num <= 1) return false; // 0 and 1 are not prime numbers
            if (num <= 3) return true;  // 2 and 3 are prime numbers

            // Eliminate even numbers and multiples of 3
            if (num % 2 === 0 || num % 3 === 0) return false;

            // Check for factors from 5 to sqrt(num)
            for (let i = 5; i * i <= num; i += 6) {
                if (num % i === 0 || num % (i + 2) === 0) return false;
            }

            return true;
        }

        // Check all numbers in the array
        for (let i = 0; i < selectedNumbers.length; i++) {
            if (!checkPrime(selectedNumbers[i])) {
                return dict["isPrime"] = false;
            }
        }

        return dict["isPrime"] = true;
}

function areNumbersClose(selectedNumbers) {
    dict["areNumbersClose"] = false;

    // 7x7 Feld erstellen
    const field = Array.from({ length: 7 }, () => Array(7).fill(false));

    // Funktion, um die Position einer Zahl im 7x7-Feld zu berechnen
    function getPosition(number) {
        const row = Math.floor((number - 1) / 7);
        const col = (number - 1) % 7;
        return [row, col];
    }

    // Die ausgewählten Zahlen im Feld markieren
    selectedNumbers.forEach(num => {
        const [row, col] = getPosition(num);
        field[row][col] = true;
    });

    // Hilfsfunktion für die Tiefensuche (DFS)
    function dfs(row, col, visited) {
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0]  // rechts, unten, links, oben
        ];

        visited[row][col] = true;

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < 7 && newCol >= 0 && newCol < 7 &&
                field[newRow][newCol] && !visited[newRow][newCol]) {
                dfs(newRow, newCol, visited);
            }
        }
    }

    // Tiefensuche von der ersten ausgewählten Zahl starten
    const visited = Array.from({ length: 7 }, () => Array(7).fill(false));
    const [startRow, startCol] = getPosition(selectedNumbers[0]);
    dfs(startRow, startCol, visited);

    // Prüfen, ob alle ausgewählten Zahlen besucht wurden
    for (const num of selectedNumbers) {
        const [row, col] = getPosition(num);
        if (!visited[row][col]) {
            return dict["areNumbersClose"] = false;
        }
    }

    return dict["areNumbersClose"] = true;
}