// Fungsi bantuan untuk membuat array warna secara otomatis.
function createColorArray(color, vertexCount) {
    var colors = [];
    for (var i = 0; i < vertexCount; i++) {
        colors.push(color[0], color[1], color[2]);
    }
    return colors;
}

// Daftar koordinat (x, y, z) untuk setiap titik sudut pada huruf I.
const I_vertices = [
    // Permukaan Depan (Indeks 0-11)
    -0.15, 0.25, 0.05,   0.15, 0.25, 0.05,   0.15, 0.15, 0.05,
     0.05, 0.15, 0.05,   0.05, -0.15, 0.05,   0.15, -0.15, 0.05,
     0.15, -0.25, 0.05,  -0.15, -0.25, 0.05,  -0.15, -0.15, 0.05,
    -0.05, -0.15, 0.05,  -0.05, 0.15, 0.05,  -0.15, 0.15, 0.05,
    // Permukaan Belakang (Indeks 12-23)
    -0.15, 0.25, -0.05,   0.15, 0.25, -0.05,   0.15, 0.15, -0.05,
     0.05, 0.15, -0.05,   0.05, -0.15, -0.05,   0.15, -0.15, -0.05,
     0.15, -0.25, -0.05,  -0.15, -0.25, -0.05,  -0.15, -0.15, -0.05,
    -0.05, -0.15, -0.05,  -0.05, 0.15, -0.05,  -0.15, 0.15, -0.05,
];

// Urutan titik yang dihubungkan untuk membentuk segitiga. Setiap 3 angka = 1 segitiga.
const I_indices = [
    // Permukaan Depan
    0,1,11,  1,2,11,  2,3,10,  10,11,2,  3,4,9,  9,10,3,  4,5,9,  5,6,8,  8,9,5,  6,7,8,
    // Permukaan Belakang
    12,23,13,  13,23,14,  14,23,22,  14,15,22,  15,16,21,  15,22,21,  16,17,21,  17,18,20,  17,21,20,  18,19,20,
    // Sisi-sisi (Penghubung)
    0,12,1,   1,12,13,   1,13,2,   2,13,14,   2,14,3,   3,14,15,   3,15,4,   4,15,16,
    4,16,5,   5,16,17,   5,17,6,   6,17,18,   6,18,7,   7,18,19,   7,19,8,   8,19,20,
    8,20,9,   9,20,21,   9,21,10,  10,21,22,  10,22,11,  11,22,23,  11,23,0,  0,23,12
];


// =================================================================================
// DATA UNTUK HURUF 'K' (Versi Sederhana & Stabil)
// =================================================================================
const K_vertices = [
    // --- BALOK VERTIKAL ---
    // Depan (Indeks 0-3)
    -0.15, 0.25, 0.05,  // 0
    -0.05, 0.25, 0.05,  // 1
    -0.05, -0.25, 0.05, // 2
    -0.15, -0.25, 0.05, // 3
    // Belakang (Indeks 4-7)
    -0.15, 0.25, -0.05, // 4
    -0.05, 0.25, -0.05, // 5
    -0.05, -0.25, -0.05, // 6
    -0.15, -0.25, -0.05, // 7

    // --- BALOK DIAGONAL ATAS ---
    // Depan (Indeks 8-11)
    -0.05, 0.12, 0.05,  // 8
     0.15, 0.25, 0.05,  // 9
     0.05, 0.25, 0.05,  // 10
    -0.05, 0.02, 0.05,  // 11
    // Belakang (Indeks 12-15)
    -0.05, 0.12, -0.05, // 12
     0.15, 0.25, -0.05, // 13
     0.05, 0.25, -0.05, // 14
    -0.05, 0.02, -0.05, // 15

    // --- BALOK DIAGONAL BAWAH ---
    // Depan (Indeks 16-19)
    -0.05, -0.02, 0.05, // 16
     0.05, -0.25, 0.05, // 17
     0.15, -0.25, 0.05, // 18
    -0.05, -0.12, 0.05, // 19
    // Belakang (Indeks 20-23)
    -0.05, -0.02, -0.05, // 20
     0.05, -0.25, -0.05, // 21
     0.15, -0.25, -0.05, // 22
    -0.05, -0.12, -0.05, // 23
];

const K_indices = [
    // === Perakitan Balok Vertikal ===
    0,1,3,      1,2,3,      // Wajah Depan
    4,7,5,      5,7,6,      // Wajah Belakang
    0,4,1,      1,4,5,      // Sisi Atas
    3,2,6,      3,6,7,      // Sisi Bawah
    0,7,4,      0,3,7,      // Sisi Kiri
    1,5,6,      1,6,2,      // Sisi Kanan

    // === Perakitan Balok Diagonal Atas ===
    8,9,11,     9,10,11,    // Wajah Depan
    12,15,13,   13,15,14,   // Wajah Belakang
    10,9,13,    10,13,14,   // Sisi Atas
    8,11,15,    8,15,12,    // Sisi Bawah
    9,8,12,     9,12,13,    // Sisi Ujung
    
    // === Perakitan Balok Diagonal Bawah ===
    16,17,19,   17,18,19,   // Wajah Depan
    20,23,21,   21,23,22,   // Wajah Belakang
    16,18,17,   16,20,18,   // Sisi Atas
    19,17,18,   19,18,22,   // Sisi Ujung
    19,22,23,   17,21,22    // Sisi Bawah
];



// =================================================================================
// DATA UNTUK HURUF 'H' (REVISI BENTUK TOTAL SESUAI CONTOH)
// =================================================================================
const H_vertices = [
    // --- Permukaan Depan (12 titik) ---
    // Tiang Kiri
    -0.15, 0.25, 0.05,  // 0
    -0.05, 0.25, 0.05,  // 1
    -0.05, -0.25, 0.05, // 2
    -0.15, -0.25, 0.05, // 3
    // Tiang Kanan
     0.05, 0.25, 0.05,  // 4
     0.15, 0.25, 0.05,  // 5
     0.15, -0.25, 0.05, // 6
     0.05, -0.25, 0.05, // 7
    // Palang Tengah
    -0.05, 0.05, 0.05,  // 8
     0.05, 0.05, 0.05,  // 9
     0.05, -0.05, 0.05, // 10
    -0.05, -0.05, 0.05, // 11

    // --- Permukaan Belakang (12 titik, z = -0.05) ---
    -0.15, 0.25, -0.05,  // 12
    -0.05, 0.25, -0.05,  // 13
    -0.05, -0.25, -0.05, // 14
    -0.15, -0.25, -0.05, // 15
     0.05, 0.25, -0.05,  // 16
     0.15, 0.25, -0.05,  // 17
     0.15, -0.25, -0.05, // 18
     0.05, -0.25, -0.05, // 19
    -0.05, 0.05, -0.05,  // 20
     0.05, 0.05, -0.05,  // 21
     0.05, -0.05, -0.05, // 22
    -0.05, -0.05, -0.05, // 23
];

const H_indices = [
    // --- Permukaan Depan ---
    0,1,3,      1,2,3,      // Tiang Kiri
    4,5,7,      5,6,7,      // Tiang Kanan
    8,9,11,     9,10,11,    // Palang Tengah

    // --- Permukaan Belakang ---
    12,15,13,   13,15,14,   // Tiang Kiri
    16,19,17,   17,19,18,   // Tiang Kanan
    20,23,21,   21,23,22,   // Palang Tengah

    // --- Sisi-sisi Penghubung ---
    // Sisi luar
    0,12,3,     3,12,15,
    5,17,6,     6,17,18,
    // Sisi atas
    0,1,13,     0,13,12,
    4,16,5,     5,16,17,
    // Sisi bawah
    3,2,14,     3,14,15,
    7,19,6,     6,19,18,
    // Sisi dalam (rongga)
    1,8,13,     8,20,13,
    8,9,21,     8,21,20,
    9,4,16,     9,16,21,
    10,7,19,    10,19,22,
    11,10,22,   11,22,23,
    2,11,23,    2,23,14
];

// Angka 7
const N7_vertices = [
    // --- BALOK HORIZONTAL ATAS ---
    // Depan (Indeks 0-3)
    -0.15, 0.25, 0.05,  // 0
     0.15, 0.25, 0.05,  // 1
     0.15, 0.15, 0.05,  // 2
    -0.15, 0.15, 0.05,  // 3
    // Belakang (Indeks 4-7)
    -0.15, 0.25, -0.05, // 4
     0.15, 0.25, -0.05, // 5
     0.15, 0.15, -0.05, // 6
    -0.15, 0.15, -0.05, // 7

    // --- BALOK DIAGONAL ---
    // Depan (Indeks 8-11)
     0.15, 0.15, 0.05,  // 8
     0.05, 0.15, 0.05,  // 9
     0.05, -0.25, 0.05, // 10
     -0.05, -0.25, 0.05,// 11
    // Belakang (Indeks 12-15)
     0.15, 0.15, -0.05, // 12
     0.05, 0.15, -0.05, // 13
     0.05, -0.25, -0.05, // 14
     -0.05, -0.25, -0.05 // 15
];

const N7_indices = [
    // === Perakitan Balok Horizontal Atas ===
    // Wajah Depan
    0,1,3,      1,2,3,
    // Wajah Belakang (Urutan diperbaiki)
    4,5,7,      5,6,7,
    // Sisi-sisi (Urutan diperbaiki)
    0,4,1,      1,4,5,      // Atas
    3,7,2,      2,7,6,      // Bawah
    0,3,7,      0,7,4,      // Kiri
    1,2,6,      1,6,5,      // Kanan

    // === Perakitan Balok Diagonal ===
    // Wajah Depan
    8,9,11,     9,10,11,
    // Wajah Belakang (Urutan diperbaiki)
    12,15,13,   13,15,14,
    // Sisi-sisi (Urutan diperbaiki)
    8,12,9,     9,12,13,    // Atas
    11,15,10,   10,15,14,   // Bawah
    8,15,12,    8,11,15,    // Kiri Miring
    9,13,14,    9,14,10     // Kanan Miring
];

// Ganti seluruh bagian warna di data.js dengan kode ini

// -- WARNA UNTUK GRADASI --
const color_SteelBlue = [0.27, 0.5, 0.7]; // Biru Baja
const color_SoftGray = [0.6, 0.6, 0.6];   // Abu-abu Lembut

// -- FUNGSI BANTUAN UNTUK MEMBUAT GRADASI VERTIKAL --
function createVerticalGradient(vertices, colorTop, colorBottom) {
    const colors = [];
    for (let i = 0; i < vertices.length; i += 3) {
        // Jika posisi y di atas atau sama dengan 0, gunakan warna atas
        vertices[i + 1] >= 0 ? colors.push(...colorTop) : colors.push(...colorBottom);
    }
    return colors;
}

//-- untuk warma dari object

const I_colors = createVerticalGradient(I_vertices, color_SteelBlue, color_SoftGray);
const K_colors = createVerticalGradient(K_vertices, color_SteelBlue, color_SoftGray);
const H_colors = createVerticalGradient(H_vertices, color_SteelBlue, color_SoftGray);
const N7_colors = createVerticalGradient(N7_vertices, color_SteelBlue, color_SoftGray);


// --- Gabungkan data ---
const I_data = { vertices: I_vertices, indices: I_indices, colors: I_colors };
const K_data = { vertices: K_vertices, indices: K_indices, colors: K_colors };
const H_data = { vertices: H_vertices, indices: H_indices, colors: H_colors };
const N7_data = { vertices: N7_vertices, indices: N7_indices, colors: N7_colors };