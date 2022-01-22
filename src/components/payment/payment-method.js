const bank_transfer = [
    {
        name: "BCA",
        value: "transfer_bca",
        img: "assets/img/bca-icon.png",
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
        name: "gopay",
        value: "gopay",
        img: "",
    }
]

const paymentMethod = [
    {
        title: "Transfer Bank",
        description: "",
        key: "transfer_bank",
        has_children: true,
        data: bank_transfer,
    },{
        title: "Kartu Kredit",
        description: "",
        key: "credit_card",
        has_children: false,
        data: card
    },
    // {
    //     title: "E-Wallet",
    //     description: "Pembayaran menggunakan E-Wallet",
    //     key: "ewallet",
    //     has_children: false,
    //     data: eWallet
    // }
];
export default paymentMethod