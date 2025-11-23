// helper.js

// Fungsi ini MENGEMBALIKAN matriks translasi
function translation(dx, dy, dz) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        dx, dy, dz, 1.0
    ]);
}

// Fungsi ini MENGEMBALIKAN matriks skala
function scale(sx, sy, sz) {
    return new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

// Fungsi ini MENGEMBALIKAN matriks rotasi X
function rotateX(angle) {
    var sa = Math.sin(angle);
    var ca = Math.cos(angle);
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, ca, -sa, 0.0,
        0.0, sa, ca, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

// Fungsi ini MENGEMBALIKAN matriks rotasi Y
function rotateY(angle) {
    var sa = Math.sin(angle);
    var ca = Math.cos(angle);
    return new Float32Array([
        ca, 0.0, sa, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -sa, 0.0, ca, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

// Fungsi BARU untuk mengalikan dua matriks 4x4
function multiplyMatrices(matA, matB) {
    let result = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += matA[i * 4 + k] * matB[k * 4 + j];
            }
            result[i * 4 + j] = sum;
        }
    }
    return result;
}