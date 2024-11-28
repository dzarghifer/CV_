function validate() {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    
    let isValid = true;
    let errorMessage = "";

    // Validasi tinggi badan
    if (isNaN(height) || height <= 0) {
        errorMessage += "Tinggi badan harus diisi dengan angka yang valid.\n";
        isValid = false;
    } else if (height < 100 || height > 250) {
        errorMessage += "Tinggi badan harus antara 100-250 cm\n";
        isValid = false;
    }

    // Validasi berat badan
    if (isNaN(weight) || weight <= 0) {
        errorMessage += "Berat badan harus diisi dengan angka yang valid.\n";
        isValid = false;
    } else if (weight < 30 || weight > 200) {
        errorMessage += "Berat badan harus antara 30-200 kg\n";
        isValid = false;
    }

    // Validasi usia
    if (isNaN(age) || age <= 0) {
        errorMessage += "Usia harus diisi dengan angka yang valid.\n";
        isValid = false;
    } else if (age < 15 || age > 80) {
        errorMessage += "Usia harus antara 15-80 tahun\n";
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return false;
    }

    return true;
}

function calculateResults() {
    // Jalankan validasi terlebih dahulu
    if (!validate()) {
        return; // Hentikan kalkulasi jika validasi gagal
    }

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activityFactor = parseFloat(document.getElementById("activity").value);
    const stressFactor = parseFloat(document.getElementById("stress").value);

    // Hitung IMT
    const bmi = weight / (height / 100 * height / 100);
    let bmiStatus;
    if (bmi < 18.5) {
        bmiStatus = "Berat badan kurang (underweight)";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
        bmiStatus = "Berat badan normal";
    } else if (bmi >= 23 && bmi <= 24.9) {
        bmiStatus = "Kelebihan berat badan (overweight) dengan resiko";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiStatus = "Obesitas I";
    } else {
        bmiStatus = "Obesitas II";
    }

    // Hitung BMR
    let bmr;
    if (gender === "male") {
        bmr = 66.5 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }

    // Hitung BMR dengan faktor aktivitas dan faktor stres
    const totalBmr = bmr * activityFactor * stressFactor;

    // Hitung BBI
    const bbi = (height - 100) - 0.1 * (height - 100);

    // Tampilkan hasil dan saran yang lebih detail
    const resultDiv = document.getElementById("result");
    let suggestion = "";
    
    if (bmi < 18.5) {
        suggestion = `
            <div style="font-size: 18px;">
            <strong>Rekomendasi untuk meningkatkan berat badan secara sehat:</strong>
            <ul>
                <li>Tingkatkan asupan kalori 300-500 kkal di atas kebutuhan harian.</li>
                <li>Konsumsi makanan bergizi tinggi:
                    <ul>
                        <li>Protein (daging tanpa lemak, ikan, telur, susu)</li>
                        <li>Karbohidrat kompleks (nasi merah, kentang, oatmeal)</li>
                        <li>Lemak sehat (alpukat, kacang-kacangan, minyak zaitun)</li>
                    </ul>
                </li>
                <li>Makan lebih sering (5-6 kali sehari) dengan porsi sedang.</li>
                <li>Lakukan latihan beban 2-3 kali seminggu untuk membangun massa otot.</li>
                <li>Hindari melewatkan waktu makan.</li>
                <li>Konsultasikan dengan ahli gizi untuk program penambahan berat badan yang aman.</li>
            </ul>
            </div>
        `;
    } else if (bmi >= 18.5 && bmi <= 22.9) {
        suggestion = `
            <div style="font-size: 18px;">
            <strong>Tips mempertahankan berat badan ideal:</strong>
            <ul>
                <li>Pertahankan pola makan seimbang dengan komposisi:
                    <ul>
                        <li>50-60% karbohidrat</li>
                        <li>15-20% protein</li>
                        <li>25-30% lemak sehat</li>
                    </ul>
                </li>
                <li>Konsumsi sayur dan buah 5 porsi sehari.</li>
                <li>Minum air putih minimal 8 gelas sehari.</li>
                <li>Lakukan aktivitas fisik teratur 150 menit/minggu.</li>
                <li>Jaga pola tidur 7-8 jam sehari.</li>
                <li>Kelola stres dengan baik melalui meditasi atau olahraga ringan.</li>
            </ul>
            </div>
        `;
    } else if (bmi >= 23 && bmi <= 24.9) {
        suggestion = `
            <div style="font-size: 18px;">
            <strong>Program penurunan berat badan ringan:</strong>
            <ul>
                <li>Kurangi asupan kalori 300-400 kkal dari kebutuhan harian.</li>
                <li>Utamakan makanan rendah kalori tinggi serat:
                    <ul>
                        <li>Sayuran hijau</li>
                        <li>Buah-buahan segar</li>
                        <li>Protein tanpa lemak</li>
                    </ul>
                </li>
                <li>Hindari makanan olahan dan tinggi gula.</li>
                <li>Lakukan kardio 30 menit sehari, 5 kali seminggu.</li>
                <li>Kombinasikan dengan latihan kekuatan 2-3 kali seminggu.</li>
                <li>Catat asupan makanan harian untuk monitoring.</li>
                <li>Target penurunan berat badan 0.5-1 kg per minggu.</li>
            </ul>
            </div>
        `;
    } else if (bmi >= 25 && bmi <= 29.9) {
        suggestion = `
            <div style="font-size: 18px;">
            <strong>Program penurunan berat badan intensif:</strong>
            <ul>
                <li>Kurangi asupan kalori 500-750 kkal dari kebutuhan harian.</li>
                <li>Ikuti pola makan terstruktur:
                    <ul>
                        <li>Sarapan tinggi protein</li>
                        <li>Makan siang dengan banyak sayuran</li>
                        <li>Makan malam ringan sebelum jam 7 malam</li>
                    </ul>
                </li>
                <li>Hindari total:
                    <ul>
                        <li>Makanan cepat saji</li>
                        <li>Minuman manis</li>
                        <li>Makanan tinggi lemak jenuh</li>
                    </ul>
                </li>
                <li>Lakukan olahraga kombinasi:
                    <ul>
                        <li>45-60 menit kardio 5x seminggu</li>
                        <li>Latihan beban 3x seminggu</li>
                    </ul>
                </li>
                <li>Konsultasi rutin dengan ahli gizi.</li>
                <li>Ikuti support group penurunan berat badan.</li>
                <li>Periksa kesehatan secara berkala.</li>
            </ul>
            </div>
        `;
    } else {
        suggestion = `
            <div style="font-size: 18px;">
            <strong>Program penanganan obesitas komprehensif:</strong>
            <ul>
                <li>WAJIB konsultasi dengan dokter dan ahli gizi untuk:
                    <ul>
                        <li>Pemeriksaan kesehatan menyeluruh</li>
                        <li>Skrining penyakit penyerta</li>
                        <li>Program diet personal</li>
                    </ul>
                </li>
                <li>Kurangi asupan kalori 750-1000 kkal dari kebutuhan harian dengan pengawasan profesional.</li>
                <li>Ikuti diet khusus yang direkomendasikan dokter.</li>
                <li>Program olahraga bertahap:
                    <ul>
                        <li>Mulai dengan jalan kaki 15 menit/hari</li>
                        <li>Tingkatkan durasi secara bertahap</li>
                        <li>Tambahkan latihan kekuatan sesuai arahan</li>
                    </ul>
                </li>
                <li>Monitoring ketat:
                    <ul>
                        <li>Berat badan mingguan</li>
                        <li>Tekanan darah</li>
                        <li>Gula darah</li>
                        <li>Profil lipid</li>
                    </ul>
                </li>
                <li>Pertimbangkan konseling psikologi untuk dukungan perubahan gaya hidup.</li>
                <li>Bergabung dengan komunitas support group obesitas.</li>
            </ul>
            </div>
        `;
    }

    resultDiv.innerHTML = `
        <table class="hasil">
            <tr>
                <th colspan=2>Hasil Kalkulasi :</th>
            <tr>
                <td>Indeks Massa Tubuh (IMT)</td>
                <td>: ${bmi.toFixed(2)} Kg/M<sup>2</sup> - ${bmiStatus}</td>
            </tr>
            <tr>
                <td>Basal Metabolic Rate (BMR)</td>
                <td>: ${bmr.toFixed(2)} kalori/hari</td>
            </tr>
            <tr>
                <td>Kebutuhan Kalori Total</td>
                <td>: ${totalBmr.toFixed(2)} kalori/hari</td>
            </tr>
            <tr>
                <td>Berat Badan Ideal (BBI)</td>
                <td>: ${bbi.toFixed(2)} kg</td>
            </tr>
        </table>
        <h3>Saran dan Rekomendasi:</h3>
        <div class="saran">${suggestion}</div>
    `;
}