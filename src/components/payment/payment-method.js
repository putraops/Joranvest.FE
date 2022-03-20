const bank_transfer = [
    {
        name: "BCA",
        value: "transfer_bca",
        img: "assets/img/bca.png",
        width: 60,
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
        img: "assets/img/ovo.png",
        width: 30
    },
    {
        name: "LinkAja",
        value: "LINKAJA",
        img: "assets/img/linkaja.png",
        width: 30
    }
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
    },{
        title: "Kartu Kredit",
        description: "",
        key: "credit_card",
        has_children: false,
        data: card
    }
];
export default paymentMethod