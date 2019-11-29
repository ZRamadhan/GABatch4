// To run this code open https://playcode.io/ then copy and paste the code bellow

var inputNilai = prompt("Silahkan masukan angka pertama dan kedua dengan pemisah spasi");
var operasiMat = prompt("Silahkan pilih operasi matematika (+),(-),(*),(/),(min),(max)");
var arrayNilai = inputNilai.split(" ");
var nilaiRealPertama = parseInt(arrayNilai[0]);
var nilaiRealKedua = parseInt(arrayNilai[1]);

if (operasiMat === "+" || operasiMat === "-" || operasiMat === "*" || operasiMat === "/" || operasiMat == "min" || operasiMat == "max") {
    if (operasiMat == "+") {
        console.log(nilaiRealPertama + nilaiRealKedua);
    } else if (operasiMat == "-") {
        console.log(nilaiRealPertama - nilaiRealKedua);
    } else if (operasiMat == "*") {
        console.log(nilaiRealPertama * nilaiRealKedua);
    } else if (operasiMat == "/") {
        console.log(nilaiRealPertama / nilaiRealKedua);
    } else if (operasiMat == "min") {
        console.log(Math.min(arrayNilai));
    } else {
        console.log(Math.min(arrayNilai));
    }
} else {
    console.log("Operasi matematika hanya terdapat (+),(-),(*),(/),(min),(max)");
}