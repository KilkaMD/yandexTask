let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let m, n; //m - число строк таблицы, n - число столбцов таблицы
let startMatrix = [m][n]; //startMatrix - таблица размера MxN

//Функция для генерации случайной таблицы начального состояния
const createMatrix = (m, n) => {
    startMatrix = Array.from({length: m}, () => Array.from({length: n}, () => Math.floor(Math.random() * 2))
    );
    console.log(startMatrix);
}

//Функция для проверки состояния клетки в ячейке [i][j]
const checkAlive = (i, j) => {
    if (startMatrix[i][j] >= 1) {
        return 1;
    } else {
        return 0;
    }
}

//Функция расчета коэффициентов левой и правой границ таблицы
const calculateRightLeftBorder = () => {
    for (let i = 0; i < m; ++i) {
        if (i === 0) {
            if (checkAlive(i, 0) === 1) {
                startMatrix[i][0] = checkAlive(i, 0) + checkAlive(i, 1) + checkAlive(i + 1, 0)
                    + checkAlive(i + 1, 1);
            } else {
                startMatrix[i][0] = -(checkAlive(i, 1) + checkAlive(i + 1, 0) + checkAlive(i + 1, 1));
            }
            if (checkAlive(i, n - 1) === 1) {
                startMatrix[i][n - 1] = checkAlive(i, n - 1) + checkAlive(i, n - 2) + checkAlive(i + 1, n - 1)
                    + checkAlive(i + 1, n - 2);
            } else {
                startMatrix[i][n - 1] = -(checkAlive(i, n - 2) + checkAlive(i + 1, n - 1)
                    + checkAlive(i + 1, n - 2));
            }
        } else if (i === m - 1) {
            if (checkAlive(i, 0) === 1) {
                startMatrix[i][0] = checkAlive(i, 0) + checkAlive(i, 1) + checkAlive(i - 1, 0)
                    + checkAlive(i - 1, 1);
            } else {
                startMatrix[i][0] = -(checkAlive(i, 1) + checkAlive(i - 1, 0)
                    + checkAlive(i - 1, 1));
            }
            if (checkAlive(i, n - 1) === 1) {
                startMatrix[i][n - 1] = checkAlive(i, n - 1) + checkAlive(i, n - 2) + checkAlive(i - 1, n - 1)
                    + checkAlive(i - 1, n - 2);
            } else {
                startMatrix[i][n - 1] = -(checkAlive(i, n - 2) + checkAlive(i - 1, n - 1)
                    + checkAlive(i - 1, n - 2));
            }
        } else {
            if (checkAlive(i, 0) === 1) {
                startMatrix[i][0] = checkAlive(i, 0) + checkAlive(i - 1, 0) + checkAlive(i + 1, 0) + checkAlive(i + 1, 1)
                    + checkAlive(i - 1, 1) + checkAlive(i, 1);
            } else {
                startMatrix[i][0] = -(checkAlive(i - 1, 0) + checkAlive(i + 1, 0) + checkAlive(i + 1, 1)
                    + checkAlive(i - 1, 1) + checkAlive(i, 1));
            }
            if (checkAlive(i, n - 1) === 1) {
                startMatrix[i][n - 1] = checkAlive(i, n - 1) + checkAlive(i - 1, n - 1) + checkAlive(i + 1, n - 1)
                    + checkAlive(i + 1, n - 2) + checkAlive(i - 1, n - 2) + checkAlive(i, n - 2);
            } else {
                startMatrix[i][n - 1] = -(checkAlive(i - 1, n - 1) + checkAlive(i + 1, n - 1)
                    + checkAlive(i + 1, n - 2) + checkAlive(i - 1, n - 2) + checkAlive(i, n - 2));
            }
        }
    }
}

//Функция расчета коэффициентов верхней и нижней границ таблицы
const calculateTopBottomBorder = () => {
    for (let i = 1; i < n - 1; ++i) {
        if (checkAlive(0, i) === 1) {
            startMatrix[0][i] = checkAlive(0, i) + checkAlive(0, i - 1) + checkAlive(0, i + 1) + checkAlive(1, i - 1)
                + checkAlive(1, i + 1) + checkAlive(1, i);
        } else {
            startMatrix[0][i] = -(checkAlive(0, i - 1) + checkAlive(0, i + 1) + checkAlive(1, i - 1)
                + checkAlive(1, i + 1) + checkAlive(1, i));
        }
        if (checkAlive(m - 1, i) === 1) {
            startMatrix[m - 1][i] = checkAlive(m - 1, i) + checkAlive(m - 1, i + 1) + checkAlive(m - 1, i - 1)
                + checkAlive(m - 2, i) + checkAlive(m - 2, i + 1) + checkAlive(m - 2, i - 1);
        } else {
            startMatrix[m - 1][i] = -(checkAlive(m - 1, i + 1) + checkAlive(m - 1, i - 1)
                + checkAlive(m - 2, i) + checkAlive(m - 2, i + 1) + checkAlive(m - 2, i - 1));
        }
    }
}

//Функция вычисления коэффициента верхнего соседа искомого поля для формулы живой клетки
const calculateForAliveOrange = (i, j) => {
    if (startMatrix[i - 1][j] < 0) {
        if (i === 1) {
            return Math.abs(startMatrix[i - 1][j] + 1);
        } else {
            return Math.abs(startMatrix[i - 1][j] + 1 + checkAlive(i - 2, j + 1));
        }
    } else if (startMatrix[i - 1][j] > 0) {
        if (i === 1) {
            return (startMatrix[i - 1][j] - 2);
        } else {
            return (startMatrix[i - 1][j] - 2 - checkAlive(i - 2, j + 1));
        }
    }
}

//Функция вычисления коэффициента левого соседа искомого поля для формулы живой клетки
const calculateForAliveGreen = (i, j) => {
    if (startMatrix[i][j - 1] < 0) {
        if (j === 1) {
            return Math.abs(startMatrix[i][j - 1] + 1 + checkAlive(i - 1, j - 1));
        } else {
            return Math.abs(startMatrix[i][j - 1] + 1 + checkAlive(i + 1, j - 2) + checkAlive(i - 1, j - 1));
        }
    } else if (startMatrix[i][j - 1] > 0) {
        if (j === 1) {
            return (startMatrix[i][j - 1] - 2 - checkAlive(i - 1, j - 1));
        } else {
            return (startMatrix[i][j - 1] - 2 - checkAlive(i + 1, j - 2) - checkAlive(i - 1, j - 1));
        }
    }
}

//Функция вычисления коэффициента верхнего левого соседа искомого поля для формулы живой клетки
const calculateForAliveYellow = (i, j) => {
    if ((i === 1) && (j === 1)) return 0;
    else {
        if (startMatrix[i - 1][j - 1] < 0) {
            if ((i === 1) || (j === 1)) {
                return (Math.abs(startMatrix[i - 1][j - 1] + 1) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            } else {
                return (Math.abs(startMatrix[i - 1][j - 1] + 1) - checkAlive(i - 2, j - 2) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            }
        } else if (startMatrix[i - 1][j - 1] > 0) {
            if ((i === 1) || (j === 1)) {
                return (startMatrix[i - 1][j - 1] - 2 - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            } else {
                return (startMatrix[i - 1][j - 1] - 2 - checkAlive(i - 2, j - 2) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            }
        }
    }
}

//Функция вычисления коэффициента верхнего соседа искомого поля для формулы мертвой клетки
const calculateForDeadOrange = (i, j) => {
    if (startMatrix[i - 1][j] < 0) {
        if (i === 1) {
            return Math.abs(startMatrix[i - 1][j]);
        } else {
            return Math.abs(startMatrix[i - 1][j] + checkAlive(i - 2, j + 1));
        }
    } else if (startMatrix[i - 1][j] > 1) {
        if (i === 1) {
            return (startMatrix[i - 1][j] - 1);
        } else {
            return (startMatrix[i - 1][j] - 1 - checkAlive(i - 2, j + 1));
        }
    } else {
        return 0;
    }
}

//Функция вычисления коэффициента левого соседа искомого поля для формулы мертвой клетки
const calculateForDeadGreen = (i, j) => {
    if (startMatrix[i][j - 1] < 0) {
        if (j === 1) {
            return Math.abs(startMatrix[i][j - 1] + checkAlive(i - 1, j - 1));
        } else {
            return Math.abs(startMatrix[i][j - 1] + checkAlive(i + 1, j - 2) + checkAlive(i - 1, j - 1));
        }
    } else if (startMatrix[i][j - 1] > 1) {
        if (j === 1) {
            return (startMatrix[i][j - 1] - 1 - checkAlive(i - 1, j - 1));
        } else {
            return (startMatrix[i][j - 1] - 1 - checkAlive(i + 1, j - 2) - checkAlive(i - 1, j - 1));
        }
    } else {
        return 0;
    }
}

//Функция вычисления коэффициента верхнего левого соседа искомого поля для формулы мертвой клетки
const calculateForDeadYellow = (i, j) => {
    if ((i === 1) && (j === 1)) return 0;
    else {
        if (startMatrix[i - 1][j - 1] < 0) {
            if ((i === 1) || (j === 1)) {
                return (Math.abs(startMatrix[i - 1][j - 1]) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            } else {
                return (Math.abs(startMatrix[i - 1][j - 1]) - checkAlive(i - 2, j - 2) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            }
        } else if (startMatrix[i - 1][j - 1] > 1) {
            if ((i === 1) || (j === 1)) {
                return (startMatrix[i - 1][j - 1] - 1 - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            } else {
                return (startMatrix[i - 1][j - 1] - 1 - checkAlive(i - 2, j - 2) - checkAlive(i - 1, j) - checkAlive(i, j - 1));
            }
        } else {
            return 0;
        }
    }
}

//Функция для проверки сосчитаных коэффициентов на условия задачи
const setNewState = (i, j) => {
    if (startMatrix[i][j] > 0) {
        if ((startMatrix[i][j] === 3) || (startMatrix[i][j] === 4)) { //условие для живой клетки
            return 1;
        } else {
            return 0;
        }
    } else {
        if ((startMatrix[i][j] === -3)) { //условие для мертвой клетки
            return 1;
        } else {
            return 0;
        }
    }
}

//Функция для печати очередного состояния таблицы
const showResult = () => {
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            startMatrix[i][j] = setNewState(i, j); //установка нового значения поля таблицы из условий задачи
        }
    }
    console.log(startMatrix);
}

//Функция для расчета коэффициента живой не граничной клетки
const calculateAlive = (i, j) => {
    return (calculateForAliveOrange(i, j) + calculateForAliveGreen(i, j) - calculateForAliveYellow(i, j) + 1 + checkAlive(i + 1, j + 1));
}

//Функция для расчета коэффициента мертвой не граничной клетки
const calculateDead = (i, j) => {
    return -(calculateForDeadOrange(i, j) + calculateForDeadGreen(i, j) - calculateForDeadYellow(i, j) + checkAlive(i + 1, j + 1));
}

//Функция, для пересчета матрицы типа MxN, когда M != 1 и N != 1
const stepNormalMatrixFunc = () => {
    calculateRightLeftBorder(); //расчет коэффициентов левой и правой границ таблицы
    calculateTopBottomBorder(); //расчет коэффициентов верхней и нижней границ таблицы
    for (let i = 1; i < m - 1; ++i) {
        for (let j = 1; j < n - 1; ++j) {
            if (checkAlive(i, j) === 1) {
                startMatrix[i][j] = calculateAlive(i, j); //расчет коэффициента живой не граничной клетки
            } else {
                startMatrix[i][j] = calculateDead(i, j); //расчет коэффициента мертвой не граничной клетки
            }
        }
    }
    showResult(); //выводит на печать получаемую таблицу
}

//Функция, для пересчета матрицы типа Mx1 или 1xN
const stepBadMatrixFunc = () => {
    let maxBorder = Math.max(m, n);
    for (let i = 0; i < maxBorder; ++i) {
        if (m === 1) {
            if (i === 0) {
                if (startMatrix[0][i] > 0) {
                    startMatrix[0][i] = checkAlive(0, i + 1) + 1;
                } else {
                    startMatrix[0][i] = -checkAlive(0, i + 1);
                }
            } else if (i === maxBorder - 1) {
                if (startMatrix[0][i] > 0) {
                    startMatrix[0][i] = checkAlive(0, i - 1) + 1;
                } else {
                    startMatrix[0][i] = -checkAlive(0, i - 1);
                }
            } else {
                if (startMatrix[0][i] > 0) {
                    startMatrix[0][i] = checkAlive(0, i - 1) + checkAlive(0, i + 1) + 1;
                } else {
                    startMatrix[0][i] = -(checkAlive(0, i - 1) + checkAlive(0, i + 1));
                }
            }
        } else {
            if (i === 0) {
                if (startMatrix[i][0] > 0) {
                    startMatrix[i][0] = checkAlive(i + 1, 0) + 1;
                } else {
                    startMatrix[i][0] = -checkAlive(i + 1, 0);
                }
            } else if (i === maxBorder - 1) {
                if (startMatrix[i][0] > 0) {
                    startMatrix[i][0] = checkAlive(i - 1, 0) + 1;
                } else {
                    startMatrix[i][0] = -checkAlive(i - 1, 0);
                }
            } else {
                if (startMatrix[i][0] > 0) {
                    startMatrix[i][0] = checkAlive(i - 1, 0) + checkAlive(i + 1, 0) + 1;
                } else {
                    startMatrix[i][0] = -(checkAlive(i - 1, 0) + checkAlive(i + 1, 0));
                }
            }
        }
    }
    showResult(); //выводит на печать получаемую таблицу
}

//Функция запуска пересчета состояния
const startExecution = (m, n) => {
    setInterval(() => ((m === 1) || (n === 1)) ? stepBadMatrixFunc()
        : stepNormalMatrixFunc(), 1000); //выполняет пересчет раз в секунду
}

//Функция выбора способа получения начального состояния
const selectParametersOfLaunch = () => {
    let xhr = new XMLHttpRequest();
    if (process.argv.length === 4) { //случай, когда начальное состояние генерится случайно
        m = Number(process.argv[2]); //значение m есть параметр запуска через консоль
        n = Number(process.argv[3]); //значение n есть параметр запуска через консоль
        createMatrix(m, n); //генерация таблицы
        startExecution(m, n); //запуск выполнения пересчета состояния
    } else if (process.argv.length === 3) { //случай, когда начальное состояние получаем из файла
        xhr.open("GET", process.argv[2], false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    let allText = xhr.responseText;
                    startMatrix = allText.split("\n").map(function (row) { //инициализация таблицы, получаемой из файла
                        return row.split(",").map(function (elem) {
                            return Number(elem);
                        });
                    });
                    m = startMatrix.length; //m - число строк таблицы, получаемой из файла
                    n = startMatrix[0].length; //m - число столбцов таблицы, получаемых из файла
                    console.log(startMatrix);
                    startExecution(m, n); //запуск выполнения пересчета состояния
                }
            }
        }
        xhr.send(null);
    } else {
        console.log("Некорректные аргументы!");
    }
}

selectParametersOfLaunch(); //Запуск выбора способа получения начального состояния
