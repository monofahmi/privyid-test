/*
Pada collection postman yang diberikan oleh privyid kepada kandidat, variable {{baseUrlApiMerchant}} tidak ikut disertakan
sehingga API tersebut tidak bisa dijalankan send requestnya.

Menurut analisis saya, pada collection tersebut ada 3 method post dan 1 method get.
dan saya tambahkan 1 method get untuk check user status, 
1 method post untuk login user, 1 method patch untuk update bod user, dan 1 method delete untuk menghapus dokumen berdasarkan docToken.

dari masing-masing method yang diberikan oleh privyid, dapat diindetifikasi sebagai berikut:

1. POST register-user-merchant
pada body di form-data sudah terdapat data, jika dijadikan menjadi format json maka seperti berikut ini

{
    email: "aracktdy633@gmail.com",
    phone: "0851234792004",
    passport: dataType string (it will generate after user have token from cloud),
    selfie: dataType string (it will generate after user have token from cloud),
    identitiy: {
        nik: "3404082210930002",
        bod: ""
    }
}

Data type string dimiliki oleh email, passport dan selfie
Data type integer dimiliki oleh phone dan nik

Jika request ini dilakukan maka akan menghasilkan status code 201, register user merchant has been created dan akan mendapatkan userId beserta accessTokennya

2. POST status-merchant 
pada request POST ini user ingin mengenerate status merchantnya dengan mengirim request dengan token, sehingga apabila server mengenal token tersebut maka status code 200 berarti status merchant sukses

3. GET document-status
pada request GET ini user mengenerate document statusnya dengan params path variable tertentu
jika pada url maka seperti '/:docToken'
nantinya server akan meresponse dengan mengeluarkan hasil data yang cocok dengan docToken tersebut.

Jika berhasil maka status code 200, dan jika docToken tersebut tidak ditemukan makan akan status code 401

4. POST upload-and-share
pada body di form-data sudah terdapat data, jika dijadimakn menjadi format json maka seperti berikut ini

{
    "documentTitle": "tes callback doc",
    "docType": "paralel",
    "owner": {
        "privyId": "TES001",
        "enterpriseToken": "41bc84b42c8543daf448d893c255be1dbdcc722e"
    }
    "document": "{{docToken}}",
    "recipient": {
		"privyId":"UAT013",
		"type":"Signer","enterpriseToken": ""
		}
}

model data tersebut artinya
privyid dan enterpriseToken belongsTo owner

privyid, type, enterpriseToken belongsTo recipient

Jika method POST ini berhasil maka status code 200, dokumen telah terupload dan dibagikan dari owner kepada recipient
jika privyid tersebut tidak dikenal oleh server atau belum terdaftar pada server maka akan menghasilkan status code 404
*/