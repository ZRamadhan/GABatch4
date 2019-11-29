let inputNilai = prompt("Masukan Nilai");
let inputNilaiDua = prompt("Masukan Nilai ke Dua");
let inputOperasi = prompt("Pilih operasi yang ingin digunakan (+, -, /, *)")
let typeNumberSatu = parseInt(inputNilai);
let typeNumberDua = parseInt(inputNilaiDua);
let hasilOperasi;

// this is "arrow function" determine by "=>" sign
let hasil = () => {
    if (inputOperasi === "+") {
        hasilOperasi = typeNumberSatu + typeNumberDua;
    } else if (inputOperasi === "-") {
        hasilOperasi = typeNumberSatu - typeNumberDua;
    } else if (inputOperasi === "/") {
        hasilOperasi = typeNumberSatu / typeNumberDua;
    } else {
        hasilOperasi = typeNumberSatu * typeNumberDua;
    }
    return hasilOperasi;
}

console.log(hasil());