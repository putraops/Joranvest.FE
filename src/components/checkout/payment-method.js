const bank_transfer = [
    {
        name: "BCA",
        value: "transfer_bca",
        img: "assets/img/payment/p-bca-borderless.png",
        width: 90,
    }
];

const card = [
    {
        name: "Kartu Kredit",
        value: "credit_card",
        img: "",
    }
];

const eWallet = [
    {
        name: "OVO",
        value: "OVO",
        img: "assets/img/payment/p-ovo-borderless.png",
        width: 90,
        marginLeft: "0px"
    },
    {
        name: "LinkAja",
        value: "LINKAJA",
        img: "assets/img/payment/p-linkaja.png",
        width: 90,
        marginLeft: "0px"
    },
    // {
    //     name: "",
    //     value: "QRIS",
    //     img: "assets/img/payment/p-qris.png",
    //     width: 80,
    //     marginLeft: "25px"
    // }
]

const paymentMethod = [,
    {
        title: "E-Wallet",
        description: "Pembayaran menggunakan E-Wallet",
        key: "ewallet",
        has_children: true,
        data: eWallet
    },
    {
        title: "Transfer Bank",
        description: "",
        key: "transfer_bank",
        has_children: true,
        data: bank_transfer,
    },
    // {
    //     title: "Kartu Kredit",
    //     description: "",
    //     key: "credit_card",
    //     has_children: false,
    //     data: card
    // }
];
export default paymentMethod